"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react"
import { GlassCard } from "@/components/ui/glass-card"
import { useLanguage } from "@/lib/language-context"
import { useState, useEffect, useCallback, useMemo } from "react"

const testimonials = [
    {
        name: "Navneet Rehal",
        country: "UK Study Visa",
        flag: "🇬🇧",
        quote: "Excellent & Experienced Teaching Staff. Helpful. Great Environment. Small batches to ensure proper gain of knowledge and learning. They have answer to almost every query one has. I will surely recommend Seabird to everyone!",
        rating: 5,
        avatar: "NR",
    },
    {
        name: "Jobanpreet Singh",
        country: "Study Abroad",
        flag: "🎓",
        quote: "If you're looking for the best consultants and visa experts in the industry, look no further than Seabird Education. They are the reason I'm now pursuing my dream education overseas. Highly recommended!",
        rating: 5,
        avatar: "JS",
    },
    {
        name: "Sukhchain Singh",
        country: "UK Study Visa",
        flag: "🇬🇧",
        quote: "Seabird Education is the best UK education consultant in Mohali. I got my cousin's visa within 22 days. Specially thanks to Iqbal sir for the quick processing and guidance throughout.",
        rating: 5,
        avatar: "SS",
    },
    {
        name: "Palak Sachdeva",
        country: "Student Visa",
        flag: "🎓",
        quote: "The Seabird International team is too supportive. The staff is good in behaviour as well they are always ready to help their students immediately. I recommend to all of them who want to study abroad!",
        rating: 5,
        avatar: "PS",
    },
    {
        name: "Gurpreet Kaur",
        country: "UK Visa",
        flag: "🇬🇧",
        quote: "Mai bhut dhanvaadi aa seabird team da, etho mere bache da visa lgon da supna pura ho skya. Thankful to Bobby sir and Amarjeet sir for making our dream come true!",
        rating: 5,
        avatar: "GK",
    },
    {
        name: "Mandeep Virk",
        country: "Immigration",
        flag: "🌍",
        quote: "Best immigration which deals with the best and most successful visa rates. Must visit to make your dreams come true. The entire team is very professional and supportive.",
        rating: 5,
        avatar: "MV",
    },
    {
        name: "Manpreet Kaur",
        country: "Student",
        flag: "🎓",
        quote: "Seabird is a good institute. Students will be beneficial while studying over here. Teachers are good and their behavior is also good while teaching. They do a lot of hard work. Good results guaranteed!",
        rating: 5,
        avatar: "MK",
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
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <span className="inline-block px-4 py-1.5 rounded-full bg-teal-500/10 text-teal-600 text-sm font-semibold uppercase tracking-wide mb-4">
                        Student Success Stories
                    </span>
                    <h2 className="heading-lg text-navy-900 mb-4">
                        Hear What Our Students Say!
                    </h2>
                    <p className="text-gray-600 max-w-xl mx-auto">
                        Real stories from students who achieved their study abroad dreams with Seabird Education.
                    </p>
                </motion.div>

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
