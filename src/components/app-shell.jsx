'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { SidebarNav } from '@/components/sidebar-nav'
import { Button } from '@/components/ui/button'
import { Toaster } from 'sonner'
import { cn } from '@/lib/utils'

export function AppShell({ children }) {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const router = useRouter()

  const handleLoginClick = () => {
    router.push('/auth/login')
  }

  return (
    <>
      {/* Mobile Header */}
      <div className="flex items-center justify-between border-b border-gray-200 bg-white px-4 py-3 md:hidden">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-r from-purple-500 to-pink-500">
            <span className="text-sm font-bold text-white">S</span>
          </div>
          <span className="text-lg font-semibold text-gray-900">
            SupportHub
          </span>
        </div>
        <Button
          variant="outline"
          size="sm"
          className="border-gray-300 text-gray-700"
          onClick={handleLoginClick}
        >
          로그인
        </Button>
      </div>

      <div className="flex h-screen flex-col bg-gradient-to-b from-gray-50 via-purple-50 to-pink-50 md:flex-row">
        <SidebarNav onCollapseChange={setIsCollapsed} />
        <main
          className={cn(
            'flex flex-1 flex-col gap-4 overflow-auto p-2 md:p-6',
            !isCollapsed && 'md:ml-0'
          )}
        >
          {children}
        </main>
      </div>
      <Toaster />
    </>
  )
}
