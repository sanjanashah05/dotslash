from langchain.llms.base import LLM
from typing import Any, List, Mapping, Optional
import requests

class QwenLLM(LLM):
    api_key: str
    api_endpoint: str

    def __init__(self, api_key: str, api_endpoint: str):
        super().__init__()
        self.api_key = api_key
        self.api_endpoint = api_endpoint

    def _call(self, prompt: str, stop: Optional[List[str]] = None) -> str:
        headers = {
            "Authorization": f"Bearer {self.api_key}",
            "Content-Type": "application/json"
        }
        data = {
            "prompt": prompt,
            "max_tokens": 100,
            "temperature": 0.7
        }
        response = requests.post(self.api_endpoint, headers=headers, json=data)
        if response.status_code != 200:
            raise Exception(f"Qwen API error: {response.text}")
        return response.json().get("response", "")

    @property
    def _identifying_params(self) -> Mapping[str, Any]:
        return {"api_endpoint": self.api_endpoint}

    @property
    def _llm_type(self) -> str:
        return "qwen"