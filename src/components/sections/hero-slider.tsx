"use client"

import React, { useCallback, useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { ChevronLeft, ChevronRight, Sparkles } from 'lucide-react'
import { Button } from "@/components/ui/button"

// Enhanced slide data - using local images from /public/hero
const slides = [
    {
        id: 1,
        title: "Nurturing Young Minds",
        subtitle: "Excellence in Education",
        description: "Providing quality education and holistic development for students to become responsible citizens.",
        image: "/hero/slide-1.png",
        stats: "95% Pass Rate",
        statsSecondary: "1000+ Students",
        objectPosition: "center 20%", // Adjust to show faces below navbar
    },
    {
        id: 2,
        title: "Building Tomorrow's Leaders",
        subtitle: "Holistic Development",
        description: "From academics to co-curricular activities, we nurture every aspect of a child's growth.",
        image: "/hero/slide-2.png",
        stats: "20+ Years",
        statsSecondary: "500+ Alumni",
        objectPosition: "center 20%", // Adjust to show faces below navbar
    },
    {
        id: 3,
        title: "Modern Learning Environment",
        subtitle: "State-of-the-Art Facilities",
        description: "Smart classrooms, sports facilities, and experienced teachers for comprehensive education.",
        image: "/hero/slide-3.png",
        stats: "50+ Teachers",
        statsSecondary: "A+ Grade",
        objectPosition: "center 35%", // Adjust to show faces below navbar
    },
]

// Staggered text animation component
function AnimatedTitle({ text, isActive }: { text: string; isActive: boolean }) {
    const words = text.split(' ')

    return (
        <span className="inline-block">
            {words.map((word, wordIndex) => (
                <span key={wordIndex} className="inline-block mr-[0.25em]">
                    {word.split('').map((char, charIndex) => (
                        <motion.span
                            key={`${wordIndex}-${charIndex}`}
                            initial={{ opacity: 0, y: 40, rotateX: -20 }}
                            animate={isActive ? { opacity: 1, y: 0, rotateX: 0 } : { opacity: 0, y: 40, rotateX: -20 }}
                            transition={{
                                duration: 0.5,
                                delay: (wordIndex * word.length + charIndex) * 0.03,
                                ease: [0.4, 0, 0.2, 1],
                            }}
                            className="inline-block"
                            style={{ transformOrigin: 'bottom' }}
                        >
                            {char}
                        </motion.span>
                    ))}
                </span>
            ))}
        </span>
    )
}

// Glass content card with parallax
function GlassCard({
    slide,
    isActive,
    index
}: {
    slide: typeof slides[0]
    isActive: boolean
    index: number
}) {
    const cardRef = useRef<HTMLDivElement>(null)

    // Mouse tracking for parallax tilt
    const mouseX = useMotionValue(0)
    const mouseY = useMotionValue(0)

    const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [5, -5]), { stiffness: 150, damping: 20 })
    const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-5, 5]), { stiffness: 150, damping: 20 })

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!cardRef.current || !isActive) return
        const rect = cardRef.current.getBoundingClientRect()
        const x = (e.clientX - rect.left) / rect.width - 0.5
        const y = (e.clientY - rect.top) / rect.height - 0.5
        mouseX.set(x)
        mouseY.set(y)
    }

    const handleMouseLeave = () => {
        mouseX.set(0)
        mouseY.set(0)
    }

    return (
        <motion.div
            ref={cardRef}
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{
                opacity: isActive ? 1 : 0,
                y: isActive ? 0 : 50,
                scale: isActive ? 1 : 0.95
            }}
            transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
            style={{
                rotateX: isActive ? rotateX : 0,
                rotateY: isActive ? rotateY : 0,
                transformPerspective: 1200,
            }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className={`
                glass-hero-card rounded-3xl p-8 md:p-12 max-w-3xl
                transition-all duration-700
                ${isActive ? 'hover:scale-[1.02]' : 'pointer-events-none'}
            `}
        >
            {/* Stats Badge */}
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: isActive ? 1 : 0, x: isActive ? 0 : -20 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="inline-flex items-center gap-3 mb-6"
            >
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
                    <Sparkles className="w-4 h-4 text-amber-400" />
                    <span className="stats-gold-gradient font-semibold text-sm">
                        {slide.stats}
                    </span>
                    <span className="text-white/40">|</span>
                    <span className="stats-gold-gradient font-semibold text-sm">
                        {slide.statsSecondary}
                    </span>
                </div>
            </motion.div>

            {/* Title */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-[-0.03em] mb-4 leading-[1.1] font-[family-name:var(--font-plus-jakarta)] text-white drop-shadow-lg">
                <AnimatedTitle text={slide.title} isActive={isActive} />
            </h1>

            {/* Subtitle */}
            <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 20 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="text-xl md:text-2xl lg:text-3xl font-light text-cyan-100/90 tracking-wide mb-4"
            >
                {slide.subtitle}
            </motion.h2>

            {/* Description */}
            <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 20 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="text-base md:text-lg text-white/70 max-w-xl mb-8 leading-relaxed"
            >
                {slide.description}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 20 }}
                transition={{ delay: 0.6, duration: 0.6 }}
                className="flex flex-wrap items-center gap-4"
            >
                <Button
                    className="btn-glass-ripple rounded-full bg-white text-slate-900 hover:bg-white px-8 py-6 text-base font-semibold"
                    onClick={() => window.open("https://wa.me/919812026095", "_blank")}
                >
                    Book a Visit
                </Button>
                <Button
                    variant="ghost"
                    className="text-white hover:text-white hover:bg-white/10 rounded-full px-6 py-6 text-base font-medium border border-white/20 hover:border-white/40 transition-all"
                >
                    Explore Programs →
                </Button>
            </motion.div>
        </motion.div>
    )
}

