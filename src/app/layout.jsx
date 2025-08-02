"use client"
import "./globals.css"
import { SidebarNav } from "@/components/sidebar-nav"
import { Inter } from "next/font/google"
import { Toaster } from "sonner"
import { useState } from "react"
import { cn } from "@/lib/utils"

const inter = Inter({ subsets: ["latin"] })

export default function RootLayout({ children }) {
  const [isCollapsed, setIsCollapsed] = useState(false)

  return (
    <html lang="ko">
      <body className={inter.className}>
          <div className="flex flex-col md:flex-row h-screen bg-gradient-to-b from-gray-50 via-purple-50 to-pink-50">
            <SidebarNav onCollapseChange={setIsCollapsed} />
            <main className={cn(
              "flex-1 flex flex-col overflow-auto p-2 md:p-6 gap-4",
              !isCollapsed && "md:ml-0"
            )}>{children}</main>
          </div>
          <Toaster />
      </body>
    </html>
  )
}
