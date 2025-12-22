"use client"

import * as React from "react"
import { motion as m, type HTMLMotionProps } from "framer-motion"
import { cn } from "@/lib/utils"

interface GlassCardProps extends HTMLMotionProps<"div"> {
    glow?: "teal" | "gold" | "none"
    hover?: boolean
    children: React.ReactNode
}

export function GlassCard({
    className,
    glow = "none",
    hover = true,
    children,
    ...props
}: GlassCardProps) {
    const glowClasses = {
        teal: "hover:shadow-[0_0_40px_rgba(13,148,136,0.2)]",
        gold: "hover:shadow-[0_0_40px_rgba(245,158,11,0.2)]",
        none: "",
    }

    return (
        <m.div
            className={cn(
                "relative rounded-2xl overflow-hidden",
                "bg-white/80 backdrop-blur-xl",
                "border border-white/30",
                "shadow-[0_25px_50px_-12px_rgba(0,0,0,0.12),inset_0_1px_0_0_rgba(255,255,255,0.5)]",
                hover && "transition-all duration-500 ease-out",
                hover && "hover:scale-[1.02] hover:rotate-[0.5deg]",
                hover && "hover:shadow-[0_35px_60px_-12px_rgba(0,0,0,0.18),inset_0_1px_0_0_rgba(255,255,255,0.6)]",
                glowClasses[glow],
                className
            )}
            whileHover={hover ? { y: -8 } : undefined}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            {...props}
        >
            {/* Inner glow effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent pointer-events-none" />

            {/* Content */}
            <div className="relative z-10">
                {children}
            </div>
        </m.div>
    )
}

// Glass Card Header
export function GlassCardHeader({
    className,
    children,
    ...props
}: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div className={cn("flex flex-col space-y-1.5 p-6", className)} {...props}>
            {children}
        </div>
    )
}

// Glass Card Content
export function GlassCardContent({
    className,
    children,
    ...props
}: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div className={cn("p-6 pt-0", className)} {...props}>
            {children}
        </div>
    )
}
