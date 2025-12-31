"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react"
import { GlassCard } from "@/components/ui/glass-card"
import { useLanguage } from "@/lib/language-context"
import { useState, useEffect, useCallback, useMemo } from "react"
import { SectionHeading } from "@/components/ui/section-heading"

const testimonials = [
    {
        name: "Priya Sharma",
        country: "Parent",
        flag: "👨‍👩‍👧",
        quote: "Prayas School has transformed my child's confidence. The teachers are incredibly supportive and focus on individual attention. The balance between academics and sports is perfect.",
        rating: 5,
        avatar: "PS",
    },
    {
        name: "Rahul Verma",
        country: "Alumni",
        quote: "My years at Prayas School were the best. The foundation I received here helped me crack competitive exams. The disciplined environment and quality education are unmatched in Karnal.",
        rating: 5,
        avatar: "RV",
    },
    {
        name: "Anita Gupta",
        country: "Parent",
        flag: "👩‍👧",
        quote: "I see a positive change in my daughter. She enjoys going to school every day. The smart classrooms and library facilities have really helped in her learning process.",
        rating: 5,
        avatar: "AG",
    },
    {
        name: "Vikram Singh",
        country: "Student - Class 10",
        flag: "👨‍🎓",
        quote: "The teachers here explain concepts very clearly. I love the science labs where we get to do practical experiments. Sports day is my favorite event of the year!",
        rating: 5,
        avatar: "VS",
    },
    {
        name: "Mrs. Mehra",
        country: "Parent",
        flag: "👩‍👦",
        quote: "Best school in the region! The focus on moral values along with studies is what impressed me the most. I am glad I chose Prayas School for my son.",
        rating: 5,
        avatar: "MM",
    },
]

export function Testimonials() {
    const { t } = useLanguage()
    const [currentIndex, setCurrentIndex] = useState(0)
    const [isAutoPlaying, setIsAutoPlaying] = useState(true)
    const [isDesktop, setIsDesktop] = useState(false)

    // Handle window resize for responsive behavior
    useEffect(() => {
        const checkDesktop = () => {
            setIsDesktop(window.innerWidth > 768)
        }

        // Initial check
        checkDesktop()

        window.addEventListener("resize", checkDesktop)
        return () => window.removeEventListener("resize", checkDesktop)
    }, [])

    const nextSlide = useCallback(() => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, [])

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
    }

    // Auto-slide
    useEffect(() => {
        if (!isAutoPlaying) return

        const interval = setInterval(nextSlide, 5000)
        return () => clearInterval(interval)
    }, [isAutoPlaying, nextSlide])

    const getVisibleTestimonials = () => {
        const items = []
        for (let i = -1; i <= 1; i++) {
            const index = (currentIndex + i + testimonials.length) % testimonials.length
            items.push({ ...testimonials[index], position: i })
        }
        return items
    }


    return (
        <section className="py-24 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-1/2 left-0 w-96 h-96 bg-teal-500/5 rounded-full blur-3xl -translate-y-1/2" />
            <div className="absolute top-1/2 right-0 w-96 h-96 bg-gold-500/5 rounded-full blur-3xl -translate-y-1/2" />


            <div className="container-custom relative z-10">
                {/* Section Header */}
                <SectionHeading
                    pill="Student Success Stories"
                    title="Hear What Our Students"
                    highlight="Say!"
                    description="Real experiences from parents, students, and alumni of Prayas School."
                    light={false}
                />

                {/* Testimonials Carousel */}
                <div
                    className="relative max-w-5xl mx-auto"
                    onMouseEnter={() => setIsAutoPlaying(false)}
                    onMouseLeave={() => setIsAutoPlaying(true)}
                >
                    {/* Main Carousel */}
                    <div className="relative h-[400px] md:h-[350px] flex items-center justify-center">
                        <AnimatePresence mode="popLayout">
                            {getVisibleTestimonials().map((item) => (
                                <motion.div
                                    key={`${item.name}-${item.position}`}
                                    initial={{
                                        opacity: 0,
                                        scale: 0.8,
                                        x: item.position * 120,
                                    }}
                                    animate={{
                                        opacity: item.position === 0 ? 1 : 0.4,
                                        scale: item.position === 0 ? 1 : 0.85,
                                        x: item.position * (isDesktop ? 380 : 0),
                                        zIndex: item.position === 0 ? 10 : 0,
                                    }}
                                    exit={{
                                        opacity: 0,
                                        scale: 0.8,
                                    }}
                                    transition={{
                                        type: "spring",
                                        stiffness: 300,
                                        damping: 30,
                                    }}
                                    className={`absolute w-full max-w-md ${item.position !== 0 ? "hidden md:block pointer-events-none" : ""
                                        }`}
                                >
                                    <GlassCard
                                        glow={item.position === 0 ? "teal" : undefined}
                                        className="p-8"
                                    >
                                        {/* Quote Icon */}
                                        <div className="absolute -top-4 left-8">
                                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-teal-500 to-teal-600 flex items-center justify-center shadow-lg">
                                                <Quote className="h-5 w-5 text-white" />
                                            </div>
                                        </div>

                                        {/* Stars */}
                                        <div className="flex gap-1 mb-4 mt-2">
                                            {[...Array(item.rating)].map((_, i) => (
                                                <Star
                                                    key={i}
                                                    className="h-4 w-4 fill-gold-500 text-gold-500"
                                                />
                                            ))}
                                        </div>

                                        {/* Quote */}
                                        <p className="text-gray-700 leading-relaxed mb-6 line-clamp-4">
                                            "{item.quote}"
                                        </p>

                                        {/* Author */}
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-teal-500 to-teal-600 flex items-center justify-center text-white font-bold">
                                                {item.avatar}
                                            </div>
                                            <div>
                                                <div className="font-semibold text-navy-900">
                                                    {item.name}
                                                </div>
                                                <div className="text-sm text-gray-500 flex items-center gap-2">
                                                    <span>{item.flag}</span>
                                                    <span>{item.country}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </GlassCard>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>

                    {/* Navigation Buttons */}
                    <div className="flex items-center justify-center gap-4 mt-8">
                        <button
                            onClick={prevSlide}
                            className="w-12 h-12 rounded-full bg-white shadow-lg border border-gray-100 flex items-center justify-center text-gray-600 hover:text-teal-600 hover:border-teal-500 transition-all"
                        >
                            <ChevronLeft className="h-5 w-5" />
                        </button>

                        {/* Dots */}
                        <div className="flex gap-2">
                            {testimonials.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrentIndex(index)}
                                    className={`h-2 rounded-full transition-all ${index === currentIndex
                                        ? "w-8 bg-teal-500"
                                        : "w-2 bg-gray-300 hover:bg-gray-400"
                                        }`}
                                />
                            ))}
                        </div>

                        <button
                            onClick={nextSlide}
                            className="w-12 h-12 rounded-full bg-white shadow-lg border border-gray-100 flex items-center justify-center text-gray-600 hover:text-teal-600 hover:border-teal-500 transition-all"
                        >
                            <ChevronRight className="h-5 w-5" />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    )
}
