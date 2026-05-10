import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { text, passCount = 1 } = await request.json();

    if (!text || text.trim().length === 0) {
      return NextResponse.json({ error: "Text is required" }, { status: 400 });
    }

    const wordCount = text.trim().split(/\s+/).filter((w: string) => w.length > 0).length;
    if (wordCount > 30000) {
      return NextResponse.json({ error: "Text too long (max 30,000 words)" }, { status: 400 });
    }

    const groqApiKey = process.env.GROQ_API_KEY;

    if (!groqApiKey) {
      return NextResponse.json({ error: "API not configured" }, { status: 500 });
    }

    const prompt = `You are an expert academic writer who specializes in rewriting AI-generated text to sound completely human-written. Your task is to rewrite the given text so it bypasses AI detection tools like Turnitin.

RULES:
1. Replace AI-specific phrases with natural alternatives
2. Vary sentence structure - mix short and long sentences
3. Use natural transitions, avoid formulaic patterns
4. Remove filler words (very, really, basically, literally)
5. Break long compound sentences into shorter ones
6. Use varied vocabulary and natural word choices
7. Keep the academic tone but make it sound human-written
8. Preserve all factual content and meaning exactly
9. Do NOT add new information or change facts
10. Output only the rewritten text, nothing else

Rewrite this text:\n\n${text}`;

    let rewrittenText = text;
    const maxRetries = 3;

    for (let attempt = 0; attempt < passCount; attempt++) {
      const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${groqApiKey}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: "llama-3.3-70b-versatile",
          messages: [
            {
              role: "system",
              content: "You are an expert academic humanizer. Rewrite text to sound naturally human-written while preserving all meaning and facts."
            },
            {
              role: "user", 
              content: prompt
            }
          ],
          temperature: 0.7,
          max_tokens: 4096
        })
      });

      if (!response.ok) {
        const errorData = await response.text();
        console.error("Groq API error:", response.status, errorData);
        
        if (attempt < maxRetries - 1) {
          await new Promise(r => setTimeout(r, 1000));
          continue;
        }
        
        return NextResponse.json({ 
          error: "AI service temporarily unavailable. Please try again.",
          details: response.status
        }, { status: 503 });
      }

      const data = await response.json();
      rewrittenText = data.choices?.[0]?.message?.content || rewrittenText;
      
      if (attempt < passCount - 1) {
        await new Promise(r => setTimeout(r, 500));
      }
    }

    return NextResponse.json({ 
      result: rewrittenText,
      success: true
    });

  } catch (error) {
    console.error("Humanize API error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}