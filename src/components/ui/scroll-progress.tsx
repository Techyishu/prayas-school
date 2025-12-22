"use client"

import * as React from "react"
import { useState, useEffect } from "react"

export function ScrollProgress() {
    const [progress, setProgress] = useState(0)

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY
            const docHeight = document.documentElement.scrollHeight - window.innerHeight
            const scrollPercent = (scrollTop / docHeight) * 100
            setProgress(scrollPercent)
        }

        window.addEventListener("scroll", handleScroll, { passive: true })
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    return (
        <div
            className="fixed top-0 left-0 h-[3px] z-[9999] transition-[width] duration-100"
            style={{
                width: `${progress}%`,
                background: "linear-gradient(90deg, #0D9488 0%, #F59E0B 100%)",
            }}
        />
    )
}
