"use client"

import { useState } from "react"
import AdminProductForm from "@/components/AdminProductForm"
import LoginForm from "@/components/LoginForm"

export default function AdminProductsPage() {
  const [loggedIn, setLoggedIn] = useState(false)

  return loggedIn ? (
    <AdminProductForm />
  ) : (
    <LoginForm onLogin={() => setLoggedIn(true)} />
  )
}
