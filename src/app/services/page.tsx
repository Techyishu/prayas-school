"use client"

import { motion } from "framer-motion"
import { Accordion } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { GlassCard } from "@/components/ui/glass-card"
import { ArrowRight, CheckCircle2, GraduationCap, Briefcase, Users, Plane, Globe, Phone } from "lucide-react"

const services = [
    {
        id: "uk",
        title: "Study in United Kingdom",
        icon: GraduationCap,
        gradient: "from-blue-500 to-indigo-600",
        description: "Now is the opportune moment to transform your aspirations into actuality. Pursue education in the UK with world-class universities and post-study work rights.",
        countries: ["🏛️ London", "🏛️ Birmingham", "🏛️ Leeds", "🏛️ Manchester"],
        features: ["UK Without IELTS Options", "1 Year MBA Programs", "Spouse Visa Available", "Post-Study Work Visa"],
        accordion: [
            {
                title: "Why Study in UK?",
                content: (
                    <ul className="space-y-3">
                        <li className="flex items-start"><CheckCircle2 className="h-5 w-5 mr-3 text-teal-500 shrink-0 mt-0.5" /> World-renowned universities with global recognition</li>
                        <li className="flex items-start"><CheckCircle2 className="h-5 w-5 mr-3 text-teal-500 shrink-0 mt-0.5" /> 1-year Master's programs (save time and money)</li>
                        <li className="flex items-start"><CheckCircle2 className="h-5 w-5 mr-3 text-teal-500 shrink-0 mt-0.5" /> 2-year post-study work visa (Graduate Route)</li>
                        <li className="flex items-start"><CheckCircle2 className="h-5 w-5 mr-3 text-teal-500 shrink-0 mt-0.5" /> Options available without IELTS</li>
                    </ul>
                )
            },
            {
                title: "Eligibility & Requirements",
                content: "Academic qualification (12th/Graduation), English proficiency (IELTS/PTE/MOI), Financial documents, Statement of Purpose, Passport with minimum 6 months validity."
            },
            {
                title: "Our UK Success",
                content: "Seabird has successfully facilitated 300+ UK study visas. We are British Council certified and have extensive partnerships with top UK universities."
            }
        ]
    },
    {
        id: "canada",
        title: "Study in Canada",
        icon: Globe,
        gradient: "from-red-500 to-rose-600",
        description: "Canada has aligned itself with the worldwide trend by recognizing master's degrees. Explore excellent PR pathways after graduation.",
        countries: ["🍁 Toronto", "🍁 Vancouver", "🍁 Montreal", "🍁 Calgary"],
        features: ["PGWP Eligible Programs", "PR Pathways", "Express Entry", "PNP Programs"],
        accordion: [
            {
                title: "Why Study in Canada?",
                content: (
                    <ul className="space-y-3">
                        <li className="flex items-start"><CheckCircle2 className="h-5 w-5 mr-3 text-teal-500 shrink-0 mt-0.5" /> Post-Graduation Work Permit (PGWP) up to 3 years</li>
                        <li className="flex items-start"><CheckCircle2 className="h-5 w-5 mr-3 text-teal-500 shrink-0 mt-0.5" /> Clear pathway to Permanent Residency</li>
                        <li className="flex items-start"><CheckCircle2 className="h-5 w-5 mr-3 text-teal-500 shrink-0 mt-0.5" /> High quality of life and multicultural environment</li>
                        <li className="flex items-start"><CheckCircle2 className="h-5 w-5 mr-3 text-teal-500 shrink-0 mt-0.5" /> Work opportunities during and after studies</li>
                    </ul>
                )
            },
            {
                title: "Documents Required",
                content: "GIC (Guaranteed Investment Certificate), Study Permit application, Letter of Acceptance from DLI, Proof of funds, IELTS/PTE scores, Medical examination."
            },
            {
                title: "New 2025 Rules",
                content: "Updated GIC requirements and work hour regulations for international students. Our team stays current with all policy changes to ensure your application success."
            }
        ]
    },
    {
        id: "australia",
        title: "Study in Australia",
        icon: Globe,
        gradient: "from-teal-500 to-emerald-600",
        description: "Embark on your educational journey in Australia without financial concerns. Take advantage of generous scholarship opportunities and excellent post-study work rights.",
        countries: ["🦘 Sydney", "🦘 Melbourne", "🦘 Brisbane", "🦘 Perth"],
        features: ["Post-Study Work Visa", "Scholarship Options", "Part-time Work", "PR Pathways"],
        accordion: [
            {
                title: "Why Study in Australia?",
                content: (
                    <ul className="space-y-3">
                        <li className="flex items-start"><CheckCircle2 className="h-5 w-5 mr-3 text-teal-500 shrink-0 mt-0.5" /> 7 of top 100 universities globally</li>
                        <li className="flex items-start"><CheckCircle2 className="h-5 w-5 mr-3 text-teal-500 shrink-0 mt-0.5" /> Post-study work visa up to 6 years for PhDs</li>
                        <li className="flex items-start"><CheckCircle2 className="h-5 w-5 mr-3 text-teal-500 shrink-0 mt-0.5" /> Work 48 hours per fortnight during studies</li>
                        <li className="flex items-start"><CheckCircle2 className="h-5 w-5 mr-3 text-teal-500 shrink-0 mt-0.5" /> High living standards and safety</li>
                    </ul>
                )
            },
            {
                title: "Visa Categories",
                content: "Student Visa (Subclass 500), Temporary Graduate visa (Subclass 485), Skilled Migration (189/190/491). We are QEAC certified education agents for Australia."
            },
            {
                title: "Our Australia Success",
                content: "Seabird has successfully facilitated 70+ Australia study visas with 100% success rate. Our QEAC certified counsellors provide expert guidance."
            }
        ]
    },
    {
        id: "spouse",
        title: "Spouse & Dependent Visa",
        icon: Users,
        gradient: "from-purple-500 to-pink-600",
        description: "Bring your family along on your educational journey. We handle spouse visas for UK, Canada, and Australia with care and expertise.",
        countries: ["UK Spouse Visa", "Canada Spouse", "Australia Partner", "Dependent Visa"],
        features: ["Family Reunion", "Work Rights", "Settlement Options", "Expert Documentation"],
        accordion: [
            {
                title: "UK Spouse Visa for Students",
                content: (
                    <ul className="space-y-3">
                        <li className="flex items-start"><CheckCircle2 className="h-5 w-5 mr-3 text-teal-500 shrink-0 mt-0.5" /> Available for Master's program students</li>
                        <li className="flex items-start"><CheckCircle2 className="h-5 w-5 mr-3 text-teal-500 shrink-0 mt-0.5" /> Full work rights for spouse</li>
                        <li className="flex items-start"><CheckCircle2 className="h-5 w-5 mr-3 text-teal-500 shrink-0 mt-0.5" /> Children can join as dependents</li>
                    </ul>
                )
            },
            {
                title: "Requirements",
                content: "Proof of genuine relationship, marriage certificate, financial evidence, accommodation arrangements, English language requirements (varies by country)."
            },
            {
                title: "Success Rate",
                content: "Our spouse visa success rate is 97%. We understand the emotional importance of family reunification and handle each case with utmost care and attention."
            }
        ]
    },
    {
        id: "tourist",
        title: "Tourist & Visitor Visa",
        icon: Plane,
        gradient: "from-amber-500 to-orange-600",
        description: "Planning a vacation or family visit? We make the tourist visa process simple and hassle-free for all major destinations.",
        countries: ["🌍 UK Visitor", "🌍 Canada Visitor", "🌍 Australia Visitor", "🌍 Schengen"],
        features: ["Quick Processing", "Documentation Support", "Interview Prep", "High Success Rate"],
        accordion: [
            {
                title: "Visitor Visa Purposes",
                content: "Tourism, Family Visit, Business Conference, Medical Treatment, Short-term courses, Attending events."
            },
            {
                title: "Documentation",
                content: (
                    <ul className="space-y-3">
                        <li className="flex items-start"><CheckCircle2 className="h-5 w-5 mr-3 text-teal-500 shrink-0 mt-0.5" /> Valid passport with blank pages</li>
                        <li className="flex items-start"><CheckCircle2 className="h-5 w-5 mr-3 text-teal-500 shrink-0 mt-0.5" /> Bank statements (6 months)</li>
                        <li className="flex items-start"><CheckCircle2 className="h-5 w-5 mr-3 text-teal-500 shrink-0 mt-0.5" /> Travel itinerary and hotel bookings</li>
                        <li className="flex items-start"><CheckCircle2 className="h-5 w-5 mr-3 text-teal-500 shrink-0 mt-0.5" /> Invitation letter (if visiting family)</li>
                    </ul>
                )
            },
            {
                title: "Processing Time",
                content: "UK Visitor Visa: 3-4 weeks, Canada Visitor Visa: 4-6 weeks, Australia Visitor Visa: 2-4 weeks, Schengen Visa: 2-4 weeks."
            }
        ]
    },
]

