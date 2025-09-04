import { useState } from "react";

export interface LLMResult {
  ner_result: { entity: string; word: string }[];
  llm_result: string;
  llm_result_gpt4o: string;
}

const BASE_URL = "http://192.168.161.127:8000";

export function useLLM() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<LLMResult | null>(null);
  const [testLLMResult, setTestLLMResult] = useState<string | null>(null);

  const testLLM = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${BASE_URL}/llm_test`);
      if (!response.ok) throw new Error(`서버 오류: ${response.status}`);
      const data = await response.json();
      setTestLLMResult(data.llm_result);
    } catch (err: any) {
      setError(err.message || "알 수 없는 오류 발생");
    } finally {
      setLoading(false);
    }
  };

  const parseReceipt = async (ocrText: string) => {
    setLoading(true);
    setError(null);
    // console.log("parseReceipt ocrText", ocrText);
    try {
      const response = await fetch(`${BASE_URL}/parse_receipt`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: ocrText }),
      });
      console.log("parseReceipt response", response);
      if (!response.ok) {
        throw new Error(`서버 오류: ${response.status}`);
      }

      const data: LLMResult = await response.json();
      setResult(data);
    } catch (err: any) {
      console.log("err", err);
      setError(err.message || "알 수 없는 오류 발생");
      setResult(null);
    } finally {
      console.log("parseReceipt finally");
      setLoading(false);
    }
  };

  return { parseReceipt, result, loading, setLoading, error, testLLM, testLLMResult };
}