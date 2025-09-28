import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import {
  MessageSquareIcon,
  BookOpenIcon,
  LineChartIcon,
  BrainIcon,
  UsersIcon,
  PhoneIcon,
  SparklesIcon,
} from 'lucide-react'

export default function HomePage() {
  const features = [
    {
      title: '🙋‍♀️ AI 감정 대화',
      description: '혼자라고 느낄때, AI와 이야기를 나눠보세요',
      icon: MessageSquareIcon,
      href: '/ai-chat', // 경로 업데이트
      color: 'from-purple-500 to-purple-600',
    },
    {
      title: '📔 감정 일기',
      description: '오늘의 감정을 선택하고, 하루를 천천히 기록해보세요',
      icon: BookOpenIcon,
      href: '/emotion-diary', // 경로 업데이트
      color: 'from-pink-500 to-pink-600',
    },
    {
      title: '📊 감정 통계',
      description: '기록한 감정이, 마음의 그래프로 그려져요',
      icon: LineChartIcon,
      href: '/emotion-history', // 경로 업데이트
      color: 'from-blue-500 to-blue-600',
    },
    {
      title: '🧠 대화 주제',
      description: '지금 감정에 어울리는 주제를 골라 대화해보세요',
      icon: BrainIcon,
      href: '/conversation-topics', // 경로 업데이트
      color: 'from-green-500 to-green-600',
    },
    {
      title: '🫂 익명 커뮤니티',
      description: '익명으로 감정을 나누고 서로 따뜻하게 위로 받아보세요',
      icon: UsersIcon,
      href: '/anonymous-community', // 경로 업데이트
      color: 'from-indigo-500 to-indigo-600',
    },
    {
      title: '📞 긴급 지원',
      description: '벅찬 순간엔 전문가 연락처와 자가관리를 안내해드릴게요',
      icon: PhoneIcon,
      href: '/emergency-support', // 경로 업데이트
      color: 'from-red-500 to-red-600',
    },
  ]

  return (
    <div className="flex flex-1 flex-col">
      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="mx-auto max-w-6xl p-6">
          {/* Welcome Section */}
          <div className="mb-12 flex flex-col gap-6 text-center">
            <h1 className="text-4xl font-bold tracking-wide text-gray-900">
              오늘, 마음에 어떤 고민이 머물고 있나요?
            </h1>
            <p className="mx-auto max-w-2xl text-xl leading-relaxed tracking-wide text-gray-600">
              AI와 나누는 따뜻한 대화를 통해, 복잡한 감정을 차분히 정리해보세요.{' '}
              <br />
              비슷한 감정과 마음을 가진 이들과 익명으로 소통하고, <br />
              필요한 순간엔 전문가의 도움도 받을 수 있어요. <br />
              365일 언제든, 당신의 감정을 함께합니다.
            </p>
          </div>

          {/* Quick Start */}
          <div className="mb-12">
            <div className="rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 p-8 text-center text-white">
              <h2 className="2xl mb-4 font-bold">
                혼자서 끙끙 안고 있지 말고 AI와 조용히 마음을 나눠보세요.
              </h2>
              <h3 className="mb-6 text-purple-100">
                당신의 이야기를 따뜻하게 들어드릴게요.
              </h3>
              <Link href="/ai-chat">
                {' '}
                {/* 경로 업데이트 */}
                <Button
                  size="lg"
                  className="inline-flex items-center gap-3 bg-white px-6 py-3 font-semibold text-purple-600 hover:bg-gray-100"
                >
                  <MessageSquareIcon className="h-5 w-5 flex-shrink-0" />
                  <span>AI와 감정 대화 시작</span>
                </Button>
              </Link>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => {
              const Icon = feature.icon
              return (
                <Link key={feature.href} href={feature.href}>
                  <Card className="group h-full cursor-pointer transition-all duration-200 hover:shadow-lg">
                    <CardContent className="p-6">
                      <div
                        className={`h-12 w-12 rounded-lg bg-gradient-to-r ${feature.color} mb-4 flex items-center justify-center transition-transform group-hover:scale-110`}
                      >
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                      <h3 className="mb-2 text-lg font-semibold text-gray-900">
                        {feature.title}
                      </h3>
                      <p className="text-sm leading-relaxed text-gray-600">
                        {feature.description}
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              )
            })}
          </div>

          {/* Stats Section */}
          <div className="mt-16 grid grid-cols-1 gap-8 text-center md:grid-cols-3">
            <div>
              <div className="mb-2 text-3xl font-bold text-purple-600">
                🌙 365일
              </div>
              <div className="text-gray-600">
                언제든, 당신 곁에 머물러 있을게요.
              </div>
            </div>
            <div>
              <div className="mb-2 text-3xl font-bold text-pink-600">
                🛡 100% 익명 보장
              </div>
              <div className="text-gray-600">
                당신의 이야기, 소중히 지켜드립니다
              </div>
            </div>
            <div>
              <div className="mb-2 text-3xl font-bold text-blue-600">
                🤖 감정 분석 기반 AI
              </div>
              <div className="text-gray-600">
                내 마음을 이해하려 노력하는, 따뜻한 기술이에요
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
