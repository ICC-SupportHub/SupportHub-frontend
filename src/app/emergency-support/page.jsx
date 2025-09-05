"use client"
import Link from "next/link"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import {
  PhoneIcon,
  MessageSquareIcon,
  ExternalLinkIcon,
  AlertTriangleIcon,
  UsersIcon,
  HeartIcon,
  HelpCircleIcon,
  RefreshCwIcon,
} from "lucide-react"
import { useEffect, useState, useRef } from "react"
import EmergencyFlowchart from "@/app/emergency-support/components/emergency-flowchart"
import FAQSection from "@/app/emergency-support/components/faq-section"
import SpecializedServices from "@/app/emergency-support/components/specialized-services"
import BreathingExercise from "@/app/emergency-support/components/breathing-exercise"
import RegionalServices from "@/app/emergency-support/components/regional-services"

const EmergencyPage = () => {
  const [animalStates, setAnimalStates] = useState({
    cat: { showImage: false, imageUrl: "", loading: false },
    dog: { showImage: false, imageUrl: "", loading: false },
  })
  const [isVisible, setIsVisible] = useState(false)
  const [breathingOpen, setBreathingOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("emergency")
  const [indicatorStyle, setIndicatorStyle] = useState({ width: 0, left: 0 })
  const tabRefs = useRef({})

  const emergencyContacts = [
    {
      name: "청소년전화 1388",
      number: "1388",
      description: "청소년 관련 고민/도움 365일 24시간. 문자(#1388)\n카카오톡(#1388)도 가능",
      type: "전화",
    },
    {
      name: "청소년 사이버상담센터",
      number: "www.cyber1388.kr",
      description: "익명 채팅 상담 가능 (24시간)",
      type: "온라인",
    },
    {
      name: "정신건강 상담전화",
      number: "1577-0199",
      description: "정신 건강 및 위기 상담 24시간 (전국, 지역번호 없이)",
      type: "전화",
    },
    {
      name: "보건복지상담센터",
      number: "129",
      description: "긴급복지, 복지사각지대, 학대 관련 상담 24시간",
      type: "전화",
    },
    {
      name: "자살예방 상담전화",
      number: "109",
      description: "자살 관련 상담 24시간",
      type: "전화",
    },
    {
      name: "생명의전화",
      number: "1588-9191",
      description: "자살 예방 상담 24시간",
      type: "전화",
    },
  ]

  const selfCareResources = [
    {
      title: "호흡 운동",
      description: "4-7-8 호흡법으로 마음을 진정시켜보세요",
      action: "지금 시작하기",
      detail: "4초 동안 숨을 들이마시고, 7초 동안 참은 후, 8초 동안 천천히 내쉬세요. 이를 4회 반복합니다.",
      type: "breath",
    },
    {
      title: "긍정적 생각",
      description: "지금 이 순간 감사한 것 3가지를 떠올려보세요",
      action: "생각해보기",
      detail: "작은 것이라도 좋습니다. 따뜻한 차 한 잔, 편안한 침대, 나를 걱정해주는 사람 등을 떠올려보세요.",
    },
    {
      title: "안전한 장소",
      description: "신뢰할 수 있는 사람에게 연락하거나 안전한 곳으로 이동하세요",
      action: "도움 요청하기",
      detail: "가족, 친구, 동료 중 믿을 수 있는 사람에게 연락하거나, 공공장소나 병원 등 안전한 곳으로 이동하세요.",
    },
    {
      title: "🐱 귀여운 고양이 보기",
      description: "사랑스러운 고양이 사진으로 마음을 달래보세요",
      action: "고양이 보기",
      detail: "랜덤한 고양이 사진으로 마음을 편안하게 해보세요!",
      type: "cat",
    },
    {
      title: "🐶 귀여운 강아지 보기",
      description: "사랑스러운 강아지 사진으로 마음을 따뜻하게 하세요",
      action: "강아지 보기",
      detail: "랜덤한 강아지 사진으로 마음을 따뜻하게 해보세요!",
      type: "dog",
    },
    {
      title: "5-4-3-2-1 기법",
      description: "현재 순간에 집중하여 불안감을 줄여보세요",
      action: "시작하기",
      detail: "보이는 것 5개, 만질 수 있는 것 4개, 들리는 것 3개, 냄새나는 것 2개, 맛보는 것 1개를 찾아보세요.",
    },
    {
      title: "따뜻한 샤워",
      description: "따뜻한 물로 몸과 마음을 이완시켜보세요",
      action: "시도해보기",
      detail: "따뜻한 물의 온도와 감촉에 집중하며 긴장을 풀어보세요. 10-15분 정도가 적당합니다.",
    },
    {
      title: "음악 듣기",
      description: "좋아하는 음악이나 자연 소리를 들어보세요",
      action: "음악 재생",
      detail: "클래식, 자연 소리, 좋아하는 노래 등 마음을 편안하게 해주는 음악을 선택하세요.",
    },
  ]

  // 고양이 이미지 가져오기 함수
  const fetchCatImage = async (apiType) => {
    setAnimalStates((prev) => ({
      ...prev,
      cat: { ...prev.cat, loading: true, selectedApi: apiType },
    }))

    try {
      const timestamp = Date.now()
      let catUrl = ""

      switch (apiType) {
        case "cataas":
          catUrl = `https://cataas.com/cat?${timestamp}`
          break
        case "thecat":
          try {
            const response = await fetch("https://api.thecatapi.com/v1/images/search")
            if (!response.ok) throw new Error(`HTTP ${response.status}`)
            const data = await response.json()
            if (data && data[0] && data[0].url) {
              catUrl = data[0].url
            } else {
              throw new Error("The Cat API 응답 오류")
            }
          } catch (error) {
            catUrl = `https://cataas.com/cat?${timestamp}`
          }
          break
        case "randomcat":
          try {
            const response = await fetch(`https://api.thecatapi.com/v1/images/search?limit=1&${timestamp}`)
            if (!response.ok) throw new Error(`HTTP ${response.status}`)
            const data = await response.json()
            if (data && data[0] && data[0].url) {
              catUrl = data[0].url
            } else {
              throw new Error("Random Cat API 응답 오류")
            }
          } catch (error) {
            catUrl = `https://cataas.com/cat?${timestamp}`
          }
          break
        default:
          catUrl = `https://cataas.com/cat?${timestamp}`
      }

      if (catUrl.startsWith("http")) {
        const img = new Image()
        img.crossOrigin = "anonymous"

        img.onload = () => {
          setAnimalStates((prev) => ({
            ...prev,
            cat: { showImage: true, imageUrl: catUrl, loading: false, selectedApi: apiType },
          }))
        }

        img.onerror = () => {
          setAnimalStates((prev) => ({
            ...prev,
            cat: {
              showImage: true,
              imageUrl: `https://cataas.com/cat?${Date.now()}`,
              loading: false,
              selectedApi: apiType,
            },
          }))
        }

        img.src = catUrl
      } else {
        setAnimalStates((prev) => ({
          ...prev,
          cat: { showImage: true, imageUrl: catUrl, loading: false, selectedApi: apiType },
        }))
      }
    } catch (error) {
      setAnimalStates((prev) => ({
        ...prev,
        cat: {
          showImage: true,
          imageUrl: `https://cataas.com/cat?${Date.now()}`,
          loading: false,
          selectedApi: apiType,
        },
      }))
    }
  }

  // 강아지 이미지 가져오기 함수
  const fetchDogImage = async (apiType) => {
    setAnimalStates((prev) => ({
      ...prev,
      dog: { ...prev.dog, loading: true, selectedApi: apiType },
    }))

    try {
      let dogUrl = ""

      switch (apiType) {
        case "dogceo":
          try {
            const response = await fetch("https://dog.ceo/api/breeds/image/random")
            if (!response.ok) throw new Error(`HTTP ${response.status}`)
            const data = await response.json()
            if (data && data.status === "success" && data.message) {
              dogUrl = data.message
            } else {
              throw new Error("Dog CEO API 응답 오류")
            }
          } catch (error) {
            throw error
          }
          break

        case "dogfacts":
          try {
            const response = await fetch("https://some-random-api.com/animal/dog")
            if (!response.ok) throw new Error(`HTTP ${response.status}`)
            const data = await response.json()
            if (data && data.image) {
              dogUrl = data.image
            } else {
              throw new Error("Dog Facts API 응답 오류")
            }
          } catch (error) {
            const fallbackResponse = await fetch("https://dog.ceo/api/breeds/image/random")
            const fallbackData = await fallbackResponse.json()
            dogUrl = fallbackData.message
          }
          break

        case "shibe":
          try {
            const response = await fetch("https://shibe.online/api/shibes?count=1&urls=true&httpsUrls=true")
            if (!response.ok) throw new Error(`HTTP ${response.status}`)
            const data = await response.json()
            if (data && Array.isArray(data) && data.length > 0) {
              dogUrl = data[0]
            } else {
              throw new Error("Shibe API 응답 오류")
            }
          } catch (error) {
            const fallbackResponse = await fetch("https://dog.ceo/api/breeds/image/random")
            const fallbackData = await fallbackResponse.json()
            dogUrl = fallbackData.message
          }
          break

        case "randomdog":
          try {
            const apiOptions = [
              {
                url: "https://random.dog/woof.json",
                handler: async (response) => {
                  const data = await response.json()
                  if (data && data.url && !data.url.includes(".mp4") && !data.url.includes(".webm")) {
                    return data.url
                  }
                  throw new Error("비디오 파일이거나 응답 오류")
                },
              },
              {
                url: "https://dog-api.kinduff.com/api/facts",
                handler: async (response) => {
                  throw new Error("Facts API는 이미지 미제공")
                },
              },
              {
                url: "https://api.woofbot.io/v1/woof",
                handler: async (response) => {
                  const data = await response.json()
                  if (data && data.image) {
                    return data.image
                  }
                  throw new Error("WoofBot API 응답 오류")
                },
              },
            ]

            let success = false
            for (const option of apiOptions) {
              try {
                const response = await fetch(option.url)
                if (!response.ok) continue
                dogUrl = await option.handler(response)
                success = true
                break
              } catch (optionError) {
                continue
              }
            }

            if (!success) {
              throw new Error("모든 Random Dog API 옵션 실패")
            }
          } catch (error) {
            const fallbackResponse = await fetch("https://dog.ceo/api/breeds/image/random")
            const fallbackData = await fallbackResponse.json()
            dogUrl = fallbackData.message
          }
          break

        default:
          const response = await fetch("https://dog.ceo/api/breeds/image/random")
          const data = await response.json()
          dogUrl = data.message
      }

      setAnimalStates((prev) => ({
        ...prev,
        dog: { showImage: true, imageUrl: dogUrl, loading: false, selectedApi: apiType },
      }))
    } catch (error) {
      try {
        const fallbackResponse = await fetch("https://dog.ceo/api/breeds/image/random")
        if (fallbackResponse.ok) {
          const fallbackData = await fallbackResponse.json()
          setAnimalStates((prev) => ({
            ...prev,
            dog: {
              showImage: true,
              imageUrl: fallbackData.message || "/placeholder.svg?height=300&width=400&text=🐶 강아지 로드 실패",
              loading: false,
              selectedApi: apiType,
            },
          }))
        } else {
          throw new Error("최종 fallback도 실패")
        }
      } catch (finalError) {
        setAnimalStates((prev) => ({
          ...prev,
          dog: {
            showImage: true,
            imageUrl: "/placeholder.svg?height=300&width=400&text=🐶 모든 API 실패",
            loading: false,
            selectedApi: apiType,
          },
        }))
      }
    }
  }

  const tabs = [
    { id: "emergency", name: "긴급 상황", icon: AlertTriangleIcon },
    { id: "professional", name: "전문 상담", icon: UsersIcon },
    { id: "selfcare", name: "자가 관리", icon: HeartIcon },
    { id: "help", name: "도움말", icon: HelpCircleIcon },
  ]

  useEffect(() => {
    setIsVisible(true)
  }, [])

  useEffect(() => {
    const activeTabElement = tabRefs.current[activeTab]
    if (activeTabElement) {
      const { offsetWidth, offsetLeft } = activeTabElement
      setIndicatorStyle({
        width: offsetWidth,
        left: offsetLeft,
      })
    }
  }, [activeTab])

  const handleCall = (number) => {
    if (number.startsWith("www")) {
      window.open(`https://${number}`, "_blank")
    } else {
      window.open(`tel:${number}`)
    }
  }

  return (
    <div className="relative flex flex-col items-center min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-red-50 dark:from-slate-900 dark:via-red-900 dark:to-pink-900 p-4 overflow-auto">
      {/* 배경 이미지 */}
      <div className="absolute inset-0 opacity-20 dark:opacity-10">
        <div
          className="w-full h-full bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('/placeholder.svg?height=1080&width=1920')`,
          }}
        />
      </div>

      {/* 부드러운 오버레이 */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-transparent to-white/20 dark:from-slate-900/50 dark:via-transparent dark:to-slate-900/30" />

      <div
        className={`relative z-10 w-full max-w-5xl mx-auto space-y-6 transition-all duration-1000 ease-out ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        {/* 헤더 */}
        <Card className="shadow-lg rounded-lg">
          <CardHeader className="bg-gradient-to-r from-red-500 via-rose-500 to-pink-500 text-white rounded-t-lg p-6 shadow-lg">
            <CardTitle className="text-3xl font-bold text-center flex items-center justify-center gap-2">
              <AlertTriangleIcon className="h-8 w-8" aria-hidden="true" />
              긴급 심리지원
            </CardTitle>
            <p className="text-center text-red-100 mt-2">
              위기 상황에서 즉시 도움을 받을 수 있는 연락처와 자가 관리 방법을 제공합니다
            </p>
          </CardHeader>
        </Card>

        {/* 응급상황 알림 (아이콘을 문장과 같은 줄에 표시) */}
        <Alert className="border-red-200 bg-red-50/80 dark:bg-red-950/50 backdrop-blur-sm shadow-sm">
          <AlertDescription className="flex items-center gap-2 text-red-800 dark:text-red-200 m-0">
            <AlertTriangleIcon className="h-5 w-5 text-red-600 shrink-0" aria-hidden="true" />
            <span>
              <strong>응급상황 시:</strong> 생명이 위험하다고 느끼시면 즉시 119에 신고하거나 가까운 응급실로 가세요.
            </span>
          </AlertDescription>
        </Alert>

        {/* 탭 메뉴 */}
        <Card className="shadow-lg backdrop-blur-sm bg-white/80 dark:bg-slate-800/80 border-0 overflow-hidden">
          {/* 현대적인 웹 스타일 탭 네비게이션 */}
          <div className="border-b border-gray-200 dark:border-gray-700 relative">
            <nav className="flex -mb-px relative" aria-label="Tabs">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  ref={(el) => (tabRefs.current[tab.id] = el)}
                  onClick={() => setActiveTab(tab.id)}
                  className={`group relative min-w-0 flex-1 overflow-hidden py-4 px-4 text-center text-sm font-medium focus:z-10 focus:outline-none transition-all duration-200 ${
                    activeTab === tab.id
                      ? "text-red-600 dark:text-red-400"
                      : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                  }`}
                  aria-current={activeTab === tab.id ? "page" : undefined}
                >
                  <div className="flex items-center justify-center gap-2">
                    <tab.icon
                      className={`h-5 w-5 transition-colors duration-200 ${
                        activeTab === tab.id
                          ? "text-red-600 dark:text-red-400"
                          : "text-gray-400 group-hover:text-gray-500"
                      }`}
                      aria-hidden="true"
                    />
                    <span className="transition-colors duration-200">{tab.name}</span>
                  </div>
                </button>
              ))}

              {/* 슬라이딩 인디케이터 */}
              <div
                className="absolute bottom-0 h-0.5 bg-gradient-to-r from-red-500 to-rose-500 transition-all duration-300 ease-out"
                style={{
                  width: `${indicatorStyle.width}px`,
                  transform: `translateX(${indicatorStyle.left}px)`,
                }}
              />
            </nav>
          </div>

          {/* 탭 콘텐츠 */}
          <div className="p-6">
            {/* 긴급 상황 탭 */}
            {activeTab === "emergency" && (
              <div className="space-y-6 animate-fadeIn">
                <EmergencyFlowchart />

                <Card className="shadow-md backdrop-blur-sm bg-white/60 dark:bg-slate-800/60 border-0">
                  <CardHeader>
                    <CardTitle className="text-xl font-bold text-gray-800 dark:text-gray-200">
                      24시간 상담 연락처
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {emergencyContacts.map((contact, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-4 border border-slate-200/50 dark:border-slate-600/50 rounded-lg hover:bg-gradient-to-r hover:from-rose-50/50 hover:to-pink-50/50 dark:hover:from-slate-700/50 dark:hover:to-slate-600/50 transition-all duration-300 ease-in-out transform hover:scale-[1.02] hover:shadow-md"
                      >
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg text-gray-800 dark:text-gray-200">{contact.name}</h3>
                          <p className="text-gray-600 dark:text-gray-400 whitespace-pre-line">{contact.description}</p>
                          <p className="text-sm text-purple-600 font-mono">{contact.number}</p>
                        </div>
                        <Button
                          onClick={() => handleCall(contact.number)}
                          className="bg-gradient-to-r from-red-500 to-rose-500 hover:from-red-600 hover:to-rose-600 text-white shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                        >
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
              </div>
            )}

            {/* 전문 상담 탭 */}
            {activeTab === "professional" && (
              <div className="space-y-6 animate-fadeIn">
                <SpecializedServices />
                <RegionalServices />
              </div>
            )}

            {/* 자가 관리 탭 */}
            {activeTab === "selfcare" && (
              <div className="space-y-6 animate-fadeIn">
                <Card className="shadow-md backdrop-blur-sm bg-white/60 dark:bg-slate-800/60 border-0">
                  <CardHeader>
                    <CardTitle className="text-xl font-bold text-gray-800 dark:text-gray-200">
                      즉시 할 수 있는 자가 관리
                    </CardTitle>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      혼자서도 할 수 있는 마음 돌봄 방법들을 안내해드립니다.
                    </p>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {selfCareResources.map((resource, index) => (
                      <div
                        key={index}
                        className={`p-4 border border-slate-200/50 dark:border-slate-600/50 rounded-lg transition-all duration-300 ease-in-out transform hover:scale-[1.02] hover:shadow-md hover:bg-gradient-to-r hover:from-red-50/50 hover:to-rose-50/50 dark:hover:from-slate-700/50 dark:hover:to-slate-600/50 ${
                          resource.type === "breath" && breathingOpen
                            ? "bg-gradient-to-r from-red-50/60 to-rose-50/60 dark:from-slate-700/60 dark:to-slate-600/60 ring-1 ring-rose-200/50"
                            : ""
                        }`}
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <h3 className="font-semibold text-lg text-gray-800 dark:text-gray-200 mb-2">
                              {resource.title}
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400 mb-2">{resource.description}</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">{resource.detail}</p>
                          </div>
                          {!resource.apis && (
                              <Button
                              onClick={() => {
                                    if (resource.type === "breath") {
                                      setBreathingOpen((v) => !v)
                                    } else if (resource.type === "cat") {
                                  fetchCatImage("randomcat")
                                } else if (resource.type === "dog") {
                                  fetchDogImage("randomdog")
                                }
                              }}
                              disabled={resource.type && animalStates[resource.type]?.loading}
                              variant="outline"
                              className="border-red-300 text-red-600 hover:bg-gradient-to-r hover:from-red-50 hover:to-rose-50 bg-transparent hover:border-red-400 transition-all duration-300 transform hover:scale-105 ml-4"
                            >
                              {resource.type && animalStates[resource.type]?.loading ? (
                                <RefreshCwIcon className="h-4 w-4 animate-spin mr-2" />
                              ) : null}
                              {resource.action}
                            </Button>
                          )}
                        </div>

                        {/* 호흡 운동 인라인 렌더링 */}
                        {resource.type === "breath" && (
                          <div className="overflow-visible">
                            <BreathingExercise inline open={breathingOpen} onOpenChange={setBreathingOpen} />
                          </div>
                        )}

                        {/* 동물 이미지 표시 영역 */}
                        {resource.type &&
                          animalStates[resource.type]?.showImage &&
                          animalStates[resource.type]?.imageUrl && (
                            <div className="mt-4 text-center animate-fadeIn">
                              <div className="relative inline-block rounded-lg overflow-hidden shadow-lg">
                                <img
                                  src={animalStates[resource.type]?.imageUrl || "/placeholder.svg"}
                                  alt={resource.type === "cat" ? "귀여운 고양이" : "귀여운 강아지"}
                                  className="max-w-full max-h-[80vh] w-auto h-auto object-contain rounded-lg transition-all duration-500"
                                  crossOrigin="anonymous"
                                  onError={(e) => {
                                    e.currentTarget.src = `/placeholder.svg?height=300&width=400&text=${
                                      resource.type === "cat" ? "🐱 Cute Cat" : "🐶 Cute Dog"
                                    }`
                                  }}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent rounded-lg pointer-events-none"></div>
                              </div>
                              <div className="mt-3 flex gap-2 justify-center">
                                <Button
                                  onClick={() =>
                                    resource.type === "cat"
                                      ? fetchCatImage(animalStates[resource.type]?.selectedApi || "cataas")
                                      : fetchDogImage(animalStates[resource.type]?.selectedApi || "dogceo")
                                  }
                                  disabled={animalStates[resource.type]?.loading || false}
                                  size="sm"
                                  className={`$${
                                    resource.type === "cat"
                                      ? "bg-gradient-to-r from-pink-400 to-rose-400 hover:from-pink-500 hover:to-rose-500"
                                      : "bg-gradient-to-r from-amber-400 to-orange-400 hover:from-amber-500 hover:to-orange-500"
                                  } text-white disabled:opacity-50`}
                                >
                                  {animalStates[resource.type]?.loading ? (
                                    <RefreshCwIcon className="h-4 w-4 animate-spin mr-2" />
                                  ) : null}
                                  새로운 {resource.type === "cat" ? "고양이" : "강아지"} 보기{" "}
                                  {resource.type === "cat" ? "🐾" : "🐕"}
                                </Button>
                                <Button
                                  onClick={() =>
                                    setAnimalStates((prev) => ({
                                      ...prev,
                                      [resource.type || ""]: { ...prev[resource.type || ""], showImage: false },
                                    }))
                                  }
                                  size="sm"
                                  variant="outline"
                                  className="border-gray-300 text-gray-600 hover:bg-gray-50"
                                >
                                  숨기기
                                </Button>
                              </div>
                            </div>
                          )}
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            )}

            {/* 도움말 탭 */}
            {activeTab === "help" && (
              <div className="space-y-6 animate-fadeIn">
                <FAQSection />
              </div>
            )}
          </div>
        </Card>

        {/* 하단 메시지 */}
        <Card className="shadow-lg backdrop-blur-sm bg-gradient-to-br from-red-100/80 via-rose-100/80 to-pink-100/80 dark:from-red-900/50 dark:via-rose-900/50 dark:to-pink-900/50 border-0">
          <CardContent className="p-6 text-center">
            <h3 className="text-lg font-semibold text-red-800 dark:text-red-200 mb-2">혼자가 아닙니다</h3>
            <p className="text-red-700 dark:text-red-300 mb-4">
              어려운 시간을 보내고 계시지만, 도움을 받을 수 있는 방법이 있습니다. 전문가들이 당신을 도울 준비가 되어
              있습니다.
            </p>
            <Link href="/ai-chat">
              <Button className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                <MessageSquareIcon className="mr-2 h-4 w-4" aria-hidden="true" />
                AI와 대화하기
              </Button>
            </Link>
          </CardContent>
        </Card>

        {/* 하단 여백 추가 */}
        <div className="h-8"></div>
      </div>
    </div>
  )
}

export default EmergencyPage
