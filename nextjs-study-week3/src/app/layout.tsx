import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import Link from "next/link"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <nav className="flex space-x-4 border-b border-gray-200 p-4 mb-2">
          <Link href="/">SSG</Link>
          <Link href="/ssr">SSR</Link>
          <Link href="/csr">CSR</Link>
          <Link href="/isr">ISR</Link>
        </nav>
        {children}
      </body>
    </html>
  )
}
