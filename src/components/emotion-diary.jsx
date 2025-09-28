'use client'
import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { CalendarIcon, LoaderIcon, EditIcon, TrashIcon } from 'lucide-react'

// 초기 상태 정의
const initialEditor = {
  selectedEmotions: [],
  diaryEntry: '',
  aiFeedback: '',
  isSaved: false,
  isLoading: false,
  editingDiary: null,
}

const initialList = {
  savedDiaries: [],
  selectedDiary: null,
  showAll: false,
}

export default function EmotionDiary() {
  const searchParams = useSearchParams()

  // 작성 관련 상태
  const [editor, setEditor] = useState(initialEditor)

  // 목록 관련 상태
  const [list, setList] = useState(initialList)

  // URL 파라미터에서 감정과 내용을 가져와서 자동 설정
  useEffect(() => {
    const emotion = searchParams.get('emotion')
    const content = searchParams.get('content')

    if (emotion) {
      setEditor((prev) => ({ ...prev, selectedEmotions: [emotion] }))
    }
    if (content) {
      setEditor((prev) => ({
        ...prev,
        diaryEntry: decodeURIComponent(content),
      }))
    }
  }, [searchParams])

  // 저장된 일기 목록 로드
  useEffect(() => {
    const saved = localStorage.getItem('emotion-diaries')
    if (saved) {
      setList((prev) => ({ ...prev, savedDiaries: JSON.parse(saved) }))
    }
  }, [])

  const today = new Date().toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long',
  })

  const handleSaveDiary = async () => {
    if (editor.selectedEmotions.length > 0 && editor.diaryEntry.trim()) {
      setEditor((prev) => ({ ...prev, isLoading: true }))
      try {
        const response = await fetch('/api/diary-feedback', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            emotions: editor.selectedEmotions,
            diaryEntry: editor.diaryEntry,
          }),
        })

        const data = await response.json()
        console.log('API 응답:', data)

        if (editor.editingDiary) {
          // 기존 일기 수정
          const updatedDiaries = list.savedDiaries.map((diary) =>
            diary.id === editor.editingDiary.id
              ? {
                  ...diary,
                  emotions: editor.selectedEmotions,
                  content: editor.diaryEntry,
                  feedback: data.feedback,
                  updatedAt: new Date().toISOString(),
                  // 원래 날짜 유지
                  date: diary.date,
                  createdAt: diary.createdAt,
                }
              : diary
          )
          setList((prev) => ({ ...prev, savedDiaries: updatedDiaries }))
          localStorage.setItem(
            'emotion-diaries',
            JSON.stringify(updatedDiaries)
          )
        } else {
          // 새 일기 저장
          const newDiary = {
            id: Date.now().toString(),
            date: new Date().toISOString(),
            emotions: editor.selectedEmotions,
            content: editor.diaryEntry,
            feedback: data.feedback,
            createdAt: new Date().toISOString(),
          }
          const updatedDiaries = [...list.savedDiaries, newDiary]
          setList((prev) => ({ ...prev, savedDiaries: updatedDiaries }))
          localStorage.setItem(
            'emotion-diaries',
            JSON.stringify(updatedDiaries)
          )
        }

        // 작성 상태 초기화 (AI 피드백은 유지)
        console.log('AI 피드백 설정:', data.feedback)
        setEditor({
          selectedEmotions: editor.selectedEmotions,
          diaryEntry: editor.diaryEntry,
          aiFeedback: data.feedback,
          isSaved: true,
          isLoading: false,
          editingDiary: null,
        })
      } catch (error) {
        setEditor((prev) => ({
          ...prev,
          aiFeedback:
            '피드백을 가져오는 중 오류가 발생했습니다. 다시 시도해 주세요.',
        }))
      } finally {
        setEditor((prev) => ({ ...prev, isLoading: false }))
      }
    } else {
      setEditor((prev) => ({
        ...prev,
        aiFeedback: '감정을 최소 1개 선택하고 일기 내용을 입력해주세요.',
      }))
    }
  }

  const handleEditDiary = (diary) => {
    setEditor((prev) => ({
      ...prev,
      editingDiary: diary,
      selectedEmotions:
        diary.emotions || (diary.emotion ? [diary.emotion] : []),
      diaryEntry: diary.content,
      aiFeedback: diary.feedback,
      isSaved: true,
    }))
  }

  const handleDeleteDiary = (diaryId) => {
    const updatedDiaries = list.savedDiaries.filter(
      (diary) => diary.id !== diaryId
    )
    setList((prev) => ({ ...prev, savedDiaries: updatedDiaries }))
    localStorage.setItem('emotion-diaries', JSON.stringify(updatedDiaries))
  }

  const handleNewDiary = () => {
    setEditor({
      selectedEmotions: [],
      diaryEntry: '',
      aiFeedback: '',
      isSaved: false,
      isLoading: false,
      editingDiary: null,
    })
  }

  const getEmotionLabel = (emotion) => {
    const labels = {
      happy: '기쁨 😊',
      sad: '슬픔 😢',
      angry: '화남 😠',
      anxious: '불안 😟',
      neutral: '평온 😐',
    }
    return labels[emotion] || '보통 😐'
  }

  const getEmotionsLabel = (emotions) => {
    if (!emotions || emotions.length === 0) return '감정 없음'
    if (emotions.length === 1) return getEmotionLabel(emotions[0])
    return emotions.map((emotion) => getEmotionLabel(emotion)).join(', ')
  }

  const emotions = [
    { name: 'happy', emoji: '😊', label: '기쁨' },
    { name: 'sad', emoji: '😢', label: '슬픔' },
    { name: 'angry', emoji: '😠', label: '화남' },
    { name: 'anxious', emoji: '😟', label: '불안' },
    { name: 'neutral', emoji: '😐', label: '평온' },
  ]

  return (
    <div className="flex h-full flex-1 flex-col">
      {/* Header */}
      <div className="border-b bg-white px-6 py-4 dark:bg-gray-800">
        <div className="flex items-center gap-3">
          <CalendarIcon className="h-6 w-6 text-purple-600" />
          <div>
            <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
              감정 일기
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">{today}</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto">
        <div className="flex h-full">
          {/* 일기 작성 영역 */}
          <div className="flex-1 overflow-auto p-6">
            <div className="mx-auto max-w-2xl space-y-6">
              <div>
                <Label
                  htmlFor="emotion-select"
                  className="mb-3 block text-base"
                >
                  오늘의 감정은 어떤가요? (최대 3개까지 선택 가능)
                </Label>
                <div className="flex flex-wrap gap-3">
                  {emotions.map((emotion) => (
                    <Button
                      key={emotion.name}
                      variant={
                        editor.selectedEmotions.includes(emotion.name)
                          ? 'default'
                          : 'outline'
                      }
                      onClick={() => {
                        setEditor((prev) => {
                          const isSelected = prev.selectedEmotions.includes(
                            emotion.name
                          )
                          let newEmotions

                          if (isSelected) {
                            // 이미 선택된 감정이면 제거
                            newEmotions = prev.selectedEmotions.filter(
                              (e) => e !== emotion.name
                            )
                          } else {
                            // 최대 3개까지만 선택 가능
                            if (prev.selectedEmotions.length >= 3) {
                              return prev // 변경하지 않음
                            }
                            newEmotions = [
                              ...prev.selectedEmotions,
                              emotion.name,
                            ]
                          }

                          return {
                            ...prev,
                            selectedEmotions: newEmotions,
                            aiFeedback: prev.editingDiary
                              ? prev.aiFeedback
                              : '',
                            isSaved: prev.editingDiary ? true : false,
                            editingDiary: prev.editingDiary,
                          }
                        })
                      }}
                      className={`flex h-auto w-24 flex-col items-center justify-center p-4 text-lg ${
                        editor.selectedEmotions.includes(emotion.name)
                          ? 'bg-purple-500 text-white hover:bg-purple-600'
                          : editor.selectedEmotions.length >= 3
                            ? 'cursor-not-allowed border-gray-200 bg-gray-100 text-gray-400 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-500'
                            : 'border-gray-300 hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-800'
                      }`}
                    >
                      <span className="mb-1 text-3xl">{emotion.emoji}</span>
                      <span className="text-sm">{emotion.label}</span>
                    </Button>
                  ))}
                </div>
              </div>
              <div>
                <Label htmlFor="diary-entry" className="mb-3 block text-base">
                  오늘 하루를 기록해 보세요.
                </Label>
                <Textarea
                  id="diary-entry"
                  placeholder="오늘 있었던 일이나 느낀 감정을 자유롭게 적어주세요..."
                  value={editor.diaryEntry}
                  onChange={(e) => {
                    setEditor((prev) => ({
                      ...prev,
                      diaryEntry: e.target.value,
                      aiFeedback: prev.editingDiary ? prev.aiFeedback : '',
                      isSaved: prev.editingDiary ? true : false,
                      editingDiary: prev.editingDiary,
                    }))
                  }}
                  className="min-h-[200px] text-base focus-visible:ring-purple-500"
                />
              </div>
              {(() => {
                const shouldShow =
                  editor.aiFeedback &&
                  editor.aiFeedback.trim() &&
                  editor.selectedEmotions.length > 0 &&
                  editor.diaryEntry.trim()
                console.log('AI 피드백 표시 조건:', {
                  hasFeedback: !!editor.aiFeedback,
                  feedbackTrimmed: !!editor.aiFeedback?.trim(),
                  hasEmotions: editor.selectedEmotions.length > 0,
                  hasContent: !!editor.diaryEntry.trim(),
                  shouldShow,
                })
                return shouldShow
              })() && (
                <div className="rounded-lg border border-purple-200 bg-purple-50 p-4 text-purple-800 dark:bg-purple-950 dark:text-purple-200">
                  <p className="mb-2 font-semibold">AI의 한마디:</p>
                  <p className="leading-relaxed">{editor.aiFeedback}</p>
                </div>
              )}
              {editor.aiFeedback &&
                editor.aiFeedback.trim() &&
                !editor.isSaved && (
                  <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-800 dark:bg-red-950 dark:text-red-200">
                    <p className="mb-2 font-semibold">알림:</p>
                    <p className="leading-relaxed">{editor.aiFeedback}</p>
                  </div>
                )}
              <div className="flex justify-between">
                <Button
                  variant="outline"
                  onClick={handleNewDiary}
                  disabled={editor.isLoading}
                >
                  새 일기 작성
                </Button>
                <Button
                  onClick={handleSaveDiary}
                  disabled={editor.isLoading}
                  className="bg-purple-600 px-8 hover:bg-purple-700"
                >
                  {editor.isLoading ? (
                    <>
                      <LoaderIcon className="mr-2 h-4 w-4 animate-spin" />
                      AI 피드백 생성 중...
                    </>
                  ) : editor.editingDiary ? (
                    '일기 수정'
                  ) : (
                    '일기 저장'
                  )}
                </Button>
              </div>
            </div>
          </div>

          {/* 일기 목록 영역 */}
          <div className="w-80 border-l bg-gray-50 p-4 dark:bg-gray-900">
            <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
              저장된 일기
            </h3>
            <div className="space-y-3">
              {list.savedDiaries.length === 0 ? (
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  아직 저장된 일기가 없습니다.
                </p>
              ) : (
                (list.showAll
                  ? list.savedDiaries
                  : list.savedDiaries.slice(0, 3)
                )
                  .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                  .map((diary) => (
                    <div
                      key={diary.id}
                      onClick={() => {
                        console.log('일기 클릭됨:', diary)
                        setList((prev) => ({ ...prev, selectedDiary: diary }))
                      }}
                      className={`cursor-pointer rounded-lg border p-3 transition-all duration-200 hover:shadow-md ${
                        list.selectedDiary?.id === diary.id
                          ? 'border-purple-300 bg-purple-50 dark:border-purple-600 dark:bg-purple-950'
                          : 'border-gray-200 bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700'
                      }`}
                    >
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {new Date(diary.createdAt).toLocaleDateString('ko-KR', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                          weekday: 'long',
                        })}
                        {diary.updatedAt &&
                          diary.updatedAt !== diary.createdAt && (
                            <span className="ml-1 text-orange-500">
                              (수정됨)
                            </span>
                          )}
                      </p>
                      <p className="text-sm font-medium">
                        {getEmotionsLabel(
                          diary.emotions ||
                            (diary.emotion ? [diary.emotion] : [])
                        )}
                      </p>
                      <p className="mt-1 text-xs text-gray-400 dark:text-gray-500">
                        클릭하여 상세보기
                      </p>
                    </div>
                  ))
              )}
            </div>

            {list.savedDiaries.length > 3 && (
              <Button
                variant="ghost"
                className="mt-2 w-full"
                onClick={() =>
                  setList((prev) => ({ ...prev, showAll: !prev.showAll }))
                }
              >
                {list.showAll ? '접기 ▲' : '더보기 ▼'}
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* 상세 보기 모달 */}
      {list.selectedDiary && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="max-h-[80vh] w-full max-w-2xl overflow-y-auto rounded-lg bg-white shadow-xl dark:bg-gray-800">
            <div className="p-6">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {new Date(list.selectedDiary.createdAt).toLocaleDateString(
                    'ko-KR',
                    {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      weekday: 'long',
                    }
                  )}
                  {list.selectedDiary.updatedAt &&
                    list.selectedDiary.updatedAt !==
                      list.selectedDiary.createdAt && (
                      <span className="ml-2 text-sm text-orange-500">
                        (수정됨)
                      </span>
                    )}{' '}
                  -{' '}
                  {getEmotionsLabel(
                    list.selectedDiary.emotions ||
                      (list.selectedDiary.emotion
                        ? [list.selectedDiary.emotion]
                        : [])
                  )}
                </h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() =>
                    setList((prev) => ({ ...prev, selectedDiary: null }))
                  }
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  ✕
                </Button>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="mb-2 font-semibold text-gray-900 dark:text-white">
                    일기 내용
                  </h4>
                  <div className="whitespace-pre-line rounded-lg bg-gray-50 p-4 text-gray-700 dark:bg-gray-800 dark:text-gray-300">
                    {list.selectedDiary.content}
                  </div>
                </div>
                {list.selectedDiary.feedback && (
                  <div>
                    <h4 className="mb-2 font-semibold text-gray-900 dark:text-white">
                      AI 피드백
                    </h4>
                    <div className="rounded-lg border border-purple-200 bg-purple-50 p-4 text-purple-800 dark:border-purple-700 dark:bg-purple-950 dark:text-purple-200">
                      {list.selectedDiary.feedback}
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-6 flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => {
                    handleEditDiary(list.selectedDiary)
                    setList((prev) => ({ ...prev, selectedDiary: null }))
                  }}
                >
                  <EditIcon className="mr-2 h-4 w-4" />
                  수정
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => {
                    handleDeleteDiary(list.selectedDiary.id)
                    setList((prev) => ({ ...prev, selectedDiary: null }))
                  }}
                >
                  <TrashIcon className="mr-2 h-4 w-4" />
                  삭제
                </Button>
                <Button
                  onClick={() =>
                    setList((prev) => ({ ...prev, selectedDiary: null }))
                  }
                >
                  닫기
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
