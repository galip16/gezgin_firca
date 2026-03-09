"use client"

import Image from "next/image"
import { useEffect, useState } from "react"

export default function SplashScreen() {
  const [visible, setVisible] = useState(false)
  const [fadeOut, setFadeOut] = useState(false)

  useEffect(() => {
    const hasSeenSplash = localStorage.getItem("splash_seen")

    if (!hasSeenSplash) {
      setVisible(true)

      setTimeout(() => {
        setFadeOut(true)

        setTimeout(() => {
          setVisible(false)
          localStorage.setItem("splash_seen", "true")
        }, 600)

      }, 3000)
    }
  }, [])

  if (!visible) return null

  return (
    <div
      className={`fixed inset-0 z-200 flex items-center justify-center flex-col bg-white transition-opacity duration-500 ${fadeOut ? "opacity-0" : "opacity-100"
        }`}
    >
      <h1 className="text-4xl md:text-6xl font-black tracking-tighter bg-linear-to-r from-gray-900 to-gray-500 bg-clip-text text-transparent mb-8">
        Tanıdık bir sima
      </h1>      <Image
        src="/splash.png"
        alt="Splash"
        className="max-w-[80%] max-h-[80%] object-contain"
        priority
        width={1080}
        height={1920}
      />
    </div>
  )
}