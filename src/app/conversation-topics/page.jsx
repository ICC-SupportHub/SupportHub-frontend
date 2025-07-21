"use client"

import { useState } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { MessageSquareIcon, HeartIcon, CloudRainIcon, ZapIcon, MehIcon } from "lucide-react"

const topicCategories = [
  {
    id: "loneliness",
    title: "외로움",
    description: "혼자라는 느낌, 고립감에 대해 이야기해요",
    icon: HeartIcon,
    color: "bg-blue-500",
    keywords: ["혼자", "외로움", "고립", "친구", "관계"],
  },
  {
    id: "stress",
    title: "스트레스",
    description: "일상의 압박감과 스트레스를 풀어보세요",
    icon: ZapIcon,
    color: "bg-red-500",
    keywords: ["스트레스", "압박", "피로", "번아웃", "과로"],
  },
  {
    id: "self-criticism",
    title: "자기비난",
    description: "자신을 너무 혹독하게 대하고 계신가요?",
    icon: CloudRainIcon,
    color: "bg-gray-500",
    keywords: ["자책", "비난", "죄책감", "자존감", "완벽주의"],
  },
  {
    id: "depression",
    title: "우울감",
    description: "마음이 무겁고 우울한 감정을 나눠보세요",
    icon: CloudRainIcon,
    color: "bg-purple-500",
    keywords: ["우울", "슬픔", "무기력", "절망", "의욕상실"],
  },
  {
    id: "anxiety",
    title: "불안감",
    description: "걱정과 불안한 마음을 털어놓으세요",
    icon: ZapIcon,
    color: "bg-yellow-500",
    keywords: ["불안", "걱정", "두려움", "공황", "긴장"],
  },
  {
    id: "general",
    title: "일반 대화",
    description: "특별한 주제 없이 자유롭게 대화해요",
    icon: MehIcon,
    color: "bg-green-500",
    keywords: ["일반", "자유", "대화", "일상", "소통"],
  },
]

export default function TopicsPage() {
  const [selectedTopic, setSelectedTopic] = useState(null)

  const handleTopicSelect = (topicId) => {
    setSelectedTopic(topicId)
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
      <Card className="w-full max-w-5xl shadow-lg rounded-lg">
        <CardHeader className="bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-t-lg p-6">
          <CardTitle className="text-3xl font-bold text-center">대화 주제 선택</CardTitle>
          <p className="text-center text-purple-100 mt-2">
            어떤 주제로 AI와 대화하고 싶으신가요? 주제를 선택하면 더 맞춤형 대화를 제공해드려요.
          </p>
        </CardHeader>
        <CardContent className="p-6 flex-1 flex flex-col">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6 flex-1">
            {topicCategories.map((topic) => {
              const Icon = topic.icon
              const isSelected = selectedTopic === topic.id
              return (
                <Card
                  key={topic.id}
                  className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
                    isSelected ? "ring-2 ring-purple-500 bg-purple-50 dark:bg-purple-950" : ""
                  }`}
                  onClick={() => handleTopicSelect(topic.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center mb-3">
                      <div className={`p-2 rounded-full ${topic.color} text-white mr-3`}>
                        <Icon className="h-5 w-5" aria-hidden="true" />
                      </div>
                      <h3 className="font-semibold text-lg">{topic.title}</h3>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">{topic.description}</p>
                    <div className="flex flex-wrap gap-1">
                      {topic.keywords.map((keyword) => (
                        <Badge key={keyword} variant="secondary" className="text-xs">
                          {keyword}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
          {selectedTopic && (
            <div className="text-center mt-auto">
              <Link href={`/ai-chat?topic=${selectedTopic}`} passHref>
                <Button className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 text-lg">
                  <MessageSquareIcon className="mr-2 h-5 w-5" aria-hidden="true" />
                  선택한 주제로 대화 시작
                </Button>
              </Link>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
