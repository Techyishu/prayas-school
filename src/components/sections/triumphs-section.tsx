"use client"

import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowUpRight, Sparkles } from 'lucide-react'

// Triumph stories data
const triumphStories = [
    {
        id: 1,
        image: "/2.png.webp",
        title: "Celebrating",
        highlight: "100% Board",
        subtitle: "Results",
        color: "from-amber-400 to-amber-500",
    },
    {
        id: 2,
        image: "/7-1.png.webp",
        title: "Celebrating",
        highlight: "300+ Awards",
        subtitle: "Won",
        color: "from-amber-400 to-amber-500",
    },
    {
        id: 3,
        image: "/9-2.png.webp",
        title: "Celebrating",
        highlight: "District",
        subtitle: "Champions",
        color: "from-amber-400 to-amber-500",
    },
    {
        id: 4,
        image: "/1-3.png.webp",
        title: "Celebrating",
        highlight: "100+ Alumni",
        subtitle: "Success",
        color: "from-amber-400 to-amber-500",
    },
]

// Single triumph card
function TriumphCard({ story, index }: { story: typeof triumphStories[0]; index: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group relative"
        >
            {/* Card */}
            <div className="relative h-80 md:h-96 rounded-2xl overflow-hidden bg-slate-800">
                {/* Image */}
                <Image
                    src={story.image}
                    alt={`${story.highlight} ${story.subtitle}`}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, 25vw"
                />

                {/* Subtle overlay on hover */}
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors duration-300" />

                {/* Yellow/Gold Label */}
                <div className="absolute bottom-4 left-4 right-4">
                    <div className={`bg-gradient-to-r ${story.color} rounded-xl p-4 shadow-lg transform transition-transform duration-300 group-hover:-translate-y-1`}>
                        <div className="flex items-start justify-between">
                            <div>
                                <p className="text-black/70 text-sm font-medium">
                                    {story.title}
                                </p>
                                <p className="text-black font-bold text-lg leading-tight">
                                    {story.highlight}
                                </p>
                                <p className="text-black font-bold text-lg leading-tight">
                                    {story.subtitle}
                                </p>
                            </div>
                            <div className="mt-1">
                                <ArrowUpRight className="w-5 h-5 text-black/70 group-hover:text-black transition-colors" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}

// Main Triumphs Section
export function TriumphsSection() {
    return (
        <section className="relative py-20 md:py-28 overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-b from-navy-950 via-[#0a1628] to-navy-950" />
            <div className="hero-particles opacity-30" />

            <div className="container mx-auto px-6 relative z-10">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-12"
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-sm font-semibold uppercase tracking-wider mb-6"
                    >
                        <Sparkles className="w-4 h-4" />
                        School Achievements
                    </motion.div>

                    <h2 className="text-3xl md:text-5xl font-black text-white font-[family-name:var(--font-plus-jakarta)] tracking-tight">
                        Celebrating <span className="text-amber-400">Excellence</span>
                    </h2>
                </motion.div>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {triumphStories.map((story, index) => (
                        <TriumphCard key={story.id} story={story} index={index} />
                    ))}
                </div>
            </div>
        </section>
    )
}

export default TriumphsSection
