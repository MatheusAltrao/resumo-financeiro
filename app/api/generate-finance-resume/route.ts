import { NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST(request: Request) {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY as string,
  });

  const { prompt } = await request.json();

  if (!prompt) {
    return NextResponse.json({ error: "Prompt is required" });
  }

  console.log("Prompt received:", prompt);

  /* try {
    const response = await openai.chat.completions.create({
      model: "gpt-4.1",
      messages: [
        {
          role: "system",
          content: ``,
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
    return NextResponse.json(content ? content.trim() : "");
  } catch (error) {
    return NextResponse.json({ error: "Failed to generate response" + error });
  } */
}
