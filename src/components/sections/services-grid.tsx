"use client"

import * as React from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { GlassCard, GlassCardHeader, GlassCardContent } from "@/components/ui/glass-card"
import { Button } from "@/components/ui/button"
import { ArrowRight, GraduationCap, Globe, Briefcase, Users, Plane, BookOpen } from "lucide-react"
import { useLanguage } from "@/lib/language-context"

const services = [
    {
        icon: GraduationCap,
        title: "UK Study Visa",
        description: "World-class universities with 1-year Master's programs. Options available without IELTS. Post-study work visa included.",
        gradient: "from-blue-500 to-indigo-600",
        features: ["Without IELTS Options", "Spouse Visa", "22-Day Processing"],
    },
    {
        icon: Globe,
        title: "Canada Study Visa",
        description: "PGWP up to 3 years with clear PR pathways. Express Entry and Provincial Nominee Programs available.",
        gradient: "from-red-500 to-rose-600",
        features: ["PGWP Eligible", "PR Pathway", "Express Entry"],
    },
    {
        icon: BookOpen,
        title: "Australia Study Visa",
        description: "Top global universities with generous scholarships. Post-study work visa up to 6 years for PhDs.",
        gradient: "from-teal-500 to-emerald-600",
        features: ["Scholarships", "Work Rights", "QEAC Certified"],
    },
    {
        icon: Users,
        title: "Spouse & Dependent Visa",
        description: "Bring your family along on your educational journey. Available for UK, Canada & Australia students.",
        gradient: "from-purple-500 to-pink-600",
        features: ["Full Work Rights", "Family Reunion", "Expert Support"],
    },
    {
        icon: Plane,
        title: "Tourist & Visitor Visa",
        description: "Quick processing for tourism, family visits, and business conferences. All major destinations covered.",
        gradient: "from-amber-500 to-orange-600",
        features: ["Quick Processing", "High Success Rate", "Multiple Countries"],
    },
    {
        icon: Briefcase,
        title: "IELTS & PTE Coaching",
        description: "Expert training with small batches for personalized attention. High score guarantee with experienced faculty.",
        gradient: "from-cyan-500 to-blue-600",
        features: ["Small Batches", "Expert Faculty", "High Scores"],
    },
]

export function ServicesGrid() {
    const { t } = useLanguage()

    return (
        <section className="py-24 bg-gradient-to-b from-white to-gray-50">
            <div className="container-custom">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <span className="inline-block px-4 py-1.5 rounded-full bg-teal-500/10 text-teal-600 text-sm font-semibold uppercase tracking-wide mb-4">
                        Let's Help You Live Your Dream
                    </span>
                    <h2 className="heading-lg text-navy-900 mb-4">
                        Our <span className="gradient-text">Services</span>
                    </h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        From selecting the right program and university to navigating the visa process,
                        our experienced team is here to help you achieve your educational goals.
                    </p>
                </motion.div>

                {/* Services Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((service, index) => {
                        const Icon = service.icon
                        return (
                            <motion.div
                                key={service.title}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <GlassCard glow="teal" className="h-full group">
                                    <GlassCardHeader className="pb-0">
                                        {/* Icon */}
                                        <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${service.gradient} flex items-center justify-center shadow-lg mb-6 transition-transform duration-300 group-hover:scale-110`}>
                                            <Icon className="h-7 w-7 text-white" />
                                        </div>

                                        {/* Title */}
                                        <h3 className="text-xl font-bold text-navy-900 mb-3 group-hover:text-teal-600 transition-colors">
                                            {service.title}
                                        </h3>
                                    </GlassCardHeader>

                                    <GlassCardContent className="pt-0">
                                        {/* Description */}
                                        <p className="text-gray-600 mb-4 leading-relaxed">
                                            {service.description}
                                        </p>

                                        {/* Feature Tags */}
                                        <div className="flex flex-wrap gap-2 mb-6">
                                            {service.features.map((feature) => (
                                                <span
                                                    key={feature}
                                                    className="px-3 py-1 bg-teal-500/10 text-teal-700 text-xs font-medium rounded-full"
                                                >
                                                    {feature}
                                                </span>
                                            ))}
                                        </div>

                                        {/* Learn More Link */}
                                        <Link
                                            href="/services"
                                            className="inline-flex items-center text-teal-600 font-semibold text-sm group/link"
                                        >
                                            Learn More
                                            <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover/link:translate-x-1" />
                                        </Link>
                                    </GlassCardContent>
                                </GlassCard>
                            </motion.div>
                        )
                    })}
                </div>

                {/* CTA Button */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mt-12"
                >
                    <Link href="/services">
                        <Button className="btn-gold rounded-xl px-8 py-6 text-lg">
                            View All Services
                            <ArrowRight className="ml-2 h-5 w-5" />
                        </Button>
                    </Link>
                </motion.div>
            </div>
        </section>
    )
}
