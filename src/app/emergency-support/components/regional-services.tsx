"use client"
import { useState } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/app/emergency-support/components/ui/card"
import { Button } from "@/app/emergency-support/components/ui/button"
import { Input } from "@/app/emergency-support/components/ui/input"
import { Badge } from "@/app/emergency-support/components/ui/badge"
import { MapPinIcon, SearchIcon, PhoneIcon, ClockIcon } from "lucide-react"

const regionalCenters = [
  {
    region: "서울",
    centers: [
      {
        name: "서울시 자살예방센터",
        phone: "02-3444-9934",
        address: "서울시 중구 세종대로 110",
        hours: "24시간",
        services: ["자살예방", "위기상담", "사후관리"],
      },
      {
        name: "서울시 정신건강복지센터",
        phone: "02-3444-9934",
        address: "서울시 중구 퇴계로 173",
        hours: "평일 9-18시",
        services: ["정신건강상담", "치료연계", "재활프로그램"],
      },
    ],
  },
  {
    region: "부산",
    centers: [
      {
        name: "부산시 자살예방센터",
        phone: "051-242-2575",
        address: "부산시 연제구 중앙대로 1001",
        hours: "24시간",
        services: ["자살예방", "위기개입", "유족지원"],
      },
    ],
  },
  {
    region: "대구",
    centers: [
      {
        name: "대구시 정신건강복지센터",
        phone: "053-803-8275",
        address: "대구시 중구 국채보상로 680",
        hours: "평일 9-18시",
        services: ["정신건강상담", "사례관리", "교육프로그램"],
      },
    ],
  },
]

export default function RegionalServices() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filteredCenters, setFilteredCenters] = useState(regionalCenters)

  const handleSearch = () => {
    if (!searchTerm.trim()) {
      setFilteredCenters(regionalCenters)
      return
    }

    const filtered = regionalCenters.filter(
      (region) =>
        region.region.toLowerCase().includes(searchTerm.toLowerCase()) ||
        region.centers.some(
          (center) =>
            center.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            center.services.some((service) => service.toLowerCase().includes(searchTerm.toLowerCase())),
        ),
    )
    setFilteredCenters(filtered)
  }

  const handleCall = (phone: string) => {
    window.open(`tel:${phone}`)
  }

  return (
    <Card className="shadow-lg backdrop-blur-sm bg-white/80 dark:bg-slate-800/80 border-0">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-gray-800 dark:text-gray-200 flex items-center gap-2">
          <MapPinIcon className="h-5 w-5 text-red-500" />
          지역별 전문 상담센터
        </CardTitle>
        <p className="text-sm text-gray-600 dark:text-gray-400">거주 지역의 전문 상담센터를 찾아보세요.</p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex gap-2">
          <Input
            placeholder="지역명 또는 서비스명으로 검색..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSearch()}
            className="flex-1"
          />
          <Button
            onClick={handleSearch}
            className="bg-gradient-to-r from-red-500 to-rose-500 hover:from-red-600 hover:to-rose-600 text-white"
          >
            <SearchIcon className="h-4 w-4" />
          </Button>
        </div>

        <div className="space-y-4">
          {filteredCenters.map((region, regionIndex) => (
            <div key={regionIndex} className="space-y-3">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2">
                <MapPinIcon className="h-4 w-4 text-red-500" />
                {region.region}
              </h3>
              <div className="grid gap-3 md:grid-cols-2">
                {region.centers.map((center, centerIndex) => (
                  <div
                    key={centerIndex}
                    className="p-4 border border-slate-200/50 dark:border-slate-600/50 rounded-lg hover:bg-gradient-to-r hover:from-red-50/50 hover:to-rose-50/50 dark:hover:from-slate-700/50 dark:hover:to-slate-600/50 transition-all duration-300"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-1">{center.name}</h4>
                        <p className="text-sm text-purple-600 font-mono mb-1">{center.phone}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">{center.address}</p>
                        <div className="flex items-center gap-1 mb-2">
                          <ClockIcon className="h-3 w-3 text-gray-400" />
                          <span className="text-xs text-gray-500 dark:text-gray-400">{center.hours}</span>
                        </div>
                      </div>
                      <Button
                        onClick={() => handleCall(center.phone)}
                        size="sm"
                        className="bg-gradient-to-r from-red-500 to-rose-500 hover:from-red-600 hover:to-rose-600 text-white"
                      >
                        <PhoneIcon className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {center.services.map((service, serviceIndex) => (
                        <Badge
                          key={serviceIndex}
                          variant="secondary"
                          className="text-xs bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300"
                        >
                          {service}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {filteredCenters.length === 0 && (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
            검색 결과가 없습니다. 다른 검색어를 시도해보세요.
          </div>
        )}
      </CardContent>
    </Card>
  )
}
