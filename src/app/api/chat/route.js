import { streamText } from "ai"
import { openai } from "@ai-sdk/openai"

export const maxDuration = 30

export async function POST(req) {
  const { messages } = await req.json()

  const result = await streamText({
    model: openai("gpt-4o"),
    system: `당신은 감정 공감 전문 AI 상담사입니다. 다음 원칙을 따라 대화하세요:

1. 항상 따뜻하고 공감적인 톤으로 대화하세요
2. 사용자의 감정을 먼저 인정하고 공감해주세요
3. 판단하지 말고 들어주는 자세를 유지하세요
4. 필요시 구체적이고 실용적인 조언을 제공하세요
5. 위기 상황이 감지되면 전문가 도움을 권하세요
6. 한국어로 자연스럽게 대화하세요
7. 너무 길지 않게, 2-3문장으로 답변하세요

사용자가 힘든 감정을 표현할 때는 특히 더 세심하게 공감해주세요.`,
    messages,
  })

  return result.toDataStreamResponse()
}
