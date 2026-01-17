import createAnalyzeAction from "@/actions/analyzes/create-analyze-action";
import subtractACredit from "@/actions/credits/subtract-a-credit-action";
import { PRE_PROMPT_OPEN_AI } from "@/consts/open-ai-config";
import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST(request: Request) {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY as string,
  });

  const session = await auth();

  if (!session || !session.user) {
    return NextResponse.json({ error: "Usuário não autenticado" }, { status: 401 });
  }

  try {
    await subtractACredit();

    const formData = await request.formData();
    const files = formData.getAll("files") as File[];

    if (!files || files.length === 0) {
      return NextResponse.json({ error: "Nenhum arquivo foi enviado" }, { status: 400 });
    }

    console.log("📁 Arquivos recebidos:", files.length);

    const fileContents = await Promise.all(
      files.map(async (file) => {
        const text = await file.text();
        return {
          name: file.name,
          type: file.type,
          content: text,
        };
      })
    );

    const prompt = `Analise os seguintes documentos financeiros e forneça um resumo:\n\n${fileContents
      .map((f) => `Arquivo: ${f.name}\n${f.content}`)
      .join("\n\n")}`;

    console.log("🤖 Chamando OpenAI...");

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: PRE_PROMPT_OPEN_AI,
        },
        { role: "user", content: prompt },
      ],
      temperature: 0,
      max_tokens: 16000,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });

    const content = response.choices[0].message.content;

    console.log("✅ Resposta recebida da OpenAI:", content ? "Sim" : "Não");

    if (content) {
      console.log("💾 Salvando análise no banco...");
      const analyze = await createAnalyzeAction(content.trim());
      console.log("✅ Análise salva com ID:", analyze.id);
    }

    return NextResponse.json({
      result: content ? content.trim() : "",
      filesProcessed: files.length,
    });
  } catch (error) {
    console.error("❌ Erro ao processar:", error);
    return NextResponse.json({ error: "Failed to generate response: " + error }, { status: 500 });
  }
}
