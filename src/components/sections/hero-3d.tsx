"use client"

import * as React from "react"
import { Suspense, useRef, useEffect, useState } from "react"
import dynamic from "next/dynamic"
import { motion, useScroll, useTransform } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, Phone, ChevronDown, Sparkles, GraduationCap, Globe, Users } from "lucide-react"

// Dynamic imports for 3D components (better performance)
const Globe3D = dynamic(() => import("@/components/3d/Globe").then(mod => mod.Globe3D), {
    ssr: false,
    loading: () => <GlobeLoader />
})

// Loading skeleton for 3D globe
function GlobeLoader() {
    return (
        <div className="w-full h-full flex items-center justify-center">
            <div className="relative">
                {/* Animated loading rings */}
                <div className="w-64 h-64 rounded-full border border-cyan-500/30 animate-pulse" />
                <div className="absolute inset-4 rounded-full border border-cyan-500/20 animate-ping"
                    style={{ animationDuration: "2s" }} />
                <div className="absolute inset-8 rounded-full border border-cyan-500/10 animate-pulse"
                    style={{ animationDelay: "0.5s" }} />
                <div className="absolute inset-0 flex items-center justify-center">
                    <Globe className="w-12 h-12 text-cyan-500/50 animate-spin"
                        style={{ animationDuration: "3s" }} />
                </div>
            </div>
        </div>
    )
}

// Floating stats cards component
function FloatingCards() {
    return (
        <>
            {/* Card 1 - Visas */}
            <motion.div
                initial={{ opacity: 0, x: 100, y: 0 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ duration: 0.8, delay: 1 }}
                className="absolute top-20 right-10 z-20"
            >
                <motion.div
                    animate={{ y: [0, -15, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="glass-card-3d p-5 rounded-2xl backdrop-blur-xl bg-white/10 border border-white/20"
                >
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-teal-500 to-teal-600 flex items-center justify-center neon-glow-teal">
                            <GraduationCap className="h-6 w-6 text-white" />
                        </div>
                        <div>
                            <div className="text-2xl font-bold text-white">18,000+</div>
                            <div className="text-sm text-cyan-200/80">Visas Processed</div>
                        </div>
                    </div>
                </motion.div>
            </motion.div>

            {/* Card 2 - Countries */}
            <motion.div
                initial={{ opacity: 0, x: 100, y: 0 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ duration: 0.8, delay: 1.2 }}
                className="absolute top-48 right-28 z-20"
            >
                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                    className="glass-card-3d p-5 rounded-2xl backdrop-blur-xl bg-white/10 border border-white/20"
                >
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center neon-glow-gold">
                            <Globe className="h-6 w-6 text-white" />
                        </div>
                        <div>
                            <div className="text-2xl font-bold text-white">5+</div>
                            <div className="text-sm text-cyan-200/80">Countries Served</div>
                        </div>
                    </div>
                </motion.div>
            </motion.div>

            {/* Card 3 - Team */}
            <motion.div
                initial={{ opacity: 0, x: 100, y: 0 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ duration: 0.8, delay: 1.4 }}
                className="absolute bottom-32 right-6 z-20"
            >
                <motion.div
                    animate={{ y: [0, -12, 0] }}
                    transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                    className="glass-card-3d p-5 rounded-2xl backdrop-blur-xl bg-white/10 border border-white/20"
                >
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center neon-glow-purple">
                            <Users className="h-6 w-6 text-white" />
                        </div>
                        <div>
                            <div className="text-2xl font-bold text-white">70+</div>
                            <div className="text-sm text-cyan-200/80">Expert Team</div>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </>
    )
}

// Custom cursor glow effect
function CursorGlow() {
    const [position, setPosition] = useState({ x: 0, y: 0 })
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setPosition({ x: e.clientX, y: e.clientY })
            setIsVisible(true)
        }

        const handleMouseLeave = () => setIsVisible(false)

        window.addEventListener("mousemove", handleMouseMove)
        window.addEventListener("mouseleave", handleMouseLeave)

        return () => {
            window.removeEventListener("mousemove", handleMouseMove)
            window.removeEventListener("mouseleave", handleMouseLeave)
        }
    }, [])

    if (!isVisible) return null

    return (
        <div
            className="pointer-events-none fixed z-0 transition-opacity duration-300"
            style={{
                left: position.x,
                top: position.y,
                transform: "translate(-50%, -50%)",
            }}
        >
            <div className="w-96 h-96 rounded-full bg-gradient-radial from-cyan-500/20 via-cyan-500/5 to-transparent blur-3xl" />
        </div>
    )
}

