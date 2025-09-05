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
  MenuIcon,
  XIcon,
  ChevronLeftIcon,
  LogOutIcon,
} from "lucide-react"
import { useIsMobile } from "@/hooks/use-mobile"
import { useState, useEffect, useRef } from "react"

export function SidebarNav({ onCollapseChange }) {
  const pathname = usePathname()
  const isMobile = useIsMobile()
  const [isOpen, setIsOpen] = useState(false)
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [showUserMenu, setShowUserMenu] = useState(false)
  const userMenuRef = useRef(null)

  const handleCollapseToggle = () => {
    if (!isMobile) {
      const newCollapsed = !isCollapsed
      setIsCollapsed(newCollapsed)
      onCollapseChange?.(newCollapsed)
    }
  }

  const handleLogout = () => {
    // 로그아웃 로직 구현
    console.log("로그아웃")
    setShowUserMenu(false)
  }

  // 드롭다운 외부 클릭 시 닫기
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setShowUserMenu(false)
      }
    }

    if (showUserMenu) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [showUserMenu])

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
    <>
      {/* Mobile Menu Button */}
      {isMobile && (
        <div className="fixed top-4 left-4 z-50">
          <Button
            variant="ghost"
            size="sm"
            className="bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <XIcon className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
          </Button>
        </div>
      )}

      {/* Mobile Overlay */}
      {isMobile && isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={cn(
        "bg-white border-r border-gray-200 flex flex-col h-full transition-all duration-300 relative",
        isMobile 
          ? "fixed top-0 left-0 z-40 w-64 transform transition-transform duration-300"
          : isCollapsed ? "w-16" : "w-64",
        isMobile && !isOpen && "-translate-x-full"
      )}>
        {/* Header */}
        <div className="p-4">
          <div className="flex items-center gap-2 mb-6">
            {/* S Logo Box - Click to toggle sidebar */}
            <div 
              className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center cursor-pointer hover:scale-110 transition-transform duration-200 group"
              onClick={handleCollapseToggle}
            >
              <span className="text-white font-bold text-sm group-hover:hidden">S</span>
              <ChevronLeftIcon className={cn(
                "h-4 w-4 text-white hidden group-hover:block transition-transform duration-200",
                isCollapsed ? "rotate-180" : ""
              )} />
            </div>
            
            {/* Text Logo - Click to go to home */}
            {!isCollapsed && (
              <Link href="/">
                <span className="font-semibold text-lg text-gray-900 cursor-pointer hover:text-gray-700">
                  SupportHub
                </span>
              </Link>
            )}
          </div>

          {/* Description */}
          {!isCollapsed && (
            <p className="text-xs text-gray-500 mt-2 mb-4 px-1 leading-relaxed">
              마음을 나누는 AI 감정공감 대화 플랫폼
            </p>
          )}

          {/* New Chat Button */}
          <Link href="/ai-chat">
            <Button className={cn(
              "bg-gray-50 hover:bg-gray-100 text-gray-700 border border-gray-200 font-medium",
              isCollapsed ? "w-8 h-8 p-0 justify-center" : "w-full justify-start"
            )}>
              <PlusIcon className={cn("h-4 w-4", !isCollapsed && "mr-2")} />
              {!isCollapsed && "새 채팅"}
            </Button>
          </Link>
        </div>

        {/* Separator */}
        <div className="h-0.5 bg-gray-100 mx-2 my-2"></div>

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
                    "text-gray-600 hover:text-gray-900 hover:bg-gray-50",
                    isCollapsed ? "w-8 h-8 p-0 justify-center" : "w-full justify-start",
                    isActive && "bg-gray-100 text-gray-900",
                  )}
                  title={isCollapsed ? item.title : undefined}
                >
                  <Icon className={cn("h-4 w-4", !isCollapsed && "mr-3")} />
                  {!isCollapsed && item.title}
                </Button>
              </Link>
            )
          })}
        </div>
      </ScrollArea>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200 relative" ref={userMenuRef}>
        <div 
          className={cn(
            "flex items-center p-2 rounded-lg hover:bg-gray-50 cursor-pointer",
            isCollapsed ? "justify-center" : "gap-3"
          )}
          onClick={() => setShowUserMenu(!showUserMenu)}
        >
          <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-sm">희</span>
          </div>
          {!isCollapsed && (
            <div className="flex-1">
              <div className="text-sm font-medium text-gray-900">희도</div>
              <div className="text-xs text-gray-500">Plus</div>
            </div>
          )}
        </div>

        {/* User Menu Dropdown */}
        {showUserMenu && (
          <div className="absolute bottom-full left-4 mb-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
            <div className="py-1">
              <button className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                <SettingsIcon className="h-4 w-4" />
                설정
              </button>
              <button 
                className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                onClick={handleLogout}
              >
                <LogOutIcon className="h-4 w-4" />
                로그아웃
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
    </>
  )
}
