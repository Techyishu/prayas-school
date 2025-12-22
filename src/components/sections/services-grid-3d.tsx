"use client"

import * as React from "react"
import { Suspense, useState } from "react"
import Link from "next/link"
import dynamic from "next/dynamic"
import { motion } from "framer-motion"
import { GlassCard, GlassCardHeader, GlassCardContent } from "@/components/ui/glass-card"
import { Button } from "@/components/ui/button"
import { ArrowRight, GraduationCap, Globe, Briefcase, Users, Plane, BookOpen } from "lucide-react"
import { useLanguage } from "@/lib/language-context"

// Dynamic import for 3D icons (better performance)
const ServiceIcon3D = dynamic(() => import("@/components/3d/ServiceIcons").then(mod => mod.ServiceIcon3D), {
    ssr: false,
    loading: () => <IconLoader />
})

// Loading skeleton for 3D icons
function IconLoader() {
    return (
        <div className="w-full h-full flex items-center justify-center">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500/20 to-cyan-600/20 animate-pulse" />
        </div>
    )
}

const services = [
    {
        icon: GraduationCap,
        icon3D: "plane" as const,
        title: "UK Study Visa",
        description: "World-class universities with 1-year Master's programs. Options available without IELTS. Post-study work visa included.",
        gradient: "from-blue-500 to-indigo-600",
        features: ["Without IELTS Options", "Spouse Visa", "22-Day Processing"],
        neonColor: "cyan",
    },
    {
        icon: Globe,
        icon3D: "document" as const,
        title: "Canada Study Visa",
        description: "PGWP up to 3 years with clear PR pathways. Express Entry and Provincial Nominee Programs available.",
        gradient: "from-red-500 to-rose-600",
        features: ["PGWP Eligible", "PR Pathway", "Express Entry"],
        neonColor: "gold",
    },
    {
        icon: BookOpen,
        icon3D: "briefcase" as const,
        title: "Australia Study Visa",
        description: "Top global universities with generous scholarships. Post-study work visa up to 6 years for PhDs.",
        gradient: "from-teal-500 to-emerald-600",
        features: ["Scholarships", "Work Rights", "QEAC Certified"],
        neonColor: "teal",
    },
    {
        icon: Users,
        icon3D: "family" as const,
        title: "Spouse & Dependent Visa",
        description: "Bring your family along on your educational journey. Available for UK, Canada & Australia students.",
        gradient: "from-purple-500 to-pink-600",
        features: ["Full Work Rights", "Family Reunion", "Expert Support"],
        neonColor: "purple",
    },
]

export function ServicesGrid3D() {
    const { t } = useLanguage()
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

    return (
        <section className="relative py-24 bg-gradient-to-b from-navy-950 via-slate-900 to-navy-950 overflow-hidden">
            {/* Background effects */}
            <div className="absolute inset-0 cyber-grid opacity-30" />

            {/* Floating orbs */}
            <motion.div
                animate={{
                    y: [0, -40, 0],
                    x: [0, 20, 0],
                    opacity: [0.2, 0.4, 0.2],
                }}
                transition={{ duration: 12, repeat: Infinity }}
                className="absolute top-40 left-[10%] w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl"
            />
            <motion.div
                animate={{
                    y: [0, 30, 0],
                    x: [0, -30, 0],
                    opacity: [0.15, 0.3, 0.15],
                }}
                transition={{ duration: 15, repeat: Infinity, delay: 2 }}
                className="absolute bottom-40 right-[10%] w-96 h-96 bg-amber-500/10 rounded-full blur-3xl"
            />

            <div className="container-custom relative z-10">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <motion.span
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-sm font-semibold uppercase tracking-wider mb-6"
                    >
                        <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                        Let's Help You Live Your Dream
                    </motion.span>
                    <h2 className="heading-lg text-white mb-4">
                        Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Services</span>
                    </h2>
                    <p className="text-blue-100/70 max-w-2xl mx-auto">
                        From selecting the right program and university to navigating the visa process,
                        our experienced team is here to help you achieve your educational goals.
                    </p>
                </motion.div>

                {/* Services Grid with 3D Icons */}
                <div className="grid md:grid-cols-2 gap-8">
                    {services.map((service, index) => {
                        const Icon = service.icon
                        const isHovered = hoveredIndex === index

                        return (
                            <motion.div
                                key={service.title}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ delay: index * 0.15 }}
                                onMouseEnter={() => setHoveredIndex(index)}
                                onMouseLeave={() => setHoveredIndex(null)}
                            >
                                <div className={`
                                    relative h-full p-6 rounded-3xl 
                                    glass-card-3d
                                    group cursor-pointer
                                    ${isHovered ? 'neon-glow-' + service.neonColor : ''}
                                `}>
                                    <div className="flex gap-6">
                                        {/* 3D Icon Area */}
                                        <div className="relative w-32 h-32 flex-shrink-0 rounded-2xl overflow-hidden bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-white/10">
                                            <Suspense fallback={<IconLoader />}>
                                                <ServiceIcon3D type={service.icon3D} />
                                            </Suspense>

                                            {/* Fallback 2D icon overlay */}
                                            <div className={`
                                                absolute bottom-2 right-2 w-8 h-8 rounded-lg 
                                                bg-gradient-to-br ${service.gradient} 
                                                flex items-center justify-center
                                                opacity-60 group-hover:opacity-100 transition-opacity
                                            `}>
                                                <Icon className="h-4 w-4 text-white" />
                                            </div>
                                        </div>

                                        {/* Content */}
                                        <div className="flex-1 space-y-4">
                                            {/* Title */}
                                            <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors">
                                                {service.title}
                                            </h3>

                                            {/* Description */}
                                            <p className="text-blue-100/70 text-sm leading-relaxed">
                                                {service.description}
                                            </p>

                                            {/* Feature Tags */}
                                            <div className="flex flex-wrap gap-2">
                                                {service.features.map((feature) => (
                                                    <span
                                                        key={feature}
                                                        className="px-3 py-1 bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-medium rounded-full"
                                                    >
                                                        {feature}
                                                    </span>
                                                ))}
                                            </div>

                                            {/* Learn More Link */}
                                            <Link
                                                href="/services"
                                                className="inline-flex items-center text-cyan-400 font-semibold text-sm group/link pt-2"
                                            >
                                                Learn More
                                                <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover/link:translate-x-2" />
                                            </Link>
                                        </div>
                                    </div>

                                    {/* Animated border on hover */}
                                    <motion.div
                                        className="absolute inset-0 rounded-3xl pointer-events-none"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: isHovered ? 1 : 0 }}
                                        transition={{ duration: 0.3 }}
                                        style={{
                                            background: `linear-gradient(135deg, transparent 40%, rgba(0, 217, 255, 0.1) 50%, transparent 60%)`,
                                            backgroundSize: '200% 200%',
                                        }}
                                    />
                                </div>
                            </motion.div>
                        )
                    })}
                </div>

                {/* CTA Button */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mt-16"
                >
                    <Link href="/services">
                        <Button className="btn-gold rounded-2xl px-10 py-7 text-lg group">
                            View All Services
                            <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-2" />
                        </Button>
                    </Link>
                </motion.div>
            </div>
        </section>
    )
}

export default ServicesGrid3D
