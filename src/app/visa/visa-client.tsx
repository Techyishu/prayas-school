"use client"

import { motion } from "framer-motion"
import { GlassCard } from "@/components/ui/glass-card"
import { Button } from "@/components/ui/button"
import { 
    CheckCircle2,
    Clock,
    FileCheck,
    Award,
    ArrowRight,
    Phone,
    MessageCircle
} from "lucide-react"
import { Accordion as AccordionComponent } from "@/components/ui/accordion"
import * as Icons from "lucide-react"
import Image from "next/image"

const processSteps = [
    {
        step: "01",
        title: "Free Consultation",
        description: "30-45 minute session to assess your profile and goals",
        icon: Phone,
        duration: "30-45 min"
    },
    {
        step: "02",
        title: "Documentation",
        description: "Complete file preparation with expert guidance",
        icon: FileCheck,
        duration: "1-2 weeks"
    },
    {
        step: "03",
        title: "Application Submission",
        description: "We handle all submissions and follow-ups",
        icon: Clock,
        duration: "Variable"
    },
    {
        step: "04",
        title: "Visa Approval",
        description: "Celebrate your success and prepare for travel",
        icon: Award,
        duration: "Success!"
    },
]

export default function VisaClient({ visaTypes, visaPhotos }: { visaTypes: any[], visaPhotos: any[] }) {
    const handleWhatsApp = () => {
        window.open("https://wa.me/919653505005?text=Hi, I'd like to know more about visa services", "_blank")
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
                            Comprehensive Visa Services
                        </span>
                        <h1 className="heading-xl text-white mb-6">
                            Your <span className="gradient-text-gold">Visa Journey</span> Starts Here
                        </h1>
                        <p className="text-xl text-blue-100/80 max-w-3xl mx-auto leading-relaxed">
                            From study visas to work permits, tourist visas to permanent residency - we handle all your immigration needs with 18+ years of expertise and 18,000+ successful applications.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Visa Types Grid */}
            <section className="py-24">
                <div className="container-custom">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <span className="inline-block px-4 py-1.5 rounded-full bg-teal-500/10 text-teal-600 text-sm font-semibold uppercase tracking-wide mb-4">
                            All Visa Types
                        </span>
                        <h2 className="heading-lg text-navy-900 mb-4">Choose Your Path</h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            Whether you're a student, professional, or traveler, we have the right visa solution for you.
                        </p>
                    </motion.div>

                    {visaTypes.length === 0 ? (
                        <div className="text-center py-16">
                            <p className="text-gray-500 text-lg">No visa types available at the moment.</p>
                        </div>
                    ) : (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {visaTypes.map((visa, index) => {
                                // @ts-ignore
                                const Icon = Icons[visa.icon] || Icons.HelpCircle
                                return (
                                    <motion.div
                                        key={visa.id}
                                        initial={{ opacity: 0, y: 30 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: index * 0.1 }}
                                    >
                                        <GlassCard glow="teal" className="h-full p-8 hover:scale-105 transition-transform duration-300">
                                            <div className="flex items-center gap-4 mb-6">
                                                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${visa.gradient} flex items-center justify-center shadow-lg`}>
                                                    <Icon className="h-8 w-8 text-white" />
                                                </div>
                                                <div>
                                                    <div className="text-3xl mb-1">{visa.flag}</div>
                                                    <h3 className="text-xl font-bold text-navy-900">{visa.title}</h3>
                                                </div>
                                            </div>
                                            
                                            <p className="text-gray-600 mb-6 leading-relaxed">{visa.description}</p>
                                            
                                            <div className="space-y-2 mb-6">
                                                {visa.features?.map((feature: string, i: number) => (
                                                    <div key={i} className="flex items-center gap-2">
                                                        <CheckCircle2 className="h-5 w-5 text-teal-600 shrink-0" />
                                                        <span className="text-sm text-gray-700">{feature}</span>
                                                    </div>
                                                ))}
                                            </div>

                                            {visa.accordion && visa.accordion.length > 0 && (
                                                <AccordionComponent 
                                                    items={visa.accordion.map((item: any) => ({
                                                        title: item.title,
                                                        content: <p className="text-sm text-gray-600 leading-relaxed">{item.content}</p>
                                                    }))}
                                                />
                                            )}
                                        </GlassCard>
                                    </motion.div>
                                )
                            })}
                        </div>
                    )}
                </div>
            </section>

            {/* Approved Visa Photos Section */}
            {visaPhotos.length > 0 && (
                <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
                    <div className="container-custom">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-center mb-16"
                        >
                            <span className="inline-block px-4 py-1.5 rounded-full bg-teal-500/10 text-teal-600 text-sm font-semibold uppercase tracking-wide mb-4">
                                Success Stories
                            </span>
                            <h2 className="heading-lg text-navy-900 mb-4">Approved Visa Photos</h2>
                            <p className="text-gray-600 max-w-2xl mx-auto">
                                Real visa approvals from our successful applicants. Your success story could be next!
                            </p>
                        </motion.div>

                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {visaPhotos.map((photo, index) => (
                                <motion.div
                                    key={photo.id}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.05 }}
                                >
                                    <GlassCard glow="teal" className="overflow-hidden p-0">
                                        <div className="relative aspect-video">
                                            <Image
                                                src={photo.image_url}
                                                alt={photo.title}
                                                fill
                                                className="object-cover"
                                                sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                                            />
                                        </div>
                                        <div className="p-4">
                                            <h3 className="text-sm font-semibold text-navy-900 mb-1 line-clamp-1">{photo.title}</h3>
                                            <span className="text-xs px-2 py-1 bg-teal-500/10 text-teal-600 rounded">
                                                {photo.category}
                                            </span>
                                        </div>
                                    </GlassCard>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Process Timeline */}
            <section className="py-24">
                <div className="container-custom">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <span className="inline-block px-4 py-1.5 rounded-full bg-teal-500/10 text-teal-600 text-sm font-semibold uppercase tracking-wide mb-4">
                            Our Process
                        </span>
                        <h2 className="heading-lg text-navy-900 mb-4">How We Work</h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            A simple, transparent process from consultation to visa approval
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {processSteps.map((step, index) => {
                            const StepIcon = step.icon
                            return (
                                <motion.div
                                    key={step.step}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className="relative"
                                >
                                    {index < processSteps.length - 1 && (
                                        <div className="hidden lg:block absolute top-16 left-full w-full h-0.5 bg-gradient-to-r from-teal-500 to-transparent z-0" />
                                    )}
                                    <GlassCard glow="teal" className="relative z-10 h-full p-6 text-center">
                                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-teal-500 to-teal-600 flex items-center justify-center mx-auto mb-4 shadow-lg">
                                            <StepIcon className="h-8 w-8 text-white" />
                                        </div>
                                        <div className="text-4xl font-bold gradient-text mb-2">{step.step}</div>
                                        <h3 className="font-bold text-navy-900 mb-2">{step.title}</h3>
                                        <p className="text-sm text-gray-600 mb-3">{step.description}</p>
                                        <span className="inline-block px-3 py-1 rounded-full bg-teal-500/10 text-teal-600 text-xs font-semibold">
                                            {step.duration}
                                        </span>
                                    </GlassCard>
                                </motion.div>
                            )
                        })}
                    </div>
                </div>
            </section>

            {/* Why Choose Us */}
            <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
                <div className="container-custom">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <span className="inline-block px-4 py-1.5 rounded-full bg-teal-500/10 text-teal-600 text-sm font-semibold uppercase tracking-wide mb-4">
                            Why Seabird
                        </span>
                        <h2 className="heading-lg text-navy-900 mb-4">Your Trusted Visa Partner</h2>
                    </motion.div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                icon: Award,
                                title: "100% Success Rate",
                                description: "For student visas with 18,000+ successful applications",
                                gradient: "from-teal-500 to-emerald-600"
                            },
                            {
                                icon: Clock,
                                title: "Fast Processing",
                                description: "Expert documentation and submission for quick approvals",
                                gradient: "from-blue-500 to-indigo-600"
                            },
                            {
                                icon: CheckCircle2,
                                title: "Post-Visa Payment",
                                description: "We only charge after your visa is approved. No upfront fees!",
                                gradient: "from-gold-500 to-amber-600"
                            }
                        ].map((benefit, index) => {
                            const BenefitIcon = benefit.icon
                            return (
                                <motion.div
                                    key={benefit.title}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                >
                                    <GlassCard glow="teal" className="h-full p-8 text-center">
                                        <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${benefit.gradient} flex items-center justify-center mx-auto mb-6 shadow-lg`}>
                                            <BenefitIcon className="h-8 w-8 text-white" />
                                        </div>
                                        <h3 className="text-xl font-bold text-navy-900 mb-3">{benefit.title}</h3>
                                        <p className="text-gray-600">{benefit.description}</p>
                                    </GlassCard>
                                </motion.div>
                            )
                        })}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 bg-navy-gradient relative overflow-hidden">
                <div className="absolute inset-0 grid-pattern opacity-20" />
                <div className="absolute top-10 left-10 w-64 h-64 bg-teal-500/20 rounded-full blur-3xl" />
                <div className="absolute bottom-10 right-10 w-80 h-80 bg-gold-500/15 rounded-full blur-3xl" />

                <div className="container-custom relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="max-w-2xl mx-auto"
                    >
                        <h2 className="heading-lg text-white mb-6">
                            Ready to Start Your Visa Journey?
                        </h2>
                        <p className="text-blue-100/80 text-lg mb-8">
                            Get a free consultation with our certified visa experts. We'll assess your profile and guide you to the best visa option for your goals.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Button onClick={handleWhatsApp} className="btn-gold text-lg px-8 py-6 rounded-xl w-full sm:w-auto">
                                <MessageCircle className="mr-2 h-5 w-5" />
                                WhatsApp Consultation
                            </Button>
                            <a href="tel:+919653505005">
                                <Button className="bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 text-lg px-8 py-6 rounded-xl w-full sm:w-auto">
                                    <Phone className="mr-2 h-5 w-5" />
                                    Call 096535 05005
                                </Button>
                            </a>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    )
}

