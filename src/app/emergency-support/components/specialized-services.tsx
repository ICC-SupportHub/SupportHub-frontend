"use client"
import { Card, CardHeader, CardTitle, CardContent } from "@/app/emergency-support/components/ui/card"
import { Button } from "@/app/emergency-support/components/ui/button"
import { Badge } from "@/app/emergency-support/components/ui/badge"
import { PhoneIcon, ExternalLinkIcon, UsersIcon, HeartIcon, ShieldIcon, BabyIcon } from "lucide-react"

const specializedServices = [
  {
    category: "자살 예방/정신건강",
    icon: HeartIcon,
    color: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300",
    services: [
      {
        name: "자살예방 상담전화",
        number: "109",
        description: "자살 관련 상담 24시간",
        features: ["24시간 운영", "전문 상담사"],
      },
      {
        name: "생명의전화",
        number: "1588-9191",
        description: "자살 예방 전문 상담 24시간",
        features: ["24시간 운영", "익명 보장", "위기 개입"],
      },
      {
        name: "정신건강 상담전화",
        number: "1577-0199",
        description: "정신 건강 및 위기 상담 24시간 (전국, 지역번호 없이)",
        features: ["24시간 운영", "의료진 연계", "응급 개입"],
      },
    ],
  },
  {
    category: "청소년 위기",
    icon: BabyIcon,
    color: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
    services: [
      {
        name: "청소년전화",
        number: "1388",
        description: "청소년 관련 고민/도움 365일 24시간. 문자(#1388)\n카카오톡(#1388)도 가능",
        features: ["24시간 운영", "청소년 전문", "문자 #1388", "카카오톡 #1388"],
      },
      {
        name: "청소년 사이버상담센터",
        number: "www.cyber1388.kr",
        description: "익명 채팅 상담 (24시간)",
        features: ["온라인 상담", "익명 채팅", "청소년 특화"],
        isWebsite: true,
      },
    ],
  },
  {
    category: "복지/학대/긴급복지",
    icon: ShieldIcon,
    color: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300",
    services: [
      {
        name: "보건복지상담센터",
        number: "129",
        description: "긴급복지, 복지사각지대, 학대 관련 상담 24시간",
        features: ["24시간 운영", "복지 지원", "학대 신고"],
      },
    ],
  },
  {
    category: "성폭력/가정폭력",
    icon: ShieldIcon,
    color: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300",
    services: [
      {
        name: "성폭력상담소",
        number: "1366",
        description: "성폭력 피해자 전문 상담",
        features: ["24시간 운영", "법률 지원", "의료 연계"],
      },
      {
        name: "가정폭력상담소",
        number: "1366",
        description: "가정폭력 피해자 보호 및 상담",
        features: ["24시간 운영", "쉼터 연계", "법률 지원"],
      },
    ],
  },
]

export default function SpecializedServices() {
  const handleCall = (number: string, isWebsite?: boolean) => {
    if (isWebsite || number.startsWith("www")) {
      window.open(`https://${number}`, "_blank")
    } else {
      window.open(`tel:${number}`)
    }
  }

  return (
    <Card className="shadow-lg backdrop-blur-sm bg-white/80 dark:bg-slate-800/80 border-0">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-gray-800 dark:text-gray-200 flex items-center gap-2">
          <UsersIcon className="h-5 w-5 text-red-500" />
          전문 상담 서비스
        </CardTitle>
        <p className="text-sm text-gray-600 dark:text-gray-400">상황별로 특화된 전문 상담 서비스를 안내해드립니다.</p>
      </CardHeader>
      <CardContent className="space-y-6">
        {specializedServices.map((category, categoryIndex) => (
          <div key={categoryIndex} className="space-y-4">
            <div className="flex items-center gap-2">
              <category.icon className="h-5 w-5 text-red-500" />
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">{category.category}</h3>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {category.services.map((service, serviceIndex) => (
                <div
                  key={serviceIndex}
                  className="p-4 border border-slate-200/50 dark:border-slate-600/50 rounded-lg hover:bg-gradient-to-r hover:from-red-50/50 hover:to-rose-50/50 dark:hover:from-slate-700/50 dark:hover:to-slate-600/50 transition-all duration-300"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="font-semibold text-gray-800 dark:text-gray-200">{service.name}</h4>
                      <p className="text-sm text-purple-600 font-mono">{service.number}</p>
                    </div>
                    <Button
                      onClick={() => handleCall(service.number, service.isWebsite)}
                      size="sm"
                      className="bg-gradient-to-r from-red-500 to-rose-500 hover:from-red-600 hover:to-rose-600 text-white"
                    >
                      {service.isWebsite ? <ExternalLinkIcon className="h-4 w-4" /> : <PhoneIcon className="h-4 w-4" />}
                    </Button>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{service.description}</p>
                  <div className="flex flex-wrap gap-1">
                    {service.features.map((feature, featureIndex) => (
                      <Badge
                        key={featureIndex}
                        variant="secondary"
                        className="text-xs bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300"
                      >
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
