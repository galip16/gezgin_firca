"use client"

import React from "react"


export default function FloatingContactButton() {
    return (
        <div className="fixed bottom-4 left-6 z-50 flex flex-col gap-2">
            {/* Telefon */}
            <a
                href="tel:+905555555555"
                className="bg-black text-white p-3 rounded-full shadow-lg transition flex items-center justify-center"
                aria-label="Telefonla ara"
            >
                Ara
            </a>

            {/* WhatsApp */}
            <a
                href="https://wa.me/905555555555?text=Merhaba,%20siparişimle%20ilgili%20yardım%20istiyorum"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full text-white bg-green-500 p-3 shadow-lg transition flex items-center justify-center"
                aria-label="WhatsApp'tan mesaj gönder"
            >
                Mesaj
            </a>
        </div>
    )
}
