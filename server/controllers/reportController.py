from flask import jsonify
import os
import uuid
from rag.llm.llm_client import LLMClient

class ReportController:
    @staticmethod
    def generate_report(dataset_id: str):
        if not dataset_id:
            return jsonify({"error": "Dataset ID required"}), 400
            
        api_key = os.getenv("GEMINI_API_KEY")
        if not api_key:
            return jsonify({"error": "GEMINI_API_KEY is not set in the server environment"}), 500

        llm = LLMClient(api_key=api_key, provider="gemini")
        # Simulating fetching dataset metadata or info since it's just an ID
        simulated_info = f"Dataset properties for {dataset_id}:\n- Total Rows: 50,000\n- Key Columns: Revenue, Cost, Region\n- Trends: Upward revenue trend in Q3."
        report_text = llm.generate_report(simulated_info)
        
        report_id = f"rep-{uuid.uuid4().hex[:6]}"
        return jsonify({
            "message": "Report generated successfully", 
            "report_id": report_id,
            "report_content": report_text
        }), 201

    @staticmethod
    def get_reports():
        return jsonify({"reports": []}), 200

    @staticmethod
    def generate_pipeline_report(document_text: str):
        if not document_text:
            return jsonify({"error": "Document text required"}), 400
            
        import asyncio
        llm = LLMClient() # Provider not strictly needed since pipeline handles both
        
        try:
            report_text = asyncio.run(llm.run_evt_pipeline(document_text))
            
            report_id = f"evt-rep-{uuid.uuid4().hex[:6]}"
            return jsonify({
                "message": "EVT Pipeline report generated successfully", 
                "report_id": report_id,
                "report_content": report_text
            }), 201
        except Exception as e:
            return jsonify({"error": f"Pipeline failed: {str(e)}"}), 500
