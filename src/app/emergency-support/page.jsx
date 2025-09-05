"use client"
import Link from "next/link"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { PhoneIcon, MessageSquareIcon, ExternalLinkIcon, AlertTriangleIcon } from "lucide-react"

const emergencyContacts = [
  {
    name: "생명의전화",
    number: "1588-9191",
    description: "24시간 자살예방 상담",
    type: "전화",
  },
  {
    name: "청소년전화",
    number: "1388",
    description: "청소년 위기상담 및 긴급구조",
    type: "전화",
  },
  {
    name: "정신건강위기상담전화",
    number: "1577-0199",
    description: "정신건강 위기상황 24시간 상담",
    type: "전화",
  },
  {
    name: "사이버상담센터",
    number: "www.cyber1388.kr",
    description: "온라인 채팅 상담",
    type: "온라인",
  },
]

const selfCareResources = [
  {
    title: "호흡 운동",
    description: "4-7-8 호흡법으로 마음을 진정시켜보세요",
    action: "지금 시작하기",
  },
  {
    title: "긍정적 생각",
    description: "지금 이 순간 감사한 것 3가지를 떠올려보세요",
    action: "생각해보기",
  },
  {
    title: "안전한 장소",
    description: "신뢰할 수 있는 사람에게 연락하거나 안전한 곳으로 이동하세요",
    action: "도움 요청하기",
  },
]

export default function EmergencyPage() {
  const handleCall = (number) => {
    if (number.startsWith("www")) {
      window.open(`https://${number}`, "_blank")
    } else {
      window.open(`tel:${number}`)
    }
  }

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
      <div className="w-full max-w-5xl mx-auto space-y-6">
        <Card className="shadow-lg rounded-lg">
          <CardHeader className="bg-gradient-to-r from-red-600 to-pink-600 text-white rounded-t-lg p-6">
            <CardTitle className="text-3xl font-bold text-center flex items-center justify-center gap-2">
              <AlertTriangleIcon className="h-8 w-8" aria-hidden="true" />
              긴급 심리지원
            </CardTitle>
            <p className="text-center text-red-100 mt-2">
              위기 상황에서 즉시 도움을 받을 수 있는 연락처와 자가 관리 방법을 제공합니다
            </p>
          </CardHeader>
        </Card>
        <Alert className="border-red-200 bg-red-50 dark:bg-red-950">
          <AlertTriangleIcon className="h-4 w-4 text-red-600" />
          <AlertDescription className="text-red-800 dark:text-red-200">
            <strong>응급상황 시:</strong> 생명이 위험하다고 느끼시면 즉시 119에 신고하거나 가까운 응급실로 가세요.
          </AlertDescription>
        </Alert>
        <Card className="shadow-md flex-1 flex flex-col">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-gray-800 dark:text-gray-200">24시간 상담 연락처</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 flex-1 overflow-y-auto">
            {emergencyContacts.map((contact, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                <div className="flex-1">
                  <h3 className="font-semibold text-lg text-gray-800 dark:text-gray-200">{contact.name}</h3>
                  <p className="text-gray-600 dark:text-gray-400">{contact.description}</p>
                  <p className="text-sm text-purple-600 font-mono">{contact.number}</p>
                </div>
                <Button onClick={() => handleCall(contact.number)} className="bg-red-600 hover:bg-red-700 text-white">
                  {contact.type === "전화" ? (
                    <PhoneIcon className="mr-2 h-4 w-4" aria-hidden="true" />
                  ) : (
                    <ExternalLinkIcon className="mr-2 h-4 w-4" aria-hidden="true" />
                  )}
                  {contact.type === "전화" ? "전화하기" : "접속하기"}
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-gray-800 dark:text-gray-200">
              즉시 할 수 있는 자가 관리
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {selfCareResources.map((resource, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                <div className="flex-1">
                  <h3 className="font-semibold text-lg text-gray-800 dark:text-gray-200">{resource.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400">{resource.description}</p>
                </div>
                <Button
                  variant="outline"
                  className="border-purple-300 text-purple-600 hover:bg-purple-50 bg-transparent"
                >
                  {resource.action}
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>
        <Card className="shadow-md bg-purple-50 dark:bg-purple-950">
          <CardContent className="p-6 text-center">
            <h3 className="text-lg font-semibold text-purple-800 dark:text-purple-200 mb-2">혼자가 아닙니다</h3>
            <p className="text-purple-700 dark:text-purple-300 mb-4">
              어려운 시간을 보내고 계시지만, 도움을 받을 수 있는 방법이 있습니다. 전문가들이 당신을 도울 준비가 되어
              있습니다.
            </p>
            <Link href="/ai-chat">
              <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                <MessageSquareIcon className="mr-2 h-4 w-4" aria-hidden="true" />
                AI와 대화하기
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
