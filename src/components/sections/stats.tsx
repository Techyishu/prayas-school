"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { StatsCounter } from "@/components/ui/stats-counter"
import { Award, Shield, CheckCircle } from "lucide-react"

const stats = [
    { value: 18000, suffix: "+", label: "Visas Processed", description: "Success stories created" },
    { value: 18, suffix: "+", label: "Years Experience", description: "Since 2007" },
    { value: 70, suffix: "+", label: "Team Members", description: "Expert counsellors" },
    { value: 100, suffix: "%", label: "Success Rate", description: "Student visas" },
]

const certifications = [
    { name: "QUEAC", label: "Australia Certified" },
    { name: "British Council", label: "UK Certified" },
    { name: "IRCC", label: "Canada Certified" },
]

export function Stats() {
    return (
        <section className="relative py-24 overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-navy-gradient" />

            {/* Animated gradient overlay */}
            <motion.div
                animate={{
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{ duration: 15, repeat: Infinity }}
                className="absolute inset-0 opacity-30"
                style={{
                    background: "linear-gradient(45deg, rgba(13, 148, 136, 0.3), rgba(245, 158, 11, 0.2), rgba(13, 148, 136, 0.3))",
                    backgroundSize: "200% 200%",
                }}
            />

            {/* Grid pattern */}
            <div className="absolute inset-0 grid-pattern opacity-20" />

            {/* Floating orbs */}
            <motion.div
                animate={{
                    y: [0, -30, 0],
                    opacity: [0.3, 0.5, 0.3],
                }}
                transition={{ duration: 8, repeat: Infinity }}
                className="absolute top-20 left-[10%] w-64 h-64 bg-teal-500/20 rounded-full blur-3xl"
            />
            <motion.div
                animate={{
                    y: [0, 30, 0],
                    opacity: [0.2, 0.4, 0.2],
                }}
                transition={{ duration: 10, repeat: Infinity, delay: 1 }}
                className="absolute bottom-20 right-[15%] w-80 h-80 bg-gold-500/15 rounded-full blur-3xl"
            />

            <div className="container-custom relative z-10">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 text-teal-400 text-sm font-semibold uppercase tracking-wide mb-4">
                        Our Track Record
                    </span>
                    <h2 className="heading-lg text-white mb-4">
                        Numbers That <span className="gradient-text-gold">Speak</span>
                    </h2>
                    <p className="text-blue-100/70 max-w-xl mx-auto">
                        18 years of excellence in helping students achieve their study abroad dreams.
                    </p>
                </motion.div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="text-center"
                        >
                            <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                                <StatsCounter end={stat.value} suffix={stat.suffix} />
                            </div>
                            <div className="text-lg font-semibold text-blue-100 mb-1">
                                {stat.label}
                            </div>
                            <div className="text-sm text-blue-200/60">
                                {stat.description}
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Trust Badges */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="flex flex-wrap items-center justify-center gap-6"
                >
                    {certifications.map((cert, index) => (
                        <div
                            key={cert.name}
                            className="flex items-center gap-3 px-6 py-3 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20"
                        >
                            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-teal-500 to-teal-600 flex items-center justify-center">
                                <CheckCircle className="h-5 w-5 text-white" />
                            </div>
                            <div>
                                <div className="font-bold text-white">{cert.name}</div>
                                <div className="text-xs text-blue-200/70">{cert.label}</div>
                            </div>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    )
}
