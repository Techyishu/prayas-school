"use client"

import * as React from "react"
import { useCallback, useEffect, useState, useRef } from "react"
import Image from "next/image"
import useEmblaCarousel from "embla-carousel-react"
import Autoplay from "embla-carousel-autoplay"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { ArrowRight, ChevronLeft, ChevronRight, Sparkles, Plane, Quote } from "lucide-react"
import { Button } from "@/components/ui/button"

// Success story data
const successStories = [
    {
        id: 1,
        name: "Rahul Sharma",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=800&fit=crop",
        from: "Delhi, India",
        to: "Boston, USA",
        visa: "F1 Student Visa",
        flag: "🇺🇸",
        days: 30,
        quote: "From Delhi to Harvard Business School – Seabird made my impossible dream possible in just 30 days!",
        stats: { university: "Harvard", scholarship: "$45K" },
        gradient: "from-blue-600 to-indigo-600",
    },
    {
        id: 2,
        name: "Patel Family",
        image: "https://images.unsplash.com/photo-1609220136736-443140cffec6?w=600&h=800&fit=crop",
        from: "Gujarat, India",
        to: "Toronto, Canada",
        visa: "Canada PR",
        flag: "🇨🇦",
        days: 45,
        quote: "Our family of 4 got Canada PR approved. Kids are thriving in Toronto schools!",
        stats: { members: "4 Family", type: "Express Entry" },
        gradient: "from-red-600 to-rose-600",
    },
    {
        id: 3,
        name: "Priya Menon",
        image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=600&h=800&fit=crop",
        from: "Bangalore, India",
        to: "Sydney, Australia",
        visa: "482 Work Visa",
        flag: "🇦🇺",
        days: 35,
        quote: "IT career boost! Working at Google Sydney now with my 482 visa. Thank you Seabird!",
        stats: { company: "Google", salary: "AUD 180K" },
        gradient: "from-teal-600 to-emerald-600",
    },
    {
        id: 4,
        name: "Anjali Singh",
        image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=600&h=800&fit=crop",
        from: "Mumbai, India",
        to: "London, UK",
        visa: "Health & Care Visa",
        flag: "🇬🇧",
        days: 28,
        quote: "NHS accepted my nursing credentials. Living my London dream as a Senior Nurse!",
        stats: { hospital: "NHS", position: "Senior Nurse" },
        gradient: "from-purple-600 to-violet-600",
    },
    {
        id: 5,
        name: "Vikram Reddy",
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=600&h=800&fit=crop",
        from: "Hyderabad, India",
        to: "Dubai, UAE",
        visa: "Golden Visa",
        flag: "🇦🇪",
        days: 21,
        quote: "10-year Golden Visa secured! Running my tech startup from Dubai's Silicon Oasis.",
        stats: { duration: "10 Years", investment: "$2M" },
        gradient: "from-amber-600 to-orange-600",
    },
]

// 3D floating badge component
function FloatingBadge({ isActive }: { isActive: boolean }) {
    return (
        <motion.div
            animate={{
                y: isActive ? [0, -10, 0] : 0,
                rotateY: isActive ? [0, 180, 360] : 0,
            }}
            transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
            }}
            className="absolute -top-6 -right-6 z-20"
        >
            <div className="relative w-16 h-16">
                {/* Outer glow */}
                <div className="absolute inset-0 bg-cyan-500/30 rounded-full blur-xl animate-pulse" />
                {/* Badge */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/50 border border-cyan-300/50">
                        <Plane className="w-6 h-6 text-white" />
                    </div>
                </div>
                {/* Orbiting ring */}
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0"
                >
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 bg-cyan-400 rounded-full" />
                </motion.div>
            </div>
        </motion.div>
    )
}

