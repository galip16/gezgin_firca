import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import SplashScreen from "@/components/SplashScreen"

import "./globals.css"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  metadataBase: new URL("https://gezgin-firca.vercel.app"),

  title: {
    default: "Gezgin Temizlik",
    template: "%s | Gezgin Temizlik",
  },

  description:
    "Gezgin Temizlik ile temizlik ürünlerini keşfedin ve kolayca sipariş verin.",

  keywords: [
    "gezgin temizlik",
    "temizlik ürünleri",
    "temizlik malzemeleri",
    "hijyen ürünleri",
    "temizlik siparişi",
    "temizlik ürünleri sipariş",
  ],

  authors: [
    {
      name: "Gezgin Temizlik",
    },
  ],

  creator: "Gezgin Temizlik",

  icons: {
    icon: [
      {
        url: "/favicon.ico",
        sizes: "any",
      },
      {
        url: "/icon-16x16.png",
        type: "image/png",
        sizes: "16x16",
      },
      {
        url: "/icon-32x32.png",
        type: "image/png",
        sizes: "32x32",
      },
      {
        url: "/icon-48x48.png",
        type: "image/png",
        sizes: "48x48",
      },
    ],

    apple: [
      {
        url: "/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  },

  openGraph: {
    title: "Gezgin Temizlik",
    description:
      "Temizlik ürünlerini keşfedin ve kolayca sipariş verin.",
    type: "website",
    locale: "tr_TR",
    siteName: "Gezgin Temizlik",

    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Gezgin Temizlik",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Gezgin Temizlik",
    description:
      "Temizlik ürünlerini keşfedin ve kolayca sipariş verin.",
    images: ["/og-image.png"],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },

  category: "shopping",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="tr">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SplashScreen />
        {children}
      </body>
    </html>
  )
}
