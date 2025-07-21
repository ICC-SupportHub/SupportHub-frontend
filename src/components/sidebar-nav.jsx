"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import {
  HomeIcon,
  MessageSquareIcon,
  BookOpenIcon,
  LineChartIcon,
  BrainIcon,
  UsersIcon,
  PhoneIcon,
  PlusIcon,
  SettingsIcon,
} from "lucide-react"

export function SidebarNav() {
  const pathname = usePathname()

  const mainNavItems = [
    {
      title: "새 대화",
      href: "/ai-chat", // 경로 업데이트
      icon: PlusIcon,
      isNew: true,
    },
  ]

  const navItems = [
    {
      title: "홈",
      href: "/",
      icon: HomeIcon,
    },
    {
      title: "AI 대화",
      href: "/ai-chat", // 경로 업데이트
      icon: MessageSquareIcon,
    },
    {
      title: "감정 일기",
      href: "/emotion-diary", // 경로 업데이트
      icon: BookOpenIcon,
    },
    {
      title: "감정 통계",
      href: "/emotion-history", // 경로 업데이트
      icon: LineChartIcon,
    },
    {
      title: "대화 주제",
      href: "/conversation-topics", // 경로 업데이트
      icon: BrainIcon,
    },
    {
      title: "커뮤니티",
      href: "/anonymous-community", // 경로 업데이트
      icon: UsersIcon,
    },
    {
      title: "긴급 지원",
      href: "/emergency-support", // 경로 업데이트
      icon: PhoneIcon,
    },
  ]

  return (
    <div className="w-64 bg-gray-900 text-white flex flex-col h-full">
      {/* Header */}
      <div className="p-4">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">S</span>
          </div>
          <span className="font-semibold text-lg">SupportHub</span>
        </div>

        {/* New Chat Button */}
        <Link href="/ai-chat">
          {" "}
          {/* 경로 업데이트 */}
          <Button className="w-full bg-gray-800 hover:bg-gray-700 text-white border border-gray-600 justify-start">
            <PlusIcon className="mr-2 h-4 w-4" />새 대화 시작
          </Button>
        </Link>
      </div>

      <Separator className="bg-gray-700" />

      {/* Navigation */}
      <ScrollArea className="flex-1 px-2">
        <div className="space-y-1 p-2">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href
            return (
              <Link key={item.href} href={item.href}>
                <Button
                  variant="ghost"
                  className={cn(
                    "w-full justify-start text-gray-300 hover:text-white hover:bg-gray-800",
                    isActive && "bg-gray-800 text-white",
                  )}
                >
                  <Icon className="mr-3 h-4 w-4" />
                  {item.title}
                </Button>
              </Link>
            )
          })}
        </div>
      </ScrollArea>

      {/* Footer */}
      <div className="p-4 border-t border-gray-700">
        <Button variant="ghost" className="w-full justify-start text-gray-400 hover:text-white hover:bg-gray-800">
          <SettingsIcon className="mr-3 h-4 w-4" />
          설정
        </Button>
      </div>
    </div>
  )
}