const processSteps = [
    {
        step: "01",
        title: "Complete Online Form",
        description: "Fill out the online application form. Provide accurate and truthful information about your personal details and requirements."
    },
    {
        step: "02",
        title: "Documents & Payment",
        description: "Scan and upload supporting documents. Pay only after visa approval - we only charge processing fees after visa (T&C apply)."
    },
    {
        step: "03",
        title: "Receive Your Visa",
        description: "Wait for the visa processing to be completed. Once a decision is made, you will be notified of the outcome via Email."
    },
]

export default function ServicesPage() {
    const handleWhatsApp = () => {
        window.open("https://wa.me/917870478704?text=Hi, I'd like to inquire about your study abroad services", "_blank")
    }

    return (
        <div className="bg-white">
            {/* Hero Section */}
            <section className="relative py-32 overflow-hidden">
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
                        <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 text-teal-400 text-sm font-semibold uppercase tracking-wide mb-6">
                            Study Abroad Services
                        </span>
                        <h1 className="heading-xl text-white mb-6">
                            Your Journey to <span className="gradient-text-gold">Global Education</span>
                        </h1>
                        <p className="text-xl text-blue-100/80 max-w-2xl mx-auto">
                            Expert guidance from QUEAC, British Council & Canada certified counsellors.
                            Let us help you live your dream of studying abroad.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* 3-Step Process */}
            <section className="py-16 bg-gradient-to-b from-navy-950 to-white relative">
                <div className="container-custom">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                            Your Visa Sorted in Just 3 Super Simple Steps
                        </h2>
                    </motion.div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {processSteps.map((step, index) => (
                            <motion.div
                                key={step.step}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <GlassCard glow="teal" className="h-full p-8 text-center glass-dark">
                                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-teal-500 to-teal-600 flex items-center justify-center mx-auto mb-6 shadow-lg">
                                        <span className="text-2xl font-bold text-white">{step.step}</span>
                                    </div>
                                    <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                                    <p className="text-blue-200/80">{step.description}</p>
                                </GlassCard>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Services List */}
            <section className="py-24">
                <div className="container-custom space-y-24">
                    {services.map((service, index) => {
                        const Icon = service.icon
                        const isEven = index % 2 === 0

                        return (
                            <motion.div
                                key={service.id}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.6 }}
                                className="relative"
                            >
                                {/* Background decoration */}
                                <div className={`absolute ${isEven ? 'right-0' : 'left-0'} top-0 w-96 h-96 bg-gradient-to-br ${service.gradient} opacity-5 rounded-full blur-3xl -z-10`} />

                                <div className={`grid lg:grid-cols-5 gap-12 items-start`}>
                                    {/* Left: Service Info */}
                                    <div className={`lg:col-span-2 space-y-6 ${isEven ? '' : 'lg:order-2'}`}>
                                        <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${service.gradient} flex items-center justify-center shadow-lg`}>
                                            <Icon className="h-8 w-8 text-white" />
                                        </div>

                                        <h2 className="heading-md text-navy-900">{service.title}</h2>

                                        <p className="text-gray-600 text-lg leading-relaxed">
                                            {service.description}
                                        </p>

                                        {/* Location/Category Tags */}
                                        <div className="flex flex-wrap gap-2">
                                            {service.countries.map((country) => (
                                                <span
                                                    key={country}
                                                    className="px-3 py-1.5 bg-gray-100 text-gray-700 text-sm rounded-lg font-medium"
                                                >
                                                    {country}
                                                </span>
                                            ))}
                                        </div>

                                        {/* Feature Tags */}
                                        <div className="flex flex-wrap gap-2">
                                            {service.features.map((feature) => (
                                                <span
                                                    key={feature}
                                                    className="px-3 py-1.5 bg-teal-500/10 text-teal-700 text-sm rounded-lg font-medium"
                                                >
                                                    ✓ {feature}
                                                </span>
                                            ))}
                                        </div>

                                        <Button
                                            onClick={handleWhatsApp}
                                            className="btn-gold rounded-xl mt-4"
                                        >
                                            <Phone className="mr-2 h-4 w-4" />
                                            Get Free Consultation
                                            <ArrowRight className="ml-2 h-4 w-4" />
                                        </Button>
                                    </div>

                                    {/* Right: Accordion */}
                                    <div className={`lg:col-span-3 ${isEven ? '' : 'lg:order-1'}`}>
                                        <GlassCard hover={false} className="p-6">
                                            <Accordion items={service.accordion} />
                                        </GlassCard>
                                    </div>
                                </div>
                            </motion.div>
                        )
                    })}
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
                <div className="container-custom">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center max-w-3xl mx-auto"
                    >
                        <h2 className="heading-lg text-navy-900 mb-6">
                            Want to Study in the UK Without IELTS?
                        </h2>
                        <p className="text-gray-600 text-lg mb-8">
                            Discover your options! Book a free consultation with our certified counsellors.
                            We only charge our processing fees after visa approval.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Button
                                onClick={handleWhatsApp}
                                className="btn-gold text-lg px-8 py-6 rounded-xl"
                            >
                                <Phone className="mr-2 h-5 w-5" />
                                WhatsApp: 078704 78704
                            </Button>
                            <Button
                                variant="outline"
                                className="text-lg px-8 py-6 rounded-xl border-2 border-navy-900 text-navy-900 hover:bg-navy-900 hover:text-white"
                            >
                                View Success Stories
                            </Button>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    )
}
