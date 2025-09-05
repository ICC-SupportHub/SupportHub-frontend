import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

export async function POST(req) {
  const { emotion, diaryEntry } = await req.json()

  const result = await generateText({
    model: openai("gpt-4o"),
    system: `당신은 감정 일기 피드백 전문 AI입니다. 사용자의 감정과 일기 내용을 바탕으로 따뜻하고 공감적인 피드백을 제공하세요.

피드백 원칙:
1. 사용자의 감정을 먼저 인정하고 공감하기
2. 긍정적이고 격려하는 톤 유지하기
3. 구체적이고 실용적인 조언 포함하기
4. 2-3문장으로 간결하게 작성하기
5. 한국어로 자연스럽게 작성하기`,
    prompt: `사용자의 오늘 감정: ${emotion}
사용자의 일기 내용: ${diaryEntry}

위 내용을 바탕으로 따뜻하고 공감적인 피드백을 작성해주세요.`,
  })

  return Response.json({ feedback: result.text })
}