// Individual slide card with 3D tilt effect
function SuccessCard({
    story,
    isActive,
    index
}: {
    story: typeof successStories[0]
    isActive: boolean
    index: number
}) {
    const cardRef = useRef<HTMLDivElement>(null)
    const [isFlipped, setIsFlipped] = useState(false)

    // Mouse tracking for 3D tilt
    const mouseX = useMotionValue(0)
    const mouseY = useMotionValue(0)

    const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), { stiffness: 300, damping: 30 })
    const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), { stiffness: 300, damping: 30 })

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return
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
            className="relative h-[500px] md:h-[550px] mx-2 md:mx-4 perspective-1000"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                rotateX: isActive ? rotateX : 0,
                rotateY: isActive ? rotateY : 0,
                transformStyle: "preserve-3d",
            }}
        >
            {/* Floating 3D Badge */}
            <FloatingBadge isActive={isActive} />

            {/* Main Card */}
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{
                    opacity: isActive ? 1 : 0.7,
                    y: 0,
                    scale: isActive ? 1 : 0.95,
                    rotateY: isFlipped ? 180 : 0,
                }}
                transition={{ duration: 0.5 }}
                onClick={() => setIsFlipped(!isFlipped)}
                className={`
                    relative w-full h-full rounded-3xl overflow-hidden cursor-pointer
                    glass-panel neon-glow transform-3d
                    ${isActive ? 'shadow-2xl shadow-cyan-500/20' : 'shadow-xl'}
                `}
                style={{ transformStyle: "preserve-3d" }}
            >
                {/* Front of card */}
                <div
                    className="absolute inset-0 backface-hidden"
                    style={{ backfaceVisibility: "hidden" }}
                >
                    {/* Background image with overlay */}
                    <div className="absolute inset-0">
                        <Image
                            src={story.image}
                            alt={story.name}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 33vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/60 to-transparent" />
                    </div>

                    {/* Content */}
                    <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
                        {/* Journey path */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: isActive ? 1 : 0.5, x: 0 }}
                            transition={{ delay: 0.2 }}
                            className="flex items-center gap-3 mb-4"
                        >
                            <span className="text-sm text-cyan-200">{story.from}</span>
                            <motion.div
                                animate={{ x: [0, 5, 0] }}
                                transition={{ duration: 1.5, repeat: Infinity }}
                                className="flex items-center gap-1"
                            >
                                <ArrowRight className="w-4 h-4 text-cyan-400" />
                            </motion.div>
                            <span className="text-2xl">{story.flag}</span>
                            <span className="text-sm font-semibold text-white">{story.to}</span>
                        </motion.div>

                        {/* Name and visa type */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: isActive ? 1 : 0.7, y: 0 }}
                            transition={{ delay: 0.3 }}
                        >
                            <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
                                {story.name}
                            </h3>
                            <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r ${story.gradient} text-white text-sm font-medium`}>
                                <Sparkles className="w-4 h-4" />
                                {story.visa}
                            </div>
                        </motion.div>

                        {/* Stats counter */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: isActive ? 1 : 0.5, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="flex items-center gap-6 mt-4"
                        >
                            <div className="text-center">
                                <div className="text-3xl font-bold text-cyan-400">
                                    {story.days}
                                </div>
                                <div className="text-xs text-cyan-200/70 uppercase tracking-wider">
                                    Days
                                </div>
                            </div>
                            <div className="w-px h-10 bg-cyan-500/30" />
                            {Object.entries(story.stats).map(([key, value]) => (
                                <div key={key} className="text-center">
                                    <div className="text-lg font-bold text-white">
                                        {value}
                                    </div>
                                    <div className="text-xs text-cyan-200/70 uppercase tracking-wider">
                                        {key}
                                    </div>
                                </div>
                            ))}
                        </motion.div>

                        {/* Tap hint */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: isActive ? 0.6 : 0 }}
                            className="mt-4 text-xs text-cyan-300/60 text-center"
                        >
                            Tap to read story →
                        </motion.div>
                    </div>
                </div>

                {/* Back of card (quote) */}
                <div
                    className="absolute inset-0 backface-hidden bg-gradient-to-br from-navy-900 via-slate-900 to-navy-950 p-6 md:p-8 flex flex-col justify-center"
                    style={{
                        backfaceVisibility: "hidden",
                        transform: "rotateY(180deg)",
                    }}
                >
                    <Quote className="w-12 h-12 text-cyan-500/30 mb-4" />
                    <p className="text-xl md:text-2xl text-white font-medium leading-relaxed mb-6">
                        "{story.quote}"
                    </p>
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-cyan-500/50">
                            <Image
                                src={story.image}
                                alt={story.name}
                                width={48}
                                height={48}
                                className="object-cover w-full h-full"
                            />
                        </div>
                        <div>
                            <div className="font-bold text-white">{story.name}</div>
                            <div className="text-sm text-cyan-300/70">{story.visa}</div>
                        </div>
                    </div>

                    <Button
                        className="mt-8 btn-gold rounded-xl py-6"
                        onClick={(e) => {
                            e.stopPropagation()
                            window.open("https://wa.me/919653505005", "_blank")
                        }}
                    >
                        Your Story Next?
                        <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                </div>
            </motion.div>
        </motion.div>
    )
}

// Progress dots
function ProgressDots({
    count,
    activeIndex,
    onDotClick
}: {
    count: number
    activeIndex: number
    onDotClick: (index: number) => void
}) {
    return (
        <div className="flex items-center justify-center gap-3 mt-8">
            {Array.from({ length: count }).map((_, i) => (
                <button
                    key={i}
                    onClick={() => onDotClick(i)}
                    className="relative w-3 h-3 rounded-full overflow-hidden"
                >
                    {/* Background */}
                    <div className="absolute inset-0 bg-white/20 rounded-full" />
                    {/* Active fill */}
                    <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full"
                        initial={{ scale: 0 }}
                        animate={{ scale: i === activeIndex ? 1 : 0 }}
                        transition={{ duration: 0.3 }}
                    />
                    {/* Glow */}
                    {i === activeIndex && (
                        <motion.div
                            className="absolute inset-0 bg-cyan-400 rounded-full blur-sm"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: [0.5, 1, 0.5] }}
                            transition={{ duration: 2, repeat: Infinity }}
                        />
                    )}
                </button>
            ))}
        </div>
    )
}

// Main SuccessSlider component
export function SuccessSlider() {
    const [activeIndex, setActiveIndex] = useState(0)

    // Embla carousel setup
    const [emblaRef, emblaApi] = useEmblaCarousel(
        {
            loop: true,
            align: "center",
            skipSnaps: false,
            dragFree: false,
        },
        [Autoplay({ delay: 4000, stopOnInteraction: true })]
    )

    const scrollTo = useCallback(
        (index: number) => emblaApi?.scrollTo(index),
        [emblaApi]
    )

    const onSelect = useCallback(() => {
        if (!emblaApi) return
        setActiveIndex(emblaApi.selectedScrollSnap())
    }, [emblaApi])

    useEffect(() => {
        if (!emblaApi) return
        onSelect()
        emblaApi.on("select", onSelect)
        return () => {
            emblaApi.off("select", onSelect)
        }
    }, [emblaApi, onSelect])

    const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi])
    const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi])

    return (
        <section className="relative py-24 md:py-32 overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-b from-navy-950 via-[#0a1628] to-navy-950" />

            {/* Animated background orbs */}
            <motion.div
                animate={{
                    x: [0, 50, 0],
                    y: [0, -30, 0],
                    opacity: [0.1, 0.2, 0.1],
                }}
                transition={{ duration: 15, repeat: Infinity }}
                className="absolute top-20 left-[10%] w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl"
            />
            <motion.div
                animate={{
                    x: [0, -40, 0],
                    y: [0, 40, 0],
                    opacity: [0.1, 0.15, 0.1],
                }}
                transition={{ duration: 20, repeat: Infinity, delay: 5 }}
                className="absolute bottom-20 right-[10%] w-80 h-80 bg-purple-500/15 rounded-full blur-3xl"
            />

            {/* Cyber grid */}
            <div className="absolute inset-0 cyber-grid opacity-10" />

            <div className="container-custom relative z-10">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-sm font-semibold uppercase tracking-wider mb-6"
                    >
                        <Sparkles className="w-4 h-4 animate-pulse" />
                        Real Success Stories
                    </motion.div>
                    <h2 className="heading-lg text-white mb-4">
                        Dreams That <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Took Flight</span>
                    </h2>
                    <p className="text-blue-100/60 max-w-2xl mx-auto">
                        Join thousands of students and professionals who transformed their lives with our expert visa guidance.
                    </p>
                </motion.div>

                {/* Carousel */}
                <div className="relative">
                    {/* Navigation buttons */}
                    <button
                        onClick={scrollPrev}
                        className="absolute left-0 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full glass-card-3d flex items-center justify-center text-white hover:text-cyan-400 transition-colors hidden md:flex"
                    >
                        <ChevronLeft className="w-6 h-6" />
                    </button>
                    <button
                        onClick={scrollNext}
                        className="absolute right-0 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full glass-card-3d flex items-center justify-center text-white hover:text-cyan-400 transition-colors hidden md:flex"
                    >
                        <ChevronRight className="w-6 h-6" />
                    </button>

                    {/* Embla viewport */}
                    <div className="overflow-hidden mx-0 md:mx-16" ref={emblaRef}>
                        <div className="flex">
                            {successStories.map((story, index) => (
                                <div
                                    key={story.id}
                                    className="flex-[0_0_85%] md:flex-[0_0_40%] lg:flex-[0_0_33.333%] min-w-0"
                                >
                                    <SuccessCard
                                        story={story}
                                        isActive={index === activeIndex}
                                        index={index}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Swipe indicator (mobile) */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex items-center justify-center gap-2 mt-6 md:hidden text-cyan-300/50 text-sm"
                    >
                        <ChevronLeft className="w-4 h-4" />
                        <span>Swipe to explore</span>
                        <ChevronRight className="w-4 h-4" />
                    </motion.div>
                </div>

                {/* Progress dots */}
                <ProgressDots
                    count={successStories.length}
                    activeIndex={activeIndex}
                    onDotClick={scrollTo}
                />

                {/* CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mt-12"
                >
                    <p className="text-cyan-200/70 mb-4">
                        Ready to write your success story?
                    </p>
                    <Button
                        size="lg"
                        className="btn-gold rounded-2xl px-10 py-7 text-lg group"
                        onClick={() => window.open("https://wa.me/919653505005", "_blank")}
                    >
                        Start Your Journey
                        <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-2" />
                    </Button>
                </motion.div>
            </div>
        </section>
    )
}

export default SuccessSlider
