"use client"
import { useRef, useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { toast } from "@/hooks/use-toast"
import { SendIcon, BotIcon, UserIcon, ShareIcon, CopyIcon, CheckIcon } from "lucide-react"
import { useChat } from "ai/react"

export default function ChatPage() {
  const scrollAreaRef = useRef(null)
  const inputRef = useRef(null)
  const [shareUrl, setShareUrl] = useState("")
  const [isSharing, setIsSharing] = useState(false)
  const [copied, setCopied] = useState(false)

  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: "/api/chat",
    initialMessages: [
      {
        id: "welcome",
        role: "assistant",
        content:
          "안녕하세요! 저는 당신의 감정을 이해하고 공감하는 AI입니다. 오늘 기분은 어떠신가요? 무엇이든 편하게 말씀해 주세요. 😊",
      },
    ],
  })

  const handleShareConversation = async () => {
    if (messages.length <= 1) {
      toast({
        title: "공유할 대화가 없습니다",
        description: "AI와 대화를 나눈 후 공유해보세요.",
        variant: "destructive",
      })
      return
    }

    setIsSharing(true)
    try {
      const response = await fetch("/api/share-conversation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: messages,
          title: `AI와의 감정 대화 - ${new Date().toLocaleDateString("ko-KR")}`,
        }),
      })

      const data = await response.json()

      if (data.success) {
        const fullUrl = `${window.location.origin}${data.shareUrl}`
        setShareUrl(fullUrl)
        toast({
          title: "대화 공유 링크가 생성되었습니다!",
          description: "링크를 복사해서 다른 사람들과 공유해보세요.",
        })
      } else {
        throw new Error(data.error)
      }
    } catch (error) {
      toast({
        title: "공유 링크 생성 실패",
        description: "다시 시도해주세요.",
        variant: "destructive",
      })
    } finally {
      setIsSharing(false)
    }
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl)
      setCopied(true)
      toast({
        title: "링크가 복사되었습니다!",
        description: "이제 다른 사람들과 공유할 수 있습니다.",
      })
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      toast({
        title: "복사 실패",
        description: "링크를 수동으로 복사해주세요.",
        variant: "destructive",
      })
    }
  }

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  }, [messages])

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  return (
    <div className="flex-1 flex flex-col h-full">
      {/* Header */}
      <div className="border-b bg-white dark:bg-gray-800 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="w-8 h-8">
              <AvatarFallback className="bg-purple-100 text-purple-600">
                <BotIcon className="h-4 w-4" />
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="font-semibold text-gray-900 dark:text-white">감정 공감 AI</h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {isLoading ? "생각하는 중..." : "당신의 마음을 이해합니다"}
              </p>
            </div>
          </div>

          {/* Share Button */}
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm" className="flex items-center gap-2 bg-transparent">
                <ShareIcon className="h-4 w-4" />
                대화 공유
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>대화 공유하기</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  AI와 나눈 대화를 다른 사람들과 공유할 수 있습니다. 개인정보는 제거되고 대화 내용만 공유됩니다.
                </p>

                {!shareUrl ? (
                  <Button
                    onClick={handleShareConversation}
                    disabled={isSharing}
                    className="w-full bg-purple-600 hover:bg-purple-700"
                  >
                    {isSharing ? "공유 링크 생성 중..." : "공유 링크 생성"}
                  </Button>
                ) : (
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Input value={shareUrl} readOnly className="flex-1" />
                      <Button size="sm" onClick={copyToClipboard} className="flex items-center gap-1">
                        {copied ? <CheckIcon className="h-4 w-4" /> : <CopyIcon className="h-4 w-4" />}
                        {copied ? "복사됨" : "복사"}
                      </Button>
                    </div>
                    <p className="text-xs text-gray-500">이 링크를 통해 다른 사람들이 대화를 볼 수 있습니다.</p>
                  </div>
                )}
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 px-6">
        <div className="py-6 space-y-6 max-w-3xl mx-auto">
          {messages.map((message) => (
            <div key={message.id} className={`flex gap-4 ${message.role === "user" ? "flex-row-reverse" : ""}`}>
              <Avatar className="w-8 h-8 flex-shrink-0">
                <AvatarFallback
                  className={message.role === "user" ? "bg-blue-100 text-blue-600" : "bg-purple-100 text-purple-600"}
                >
                  {message.role === "user" ? <UserIcon className="h-4 w-4" /> : <BotIcon className="h-4 w-4" />}
                </AvatarFallback>
              </Avatar>
              <div className={`flex-1 max-w-[80%] ${message.role === "user" ? "text-right" : ""}`}>
                <div
                  className={`inline-block p-4 rounded-2xl ${
                    message.role === "user"
                      ? "bg-blue-500 text-white"
                      : "bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
                  }`}
                >
                  <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  {new Date(message.createdAt || Date.now()).toLocaleTimeString("ko-KR", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex gap-4">
              <Avatar className="w-8 h-8">
                <AvatarFallback className="bg-purple-100 text-purple-600">
                  <BotIcon className="h-4 w-4" />
                </AvatarFallback>
              </Avatar>
              <div className="bg-gray-100 dark:bg-gray-700 rounded-2xl p-4">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div
                    className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0.1s" }}
                  ></div>
                  <div
                    className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0.2s" }}
                  ></div>
                </div>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Input */}
      <div className="border-t bg-white dark:bg-gray-800 p-6">
        <div className="max-w-3xl mx-auto">
          <form onSubmit={handleSubmit} className="flex gap-4">
            <Input
              ref={inputRef}
              type="text"
              placeholder="메시지를 입력하세요..."
              value={input}
              onChange={handleInputChange}
              className="flex-1 h-12 text-base"
              disabled={isLoading}
            />
            <Button
              type="submit"
              size="lg"
              disabled={!input.trim() || isLoading}
              className="bg-purple-600 hover:bg-purple-700 px-6"
            >
              <SendIcon className="h-4 w-4" />
            </Button>
          </form>
          <p className="text-xs text-gray-500 text-center mt-2">
            AI는 실수할 수 있습니다. 심각한 상황에서는 전문가의 도움을 받으세요.
          </p>
        </div>
      </div>
    </div>
  )
}
