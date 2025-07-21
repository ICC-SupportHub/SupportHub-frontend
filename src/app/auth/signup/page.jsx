"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Loader2Icon } from "lucide-react"

export default function SignupPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSignUp = (e) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      router.push("/auth/login")
    }, 2000)
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
      <Card className="w-full max-w-md shadow-lg rounded-lg">
        <CardHeader className="bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-t-lg p-6">
          <CardTitle className="text-3xl font-bold text-center">회원가입</CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          <form onSubmit={handleSignUp} className="space-y-4">
            <div>
              <Label htmlFor="email">이메일</Label>
              <Input
                id="email"
                type="email"
                placeholder="이메일을 입력하세요"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="password">비밀번호</Label>
              <Input
                id="password"
                type="password"
                placeholder="비밀번호 (6자 이상)"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
              />
            </div>
            <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700" disabled={loading}>
              {loading ? <Loader2Icon className="mr-2 h-4 w-4 animate-spin" /> : null}
              회원가입
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col gap-4 p-6 pt-0">
          <p className="text-sm text-center text-gray-600 dark:text-gray-400">
            이미 계정이 있으신가요?{" "}
            <Link href="/auth/login" className="text-purple-600 hover:underline">
              로그인
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}