// Pre-computed mobile particle positions (deterministic to avoid hydration mismatch)
const MOBILE_PARTICLES = [
    { x: 50, y: 100, duration: 3.5, delay: 0 },
    { x: 150, y: 200, duration: 4, delay: 0.3 },
    { x: 250, y: 150, duration: 3.8, delay: 0.6 },
    { x: 350, y: 300, duration: 4.2, delay: 0.9 },
    { x: 100, y: 400, duration: 3.6, delay: 1.2 },
    { x: 200, y: 500, duration: 4.5, delay: 0.2 },
    { x: 300, y: 250, duration: 3.9, delay: 0.5 },
    { x: 400, y: 350, duration: 4.1, delay: 0.8 },
    { x: 80, y: 550, duration: 3.7, delay: 1.1 },
    { x: 180, y: 650, duration: 4.3, delay: 0.4 },
    { x: 280, y: 450, duration: 3.4, delay: 0.7 },
    { x: 380, y: 600, duration: 4.4, delay: 1.0 },
    { x: 120, y: 700, duration: 3.3, delay: 1.3 },
    { x: 220, y: 50, duration: 4.6, delay: 0.1 },
    { x: 320, y: 750, duration: 3.2, delay: 1.5 },
    { x: 420, y: 120, duration: 4.7, delay: 0.15 },
    { x: 60, y: 280, duration: 5, delay: 1.6 },
    { x: 160, y: 380, duration: 4.8, delay: 0.25 },
    { x: 260, y: 520, duration: 4.9, delay: 1.8 },
    { x: 360, y: 180, duration: 3.1, delay: 1.9 },
]

// Mobile fallback gradient background
function MobileFallback() {
    return (
        <div className="absolute inset-0">
            {/* Gradient background */}
            <div className="absolute inset-0 bg-gradient-to-br from-navy-950 via-navy-900 to-slate-900" />

            {/* Animated gradient orbs */}
            <motion.div
                animate={{
                    x: [0, 50, 0],
                    y: [0, 30, 0],
                    scale: [1, 1.2, 1],
                }}
                transition={{ duration: 8, repeat: Infinity }}
                className="absolute top-20 left-10 w-64 h-64 bg-cyan-500/20 rounded-full blur-3xl"
            />
            <motion.div
                animate={{
                    x: [0, -30, 0],
                    y: [0, 50, 0],
                    scale: [1.2, 1, 1.2],
                }}
                transition={{ duration: 10, repeat: Infinity }}
                className="absolute bottom-20 right-10 w-80 h-80 bg-amber-500/15 rounded-full blur-3xl"
            />
            <motion.div
                animate={{
                    x: [0, 20, 0],
                    y: [0, -40, 0],
                }}
                transition={{ duration: 12, repeat: Infinity }}
                className="absolute top-1/2 left-1/2 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2"
            />

            {/* Grid pattern */}
            <div className="absolute inset-0 grid-pattern opacity-20" />

            {/* Particles - using deterministic positions */}
            {MOBILE_PARTICLES.map((particle, i) => (
                <motion.div
                    key={i}
                    className="absolute w-1 h-1 bg-cyan-400/60 rounded-full"
                    style={{
                        left: particle.x,
                        top: particle.y,
                    }}
                    animate={{
                        y: [-20, 20, -20],
                        opacity: [0.3, 0.8, 0.3],
                    }}
                    transition={{
                        duration: particle.duration,
                        repeat: Infinity,
                        delay: particle.delay,
                    }}
                />
            ))}
        </div>
    )
}

