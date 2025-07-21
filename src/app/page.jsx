import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import {
  MessageSquareIcon,
  BookOpenIcon,
  LineChartIcon,
  BrainIcon,
  UsersIcon,
  PhoneIcon,
  SparklesIcon,
} from "lucide-react"

export default function HomePage() {
  const features = [
    {
      title: "AI 감정 대화",
      description: "공감하고 들어주는 AI와 마음을 나누세요",
      icon: MessageSquareIcon,
      href: "/ai-chat", // 경로 업데이트
      color: "from-purple-500 to-purple-600",
    },
    {
      title: "감정 일기",
      description: "매일의 감정을 기록하고 AI 피드백을 받아보세요",
      icon: BookOpenIcon,
      href: "/emotion-diary", // 경로 업데이트
      color: "from-pink-500 to-pink-600",
    },
    {
      title: "감정 통계",
      description: "감정 변화를 시각적으로 추적하고 분석하세요",
      icon: LineChartIcon,
      href: "/emotion-history", // 경로 업데이트
      color: "from-blue-500 to-blue-600",
    },
    {
      title: "대화 주제",
      description: "상황에 맞는 맞춤형 대화 주제를 선택하세요",
      icon: BrainIcon,
      href: "/conversation-topics", // 경로 업데이트
      color: "from-green-500 to-green-600",
    },
    {
      title: "익명 커뮤니티",
      description: "같은 고민을 가진 사람들과 익명으로 소통하세요",
      icon: UsersIcon,
      href: "/anonymous-community", // 경로 업데이트
      color: "from-indigo-500 to-indigo-600",
    },
    {
      title: "긴급 지원",
      description: "위기 상황에서 즉시 전문가 도움을 받으세요",
      icon: PhoneIcon,
      href: "/emergency-support", // 경로 업데이트
      color: "from-red-500 to-red-600",
    },
  ]

  return (
    <div className="flex-1 flex flex-col">
      {/* Header */}
      <div className="border-b bg-white px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">SupportHub</h1>
            <p className="text-gray-600">마음을 나누는 AI 감정공감 대화 플랫폼</p>
          </div>
          <div className="flex items-center gap-2">
            <SparklesIcon className="h-5 w-5 text-purple-500" />
            <span className="text-sm text-gray-600">AI 기반 감정 분석</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="max-w-6xl mx-auto p-6">
          {/* Welcome Section */}
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900">오늘은 무슨 생각을 하고 계신가요?</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              혼자 고민하지 마세요. AI와 함께 감정을 정리하고, 같은 마음을 가진 사람들과 소통하며, 필요할 때 전문가의
              도움을 받을 수 있습니다.
            </p>
          </div>

          {/* Quick Start */}
          <div className="mb-12">
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-8 text-white text-center">
              <h3 className="2xl font-bold mb-4">지금 바로 시작해보세요</h3>
              <p className="text-purple-100 mb-6">AI와의 대화로 마음의 짐을 덜어보세요</p>
              <Link href="/ai-chat">
                {" "}
                {/* 경로 업데이트 */}
                <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100 font-semibold px-8">
                  <MessageSquareIcon className="mr-2 h-5 w-5" />
                  AI와 대화 시작하기
                </Button>
              </Link>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature) => {
              const Icon = feature.icon
              return (
                <Link key={feature.href} href={feature.href}>
                  <Card className="h-full hover:shadow-lg transition-all duration-200 cursor-pointer group">
                    <CardContent className="p-6">
                      <div
                        className={`w-12 h-12 rounded-lg bg-gradient-to-r ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                      >
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                      <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
                    </CardContent>
                  </Card>
                </Link>
              )
            })}
          </div>

          {/* Stats Section */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-purple-600 mb-2">365일</div>
              <div className="text-gray-600">연중무휴 이용 가능</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-pink-600 mb-2">100%</div>
              <div className="text-gray-600">익명성 보장</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-2">AI</div>
              <div className="text-gray-600">감정 분석 기반</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
