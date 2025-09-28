'use client'
import { useState, useEffect, useMemo } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { CalendarIcon, TrendingUpIcon } from 'lucide-react'

// 감정별 색상 매핑
const emotionColors = {
  happy: '#10B981', // green-500
  sad: '#3B82F6', // blue-500
  angry: '#EF4444', // red-500
  anxious: '#F59E0B', // amber-500
  neutral: '#6B7280', // gray-500
}

// 감정별 라벨
const emotionLabels = {
  happy: '기쁨',
  sad: '슬픔',
  angry: '화남',
  anxious: '불안',
  neutral: '평온',
}

export default function EmotionGraph() {
  const [timeRange, setTimeRange] = useState('week') // 'week' 또는 'month'
  const [diaries, setDiaries] = useState([])

  // 저장된 일기 데이터 로드
  useEffect(() => {
    const saved = localStorage.getItem('emotion-diaries')
    if (saved) {
      setDiaries(JSON.parse(saved))
    }
  }, [])

  // 날짜 범위에 따른 데이터 필터링
  const filteredData = useMemo(() => {
    const now = new Date()
    const startDate = new Date()

    if (timeRange === 'week') {
      startDate.setDate(now.getDate() - 7)
    } else {
      startDate.setMonth(now.getMonth() - 1)
    }

    return diaries
      .filter((diary) => {
        const diaryDate = new Date(diary.createdAt)
        return diaryDate >= startDate && diaryDate <= now
      })
      .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
  }, [diaries, timeRange])

  // 그래프 데이터 생성
  const chartData = useMemo(() => {
    if (filteredData.length === 0) {
      return {
        labels: [],
        datasets: [],
      }
    }

    // 날짜별로 그룹화
    const dateGroups = {}
    filteredData.forEach((diary) => {
      const date = new Date(diary.createdAt).toLocaleDateString('ko-KR', {
        month: 'short',
        day: 'numeric',
      })

      if (!dateGroups[date]) {
        dateGroups[date] = []
      }

      // 다중 감정 처리
      const emotions = diary.emotions || (diary.emotion ? [diary.emotion] : [])
      dateGroups[date].push(...emotions)
    })

    const labels = Object.keys(dateGroups)

    // 각 감정별 데이터셋 생성
    const datasets = Object.keys(emotionColors).map((emotion) => {
      const data = labels.map((date) => {
        const emotions = dateGroups[date] || []
        return emotions.filter((e) => e === emotion).length
      })

      return {
        label: emotionLabels[emotion],
        data: data,
        backgroundColor: emotionColors[emotion] + '20',
        borderColor: emotionColors[emotion],
        borderWidth: 2,
        fill: false,
        tension: 0.1,
      }
    })

    return { labels, datasets }
  }, [filteredData])

  // 간단한 막대 그래프 컴포넌트 (Chart.js 없이)
  const SimpleBarChart = ({ data }) => {
    if (!data.labels.length) {
      return (
        <div className="flex h-64 items-center justify-center text-gray-500">
          <div className="text-center">
            <TrendingUpIcon className="mx-auto h-12 w-12 text-gray-400" />
            <p className="mt-2">표시할 데이터가 없습니다</p>
            <p className="text-sm">일기를 작성해보세요!</p>
          </div>
        </div>
      )
    }

    const maxValue = Math.max(
      ...data.datasets.flatMap((dataset) => dataset.data)
    )
    const chartHeight = 200

    return (
      <div className="space-y-4">
        {/* 범례 */}
        <div className="flex flex-wrap gap-4">
          {data.datasets.map((dataset, index) => (
            <div key={index} className="flex items-center gap-2">
              <div
                className="h-3 w-3 rounded-full"
                style={{ backgroundColor: dataset.borderColor }}
              />
              <span className="text-sm text-gray-600">{dataset.label}</span>
            </div>
          ))}
        </div>

        {/* 그래프 */}
        <div className="relative h-64 overflow-x-auto">
          <div className="flex h-full items-end gap-2 px-4">
            {data.labels.map((label, labelIndex) => (
              <div
                key={labelIndex}
                className="flex flex-col items-center gap-1"
              >
                {/* 막대들 */}
                <div className="flex h-48 flex-col justify-end gap-1">
                  {data.datasets.map((dataset, datasetIndex) => {
                    const value = dataset.data[labelIndex] || 0
                    const height =
                      maxValue > 0 ? (value / maxValue) * chartHeight : 0

                    return (
                      <div
                        key={datasetIndex}
                        className="w-8 rounded-t transition-all duration-300 hover:opacity-80"
                        style={{
                          height: `${height}px`,
                          backgroundColor: dataset.borderColor,
                          minHeight: value > 0 ? '4px' : '0px',
                        }}
                        title={`${dataset.label}: ${value}개`}
                      />
                    )
                  })}
                </div>

                {/* x축 라벨 */}
                <div className="mt-2 text-xs text-gray-500">{label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* y축 라벨 */}
        <div className="flex justify-between text-xs text-gray-500">
          <span>0</span>
          <span>{maxValue}</span>
        </div>
      </div>
    )
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <TrendingUpIcon className="h-5 w-5 text-purple-600" />
            감정 변화 그래프
          </CardTitle>
          <Tabs value={timeRange} onValueChange={setTimeRange}>
            <TabsList>
              <TabsTrigger value="week">일주일</TabsTrigger>
              <TabsTrigger value="month">한달</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* 통계 요약 */}
          <div className="grid grid-cols-2 gap-4 rounded-lg bg-gray-50 p-4 dark:bg-gray-800">
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">
                {filteredData.length}
              </div>
              <div className="text-sm text-gray-600">총 일기 수</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {filteredData.length > 0
                  ? Math.round(
                      (filteredData.filter((diary) =>
                        (diary.emotions || [diary.emotion]).includes('happy')
                      ).length /
                        filteredData.length) *
                        100
                    )
                  : 0}
                %
              </div>
              <div className="text-sm text-gray-600">긍정 감정 비율</div>
            </div>
          </div>

          {/* 그래프 */}
          <SimpleBarChart data={chartData} />
        </div>
      </CardContent>
    </Card>
  )
}
