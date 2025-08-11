'use client'

import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import { Heart, MessageCircle } from 'lucide-react'

// 감정 원(아바타보다 작게)
function EmotionCircle({ label }) {
  const smallFont = label.length >= 4
  return (
    <div
      className="flex h-9 w-9 items-center justify-center rounded-full border border-neutral-300 bg-white text-neutral-700 shadow-[inset_0_0_0_1px_rgba(0,0,0,0.02)]"
      aria-label={`감정: ${label}`}
      title={label}
    >
      <span
        className={
          smallFont ? 'text-[10px] leading-none' : 'text-xs leading-none'
        }
      >
        {label}
      </span>
    </div>
  )
}

export default function Page() {
  const [sortType, setSortType] = useState('최신순')
  const [showSortPopup, setShowSortPopup] = useState(false)
  const [selectedEmotion, setSelectedEmotion] = useState(null)
  const [postContent, setPostContent] = useState('')
  const [commentInputs, setCommentInputs] = useState({})

  const EMOTIONS = [
    '외로움',
    '우울',
    '스트레스',
    '불안',
    '분노',
    '슬픔',
    '기쁨',
    '피곤',
  ]

  const [posts, setPosts] = useState([
    {
      id: 1,
      emotion: '외로움',
      time: '6시간 전',
      content: '친구들과의 약속이 취소돼서 하루 종일 혼자였어요.',
      likes: 15,
      liked: false,
      comments: [{ id: 'c1', text: '같이 힘내요!', time: '1시간 전' }],
    },
    {
      id: 2,
      emotion: '우울',
      time: '2시간 전',
      content: '오늘 하필 중요한 일에 실수를 했어요. 너무 다운되네요.',
      likes: 13,
      liked: false,
      comments: [],
    },
    {
      id: 3,
      emotion: '스트레스',
      time: '5시간 전',
      content: '시험 기간이라 잠을 잘 못자요. 마음이 조급해요.',
      likes: 0,
      liked: false,
      comments: [],
    },
  ])

  // 좋아요 토글
  const handleLike = (postId) => {
    setPosts((prev) =>
      prev.map((p) =>
        p.id === postId
          ? {
              ...p,
              liked: !p.liked,
              likes: !p.liked ? p.likes + 1 : Math.max(0, p.likes - 1),
            }
          : p
      )
    )
  }

  // 댓글 입력 변경
  const handleCommentChange = (postId, value) => {
    setCommentInputs((prev) => ({ ...prev, [postId]: value }))
  }

  // 댓글 추가
  const handleAddComment = (postId) => {
    const text = (commentInputs[postId] || '').trim()
    if (!text) return
    setPosts((prev) =>
      prev.map((p) =>
        p.id === postId
          ? {
              ...p,
              comments: [
                ...p.comments,
                { id: `${postId}-${Date.now()}`, text, time: '방금' },
              ],
            }
          : p
      )
    )
    setCommentInputs((prev) => ({ ...prev, [postId]: '' }))
  }

  // 게시글 삭제(카드 오른쪽 상단)
  const handleDeletePost = (postId) => {
    setPosts((prev) => prev.filter((p) => p.id !== postId))
  }

  // 글 올리기 후 초안 초기화
  const handleClearDraft = () => {
    setPostContent('')
    setSelectedEmotion(null)
  }

  const handleCreatePost = () => {
    const content = postContent.trim()
    if (!content) return
    const newPost = {
      id: Date.now(),
      emotion: selectedEmotion || '기타',
      time: '방금',
      content,
      likes: 0,
      liked: false,
      comments: [],
    }
    setPosts((prev) => [newPost, ...prev])
    handleClearDraft()
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-6">
      {/* 헤더 & 정렬 */}
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl font-semibold">익명 커뮤니티</h1>
        <div className="relative">
          <Button
            variant="outline"
            onClick={() => setShowSortPopup((v) => !v)}
            className="min-w-[96px] justify-between"
          >
            {sortType}
            <span className="ml-2">▾</span>
          </Button>
          {showSortPopup && (
            <div className="absolute right-0 z-10 mt-2 w-36 rounded-xl border bg-white p-1 shadow">
              {['최신순', '댓글순', '좋아요순'].map((opt) => (
                <button
                  key={opt}
                  onClick={() => {
                    setSortType(opt)
                    setShowSortPopup(false)
                    if (opt === '최신순') {
                      setPosts((prev) => [...prev].sort((a, b) => b.id - a.id))
                    } else if (opt === '좋아요순') {
                      setPosts((prev) =>
                        [...prev].sort((a, b) => b.likes - a.likes)
                      )
                    } else if (opt === '댓글순') {
                      setPosts((prev) =>
                        [...prev].sort(
                          (a, b) => b.comments.length - a.comments.length
                        )
                      )
                    }
                  }}
                  className="w-full rounded-lg px-3 py-2 text-left text-sm hover:bg-neutral-50"
                >
                  {opt}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* 글쓰기 */}
      <Card className="mb-6">
        <CardHeader className="pb-2">
          <CardTitle className="text-base">감정 나누기</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            {EMOTIONS.map((emo) => (
              <button
                key={emo}
                onClick={() => setSelectedEmotion(emo)}
                className={`rounded-full border px-3 py-1 text-sm ${
                  selectedEmotion === emo
                    ? 'border-neutral-800'
                    : 'border-neutral-300'
                }`}
                aria-pressed={selectedEmotion === emo}
              >
                {emo}
              </button>
            ))}
          </div>
          <Textarea
            placeholder="지금 마음을 적어보세요..."
            value={postContent}
            onChange={(e) => setPostContent(e.target.value)}
          />
          <div className="flex justify-end">
            <Button onClick={handleCreatePost}>올리기</Button>
          </div>
        </CardContent>
      </Card>

      {/* 게시글 목록 */}
      <div className="space-y-4">
        {posts.map((post) => (
          <Card key={post.id} className="overflow-hidden">
            <CardHeader className="pb-2">
              <div className="flex items-start justify-between">
                {/* 왼쪽: 아바타 + 감정 원 */}
                <div className="mt-0.5 flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback>AN</AvatarFallback>
                  </Avatar>
                  <EmotionCircle label={post.emotion} />
                </div>

                {/* 오른쪽: 시간 + 삭제하기 */}
                <div className="flex flex-col items-end gap-1">
                  <span className="text-sm text-neutral-500">{post.time}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-7 px-2 text-xs text-red-600 hover:text-red-700"
                    onClick={() => handleDeletePost(post.id)}
                  >
                    삭제하기
                  </Button>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-3">
              <p className="whitespace-pre-wrap text-[15px] leading-6 text-neutral-800">
                {post.content}
              </p>

              {/* 액션바 */}
              <div className="mt-1 flex items-center gap-4">
                <button
                  onClick={() => handleLike(post.id)}
                  className={`flex items-center gap-1 text-sm transition ${
                    post.liked
                      ? 'text-red-600'
                      : 'text-neutral-600 hover:text-neutral-800'
                  }`}
                  aria-label="좋아요"
                >
                  <Heart
                    className={`h-5 w-5 ${post.liked ? 'fill-current' : ''}`}
                    aria-hidden
                  />
                  <span>{post.likes}</span>
                </button>

                <div className="flex items-center gap-1 text-sm text-neutral-600">
                  <MessageCircle className="h-5 w-5" aria-hidden />
                  <span>{post.comments.length}</span>
                </div>
              </div>

              {/* 댓글 목록 */}
              {post.comments.length > 0 && (
                <div className="mt-2 space-y-2 rounded-lg bg-neutral-50 p-3">
                  {post.comments.map((c) => (
                    <div
                      key={c.id}
                      className="flex items-start justify-between gap-3"
                    >
                      <p className="text-sm text-neutral-800">{c.text}</p>
                      <span className="shrink-0 text-xs text-neutral-500">
                        {c.time}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {/* 댓글 입력 */}
              <div className="flex items-center gap-2">
                <Input
                  placeholder="댓글을 입력하세요"
                  value={commentInputs[post.id] ?? ''}
                  onChange={(e) => handleCommentChange(post.id, e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault()
                      handleAddComment(post.id)
                    }
                  }}
                />
                <Button size="sm" onClick={() => handleAddComment(post.id)}>
                  등록
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
