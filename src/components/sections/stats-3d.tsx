"use client"

import * as React from "react"
import { useRef, useEffect, useState } from "react"
import { motion, useInView, useAnimation } from "framer-motion"
import { Award, Shield, CheckCircle, Sparkles } from "lucide-react"

interface AnimatedCounterProps {
    end: number
    suffix: string
    duration?: number
    delay?: number
}

// Animated Counter with 3D-like number flip effect
function AnimatedCounter({ end, suffix, duration = 2, delay = 0 }: AnimatedCounterProps) {
    const [count, setCount] = useState(0)
    const ref = useRef<HTMLDivElement>(null)
    const isInView = useInView(ref, { once: true, margin: "-100px" })

    useEffect(() => {
        if (!isInView) return

        const startTime = Date.now()
        const startDelay = delay * 1000

        const timer = setTimeout(() => {
            const animate = () => {
                const elapsed = Date.now() - startTime - startDelay
                const progress = Math.min(elapsed / (duration * 1000), 1)

                // Easing function for smooth counting
                const eased = 1 - Math.pow(1 - progress, 4)
                setCount(Math.floor(end * eased))

                if (progress < 1) {
                    requestAnimationFrame(animate)
                }
            }

            requestAnimationFrame(animate)
        }, startDelay)

        return () => clearTimeout(timer)
    }, [isInView, end, duration, delay])

    return (
        <div ref={ref} className="relative">
            <motion.span
                initial={{ opacity: 0, y: 20, rotateX: -45 }}
                animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
                transition={{ duration: 0.8, delay }}
                className="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-white via-amber-100 to-amber-500 drop-shadow-[0_0_25px_rgba(245,158,11,0.5)]"
                style={{
                    textShadow: "0 0 40px rgba(245, 158, 11, 0.4), 0 0 80px rgba(245, 158, 11, 0.2)"
                }}
            >
                {count.toLocaleString()}{suffix}
            </motion.span>

            {/* Spotlight glow behind number */}
            <div className="absolute inset-0 -z-10 flex items-center justify-center">
                <div className="w-32 h-32 bg-amber-500/20 rounded-full blur-3xl" />
            </div>
        </div>
    )
}

const stats = [
    { value: 1000, suffix: "+", label: "Students", description: "Currently enrolled", delay: 0 },
    { value: 24, suffix: "+", label: "Years", description: "Of excellence", delay: 0.2 },
    { value: 50, suffix: "+", label: "Teachers", description: "Expert faculty", delay: 0.4 },
    { value: 95, suffix: "%", label: "Success Rate", description: "Board results", delay: 0.6 },
]

const certifications = [
    { name: "CBSE", label: "Affiliated", color: "from-teal-500 to-emerald-600" },
    { name: "ISO 9001", label: "Certified", color: "from-blue-500 to-indigo-600" },
    { name: "Govt. Approved", label: "Recognized", color: "from-red-500 to-rose-600" },
]

// Pre-computed particle positions (deterministic to avoid hydration mismatch)
const PARTICLE_POSITIONS = [
    { left: 5, top: 10, duration: 4, delay: 0 },
    { left: 15, top: 25, duration: 5, delay: 0.5 },
    { left: 25, top: 15, duration: 3.5, delay: 1 },
    { left: 35, top: 45, duration: 4.5, delay: 0.3 },
    { left: 45, top: 30, duration: 5.5, delay: 1.2 },
    { left: 55, top: 60, duration: 4, delay: 0.8 },
    { left: 65, top: 20, duration: 3.8, delay: 1.5 },
    { left: 75, top: 50, duration: 5.2, delay: 0.2 },
    { left: 85, top: 35, duration: 4.2, delay: 1.8 },
    { left: 95, top: 70, duration: 3.6, delay: 0.6 },
    { left: 10, top: 80, duration: 4.8, delay: 1.1 },
    { left: 20, top: 55, duration: 5.1, delay: 0.4 },
    { left: 30, top: 90, duration: 3.9, delay: 1.6 },
    { left: 40, top: 75, duration: 4.3, delay: 0.9 },
    { left: 50, top: 5, duration: 5.3, delay: 1.3 },
    { left: 60, top: 85, duration: 4.1, delay: 0.1 },
    { left: 70, top: 40, duration: 3.7, delay: 1.9 },
    { left: 80, top: 65, duration: 5.4, delay: 0.7 },
    { left: 90, top: 95, duration: 4.6, delay: 1.4 },
    { left: 8, top: 42, duration: 4.7, delay: 0.25 },
    { left: 18, top: 68, duration: 3.4, delay: 1.7 },
    { left: 28, top: 12, duration: 5.6, delay: 0.55 },
    { left: 38, top: 88, duration: 4.4, delay: 1.05 },
    { left: 48, top: 22, duration: 3.3, delay: 1.85 },
    { left: 58, top: 78, duration: 5.8, delay: 0.35 },
    { left: 68, top: 8, duration: 4.9, delay: 1.25 },
    { left: 78, top: 52, duration: 3.2, delay: 0.85 },
    { left: 88, top: 28, duration: 5.7, delay: 1.55 },
    { left: 98, top: 62, duration: 4.05, delay: 0.15 },
    { left: 3, top: 98, duration: 5.05, delay: 1.45 },
]

