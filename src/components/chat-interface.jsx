"use client"

import { useState, useRef, useEffect } from "react"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { SendIcon } from "lucide-react"

export default function ChatInterface() {
  const [messages, setMessages] = useState([])
  const [inputMessage, setInputMessage] = useState("")
  const scrollAreaRef = useRef(null)

  const handleSendMessage = (e) => {
    e.preventDefault()
    if (inputMessage.trim()) {
      const newUserMessage = {
        id: Date.now().toString(),
        text: inputMessage,
        sender: "user",
      }
      setMessages((prevMessages) => [...prevMessages, newUserMessage])
      setInputMessage("")

      // Simulate AI response after a short delay
      setTimeout(() => {
        const aiResponse = {
          id: (Date.now() + 1).toString(), // Ensure unique ID
          text: `"${newUserMessage.text}" 에 대해 공감합니다. 더 말씀해주세요.`, // Simple echo for now
          sender: "ai",
        }
        setMessages((prevMessages) => [...prevMessages, aiResponse])
      }, 500)
    }
  }

  // Scroll to the bottom when new messages arrive
  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({
        top: scrollAreaRef.current.scrollHeight,
        behavior: "smooth",
      })
    }
  }, [messages])

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
      <Card className="w-full max-w-2xl h-[80vh] flex flex-col shadow-lg rounded-lg">
        <CardHeader className="bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-t-lg p-4">
          <CardTitle className="text-2xl font-bold">마음을 나누는 AI</CardTitle>
        </CardHeader>
        <CardContent className="flex-1 p-4 overflow-hidden">
          <ScrollArea className="h-full pr-4" ref={scrollAreaRef}>
            <div className="space-y-4">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[75%] p-3 rounded-lg shadow-md ${
                      message.sender === "user"
                        ? "bg-purple-200 text-purple-900 ml-auto"
                        : "bg-gray-200 text-gray-800 mr-auto"
                    }`}
                  >
                    <p className="text-sm">{message.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
        <CardFooter className="border-t p-4 bg-gray-100 dark:bg-gray-800 rounded-b-lg">
          <form onSubmit={handleSendMessage} className="flex w-full space-x-2">
            <Input
              type="text"
              placeholder="메시지를 입력하세요..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              className="flex-1 focus-visible:ring-purple-500"
              aria-label="메시지 입력"
            />
            <Button type="submit" className="bg-purple-600 hover:bg-purple-700">
              <SendIcon className="h-5 w-5" aria-hidden="true" />
              <span className="sr-only">메시지 전송</span>
            </Button>
          </form>
        </CardFooter>
      </Card>
    </div>
  )
}

