"use client"
import { useState } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { CalendarIcon, LoaderIcon } from "lucide-react"

export default function EmotionDiary() {
  const [selectedEmotion, setSelectedEmotion] = useState(null)
  const [diaryEntry, setDiaryEntry] = useState("")
  const [aiFeedback, setAiFeedback] = useState("")
  const [isSaved, setIsSaved] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const today = new Date().toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "long",
  })

  const handleSaveDiary = async () => {
    if (selectedEmotion && diaryEntry.trim()) {
      setIsLoading(true)
      try {
        const response = await fetch("/api/diary-feedback", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            emotion: selectedEmotion,
            diaryEntry: diaryEntry,
          }),
        })

        const data = await response.json()
        setAiFeedback(data.feedback)
        setIsSaved(true)
      } catch (error) {
        setAiFeedback("피드백을 가져오는 중 오류가 발생했습니다. 다시 시도해 주세요.")
      } finally {
        setIsLoading(false)
      }
    } else {
      setAiFeedback("감정과 일기 내용을 모두 입력해주세요.")
    }
  }

  const emotions = [
    { name: "happy", emoji: "😊", label: "기쁨" },
    { name: "sad", emoji: "😢", label: "슬픔" },
    { name: "angry", emoji: "😠", label: "화남" },
    { name: "anxious", emoji: "😟", label: "불안" },
    { name: "neutral", emoji: "😐", label: "평온" },
  ]

  return (
    <div className="flex-1 flex flex-col h-full">
      {/* Header */}
      <div className="border-b bg-white dark:bg-gray-800 px-6 py-4">
        <div className="flex items-center gap-3">
          <CalendarIcon className="h-6 w-6 text-purple-600" />
          <div>
            <h1 className="text-xl font-semibold text-gray-900 dark:text-white">오늘의 감정 일기</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">{today}</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-6">
        <div className="space-y-6 max-w-3xl mx-auto">
          <div>
            <Label htmlFor="emotion-select" className="text-base mb-3 block">
              오늘의 감정은 어떤가요?
            </Label>
            <div className="flex flex-wrap gap-3" role="group" aria-labelledby="emotion-select">
              {emotions.map((emotion) => (
                <Button
                  key={emotion.name}
                  variant={selectedEmotion === emotion.name ? "default" : "outline"}
                  onClick={() => setSelectedEmotion(emotion.name)}
                  className={`flex flex-col items-center justify-center p-4 h-auto w-24 text-lg ${
                    selectedEmotion === emotion.name
                      ? "bg-purple-500 text-white hover:bg-purple-600"
                      : "border-gray-300 hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-800"
                  }`}
                  aria-pressed={selectedEmotion === emotion.name}
                >
                  <span className="text-3xl mb-1" role="img" aria-label={emotion.label}>
                    {emotion.emoji}
                  </span>
                  <span className="text-sm">{emotion.label}</span>
                </Button>
              ))}
            </div>
          </div>
          <div>
            <Label htmlFor="diary-entry" className="text-base mb-3 block">
              오늘 하루를 기록해 보세요.
            </Label>
            <Textarea
              id="diary-entry"
              placeholder="오늘 있었던 일이나 느낀 감정을 자유롭게 적어주세요..."
              value={diaryEntry}
              onChange={(e) => setDiaryEntry(e.target.value)}
              className="min-h-[200px] text-base focus-visible:ring-purple-500"
              aria-label="일기 내용 입력"
            />
          </div>
          {aiFeedback && (
            <div
              className={`p-4 rounded-lg ${
                isSaved
                  ? "bg-purple-50 border border-purple-200 text-purple-800 dark:bg-purple-950 dark:text-purple-200"
                  : "bg-red-50 border border-red-200 text-red-800 dark:bg-red-950 dark:text-red-200"
              }`}
              role="status"
            >
              <p className="font-semibold mb-2">AI의 한마디:</p>
              <p className="leading-relaxed">{aiFeedback}</p>
            </div>
          )}
          <div className="flex justify-end">
            <Button onClick={handleSaveDiary} disabled={isLoading} className="bg-purple-600 hover:bg-purple-700 px-8">
              {isLoading ? (
                <>
                  <LoaderIcon className="mr-2 h-4 w-4 animate-spin" />
                  AI 피드백 생성 중...
                </>
              ) : (
                "일기 저장"
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
