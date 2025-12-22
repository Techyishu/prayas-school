"use client"

import * as React from "react"
import { useEffect, useState, useRef } from "react"

export function CursorGlow() {
    const [position, setPosition] = useState({ x: 0, y: 0 })
    const [isVisible, setIsVisible] = useState(false)
    const [isTouchDevice, setIsTouchDevice] = useState(true) // Default to true to prevent flash
    const glowRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        // Check if touch device on mount
        setIsTouchDevice(window.matchMedia("(pointer: coarse)").matches)

        const handleMouseMove = (e: MouseEvent) => {
            setPosition({ x: e.clientX, y: e.clientY })
            if (!isVisible) setIsVisible(true)
        }

        const handleMouseLeave = () => {
            setIsVisible(false)
        }

        window.addEventListener("mousemove", handleMouseMove)
        document.body.addEventListener("mouseleave", handleMouseLeave)

        return () => {
            window.removeEventListener("mousemove", handleMouseMove)
            document.body.removeEventListener("mouseleave", handleMouseLeave)
        }
    }, [isVisible])

    // Don't render on mobile/touch devices
    if (isTouchDevice) {
        return null
    }

    return (
        <div
            ref={glowRef}
            className="fixed pointer-events-none z-0 transition-opacity duration-300"
            style={{
                left: position.x,
                top: position.y,
                opacity: isVisible ? 1 : 0,
                width: 500,
                height: 500,
                transform: "translate(-50%, -50%)",
                background: "radial-gradient(circle, rgba(13, 148, 136, 0.12) 0%, transparent 70%)",
                borderRadius: "50%",
            }}
        />
    )
}
