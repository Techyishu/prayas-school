"use client"

import React, { useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import {
    MapPin, GraduationCap, Briefcase, Users, Heart, Building2,
    ArrowRight, CheckCircle, Clock, FileCheck, Award, Sparkles,
    Phone
} from 'lucide-react'
import { Button } from "@/components/ui/button"

// Services data
const services = [
    {
        id: 1,
        title: "Primary School",
        subtitle: "Nursery to Class 5",
        description: "Strong foundation in academics, values, and life skills for young learners.",
        icon: GraduationCap,
        flag: "📚",
        stats: { successRate: "98%", avgTime: "5 years" },
        color: "from-red-500 to-rose-600",
        image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&h=600&fit=crop",
        gridClass: "services-card-1",
        featured: true,
    },
    {
        id: 2,
        title: "Middle School",
        subtitle: "Class 6 to 8",
        description: "Comprehensive curriculum focusing on academic excellence and character development.",
        icon: Users,
        flag: "🎯",
        stats: { successRate: "96%", avgTime: "3 years" },
        color: "from-blue-500 to-indigo-600",
        image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&h=600&fit=crop",
        gridClass: "services-card-2",
    },
    {
        id: 3,
        title: "High School",
        subtitle: "Class 9 to 12",
        description: "Advanced preparation for higher education with science, commerce, and arts streams.",
        icon: Award,
        flag: "🏆",
        stats: { successRate: "95%", avgTime: "4 years" },
        color: "from-teal-500 to-emerald-600",
        image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&h=600&fit=crop",
        gridClass: "services-card-3",
    },
    {
        id: 4,
        title: "Sports Academy",
        subtitle: "Physical Excellence",
        description: "Professional coaching in cricket, football, basketball, and athletics.",
        icon: Briefcase,
        flag: "⚽",
        stats: { successRate: "100%", avgTime: "Year-round" },
        color: "from-purple-500 to-violet-600",
        image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&h=600&fit=crop",
        gridClass: "services-card-4",
    },
    {
        id: 5,
        title: "Arts & Culture",
        subtitle: "Creative Development",
        description: "Music, dance, painting, and drama programs for artistic expression.",
        icon: Heart,
        flag: "🎨",
        stats: { successRate: "100%", avgTime: "Weekly" },
        color: "from-pink-500 to-rose-600",
        image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800&h=600&fit=crop",
        gridClass: "services-card-5",
    },
    {
        id: 6,
        title: "Science Labs",
        subtitle: "Hands-on Learning",
        description: "Well-equipped physics, chemistry, and biology labs for practical learning.",
        icon: Building2,
        flag: "🔬",
        stats: { successRate: "100%", avgTime: "Daily" },
        color: "from-amber-500 to-orange-600",
        image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800&h=600&fit=crop",
        gridClass: "services-card-6",
    },
]

// Process timeline steps
const processSteps = [
    { step: "01", title: "Inquiry", description: "Free school visit consultation", icon: Phone, duration: "30 min" },
    { step: "02", title: "Registration", description: "Complete admission process", icon: FileCheck, duration: "1-2 days" },
    { step: "03", title: "Learning", description: "Start your educational journey", icon: Clock, duration: "Academic Year" },
    { step: "04", title: "Success", description: "Academic excellence & growth", icon: CheckCircle, duration: "Continuous!" },
]

// Service Card Component
function ServiceCard({ service, index }: { service: typeof services[0]; index: number }) {
    const cardRef = useRef<HTMLDivElement>(null)
    const isInView = useInView(cardRef, { once: true, margin: "-50px" })

    return (
        <motion.div
            ref={cardRef}
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className={`${service.gridClass} ${service.featured ? 'md:row-span-1' : ''}`}
        >
            <Link href="/academics" className={`service-card-premium rounded-2xl h-72 md:h-80 relative group cursor-pointer block`}>
                {/* Background Image */}
                <div className="absolute inset-0 rounded-2xl overflow-hidden">
                    <Image
                        src={service.image}
                        alt={service.title}
                        fill
                        className="object-cover service-card-image"
                        sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
                </div>

                {/* Content */}
                <div className="absolute inset-0 p-6 flex flex-col justify-end">
                    {/* Flag & Stats Badge */}
                    <div className="flex items-center gap-3 mb-3">
                        <span className="text-2xl">{service.flag}</span>
                        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-xs">
                            <span className="text-cyan-400 font-semibold">{service.stats.successRate}</span>
                            <span className="text-white/40">|</span>
                            <span className="text-white/70">{service.stats.avgTime}</span>
                        </div>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl md:text-2xl font-bold text-white mb-1 group-hover:text-cyan-100 transition-colors">
                        {service.title}
                    </h3>

                    {/* Subtitle */}
                    <p className="text-cyan-300/90 font-medium text-sm mb-2">
                        {service.subtitle}
                    </p>

                    {/* Description */}
                    <p className="text-white/60 text-sm line-clamp-2 mb-4">
                        {service.description}
                    </p>

                    {/* Learn More - slides up on hover */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="flex items-center gap-2 text-cyan-400 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    >
                        <span>Learn More</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </motion.div>
                </div>

                {/* Icon Badge */}
                <div className={`absolute top-4 right-4 w-10 h-10 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center shadow-lg`}>
                    <service.icon className="w-5 h-5 text-white" />
                </div>
            </Link>
        </motion.div>
    )
}

// Process Timeline Component
function ProcessTimeline() {
    const ref = useRef<HTMLDivElement>(null)
    const isInView = useInView(ref, { once: true, margin: "-50px" })

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="mt-20"
        >
            <h3 className="text-2xl font-bold text-white text-center mb-10">
                Your Journey to <span className="text-cyan-400">Success</span>
            </h3>

            <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-4">
                {processSteps.map((step, index) => (
                    <motion.div
                        key={step.step}
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.5, delay: index * 0.15 }}
                        className="timeline-step flex flex-col items-center text-center relative"
                    >
                        {/* Step Number */}
                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                            <step.icon className="w-7 h-7 text-cyan-400" />
                        </div>

                        {/* Step Label */}
                        <span className="text-cyan-500 font-mono text-sm mb-1">{step.step}</span>
                        <h4 className="text-white font-semibold mb-1">{step.title}</h4>
                        <p className="text-white/50 text-sm max-w-[140px]">{step.description}</p>
                        <span className="text-xs text-amber-400/80 mt-2">{step.duration}</span>

                        {/* Connector Line (hidden on last) */}
                        {index < processSteps.length - 1 && (
                            <div className="hidden md:block absolute top-8 -right-6 w-8 h-0.5 bg-gradient-to-r from-cyan-500/50 to-transparent" />
                        )}
                    </motion.div>
                ))}
            </div>
        </motion.div>
    )
}