// Main Hero3D Component
export function Hero3D() {
    const { scrollY } = useScroll()
    const y = useTransform(scrollY, [0, 500], [0, 150])
    const opacity = useTransform(scrollY, [0, 300], [1, 0])
    const [isMobile, setIsMobile] = useState(false)

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 1024)
        }
        checkMobile()
        window.addEventListener("resize", checkMobile)
        return () => window.removeEventListener("resize", checkMobile)
    }, [])

    const handleWhatsApp = () => {
        window.open("https://wa.me/919653505005?text=Hi, I'd like to book a free consultation for study abroad", "_blank")
    }

    return (
        <section className="relative min-h-screen flex items-center overflow-hidden">
            {/* Cursor glow effect (desktop only) */}
            {!isMobile && <CursorGlow />}

            {/* Background - 3D or Mobile Fallback */}
            <div className="absolute inset-0">
                {isMobile ? (
                    <MobileFallback />
                ) : (
                    <>
                        {/* Deep space background */}
                        <div className="absolute inset-0 bg-gradient-to-b from-[#020617] via-[#0c1445] to-[#0f172a]" />

                        {/* 3D Globe Canvas */}
                        <div className="absolute inset-0">
                            <Globe3D />
                        </div>

                        {/* Vignette overlay */}
                        <div className="absolute inset-0 bg-radial-vignette pointer-events-none" />
                    </>
                )}
            </div>

            {/* Gradient overlays */}
            <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-navy-950 via-navy-950/80 to-transparent z-10" />
            <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-navy-950 via-navy-950/80 to-transparent z-10" />

            {/* Floating stats cards (desktop only) */}
            {!isMobile && <FloatingCards />}

            {/* Main Content */}
            <div className="container-custom relative z-20 pt-24 pb-12">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Left: Content */}
                    <div className="space-y-8">
                        {/* Trust Badge */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 backdrop-blur-xl border border-cyan-500/30 shadow-lg shadow-cyan-500/10"
                        >
                            <Sparkles className="h-4 w-4 text-amber-400 animate-pulse" />
                            <span className="text-sm text-cyan-100 font-medium tracking-wide">
                                Trusted by 10,000+ Students Since 2007
                            </span>
                        </motion.div>

                        {/* Main Headline */}
                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.1] tracking-tight"
                        >
                            Unlock Your{" "}
                            <span className="relative inline-block">
                                <span className="gradient-text-gold">Global</span>
                                <motion.span
                                    className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full"
                                    initial={{ scaleX: 0 }}
                                    animate={{ scaleX: 1 }}
                                    transition={{ duration: 0.8, delay: 0.8 }}
                                />
                            </span>{" "}
                            <br className="hidden md:block" />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                                Education
                            </span>{" "}
                            Dreams
                        </motion.h1>

                        {/* Subtitle */}
                        <motion.p
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="text-xl text-blue-100/80 max-w-xl leading-relaxed"
                        >
                            Expert guidance from{" "}
                            <span className="text-cyan-400 font-semibold">QUEAC</span>,{" "}
                            <span className="text-cyan-400 font-semibold">British Council</span> &{" "}
                            <span className="text-cyan-400 font-semibold">Canada</span> certified professionals.
                            Study in UK, Canada, Australia & more with 18 years of proven success.
                        </motion.p>

                        {/* Stats Row */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className="flex flex-wrap gap-8"
                        >
                            {[
                                { value: "18+", label: "Years" },
                                { value: "18K+", label: "Visas" },
                                { value: "100%", label: "Success" },
                            ].map((stat, i) => (
                                <div key={i} className="relative">
                                    <motion.div
                                        whileHover={{ scale: 1.05 }}
                                        className="text-center"
                                    >
                                        <div className="text-3xl md:text-4xl font-bold text-white text-glow">
                                            {stat.value}
                                        </div>
                                        <div className="text-sm text-cyan-200/70 uppercase tracking-wider">
                                            {stat.label}
                                        </div>
                                    </motion.div>
                                    {i < 2 && (
                                        <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-px h-10 bg-gradient-to-b from-transparent via-cyan-500/50 to-transparent" />
                                    )}
                                </div>
                            ))}
                        </motion.div>

                        {/* CTA Buttons */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            className="flex flex-col sm:flex-row gap-4 pt-4"
                        >
                            <Button
                                size="lg"
                                onClick={handleWhatsApp}
                                className="btn-gold text-lg px-8 py-7 rounded-2xl group relative overflow-hidden"
                            >
                                <span className="relative z-10 flex items-center">
                                    <Phone className="mr-2 h-5 w-5 group-hover:animate-bounce" />
                                    Book Free Consultation
                                    <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-2" />
                                </span>
                            </Button>

                            <Button
                                size="lg"
                                variant="outline"
                                className="neon-button text-lg px-8 py-7 rounded-2xl group"
                            >
                                <GraduationCap className="mr-2 h-5 w-5" />
                                Explore Destinations
                            </Button>
                        </motion.div>
                    </div>

                    {/* Right: Spacer for globe (globe is positioned absolutely) */}
                    <div className="hidden lg:block" />
                </div>
            </div>

            {/* Scroll indicator */}
            <motion.div
                style={{ opacity }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20"
            >
                <span className="text-sm text-cyan-200/50 tracking-widest uppercase">Scroll</span>
                <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="w-6 h-10 rounded-full border-2 border-cyan-500/30 flex items-start justify-center p-2"
                >
                    <motion.div
                        animate={{ y: [0, 12, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="w-1.5 h-3 rounded-full bg-cyan-400"
                    />
                </motion.div>
            </motion.div>
        </section>
    )
}

export default Hero3D
