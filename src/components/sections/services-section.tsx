"use client"

import React, { useRef } from 'react'
import Image from 'next/image'
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
        title: "Canada Express Entry",
        subtitle: "PR in 6 months",
        description: "Federal skilled worker, trades, and Canadian experience class pathways.",
        icon: MapPin,
        flag: "🇨🇦",
        stats: { successRate: "98%", avgTime: "6 months" },
        color: "from-red-500 to-rose-600",
        image: "https://images.unsplash.com/photo-1517935706615-2717063c2225?w=800&h=600&fit=crop",
        gridClass: "services-card-1",
        featured: true,
    },
    {
        id: 2,
        title: "USA H1B Specialty",
        subtitle: "Tech Professionals",
        description: "Work visa for specialty occupations. EB2/EB3 processing available.",
        icon: Briefcase,
        flag: "🇺🇸",
        stats: { successRate: "94%", avgTime: "45 days" },
        color: "from-blue-500 to-indigo-600",
        image: "https://images.unsplash.com/photo-1485738422979-f5c462d49f74?w=800&h=600&fit=crop",
        gridClass: "services-card-2",
    },
    {
        id: 3,
        title: "Australia 482",
        subtitle: "Skilled Migration",
        description: "Temporary skill shortage visa with employer sponsorship path.",
        icon: Award,
        flag: "🇦🇺",
        stats: { successRate: "96%", avgTime: "3 months" },
        color: "from-teal-500 to-emerald-600",
        image: "https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?w=800&h=600&fit=crop",
        gridClass: "services-card-3",
    },
    {
        id: 4,
        title: "UK Student Tier 4",
        subtitle: "Top Universities",
        description: "Study at world-ranked UK universities with post-study work rights.",
        icon: GraduationCap,
        flag: "🇬🇧",
        stats: { successRate: "99%", avgTime: "21 days" },
        color: "from-purple-500 to-violet-600",
        image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800&h=600&fit=crop",
        gridClass: "services-card-4",
    },
    {
        id: 5,
        title: "Family Sponsorship",
        subtitle: "Reunite Globally",
        description: "Spouse, parent, and dependent visa processing for major destinations.",
        icon: Heart,
        flag: "🌍",
        stats: { successRate: "97%", avgTime: "4 months" },
        color: "from-pink-500 to-rose-600",
        image: "https://images.unsplash.com/photo-1511895426328-dc8714191300?w=800&h=600&fit=crop",
        gridClass: "services-card-5",
    },
    {
        id: 6,
        title: "Business & Investor",
        subtitle: "Entrepreneur Routes",
        description: "Start-up visas, investor immigration, and business expansion programs.",
        icon: Building2,
        flag: "💼",
        stats: { successRate: "92%", avgTime: "6 months" },
        color: "from-amber-500 to-orange-600",
        image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop",
        gridClass: "services-card-6",
    },
]

// Process timeline steps
const processSteps = [
    { step: "01", title: "Consultation", description: "Free eligibility assessment", icon: Phone, duration: "30 min" },
    { step: "02", title: "Documentation", description: "Complete file preparation", icon: FileCheck, duration: "1-2 weeks" },
    { step: "03", title: "Processing", description: "Application submission", icon: Clock, duration: "Variable" },
    { step: "04", title: "Success", description: "Visa approval & travel", icon: CheckCircle, duration: "Celebration!" },
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
            <div className={`service-card-premium rounded-2xl h-72 md:h-80 relative group cursor-pointer`}>
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
            </div>
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
                        Comprehensive Immigration <span className="text-cyan-400">Solutions</span>
                    </h2>

                    <p className="text-lg text-white/60 mb-8 max-w-2xl mx-auto">
                        From consultation to visa approval – end-to-end expertise across 50+ countries
                    </p>

                    {/* Stats Row */}
                    <div className="flex flex-wrap items-center justify-center gap-6 md:gap-8">
                        {[
                            { value: "5000+", label: "Visas Processed" },
                            { value: "98%", label: "Success Rate" },
                            { value: "45 Days", label: "Avg. Processing" },
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
                        Ready to Start Your Journey?
                    </h3>
                    <p className="text-white/60 mb-8 max-w-xl mx-auto">
                        Get a personalized assessment of your immigration options. Our experts are standing by.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Button
                            size="lg"
                            className="btn-glass-ripple rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white px-8 py-6 text-base font-semibold shadow-lg shadow-cyan-500/25"
                            onClick={() => window.open("https://wa.me/919653505005", "_blank")}
                        >
                            <Phone className="w-5 h-5 mr-2" />
                            Free Assessment
                        </Button>
                        <Button
                            size="lg"
                            variant="outline"
                            className="rounded-full border-white/20 bg-white text-navy-900 hover:bg-white/90 px-8 py-6 text-base font-semibold"
                        >
                            View All Services
                            <ArrowRight className="w-5 h-5 ml-2" />
                        </Button>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}

export default ServicesSection