// Main Services Section Component
export function ServicesSection() {
    const sectionRef = useRef<HTMLElement>(null)
    const isInView = useInView(sectionRef, { once: true, margin: "-100px" })

    return (
        <section ref={sectionRef} className="relative py-24 md:py-32 overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-b from-navy-950 via-[#0a1628] to-navy-950" />
            <div className="hero-particles opacity-50" />

            {/* Content */}
            <div className="container mx-auto px-6 relative z-10">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="max-w-4xl mx-auto text-center mb-16"
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={isInView ? { scale: 1, opacity: 1 } : {}}
                        className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-sm font-semibold uppercase tracking-wider mb-6"
                    >
                        <Sparkles className="w-4 h-4" />
                        Our Services
                    </motion.div>

                    <h2 className="text-3xl md:text-5xl font-black text-white mb-4 font-[family-name:var(--font-plus-jakarta)] tracking-tight">
                        Comprehensive Educational <span className="text-cyan-400">Programs</span>
                    </h2>

                    <p className="text-lg text-white/60 mb-8 max-w-2xl mx-auto">
                        From primary to high school – quality education with holistic development
                    </p>

                    {/* Stats Row */}
                    <div className="flex flex-wrap items-center justify-center gap-6 md:gap-8">
                        {[
                            { value: "1000+", label: "Students Enrolled" },
                            { value: "95%", label: "Success Rate" },
                            { value: "50+", label: "Expert Teachers" },
                        ].map((stat, i) => (
                            <div key={i} className="text-center">
                                <div className="text-2xl md:text-3xl font-bold text-white">{stat.value}</div>
                                <div className="text-sm text-white/50">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* Services Z-Grid */}
                <div className="services-zigzag max-w-6xl mx-auto">
                    {services.map((service, index) => (
                        <ServiceCard key={service.id} service={service} index={index} />
                    ))}
                </div>

                {/* Process Timeline */}
                <ProcessTimeline />

                {/* CTA Banner */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mt-20 glass-hero-card rounded-2xl p-8 md:p-12 text-center"
                >
                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                        Ready to Enroll Your Child?
                    </h3>
                    <p className="text-white/60 mb-8 max-w-xl mx-auto">
                        Book a school visit and discover how we nurture young minds for a brighter future.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Button
                            size="lg"
                            className="btn-glass-ripple rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white px-8 py-6 text-base font-semibold shadow-lg shadow-cyan-500/25"
                            onClick={() => window.open("https://wa.me/919812026095", "_blank")}
                        >
                            <Phone className="w-5 h-5 mr-2" />
                            Book a Visit
                        </Button>
                        <Link href="/academics">
                            <Button
                                size="lg"
                                variant="outline"
                                className="rounded-full border-white/20 bg-white text-navy-900 hover:bg-white/90 px-8 py-6 text-base font-semibold"
                            >
                                View All Programs
                                <ArrowRight className="w-5 h-5 ml-2" />
                            </Button>
                        </Link>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}

export default ServicesSection
