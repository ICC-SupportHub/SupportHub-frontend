'use client'
import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { ArrowLeftIcon } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import { toast } from 'sonner'

export default function NewDiary() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [selectedWeather, setSelectedWeather] = useState(null)
  const [selectedEmotion, setSelectedEmotion] = useState(null)
  const [diaryEntry, setDiaryEntry] = useState('')
  const [selectedImage, setSelectedImage] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)
  const [aiFeedback, setAiFeedback] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isSaved, setIsSaved] = useState(false)

  // URL 파라미터에서 수정할 일기 데이터 로드
  useEffect(() => {
    const isEdit = searchParams.get('isEdit')
    const isNew = searchParams.get('isNew')

    if (isEdit === 'true') {
      // 수정 모드: 기존 일기 데이터 로드
      const date = searchParams.get('date')
      const emotion = searchParams.get('emotion')
      const weather = searchParams.get('weather')
      const diaryText = searchParams.get('diaryEntry')

      if (date) {
        // 시간대 문제를 피하기 위해 로컬 날짜로 파싱
        const [year, month, day] = date.split('-').map(Number)
        // UTC 시간으로 생성하여 시간대 문제 방지
        const newDate = new Date(Date.UTC(year, month - 1, day))
        setSelectedDate(newDate)
      }
      if (emotion) {
        setSelectedEmotion(emotion)
      }
      if (weather) {
        setSelectedWeather(weather)
      }
      if (diaryText) {
        setDiaryEntry(diaryText)
      }
    } else if (isNew === 'true') {
      // 새 일기 작성 모드: 선택된 날짜만 설정
      const date = searchParams.get('date')
      if (date) {
        // 시간대 문제를 피하기 위해 로컬 날짜로 파싱
        const [year, month, day] = date.split('-').map(Number)
        // UTC 시간으로 생성하여 시간대 문제 방지
        const newDate = new Date(Date.UTC(year, month - 1, day))
        setSelectedDate(newDate)
      }
    }
  }, [searchParams])

  // 이미지 업로드
  const handleImageUpload = (event) => {
    const file = event.target.files[0]
    if (file) {
      setSelectedImage(file)
      const reader = new FileReader()
      reader.onload = (e) => {
        setImagePreview(e.target.result)
        handleFormChange()
      }
      reader.readAsDataURL(file)
    }
  }

  const removeImage = () => {
    setSelectedImage(null)
    setImagePreview(null)
    handleFormChange()
  }

  // 날짜 변경 감지
  const handleDateChange = (newDate) => {
    setSelectedDate(newDate)
    // 새로운 날짜 선택 시 저장 상태 초기화
    setIsSaved(false)
    setAiFeedback('')
  }

  // 폼 데이터 변경 감지하여 저장 상태 초기화
  const handleFormChange = () => {
    if (isSaved) {
      setIsSaved(false)
    }
  }

  // 일기 저장
  const handleSaveDiary = async () => {
    if (!selectedEmotion) {
      setAiFeedback('오늘은 어떤 하루였는지 감정을 선택해주세요! 😊')
      return
    }

    if (!diaryEntry.trim()) {
      setAiFeedback(
        '오늘 있었던 이야기를 조금이라도 적어주세요. 아무것이나 괜찮아요! ✍️'
      )
      return
    }

    setIsLoading(true)
    try {
      const formData = new FormData()
      // 시간대 문제를 피하기 위해 로컬 날짜 문자열 사용
      const year = selectedDate.getFullYear()
      const month = String(selectedDate.getMonth() + 1).padStart(2, '0')
      const day = String(selectedDate.getDate()).padStart(2, '0')
      const dateKey = `${year}-${month}-${day}`
      formData.append('date', dateKey)
      formData.append('weather', selectedWeather || '')
      formData.append('emotion', selectedEmotion)
      formData.append('diaryEntry', diaryEntry)
      if (selectedImage) {
        formData.append('image', selectedImage)
      }

      const response = await fetch('/api/diary-feedback', {
        method: 'POST',
        body: formData,
      })

      const data = await response.json()

      // API 오류 처리
      if (data.error) {
        setAiFeedback(`오류: ${data.error}`)
        return
      }

      // 로컬 스토리지에 일기 데이터 저장
      const diaryData = {
        weather: selectedWeather,
        emotion: selectedEmotion,
        diaryEntry,
        image: selectedImage,
        imagePreview,
        feedback: data.feedback,
        timestamp: new Date().toISOString(),
      }

      const existingEntries = JSON.parse(
        localStorage.getItem('diaryEntries') || '{}'
      )
      existingEntries[dateKey] = diaryData
      localStorage.setItem('diaryEntries', JSON.stringify(existingEntries))

      // AI 피드백 표시
      setAiFeedback(data.feedback)

      // 저장 완료 상태로 설정
      setIsSaved(true)

      // 성공 토스트 알림 표시
      toast.success('일기가 성공적으로 저장되었습니다! 🎉', {
        description: '달력에서 확인할 수 있어요.',
        duration: 3000,
        position: 'bottom-center',
      })
    } catch (error) {
      setAiFeedback(
        '피드백을 가져오는 중 오류가 발생했습니다. 다시 시도해 주세요.'
      )
    } finally {
      setIsLoading(false)
    }
  }

  // 감정 이모티콘과 색상
  const emotions = [
    {
      name: 'happy',
      emoji: '😊',
      label: '기쁨',
      color: 'bg-gradient-to-br from-amber-300 to-amber-400',
    },
    {
      name: 'joy',
      emoji: '😆',
      label: '즐거움',
      color: 'bg-gradient-to-br from-pink-300 to-pink-400',
    },
    {
      name: 'sad',
      emoji: '😢',
      label: '슬픔',
      color: 'bg-gradient-to-br from-blue-300 to-blue-400',
    },
    {
      name: 'depression',
      emoji: '😔',
      label: '우울감',
      color: 'bg-gradient-to-br from-blue-400 to-blue-500',
    },
    {
      name: 'loneliness',
      emoji: '💙',
      label: '외로움',
      color: 'bg-gradient-to-br from-indigo-300 to-indigo-400',
    },
    {
      name: 'angry',
      emoji: '😠',
      label: '화남',
      color: 'bg-gradient-to-br from-red-400 to-red-500',
    },
    {
      name: 'stress',
      emoji: '😤',
      label: '스트레스',
      color: 'bg-gradient-to-br from-orange-300 to-orange-400',
    },
    {
      name: 'anxiety',
      emoji: '😟',
      label: '불안감',
      color: 'bg-gradient-to-br from-yellow-300 to-yellow-400',
    },
    {
      name: 'self-criticism',
      emoji: '😞',
      label: '자기비난',
      color: 'bg-gradient-to-br from-gray-400 to-gray-500',
    },
    {
      name: 'neutral',
      emoji: '😐',
      label: '평온',
      color: 'bg-gradient-to-br from-green-300 to-green-400',
    },
    {
      name: 'general',
      emoji: '💭',
      label: '일반',
      color: 'bg-gradient-to-br from-purple-300 to-purple-400',
    },
  ]

  const weathers = [
    { name: 'sunny', emoji: '☀️', label: '맑음' },
    { name: 'cloudy', emoji: '☁️', label: '흐림' },
    { name: 'rainy', emoji: '🌧️', label: '비' },
    { name: 'snowy', emoji: '🌨️', label: '눈' },
    { name: 'windy', emoji: '💨', label: '바람' },
    { name: 'hot', emoji: '🔥', label: '더움' },
    { name: 'cold', emoji: '❄️', label: '추움' },
  ]

  const weatherColors = {
    sunny: 'bg-gradient-to-br from-yellow-300 to-orange-400 text-black',
    cloudy: 'bg-gradient-to-br from-gray-300 to-gray-400 text-black',
    rainy: 'bg-gradient-to-br from-blue-300 to-blue-400 text-white',
    snowy: 'bg-gradient-to-br from-blue-200 to-blue-300 text-black',
    windy: 'bg-gradient-to-br from-gray-200 to-gray-300 text-black',
    hot: 'bg-gradient-to-br from-red-400 to-orange-500 text-white',
    cold: 'bg-gradient-to-br from-blue-300 to-indigo-400 text-white',
  }

  const emotionColors = {
    happy: 'bg-gradient-to-br from-amber-300 to-amber-400 text-black',
    joy: 'bg-gradient-to-br from-pink-300 to-pink-400 text-black',
    sad: 'bg-gradient-to-br from-blue-300 to-blue-400 text-white',
    depression: 'bg-gradient-to-br from-blue-400 to-blue-500 text-white',
    loneliness: 'bg-gradient-to-br from-indigo-300 to-indigo-400 text-white',
    angry: 'bg-gradient-to-br from-red-400 to-red-500 text-white',
    stress: 'bg-gradient-to-br from-orange-300 to-orange-400 text-black',
    anxiety: 'bg-gradient-to-br from-yellow-300 to-yellow-400 text-black',
    'self-criticism': 'bg-gradient-to-br from-gray-400 to-gray-500 text-white',
    neutral: 'bg-gradient-to-br from-green-300 to-green-400 text-black',
    general: 'bg-gradient-to-br from-purple-300 to-purple-400 text-white',
  }

  return (
    <div className="flex h-full flex-1 flex-col">
      {/* Header */}
      <div className="border-b bg-white px-6 py-4 dark:bg-gray-800">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            onClick={() => router.push('/emotion-diary')}
            className="rounded-full p-2 hover:bg-gray-100"
          >
            <ArrowLeftIcon className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
              새 일기 작성하기
            </h1>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-6">
        <div className="mx-auto max-w-2xl space-y-6">
          {/* Date Selection */}
          <div>
            <Label className="mb-3 block text-base">언제의 이야기인가요?</Label>
            <input
              type="date"
              value={selectedDate.toISOString().split('T')[0]}
              onChange={(e) => {
                // 시간대 문제를 피하기 위해 UTC 시간으로 생성
                const [year, month, day] = e.target.value.split('-').map(Number)
                const newDate = new Date(Date.UTC(year, month - 1, day))
                handleDateChange(newDate)
              }}
              max={new Date().toISOString().split('T')[0]}
              className="w-48 rounded-md border border-gray-300 px-3 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          {/* Weather Selection */}
          <div>
            <Label className="mb-3 block text-base">
              오늘 날씨는 어땠나요?
            </Label>
            <div className="flex flex-wrap gap-3">
              {weathers.map((weather) => (
                <Button
                  key={weather.name}
                  variant="ghost"
                  onClick={() => {
                    setSelectedWeather(weather.name)
                    handleFormChange()
                  }}
                  className={`flex h-auto w-20 flex-col items-center justify-center rounded-xl p-3 text-lg transition-all duration-300 ease-in-out ${
                    selectedWeather === weather.name
                      ? weatherColors[weather.name]
                      : 'border-2 border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <span className="mb-1 text-2xl">{weather.emoji}</span>
                  <span className="text-xs">{weather.label}</span>
                </Button>
              ))}
            </div>
          </div>

          {/* Emotion Selection */}
          <div>
            <Label className="mb-3 block text-base">
              오늘은 어떤 하루였나요?
            </Label>
            <div className="flex flex-wrap gap-3">
              {emotions.map((emotion) => (
                <Button
                  key={emotion.name}
                  variant="ghost"
                  onClick={() => {
                    setSelectedEmotion(emotion.name)
                    handleFormChange()
                  }}
                  className={`flex h-auto w-20 flex-col items-center justify-center rounded-xl p-3 text-lg transition-all duration-300 ease-in-out ${
                    selectedEmotion === emotion.name
                      ? emotionColors[emotion.name]
                      : 'border-2 border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <span className="mb-1 text-2xl">{emotion.emoji}</span>
                  <span className="text-xs">{emotion.label}</span>
                </Button>
              ))}
            </div>
          </div>

          {/* Diary Entry */}
          <div>
            <Label className="mb-3 block text-base">
              오늘 있었던 이야기를 들려주세요
            </Label>
            <Textarea
              placeholder="오늘 있었던 일이나 느낀 감정을 자유롭게 적어주세요. 아무거나 괜찮아요! 😊"
              value={diaryEntry}
              onChange={(e) => {
                setDiaryEntry(e.target.value)
                handleFormChange()
              }}
              className="min-h-[200px] text-base focus-visible:ring-purple-500"
            />
          </div>

          {/* Image Upload */}
          <div>
            <Label className="mb-3 block text-base">
              특별한 순간을 담은 사진이 있나요? (선택)
            </Label>
            <div className="space-y-3">
              {!imagePreview ? (
                <div className="flex items-center gap-3">
                  <input
                    type="file"
                    id="image-upload"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  <Button
                    variant="outline"
                    onClick={() =>
                      document.getElementById('image-upload').click()
                    }
                    className="flex items-center gap-2"
                  >
                    📷 사진 선택하기
                  </Button>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="relative inline-block">
                    <img
                      src={imagePreview}
                      alt="업로드된 사진"
                      className="max-h-48 max-w-xs rounded-lg border border-gray-200 object-cover"
                    />
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={removeImage}
                      className="absolute -right-2 -top-2 h-6 w-6 rounded-full p-0"
                    >
                      ×
                    </Button>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      document.getElementById('image-upload').click()
                    }
                  >
                    다른 사진 선택하기
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* AI Feedback */}
          {aiFeedback && (
            <div className="rounded-lg border border-purple-200 bg-purple-50 p-4 text-purple-800">
              <p className="mb-2 font-semibold">AI의 한마디:</p>
              <p className="leading-relaxed">{aiFeedback}</p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex justify-between gap-3 pt-4">
            <Button
              variant="outline"
              onClick={() => router.push('/emotion-diary')}
              className="px-6"
            >
              📅 달력으로
            </Button>

            <div className="flex gap-3">
              {/* 저장 버튼 - 저장 완료 전에만 표시 */}
              {!isSaved && (
                <Button
                  onClick={handleSaveDiary}
                  disabled={isLoading}
                  className="bg-purple-600 px-8 hover:bg-purple-700"
                >
                  {isLoading ? '저장 중...' : '일기 저장'}
                </Button>
              )}

              {/* 저장 완료 후 표시할 메시지 */}
              {isSaved && (
                <div className="flex items-center rounded-md bg-green-100 px-4 py-2 text-green-800">
                  <span className="text-sm font-medium">✅ 저장 완료!</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
