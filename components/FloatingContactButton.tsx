"use client"

import { useEffect, useRef, useState } from "react"

export default function FloatingContactButton() {
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null)

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                setOpen(false)
            }
        }

        document.addEventListener("mousedown", handleClickOutside)

        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [])


    return (
        <div ref={ref} className="fixed bottom-6 left-6 z-50 flex flex-col items-start gap-3">

            {open && (
                <div className="flex flex-col gap-2 bg-white p-3 rounded-xl shadow-xl border animate-in fade-in slide-in-from-bottom-2">

                    <a
                        href="tel:+905376370691"
                        className="flex items-center gap-2 text-sm px-3 py-2 rounded-lg hover:bg-gray-100 transition"
                    >
                        📞 Telefonla Ara
                    </a>

                    <a
                        href="https://wa.me/905376370681?text=Merhaba,%20siparişimle%20ilgili%20yardım%20istiyorum"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-sm px-3 py-2 rounded-lg hover:bg-gray-100 transition"
                    >
                        💬 WhatsApp Yaz
                    </a>

                </div>
            )}

            <button
                onClick={() => setOpen(!open)}
                className="flex items-center gap-2 bg-[#0A4F8E] text-white px-4 py-3 rounded-full shadow-lg hover:scale-105 transition"
            >
                💬 Yardım
            </button>

        </div>
    )
}