export function Stats3D() {
    return (
        <section className="relative py-32 overflow-hidden">
            {/* Deep space background */}
            <div className="absolute inset-0 bg-gradient-to-b from-navy-950 via-[#0a0f2e] to-navy-950" />

            {/* Animated nebula effect */}
            <motion.div
                animate={{
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                    opacity: [0.3, 0.5, 0.3],
                }}
                transition={{ duration: 20, repeat: Infinity }}
                className="absolute inset-0"
                style={{
                    background: "radial-gradient(ellipse at center, rgba(245, 158, 11, 0.1) 0%, transparent 50%)",
                }}
            />

            {/* Cyber grid */}
            <div className="absolute inset-0 cyber-grid opacity-20" />

            {/* Floating particles - using deterministic positions to avoid hydration mismatch */}
            {PARTICLE_POSITIONS.map((particle, i) => (
                <motion.div
                    key={i}
                    className="absolute w-1 h-1 bg-amber-400/60 rounded-full"
                    style={{
                        left: `${particle.left}%`,
                        top: `${particle.top}%`,
                    }}
                    animate={{
                        y: [0, -30, 0],
                        opacity: [0.2, 0.8, 0.2],
                        scale: [1, 1.5, 1],
                    }}
                    transition={{
                        duration: particle.duration,
                        repeat: Infinity,
                        delay: particle.delay,
                    }}
                />
            ))}

            {/* Spotlight beams */}
            <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-amber-500/20 to-transparent" />
            <div className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-transparent via-cyan-500/20 to-transparent" />
            <div className="absolute top-0 left-1/2 w-px h-full bg-gradient-to-b from-amber-500/30 via-transparent to-transparent" />

            <div className="container-custom relative z-10">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-20"
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-sm font-semibold uppercase tracking-wider mb-6"
                    >
                        <Sparkles className="w-4 h-4 animate-pulse" />
                        Our Track Record
                    </motion.div>
                    <h2 className="heading-lg text-white mb-4">
                        Numbers That <span className="text-metallic-gold">Speak</span>
                    </h2>
                    <p className="text-blue-100/60 max-w-xl mx-auto">
                        Over two decades of excellence in nurturing young minds and building future leaders.
                    </p>
                </motion.div>

                {/* Stats Grid with 3D Numbers */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 mb-20">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="text-center group"
                        >
                            <div className="relative mb-4 perspective-1000">
                                <AnimatedCounter
                                    end={stat.value}
                                    suffix={stat.suffix}
                                    delay={stat.delay}
                                />
                            </div>
                            <motion.div
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                transition={{ delay: stat.delay + 0.5 }}
                                className="space-y-1"
                            >
                                <div className="text-lg font-semibold text-blue-100">
                                    {stat.label}
                                </div>
                                <div className="text-sm text-blue-200/50">
                                    {stat.description}
                                </div>
                            </motion.div>

                            {/* Glow effect on hover */}
                            <div className="absolute inset-0 rounded-3xl bg-amber-500/5 opacity-0 group-hover:opacity-100 transition-opacity blur-xl pointer-events-none" />
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
                        <motion.div
                            key={cert.name}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.8 + index * 0.1 }}
                            whileHover={{ scale: 1.05, y: -3 }}
                            className="group flex items-center gap-3 px-6 py-4 rounded-2xl glass-card-3d cursor-pointer"
                        >
                            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${cert.color} flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow`}>
                                <CheckCircle className="h-6 w-6 text-white" />
                            </div>
                            <div>
                                <div className="font-bold text-white">{cert.name}</div>
                                <div className="text-xs text-blue-200/60">{cert.label}</div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    )
}

export default Stats3D
