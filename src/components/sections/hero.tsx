"use client"

import * as React from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, Phone, ChevronDown, Sparkles, GraduationCap, Globe, Users } from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import { ParticlesBackground, WorldMapAnimation } from "@/components/ui/particles-background"
import { FloatingStats } from "@/components/ui/stats-counter"

export function Hero() {
    const { t } = useLanguage()
    const { scrollY } = useScroll()
    const y = useTransform(scrollY, [0, 500], [0, 150])
    const opacity = useTransform(scrollY, [0, 300], [1, 0])

    const handleWhatsApp = () => {
        window.open("https://wa.me/917870478704?text=Hi, I'd like to book a free consultation for study abroad", "_blank")
    }

    return (
        <section className="relative min-h-[100vh] flex items-center overflow-hidden">
            {/* Background layers */}
            <div className="absolute inset-0 bg-navy-gradient" />
            <ParticlesBackground />
            <WorldMapAnimation />

            {/* Grid overlay */}
            <div className="absolute inset-0 grid-pattern opacity-30" />

            {/* Gradient overlays */}
            <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-navy-950 to-transparent" />
            <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-navy-950 to-transparent" />

            {/* Main Content */}
            <div className="container-custom relative z-10 pt-20">
                <div className="grid lg:grid-cols-5 gap-12 items-center">
                    {/* Left: Main Content - 3 columns */}
                    <div className="lg:col-span-3 space-y-8">
                        {/* Trust Badge */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20"
                        >
                            <Sparkles className="h-4 w-4 text-gold-400" />
                            <span className="text-sm text-blue-100 font-medium">
                                Trusted by 10,000+ Students Since 2007
                            </span>
                        </motion.div>

                        {/* Main Headline */}
                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="heading-xl text-white leading-tight"
                        >
                            Unlock Your{" "}
                            <span className="gradient-text-gold">Global Education</span>{" "}
                            Dreams
                        </motion.h1>

                        {/* Subtitle */}
                        <motion.p
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="text-xl text-blue-100/80 max-w-xl leading-relaxed"
                        >
                            Expert guidance from QUEAC, British Council & Canada certified professionals.
                            Study in UK, Canada, Australia & more with 18 years of proven success.
                        </motion.p>

                        {/* Stats Row */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className="flex flex-wrap gap-6"
                        >
                            {[
                                { value: "18+", label: "Years Experience" },
                                { value: "18,000+", label: "Visas Processed" },
                                { value: "100%", label: "Success Rate" },
                            ].map((stat, i) => (
                                <div key={i} className="text-center pr-6 border-r border-white/20 last:border-r-0 last:pr-0">
                                    <div className="text-2xl md:text-3xl font-bold text-white">{stat.value}</div>
                                    <div className="text-sm text-blue-200/70">{stat.label}</div>
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
                                className="btn-gold text-lg px-8 py-7 rounded-xl group"
                            >
                                <Phone className="mr-2 h-5 w-5 group-hover:animate-pulse" />
                                Book Free Consultation
                                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                            </Button>

                            <Button
                                size="lg"
                                variant="outline"
                                className="btn-glass text-lg px-8 py-7 rounded-xl group"
                            >
                                <GraduationCap className="mr-2 h-5 w-5" />
                                Explore Study Destinations
                            </Button>
                        </motion.div>
                    </div>

                    {/* Right: Floating Stats Cards - 2 columns */}
                    <div className="lg:col-span-2 hidden lg:block relative h-[500px]">
                        <FloatingStats offset={30}>
                            <motion.div
                                initial={{ opacity: 0, x: 50 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.6, delay: 0.5 }}
                                className="absolute top-0 right-0 glass-card p-6 rounded-2xl w-64"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-teal-500 to-teal-600 flex items-center justify-center">
                                        <GraduationCap className="h-6 w-6 text-white" />
                                    </div>
                                    <div>
                                        <div className="text-2xl font-bold text-white">18,000+</div>
                                        <div className="text-sm text-blue-200/70">Visas Processed</div>
                                    </div>
                                </div>
                            </motion.div>
                        </FloatingStats>

                        <FloatingStats offset={-20}>
                            <motion.div
                                initial={{ opacity: 0, x: 50 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.6, delay: 0.6 }}
                                className="absolute top-40 right-20 glass-card p-6 rounded-2xl w-64"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-gold-500 to-amber-600 flex items-center justify-center">
                                        <Globe className="h-6 w-6 text-white" />
                                    </div>
                                    <div>
                                        <div className="text-2xl font-bold text-white">5+</div>
                                        <div className="text-sm text-blue-200/70">Countries Served</div>
                                    </div>
                                </div>
                            </motion.div>
                        </FloatingStats>

                        <FloatingStats offset={40}>
                            <motion.div
                                initial={{ opacity: 0, x: 50 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.6, delay: 0.7 }}
                                className="absolute bottom-20 right-0 glass-card p-6 rounded-2xl w-64"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
                                        <Users className="h-6 w-6 text-white" />
                                    </div>
                                    <div>
                                        <div className="text-2xl font-bold text-white">70+</div>
                                        <div className="text-sm text-blue-200/70">Expert Team</div>
                                    </div>
                                </div>
                            </motion.div>
                        </FloatingStats>
                    </div>
                </div>
            </div>

            {/* Scroll indicator */}
            <motion.div
                style={{ opacity }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
            >
                <span className="text-sm text-blue-200/50">Scroll to explore</span>
                <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                >
                    <ChevronDown className="h-6 w-6 text-blue-200/50" />
                </motion.div>
            </motion.div>
        </section>
    )
}
