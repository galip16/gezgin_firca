"use client"

import Link from "next/link"

export default function AdminDashboard() {

    return (
        <div className="min-h-screen bg-slate-50 font-sans antialiased text-slate-900">
            {/* Üst Bar */}
            <nav className="bg-white border-b border-slate-200 px-6 py-4 flex justify-between items-center sticky top-0 z-10 shadow-sm">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                        <span className="text-white font-bold text-xl">A</span>
                    </div>
                    <h1 className="text-xl font-bold tracking-tight text-slate-800">Kontrol Paneli</h1>
                </div>

            </nav>

            <main className="max-w-6xl mx-auto p-8">
                <header className="mb-10">
                    <h2 className="text-3xl font-extrabold text-slate-900">Mağaza Yönetimi</h2>
                    <p className="text-slate-500 mt-2 text-lg">Hızlı erişim menüsüyle operasyonları yönetin.</p>
                </header>


                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Ürün ekleme */}
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
                    {/* Ürün güncelleme */}
                    <Link href="/admin/products/edit" className="group block">
                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 hover:border-amber-500 hover:shadow-xl hover:shadow-amber-500/10 transition-all duration-300 transform hover:-translate-y-1">
                            <div className="w-14 h-14 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={2}
                                    stroke="currentColor"
                                    className="w-7 h-7"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897L16.862 4.487z"
                                    />
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M19.5 7.5L16.5 4.5"
                                    />
                                </svg>
                            </div>

                            <h3 className="text-xl font-bold mb-2 group-hover:text-amber-600 transition-colors">
                                Ürün Güncelleme
                            </h3>

                            <p className="text-slate-500 leading-relaxed">
                                Mevcut ürünlerin fiyat, stok, açıklama, kategori ve görsellerini
                                güncelleyin.
                            </p>

                            <div className="mt-6 flex items-center text-amber-600 font-semibold text-sm">
                                Ürünleri Düzenle
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M9 5l7 7-7 7"
                                    />
                                </svg>
                            </div>
                        </div>
                    </Link>

                    {/* Sipariş görüntüleme */}
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
    )
}