"use client"

import * as React from "react"
import { useEffect, useState, useRef } from "react"
import { motion, useInView } from "framer-motion"

interface StatsCounterProps {
    value: number
    suffix?: string
    prefix?: string
    label: string
    duration?: number
    delay?: number
}

export function StatsCounter({
    value,
    suffix = "",
    prefix = "",
    label,
    duration = 2,
    delay = 0,
}: StatsCounterProps) {
    const [count, setCount] = useState(0)
    const [hasAnimated, setHasAnimated] = useState(false)
    const ref = useRef<HTMLDivElement>(null)
    const isInView = useInView(ref, { once: true, margin: "-100px" })

    useEffect(() => {
        if (isInView && !hasAnimated) {
            setHasAnimated(true)

            const startTime = performance.now()
            const animate = (currentTime: number) => {
                const elapsed = (currentTime - startTime) / 1000
                const delayedElapsed = elapsed - delay

                if (delayedElapsed < 0) {
                    requestAnimationFrame(animate)
                    return
                }

                const progress = Math.min(delayedElapsed / duration, 1)
                const easeOutQuart = 1 - Math.pow(1 - progress, 4)
                const currentValue = Math.floor(easeOutQuart * value)

                setCount(currentValue)

                if (progress < 1) {
                    requestAnimationFrame(animate)
                }
            }

            requestAnimationFrame(animate)
        }
    }, [isInView, value, duration, delay, hasAnimated])

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: delay }}
            className="text-center group"
        >
            <div className="relative">
                {/* Background glow on hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-teal-500/0 via-teal-500/10 to-teal-500/0 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight">
                    <span className="bg-gradient-to-r from-white via-white to-blue-200 bg-clip-text text-transparent">
                        {prefix}{count.toLocaleString()}{suffix}
                    </span>
                </div>
            </div>
            <div className="mt-3 text-blue-200/80 font-medium text-sm md:text-base uppercase tracking-widest">
                {label}
            </div>
        </motion.div>
    )
}

// Floating Stats Container for parallax effect
interface FloatingStatsProps {
    children: React.ReactNode
    className?: string
    offset?: number
}

export function FloatingStats({ children, className, offset = 10 }: FloatingStatsProps) {
    const [scrollY, setScrollY] = useState(0)

    useEffect(() => {
        const handleScroll = () => {
            setScrollY(window.scrollY)
        }

        window.addEventListener("scroll", handleScroll, { passive: true })
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    return (
        <motion.div
            style={{
                transform: `translateY(${scrollY * (offset / 100)}px)`,
            }}
            className={className}
        >
            {children}
        </motion.div>
    )
}
