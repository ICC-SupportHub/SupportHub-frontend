"use client"

import { useState } from "react"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { HeartIcon, MessageCircleIcon, PlusIcon } from "lucide-react"

const dummyPosts = [
  {
    id: "1",
    content: "오늘 하루 너무 힘들었어요. 모든 게 잘못되는 것 같고... 혼자라는 생각이 들어요.",
    emotion: "슬픔",
    timestamp: "2시간 전",
    likes: 12,
    comments: 5,
    isLiked: false,
  },
  {
    id: "2",
    content: "시험 기간이라 스트레스가 너무 심해요. 잠도 제대로 못 자고 있어요. 다들 어떻게 극복하시나요?",
    emotion: "스트레스",
    timestamp: "4시간 전",
    likes: 8,
    comments: 3,
    isLiked: true,
  },
  {
    id: "3",
    content: "친구들과 만나서 웃었는데도 집에 오니까 또 외로워져요. 이런 감정이 정상인가요?",
    emotion: "외로움",
    timestamp: "6시간 전",
    likes: 15,
    comments: 7,
    isLiked: false,
  },
]

export default function CommunityPage() {
  const [posts, setPosts] = useState(dummyPosts)
  const [newPost, setNewPost] = useState("")
  const [selectedEmotion, setSelectedEmotion] = useState("일반")
  const [showNewPostForm, setShowNewPostForm] = useState(false)

  const emotions = ["일반", "기쁨", "슬픔", "화남", "불안", "스트레스", "외로움"]

  const handleLike = (postId) => {
    setPosts(
      posts.map((post) =>
        post.id === postId
          ? {
              ...post,
              likes: post.isLiked ? post.likes - 1 : post.likes + 1,
              isLiked: !post.isLiked,
            }
          : post,
      ),
    )
  }

  const handleSubmitPost = () => {
    if (newPost.trim()) {
      const post = {
        id: Date.now().toString(),
        content: newPost,
        emotion: selectedEmotion,
        timestamp: "방금 전",
        likes: 0,
        comments: 0,
        isLiked: false,
      }
      setPosts([post, ...posts])
      setNewPost("")
      setShowNewPostForm(false)
    }
  }

  const getEmotionColor = (emotion) => {
    const colors = {
      기쁨: "bg-yellow-100 text-yellow-800",
      슬픔: "bg-blue-100 text-blue-800",
      화남: "bg-red-100 text-red-800",
      불안: "bg-purple-100 text-purple-800",
      스트레스: "bg-orange-100 text-orange-800",
      외로움: "bg-gray-100 text-gray-800",
      일반: "bg-green-100 text-green-800",
    }
    return colors[emotion] || "bg-gray-100 text-gray-800"
  }

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
      <div className="w-full max-w-5xl mx-auto space-y-4">
        <Card className="shadow-lg rounded-lg">
          <CardHeader className="bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-t-lg p-4">
            <CardTitle className="text-2xl font-bold text-center">익명 감정 나눔</CardTitle>
            <p className="text-center text-purple-100 mt-1">익명으로 감정을 나누고 서로 위로받는 공간입니다</p>
          </CardHeader>
        </Card>
        {!showNewPostForm ? (
          <Button
            onClick={() => setShowNewPostForm(true)}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3"
          >
            <PlusIcon className="mr-2 h-5 w-5" aria-hidden="true" />
            감정 나누기
          </Button>
        ) : (
          <Card className="shadow-md">
            <CardContent className="p-4 space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">감정 선택</label>
                <div className="flex flex-wrap gap-2">
                  {emotions.map((emotion) => (
                    <Button
                      key={emotion}
                      variant={selectedEmotion === emotion ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedEmotion(emotion)}
                      className={selectedEmotion === emotion ? "bg-purple-500 hover:bg-purple-600" : ""}
                    >
                      {emotion}
                    </Button>
                  ))}
                </div>
              </div>
              <Textarea
                placeholder="익명으로 감정을 나눠보세요..."
                value={newPost}
                onChange={(e) => setNewPost(e.target.value)}
                className="min-h-[100px]"
              />
            </CardContent>
            <CardFooter className="flex justify-end gap-2 p-4">
              <Button variant="outline" onClick={() => setShowNewPostForm(false)}>
                취소
              </Button>
              <Button onClick={handleSubmitPost} className="bg-purple-600 hover:bg-purple-700">
                게시하기
              </Button>
            </CardFooter>
          </Card>
        )}
        <div className="space-y-4 flex-1 overflow-y-auto">
          {posts.map((post) => (
            <Card key={post.id} className="shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-start space-x-3">
                  <Avatar className="w-10 h-10">
                    <AvatarFallback className="bg-purple-100 text-purple-600">익명</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge className={getEmotionColor(post.emotion)}>{post.emotion}</Badge>
                      <span className="text-sm text-gray-500">{post.timestamp}</span>
                    </div>
                    <p className="text-gray-800 dark:text-gray-200 leading-relaxed">{post.content}</p>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between items-center p-4 pt-0">
                <div className="flex gap-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleLike(post.id)}
                    className={`flex items-center gap-1 ${post.isLiked ? "text-red-500" : "text-gray-500"}`}
                  >
                    <HeartIcon className={`h-4 w-4 ${post.isLiked ? "fill-current" : ""}`} aria-hidden="true" />
                    {post.likes}
                  </Button>
                  <Button variant="ghost" size="sm" className="flex items-center gap-1 text-gray-500">
                    <MessageCircleIcon className="h-4 w-4" aria-hidden="true" />
                    {post.comments}
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
