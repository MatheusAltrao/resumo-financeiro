import { BASE_URL } from "@/consts/url";

export default async function generateFinanceResumePrompt(formData: FormData) {
  const response = await fetch(`${BASE_URL}/api/generate-finance-resume`, {
    method: "POST",
    body: formData,
  });

  return response.json();
}