// Progress bar component
function ProgressBar({ progress }: { progress: number }) {
    return (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-48 md:w-64 h-1 glass-progress-bar rounded-full z-20">
            <motion.div
                className="h-full glass-progress-fill rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3, ease: "linear" }}
            />
        </div>
    )
}

// Main Hero Slider Component
export function HeroSlider() {
    const [emblaRef, emblaApi] = useEmblaCarousel({
        loop: true,
        align: 'start',
    }, [Autoplay({ delay: 5000, stopOnInteraction: false, stopOnMouseEnter: true })])

    const [selectedIndex, setSelectedIndex] = useState(0)
    const [scrollSnaps, setScrollSnaps] = useState<number[]>([])
    const [progress, setProgress] = useState(0)
    const progressIntervalRef = useRef<NodeJS.Timeout | null>(null)

    // Update selected index and snaps
    const onSelect = useCallback(() => {
        if (!emblaApi) return
        setSelectedIndex(emblaApi.selectedScrollSnap())
        setProgress(0)
    }, [emblaApi])

    const onInit = useCallback((api: any) => {
        setScrollSnaps(api.scrollSnapList())
    }, [])

    // Progress bar animation
    useEffect(() => {
        if (progressIntervalRef.current) {
            clearInterval(progressIntervalRef.current)
        }

        progressIntervalRef.current = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) return 0
                return prev + 2
            })
        }, 100)

        return () => {
            if (progressIntervalRef.current) {
                clearInterval(progressIntervalRef.current)
            }
        }
    }, [selectedIndex])

    useEffect(() => {
        if (!emblaApi) return
        onInit(emblaApi)
        onSelect()
        emblaApi.on('select', onSelect)
        emblaApi.on('reInit', onInit)
        return () => {
            emblaApi.off('select', onSelect)
            emblaApi.off('reInit', onInit)
        }
    }, [emblaApi, onInit, onSelect])

    // Navigation functions
    const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi])
    const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi])

    return (
        <section className="relative w-full min-h-screen bg-slate-900 overflow-hidden">
            {/* Particles Background */}
            <div className="hero-particles" />

            {/* Carousel Container */}
            <div className="absolute inset-0" ref={emblaRef}>
                <div className="flex h-full">
                    {slides.map((slide, index) => (
                        <div
                            className="relative flex-[0_0_100%] h-full min-w-0"
                            key={slide.id}
                        >
                            {/* Background Image with Zoom */}
                            <div className="absolute inset-0">
                                <Image
                                    src={slide.image}
                                    alt={slide.title}
                                    fill
                                    priority={index === 0}
                                    className={`object-cover hero-image-zoom ${index === selectedIndex ? 'active' : ''}`}
                                    sizes="100vw"
                                    style={{ objectPosition: slide.objectPosition }}
                                />
                            </div>

                            {/* Gradient Overlays */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
                            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent" />

                            {/* Glass Card Content */}
                            <div className="absolute inset-0 flex items-center">
                                <div className="container mx-auto px-6 md:px-12 lg:px-16">
                                    <GlassCard
                                        slide={slide}
                                        isActive={index === selectedIndex}
                                        index={index}
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Glass Chevron Navigation */}
            <button
                className="glass-chevron absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center text-white/70 hover:text-white"
                onClick={scrollPrev}
                aria-label="Previous slide"
            >
                <ChevronLeft className="w-6 h-6 md:w-7 md:h-7" />
            </button>
            <button
                className="glass-chevron absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center text-white/70 hover:text-white"
                onClick={scrollNext}
                aria-label="Next slide"
            >
                <ChevronRight className="w-6 h-6 md:w-7 md:h-7" />
            </button>

            {/* Progress Bar */}
            <ProgressBar progress={progress} />

            {/* Mobile Swipe Indicator */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5 }}
                className="absolute bottom-20 left-1/2 -translate-x-1/2 z-20 md:hidden"
            >
                <div className="flex items-center gap-2 text-white/50 text-sm">
                    <ChevronLeft className="w-4 h-4 animate-pulse" />
                    <span>Swipe</span>
                    <ChevronRight className="w-4 h-4 animate-pulse" />
                </div>
            </motion.div>

            {/* Slide Indicators (Desktop) */}
            <div className="absolute bottom-8 right-8 z-20 hidden md:flex items-center gap-3">
                {scrollSnaps.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => emblaApi?.scrollTo(index)}
                        className={`transition-all duration-500 rounded-full ${index === selectedIndex
                            ? 'w-8 h-2 bg-cyan-400 shadow-[0_0_15px_rgba(0,217,255,0.6)]'
                            : 'w-2 h-2 bg-white/30 hover:bg-white/50'
                            }`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </section>
    )
}

export default HeroSlider
