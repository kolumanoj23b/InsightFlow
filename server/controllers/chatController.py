from flask import jsonify
import os
from rag.llm.llm_client import LLMClient

class ChatController:
    @staticmethod
    def process_query(query: str, document_id: str, context: str = ""):
        if not query:
            return jsonify({"error": "Query is required"}), 400
            
        api_key = os.getenv("OPENAI_API_KEY")
        if not api_key:
            return jsonify({"error": "OPENAI_API_KEY is not set in the server environment"}), 500

        llm = LLMClient(api_key=api_key, provider="openai")
        answer = llm.generate_answer(query, context)
        
        return jsonify({
            "answer": answer,
            "sources": [] # We handle sources client-side for now
        }), 200
