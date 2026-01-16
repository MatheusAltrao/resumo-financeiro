import { PRE_PROMPT_OPEN_AI } from "@/consts/open-ai-config";
import { NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST(request: Request) {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY as string,
  });

  //verificar se esta logado
  // verificar se tem créditos

  try {
    const formData = await request.formData();
    const files = formData.getAll("files") as File[];

    if (!files || files.length === 0) {
      return NextResponse.json({ error: "Nenhum arquivo foi enviado" }, { status: 400 });
    }

    // Aqui você pode processar os arquivos
    // Por exemplo, ler o conteúdo, converter, etc.
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

    // Criar o prompt com base nos arquivos
    const prompt = `Analise os seguintes documentos financeiros e forneça um resumo:\n\n${fileContents
      .map((f) => `Arquivo: ${f.name}\n${f.content}`)
      .join("\n\n")}`;

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
      max_tokens: 1024,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });

    const content = response.choices[0].message.content;
    return NextResponse.json({
      result: content ? content.trim() : "",
      filesProcessed: files.length,
    });
  } catch (error) {
    console.error("Erro ao processar:", error);
    return NextResponse.json({ error: "Failed to generate response: " + error }, { status: 500 });
  }
}
