"use client"

import { motion } from "framer-motion"
import { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface PageHeaderProps {
    badge?: string
    badgeIcon?: LucideIcon
    title: string
    highlight?: string
    description: string
    className?: string
}

export function PageHeader({
    badge,
    badgeIcon: BadgeIcon,
    title,
    highlight,
    description,
    className
}: PageHeaderProps) {
    return (
        <section className={cn("relative py-32 overflow-hidden", className)}>
            {/* Background */}
            <div className="absolute inset-0 bg-navy-gradient" />
            <div className="absolute inset-0 grid-pattern opacity-30" />

            {/* Floating orbs */}
            <div className="absolute top-20 left-10 w-64 h-64 bg-teal-500/20 rounded-full blur-3xl" />
            <div className="absolute bottom-20 right-10 w-80 h-80 bg-gold-500/15 rounded-full blur-3xl" />

            <div className="container-custom relative z-10 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    {badge && (
                        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-teal-400 text-sm font-semibold uppercase tracking-wide mb-6">
                            {BadgeIcon && <BadgeIcon className="w-4 h-4" />}
                            {badge}
                        </span>
                    )}
                    <h1 className="heading-xl text-white mb-6">
                        {title}
                        {highlight && (
                            <span className="gradient-text-gold"> {highlight}</span>
                        )}
                    </h1>
                    <p className="text-xl text-blue-100/80 max-w-2xl mx-auto">
                        {description}
                    </p>
                </motion.div>
            </div>
        </section>
    )
}
