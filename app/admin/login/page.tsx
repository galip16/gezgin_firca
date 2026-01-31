"use client"

import { useState } from "react"
import AdminProductForm from "@/components/AdminProductForm"
import LoginForm from "@/components/LoginForm"

export default function AdminPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  return (
    <div className="min-h-screen bg-gray-50">
      {isLoggedIn ? (
        <AdminProductForm />
      ) : (
        <LoginForm onLogin={() => setIsLoggedIn(true)} />
      )}
    </div>
  )
}
