"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import Image from "next/image"
import { X, ChevronLeft, ChevronRight } from "lucide-react"
import { GlassCard } from "@/components/ui/glass-card"

const categories = ["All", "Success Stories", "Triumphs", "Office", "Events"]

export default function GalleryClient({ galleryImages }: { galleryImages: any[] }) {
    const [selectedCategory, setSelectedCategory] = useState("All")
    const [selectedImage, setSelectedImage] = useState<number | null>(null)

    const filteredImages = selectedCategory === "All"
        ? galleryImages
        : galleryImages.filter(img => img.category === selectedCategory)

    const selectedImageData = selectedImage !== null ? galleryImages.find(img => img.id === selectedImage) : null
    const selectedIndex = selectedImage !== null ? galleryImages.findIndex(img => img.id === selectedImage) : -1

    const handleNext = () => {
        if (selectedImage !== null) {
            const currentIndex = galleryImages.findIndex(img => img.id === selectedImage)
            const nextIndex = (currentIndex + 1) % galleryImages.length
            setSelectedImage(galleryImages[nextIndex].id)
        }
    }

    const handlePrevious = () => {
        if (selectedImage !== null) {
            const currentIndex = galleryImages.findIndex(img => img.id === selectedImage)
            const prevIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length
            setSelectedImage(galleryImages[prevIndex].id)
        }
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
                            Our Journey
                        </span>
                        <h1 className="heading-xl text-white mb-6">
                            Photo <span className="gradient-text-gold">Gallery</span>
                        </h1>
                        <p className="text-xl text-blue-100/80 max-w-2xl mx-auto">
                            Explore our success stories, office moments, events, and triumphs from 18+ years of helping students achieve their dreams.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Category Filter */}
            <section className="py-12 -mt-16 relative z-20">
                <div className="container-custom">
                    <div className="flex flex-wrap items-center justify-center gap-4">
                        {categories.map((category) => (
                            <motion.button
                                key={category}
                                onClick={() => setSelectedCategory(category)}
                                className={`px-6 py-3 rounded-xl font-semibold transition-all ${selectedCategory === category
                                        ? "bg-gradient-to-r from-teal-500 to-teal-600 text-white shadow-lg shadow-teal-500/20"
                                        : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200"
                                    }`}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                {category}
                            </motion.button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Gallery Grid */}
            <section className="py-24">
                <div className="container-custom">
                    {filteredImages.length === 0 ? (
                        <div className="text-center py-16">
                            <p className="text-gray-500 text-lg">No images found in this category.</p>
                        </div>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                        >
                            {filteredImages.map((image, index) => (
                                <motion.div
                                    key={image.id}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: index * 0.05 }}
                                    onClick={() => setSelectedImage(image.id)}
                                    className="group cursor-pointer"
                                >
                                    <GlassCard glow="teal" className="overflow-hidden p-0 hover:scale-105 transition-transform duration-300">
                                        <div className="relative aspect-square overflow-hidden">
                                            <Image
                                                src={image.image_url}
                                                alt={image.title}
                                                fill
                                                className="object-cover group-hover:scale-110 transition-transform duration-500"
                                                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                <div className="absolute bottom-0 left-0 right-0 p-4">
                                                    <p className="text-white font-semibold text-sm">{image.title}</p>
                                                    <p className="text-white/80 text-xs mt-1">{image.category}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </GlassCard>
                                </motion.div>
                            ))}
                        </motion.div>
                    )}
                </div>
            </section>

            {/* Image Modal */}
            {selectedImageData && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
                    onClick={() => setSelectedImage(null)}
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="relative max-w-6xl w-full max-h-[90vh]"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Close Button */}
                        <button
                            onClick={() => setSelectedImage(null)}
                            className="absolute -top-12 right-0 text-white hover:text-teal-400 transition-colors z-10"
                        >
                            <X className="h-8 w-8" />
                        </button>

                        {/* Navigation Buttons */}
                        <button
                            onClick={handlePrevious}
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-teal-400 transition-colors bg-black/50 rounded-full p-3 hover:bg-black/70"
                        >
                            <ChevronLeft className="h-6 w-6" />
                        </button>
                        <button
                            onClick={handleNext}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-teal-400 transition-colors bg-black/50 rounded-full p-3 hover:bg-black/70"
                        >
                            <ChevronRight className="h-6 w-6" />
                        </button>

                        {/* Image */}
                        <div className="relative w-full h-[80vh] rounded-2xl overflow-hidden">
                            <Image
                                src={selectedImageData.image_url}
                                alt={selectedImageData.title}
                                fill
                                className="object-contain"
                                sizes="90vw"
                            />
                        </div>

                        {/* Image Info */}
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 rounded-b-2xl">
                            <h3 className="text-white text-xl font-bold mb-1">{selectedImageData.title}</h3>
                            <p className="text-white/80 text-sm">{selectedImageData.category}</p>
                            <p className="text-white/60 text-xs mt-2">
                                {selectedIndex + 1} of {galleryImages.length}
                            </p>
                        </div>
                    </motion.div>
                </motion.div>
            )}

            {/* End of Gallery */}
        </div>
    )
}


