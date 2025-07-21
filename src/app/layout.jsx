import "./globals.css"
import { SidebarNav } from "@/components/sidebar-nav"
import { Inter } from "next/font/google"
import { Toaster } from "sonner"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "SupportHub - 마음을 나누는 AI 감정공감 플랫폼",
  description: "AI와 함께하는 감정 공감 대화 플랫폼",
  generator: "v0.dev",
}

export default async function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body className={inter.className}>
          <div className="flex h-screen bg-gray-50">
            <SidebarNav />
            <main className="flex-1 flex flex-col overflow-auto">{children}</main>
          </div>
          <Toaster />
      </body>
    </html>
  )
}
