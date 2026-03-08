"use client"

export default function PrintButton() {
  return (
    <button
      onClick={() => window.print()}
      className="bg-amber-600 text-white px-4 py-2 rounded"
    >
      PDF Yazdır
    </button>
  )
}