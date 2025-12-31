"use client"

import { motion } from "framer-motion"
import { Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"

interface SectionHeadingProps {
    pill?: string
    title: string
    highlight?: string
    description?: string
    align?: "left" | "center"
    className?: string
    light?: boolean // For dark backgrounds (default true)
}

export function SectionHeading({
    pill,
    title,
    highlight,
    description,
    align = "center",
    className,
    light = true
}: SectionHeadingProps) {
    return (
        <div className={cn("mb-16", align === "center" ? "text-center" : "text-left", className)}>
            {/* Pill */}
            {pill && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className={cn(
                        "inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold uppercase tracking-wider mb-6",
                        light
                            ? "bg-teal-500/10 border border-teal-500/30 text-teal-400"
                            : "bg-teal-500/10 border border-teal-500/20 text-teal-700"
                    )}
                >
                    <Sparkles className="w-4 h-4" />
                    {pill}
                </motion.div>
            )}

            {/* Title */}
            <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className={cn(
                    "heading-lg mb-6",
                    light ? "text-white" : "text-navy-900"
                )}
            >
                {title}
                {highlight && (
                    <span className={cn("ml-0.5", light ? "gradient-text-gold" : "text-teal-600")}>
                        {" "}{highlight}
                    </span>
                )}
            </motion.h2>

            {/* Description */}
            {description && (
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className={cn(
                        "text-lg md:text-xl max-w-2xl leading-relaxed",
                        align === "center" && "mx-auto",
                        light ? "text-blue-100/70" : "text-navy-900/70"
                    )}
                >
                    {description}
                </motion.p>
            )}
        </div>
    )
}
