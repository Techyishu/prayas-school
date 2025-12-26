"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { ChevronDown, Sparkles, Phone, ArrowRight } from 'lucide-react'
import { Button } from "@/components/ui/button"

export function HeroSlider() {
    const handleScrollDown = () => {
        window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })
    }

    return (
        <section className="relative w-full h-screen overflow-hidden">
            {/* Background Video */}
            <div className="absolute inset-0 w-full h-full">
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="object-cover w-full h-full"
                >
                    <source src="/hero-video-2.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
                {/* Overlay to darken video for text readability */}
                <div className="absolute inset-0 bg-black/50" />
            </div>

            {/* Content Container */}
            <div className="relative z-10 w-full h-full flex items-center justify-center">
                <div className="container mx-auto px-6 md:px-12 text-center text-white">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="max-w-4xl mx-auto space-y-8"
                    >


                        {/* Title */}
                        <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-tight">
                            Nurturing Young Minds <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-300 to-cyan-300">
                                Building Future Leaders
                            </span>
                        </h1>

                        {/* Description */}
                        <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto leading-relaxed">
                            Prayas School provides a holistic learning environment where academic excellence meets
                            character development. Prepare your child for a bright future with our world-class facilities.
                        </p>

                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                            <Button
                                size="lg"
                                className="w-full sm:w-auto btn-gold text-lg px-8 py-6 rounded-full"
                                onClick={() => window.open("https://wa.me/919812026095", "_blank")}
                            >
                                <Phone className="mr-2 h-5 w-5" />
                                Book a Visit
                            </Button>
                            <Button
                                size="lg"
                                variant="outline"
                                className="w-full sm:w-auto bg-transparent text-white border-white/30 hover:bg-white/10 hover:text-white text-lg px-8 py-6 rounded-full backdrop-blur-sm"
                            >
                                Explore Academics
                                <ArrowRight className="ml-2 h-5 w-5" />
                            </Button>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 1 }}
                className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 z-10 cursor-pointer"
                onClick={handleScrollDown}
            >
                <div className="flex flex-col items-center text-white/70 hover:text-white transition-colors">
                    <span className="text-sm font-light tracking-widest mb-2 uppercase hidden md:block">Discover More</span>
                    <ChevronDown className="w-6 h-6 animate-bounce" />
                </div>
            </motion.div>
        </section>
    )
}

export default HeroSlider
