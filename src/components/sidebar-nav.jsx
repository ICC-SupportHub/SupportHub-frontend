'use client'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
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
} from 'lucide-react'
import { useIsMobile } from '@/hooks/use-mobile'
import { useState, useEffect, useRef } from 'react'

export function SidebarNav({ onCollapseChange, isMobileOpen, onMobileToggle }) {
  const pathname = usePathname()
  const router = useRouter()
  const isMobile = useIsMobile()
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [showUserMenu, setShowUserMenu] = useState(false)
  const userMenuRef = useRef(null)
  const [currentUser, setCurrentUser] = useState(null)

  // 모바일에서는 외부에서 전달받은 상태를 사용
  const isOpen = isMobile ? isMobileOpen : false

  const handleCollapseToggle = () => {
    if (isMobile) {
      // 모바일에서는 사이드바 열기/닫기
      onMobileToggle?.(!isOpen)
    } else {
      // 데스크톱에서는 사이드바 축소/확장
      const newCollapsed = !isCollapsed
      setIsCollapsed(newCollapsed)
      onCollapseChange?.(newCollapsed)
    }
  }

  const handleLogout = () => {
    // 로그아웃 로직 구현
    try {
      localStorage.removeItem('sh_user')
      localStorage.removeItem('sh_isLoggedIn')
      localStorage.removeItem('token')
    } catch (e) {}
    setCurrentUser(null)
    setShowUserMenu(false)
    router.push('/auth/login')
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

  // 초기 사용자 상태 동기화 및 storage 이벤트 반영
  useEffect(() => {
    try {
      const stored = localStorage.getItem('sh_user')
      if (stored) {
        setCurrentUser(JSON.parse(stored))
      } else {
        // 개발 편의를 위한 기본 로그인 상태
        const devUser = { name: '희도', initials: '희', plan: 'Plus' }
        localStorage.setItem('sh_user', JSON.stringify(devUser))
        setCurrentUser(devUser)
      }
    } catch {
      setCurrentUser(null)
    }

    const onStorage = (e) => {
      if (e.key === 'sh_user') {
        try {
          setCurrentUser(e.newValue ? JSON.parse(e.newValue) : null)
        } catch {
          setCurrentUser(null)
        }
      }
    }
    window.addEventListener('storage', onStorage)
    return () => window.removeEventListener('storage', onStorage)
  }, [])

  const mainNavItems = [
    {
      title: '새 대화',
      href: '/ai-chat', // 경로 업데이트
      icon: PlusIcon,
      isNew: true,
    },
  ]

  const navItems = [
    {
      title: '홈',
      href: '/',
      icon: HomeIcon,
    },
    {
      title: 'AI 대화',
      href: '/ai-chat', // 경로 업데이트
      icon: MessageSquareIcon,
    },
    {
      title: '감정 일기',
      href: '/emotion-diary', // 경로 업데이트
      icon: BookOpenIcon,
    },
    {
      title: '감정 통계',
      href: '/emotion-stats', // 경로 업데이트
      icon: LineChartIcon,
    },
    {
      title: '대화 주제',
      href: '/conversation-topics', // 경로 업데이트
      icon: BrainIcon,
    },
    {
      title: '커뮤니티',
      href: '/anonymous-community', // 경로 업데이트
      icon: UsersIcon,
    },
    {
      title: '긴급 지원',
      href: '/emergency-support', // 경로 업데이트
      icon: PhoneIcon,
    },
  ]

  return (
    <>
      {/* Mobile Overlay */}
      {isMobile && isOpen && (
        <div
          className="fixed inset-0 z-30 bg-black bg-opacity-50"
          onClick={() => onMobileToggle(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={cn(
          'relative flex h-full flex-col border-r border-gray-200 bg-white transition-all duration-300',
          isMobile
            ? 'fixed left-0 top-0 z-40 w-64 transform transition-transform duration-300'
            : isCollapsed
              ? 'w-16'
              : 'w-64',
          isMobile && !isOpen && '-translate-x-full'
        )}
      >
        {/* Header */}
        <div className="p-4">
          <div className="mb-6 flex items-center gap-2">
            {/* S Logo Box - Click to toggle sidebar */}
            <div
              className="group flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 transition-transform duration-200 hover:scale-110"
              onClick={handleCollapseToggle}
            >
              <span className="text-sm font-bold text-white group-hover:hidden">
                S
              </span>
              <ChevronLeftIcon
                className={cn(
                  'hidden h-4 w-4 text-white transition-transform duration-200 group-hover:block',
                  isCollapsed ? 'rotate-180' : ''
                )}
              />
            </div>

            {/* Text Logo - Click to go to home */}
            {!isCollapsed && (
              <Link href="/">
                <span className="cursor-pointer align-middle text-lg font-semibold leading-none text-gray-900 hover:text-gray-700">
                  SupportHub
                </span>
              </Link>
            )}
          </div>

          {/* Description */}
          {!isCollapsed && (
            <p className="mb-4 mt-2 px-1 text-xs leading-relaxed text-gray-500">
              마음을 나누는 AI 감정공감 대화 플랫폼
            </p>
          )}

          {/* New Chat Button */}
          <Link href="/ai-chat">
            <Button
              className={cn(
                'h-9 border border-gray-200 bg-gray-50 font-medium text-gray-700 hover:bg-gray-100',
                isCollapsed
                  ? 'h-8 w-8 justify-center p-0'
                  : 'w-full justify-start px-3'
              )}
            >
              <div className="flex items-center gap-2">
                <PlusIcon className="h-4 w-4 flex-shrink-0" />
                {!isCollapsed && <span className="truncate">새 채팅</span>}
              </div>
            </Button>
          </Link>
        </div>

        {/* Separator */}
        <div className="mx-2 my-2 h-0.5 bg-gray-100"></div>

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
                      'h-9 text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                      isCollapsed
                        ? 'h-8 w-8 justify-center p-0'
                        : 'w-full justify-start px-3',
                      isActive && 'bg-gray-100 text-gray-900'
                    )}
                    title={isCollapsed ? item.title : undefined}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="h-4 w-4 flex-shrink-0" />
                      {!isCollapsed && (
                        <span className="truncate text-left">{item.title}</span>
                      )}
                    </div>
                  </Button>
                </Link>
              )
            })}
          </div>
        </ScrollArea>

        {/* Footer */}
        <div
          className="relative border-t border-gray-200 p-4"
          ref={userMenuRef}
        >
          {currentUser ? (
            <>
              <div
                className={cn(
                  'flex cursor-pointer items-center rounded-lg p-2 hover:bg-gray-50',
                  isCollapsed ? 'justify-center' : 'gap-3'
                )}
                onClick={() => setShowUserMenu(!showUserMenu)}
              >
                <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-purple-500 to-pink-500">
                  <span className="text-sm font-bold text-white">
                    {currentUser.initials || currentUser.name?.[0] || 'U'}
                  </span>
                </div>
                {!isCollapsed && (
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-sm font-medium text-gray-900">
                      {currentUser.name || '사용자'}
                    </div>
                    {currentUser.plan && (
                      <div className="truncate text-xs text-gray-500">
                        {currentUser.plan}
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* User Menu Dropdown */}
              {showUserMenu && (
                <div className="absolute bottom-full left-4 z-50 mb-2 w-48 rounded-lg border border-gray-200 bg-white shadow-lg">
                  <div className="py-1">
                    <button className="flex w-full items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                      <SettingsIcon className="h-4 w-4" />
                      설정
                    </button>
                    <button
                      className="flex w-full items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      onClick={handleLogout}
                    >
                      <LogOutIcon className="h-4 w-4" />
                      로그아웃
                    </button>
                  </div>
                </div>
              )}
            </>
          ) : (
            <div
              className={cn(
                isCollapsed
                  ? 'flex flex-col items-center gap-2'
                  : 'grid grid-cols-2 gap-2'
              )}
            >
              <Link href="/auth/login">
                <Button
                  variant="outline"
                  className={cn(isCollapsed ? 'h-8 w-8 p-0' : 'w-full')}
                  title="로그인"
                >
                  {!isCollapsed ? '로그인' : 'L'}
                </Button>
              </Link>
              {!isCollapsed && (
                <Link href="/auth/signup">
                  <Button className="w-full">회원가입</Button>
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  )
}
