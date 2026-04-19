import os
import re
import json
import asyncio
from pydantic import BaseModel, Field
from tenacity import retry, wait_exponential, stop_after_attempt

class ExtractedInsights(BaseModel):
    summary: str = Field(description="Summary of the PDF context.")
    key_points: list[str] = Field(description="Key bullet points/insights.")
    important_details: list[str] = Field(description="Detailed explanation points.")
    context: str = Field(description="Background context and conclusion notes.")

class LLMClient:
    """Client for generating answers using a Language Model."""
    def __init__(self, api_key: str = None, provider: str = "gemini"):
        self.api_key = api_key
        self.provider = provider
        
        if self.provider == "gemini":
            try:
                import google.generativeai as genai
                if self.api_key:
                    genai.configure(api_key=self.api_key)
                self.genai = genai
            except ImportError:
                self.genai = None

        if self.provider == "openai":
            try:
                import openai
                if self.api_key:
                    openai.api_key = self.api_key
                self.openai = openai
            except ImportError:
                self.openai = None

    def generate_answer(self, query: str, context: str) -> str:
        """
        Generates an answer based on the provided context.
        """
        prompt = f"""
You are an insightful AI assistant. Please answer the user's question based ONLY on the context provided below.
If you cannot find the answer in the context, say "I don't have enough information to answer that based on the provided document."

Context:
{context}

Question: {query}

Answer:
"""
        if not context.strip() and self.provider != "gemini":
            return "Please provide document context so I can answer your question."
            
        if self.provider == "gemini" and getattr(self, 'genai', None):
            try:
                model = self.genai.GenerativeModel('gemini-2.5-pro')
                response = model.generate_content(prompt)
                return response.text
            except Exception as e:
                return f"Error connecting to Gemini API: {str(e)}"
                
        if self.provider == "openai" and getattr(self, 'openai', None):
            try:
                from openai import OpenAI
                client = OpenAI(api_key=self.api_key)
                response = client.chat.completions.create(
                    model="gpt-4o",
                    messages=[
                        {"role": "system", "content": "You are a helpful and intelligent assistant."},
                        {"role": "user", "content": prompt}
                    ]
                )
                return response.choices[0].message.content
            except Exception as e:
                return f"Error connecting to OpenAI API: {str(e)}"
                
        # Fallback if no API or unhandled provider
        return "Based on the provided document context:\n\n" + (context[:300] + "..." if len(context) > 300 else context) + f"\n\n[Note: {self.provider} API is not configured.]"

    def generate_report(self, dataset_info: str) -> str:
        """
        Generates a comprehensive report based on dataset insights using Gemini.
        """
        if self.provider != "gemini":
            return "Report generation requires the Gemini provider."

        prompt = f"""
You are a highly capable data analyst. Please generate a comprehensive summary report based on the following dataset description/data:

Dataset Info:
{dataset_info}

Format the report with a professional structure using Markdown headers without boilerplate introductions.
"""
        if getattr(self, 'genai', None):
            try:
                model = self.genai.GenerativeModel('gemini-2.5-pro')
                response = model.generate_content(prompt)
                return response.text
            except Exception as e:
                return f"Error connecting to Gemini API during report generation: {str(e)}"
        
        return "Gemini API is not configured for report generation."

    @retry(wait=wait_exponential(multiplier=1, min=2, max=10), stop=stop_after_attempt(3))
    async def extract_with_openai(self, text_context: str) -> ExtractedInsights:
        """Extract structured insights from document context using OpenAI parsing."""
        if not getattr(self, 'openai', None):
            import openai
            self.openai = openai
        from openai import AsyncOpenAI
        
        system_prompt = "You are a data extraction bot. Extract the required details strictly matching the schema."
        # Use AsyncOpenAI using the provided key (or environment variable if none provided)
        client = AsyncOpenAI(api_key=self.api_key or os.getenv("OPENAI_API_KEY"))
        
        response = await client.beta.chat.completions.parse(
            model="gpt-4o-2024-08-06",
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": f"Document context:\n{text_context[:50000]}"}
            ],
            response_format=ExtractedInsights,
        )
        return response.choices[0].message.parsed

    @retry(wait=wait_exponential(multiplier=1, min=2, max=10), stop=stop_after_attempt(3))
    async def generate_report_with_gemini(self, insights: ExtractedInsights) -> str:
        """Generate final downstream report based on valid constraints using Gemini."""
        if not getattr(self, 'genai', None):
            import google.generativeai as genai
            if self.api_key:
                genai.configure(api_key=self.api_key)
            elif os.getenv("GEMINI_API_KEY"):
                genai.configure(api_key=os.getenv("GEMINI_API_KEY"))
            self.genai = genai
            
        model = self.genai.GenerativeModel('gemini-2.5-pro')
        context_str = insights.model_dump_json(indent=2)
        
        prompt = f"""
You are a senior AI engineer and backend debugging expert specializing in LLM pipelines.

I am building an automation system using:
* OpenAI API -> extracts insights from PDF
* Gemini Pro (you) -> generates final report

Your Tasks:

1. Debug the Pipeline:
   * Analyze the input provided
   * Identify if data is missing, empty, or unstructured
   * Detect API misuse, async issues, or formatting errors

2. Validate Input Strictly:
   * If input is empty, null, or unclear -> return:
     "Error: Invalid input received from OpenAI API"
   * Do NOT proceed with weak input

3. Normalize Data:
   Convert input into strict JSON format (internally):
   {{
   "summary": "",
   "key_points": [],
   "important_details": [],
   "context": ""
   }}

4. Generate Report:
   ONLY if input is valid:
   * Title
   * Executive Summary
   * Key Insights
   * Detailed Analysis
   * Conclusion

5. Strict Rules:
   * NEVER say "I couldn't find a direct answer"
   * NEVER hallucinate or add external info
   * Use ONLY provided data
   * If something is missing -> explicitly state it

6. Output Format:
   * Clean Markdown
   * Structured and readable
   * Deterministic (same input -> same output)

7. Optimization Suggestions:
   * Suggest improvements for OpenAI -> Gemini data flow
   * Suggest validation or preprocessing fixes

Input Data from OpenAI:
{context_str}
"""
        response = await model.generate_content_async(prompt)
        return response.text

    async def run_evt_pipeline(self, document_text: str) -> str:
        """
        Executes the Extract-Validate-Transform pipeline:
        1. OpenAI extracts data securely into a validated JSON Schema (Pydantic).
        2. Gemini renders a beautiful, hallucination-free final report.
        """
        try:
            print("[Pipeline] Step 1: Extracting with OpenAI...")
            insights = await self.extract_with_openai(document_text)
            
            print("[Pipeline] Step 2: Generating report with Gemini...")
            report = await self.generate_report_with_gemini(insights)
            
            return report
        except Exception as e:
            print(f"[Pipeline] Error executing pipeline: {str(e)}")
            raise e
