"use client"

import { useState, useEffect } from "react"
import LoginForm from "@/components/LoginForm"
import Link from "next/link"

export default function AdminDashboard() {
    const [loggedIn, setLoggedIn] = useState(false)

    // Sayfa yüklendiğinde giriş durumunu kontrol et
    useEffect(() => {
        const auth = localStorage.getItem("isAdmin")
        if (auth === "true") setLoggedIn(true)
    }, [])

    const handleLogin = () => {
        setLoggedIn(true)
        localStorage.setItem("isAdmin", "true")
    }

    const handleLogout = () => {
        setLoggedIn(false)
        localStorage.removeItem("isAdmin")
    }

    return loggedIn ? (
        <div className="min-h-screen bg-slate-50 font-sans antialiased text-slate-900">
            {/* Üst Bar */}
            <nav className="bg-white border-b border-slate-200 px-6 py-4 flex justify-between items-center sticky top-0 z-10 shadow-sm">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                        <span className="text-white font-bold text-xl">A</span>
                    </div>
                    <h1 className="text-xl font-bold tracking-tight text-slate-800">Kontrol Paneli</h1>
                </div>
                <button 
                    onClick={handleLogout}
                    className="px-4 py-2 text-sm font-semibold text-red-600 hover:bg-red-50 rounded-lg transition-colors border border-transparent hover:border-red-100"
                >
                    Güvenli Çıkış
                </button>
            </nav>

            <main className="max-w-6xl mx-auto p-8">
                <header className="mb-10">
                    <h2 className="text-3xl font-extrabold text-slate-900">Mağaza Yönetimi</h2>
                    <p className="text-slate-500 mt-2 text-lg">Hızlı erişim menüsüyle operasyonları yönetin.</p>
                </header>

                {/* Kartlar Konteyner */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Ürün Kartı */}
                    <Link href="/admin/products" className="group block">
                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 hover:border-indigo-500 hover:shadow-xl hover:shadow-indigo-500/10 transition-all duration-300 transform hover:-translate-y-1">
                            <div className="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-7 h-7">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold mb-2 group-hover:text-indigo-600 transition-colors">Ürün Girişi</h3>
                            <p className="text-slate-500 leading-relaxed">Yeni stok ekleyin, fiyatları güncelleyin ve ürün katalogunuzu düzenleyin.</p>
                            <div className="mt-6 flex items-center text-indigo-600 font-semibold text-sm">
                                Yönetmeye Başla 
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </div>
                        </div>
                    </Link>

                    {/* Sipariş Kartı */}
                    <Link href="/admin/orders" className="group block">
                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 hover:border-emerald-500 hover:shadow-xl hover:shadow-emerald-500/10 transition-all duration-300 transform hover:-translate-y-1">
                            <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-7 h-7">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.375m1.875-10.375h-3c-1.104 0-2 .896-2 2V21M3 6.375c0-1.104.896-2 2-2H15c1.104 0 2 .896 2 2V21m-12 0h12" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold mb-2 group-hover:text-emerald-600 transition-colors">Sipariş Görüntüleme</h3>
                            <p className="text-slate-500 leading-relaxed">Müşteri siparişlerini takip edin, durumlarını güncelleyin ve faturaları kontrol edin.</p>
                            <div className="mt-6 flex items-center text-emerald-600 font-semibold text-sm">
                                Siparişleri Aç 
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </div>
                        </div>
                    </Link>
                </div>
            </main>
        </div>
    ) : (
        <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
            <div className="w-full max-w-100 bg-white rounded-3xl shadow-2xl p-10 border border-slate-200">
                <div className="text-center mb-8">
                    <h2 className="text-2xl font-black text-slate-800 uppercase tracking-widest">Giriş Yap</h2>
                    <p className="text-slate-400 text-sm mt-2 font-medium">Lütfen admin yetkilerinizi kullanın.</p>
                </div>
                <LoginForm onLogin={handleLogin} />
            </div>
        </div>
    )
}