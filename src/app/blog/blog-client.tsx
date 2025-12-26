"use client"

import { motion } from "framer-motion"
import { GlassCard, GlassCardContent } from "@/components/ui/glass-card"
import { Button } from "@/components/ui/button"
import { ArrowRight, Calendar, Clock, User, Search } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import Image from "next/image"

const categories = ["All", "Academics", "Sports", "Events", "Achievements"]

export default function BlogClient({ blogPosts }: { blogPosts: any[] }) {
    const [selectedCategory, setSelectedCategory] = useState("All")
    const [searchQuery, setSearchQuery] = useState("")

    const filteredPosts = blogPosts.filter(post => {
        const matchesCategory = selectedCategory === "All" || post.category === selectedCategory
        const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
        return matchesCategory && matchesSearch
    })

    const featuredPosts = blogPosts.filter(post => post.featured || post.is_published).slice(0, 2)

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
                            School News & Updates
                        </span>
                        <h1 className="heading-xl text-white mb-6">
                            Latest <span className="gradient-text-gold">Happenings</span>
                        </h1>
                        <p className="text-xl text-blue-100/80 max-w-2xl mx-auto">
                            Stay informed with the latest school events, student achievements, and academic updates from Prayas School.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Featured Posts */}
            {featuredPosts.length > 0 && (
                <section className="py-16 -mt-16 relative z-20">
                    <div className="container-custom">
                        <div className="grid md:grid-cols-2 gap-8">
                            {featuredPosts.map((post, index) => (
                                <motion.div
                                    key={post.id}
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                >
                                    <GlassCard glow="teal" className="overflow-hidden group h-full">
                                        <div className="relative overflow-hidden h-64">
                                            <Image
                                                src={post.image || post.image_url || 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=800&auto=format&fit=crop'}
                                                alt={post.title}
                                                fill
                                                className="object-cover transition-transform duration-500 group-hover:scale-105"
                                                sizes="(max-width: 768px) 100vw, 50vw"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 to-transparent" />
                                            <div className="absolute top-4 left-4">
                                                <span className="px-3 py-1 bg-gold-500 text-white text-xs font-bold rounded-full uppercase">
                                                    Featured
                                                </span>
                                            </div>
                                            <div className="absolute bottom-4 left-4 right-4">
                                                <span className="px-3 py-1 bg-white/20 backdrop-blur-sm text-white text-sm rounded-full">
                                                    {post.category}
                                                </span>
                                            </div>
                                        </div>
                                        <GlassCardContent className="p-6 space-y-4">
                                            <h2 className="text-xl font-bold text-navy-900 group-hover:text-teal-600 transition-colors line-clamp-2">
                                                {post.title}
                                            </h2>
                                            <p className="text-gray-600 line-clamp-2">{post.excerpt}</p>
                                            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                                                <div className="flex items-center gap-4 text-sm text-gray-500">
                                                    <span className="flex items-center gap-1">
                                                        <Calendar className="h-4 w-4" />
                                                        {new Date(post.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                                    </span>
                                                    <span className="flex items-center gap-1">
                                                        <Clock className="h-4 w-4" />
                                                        {post.read_time}
                                                    </span>
                                                </div>
                                                <ArrowRight className="h-5 w-5 text-teal-500 group-hover:translate-x-1 transition-transform" />
                                            </div>
                                        </GlassCardContent>
                                    </GlassCard>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Filter & Search */}
            <section className="py-8 border-b border-gray-100 sticky top-[72px] bg-white/95 backdrop-blur-sm z-30">
                <div className="container-custom">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                        {/* Categories */}
                        <div className="flex flex-wrap items-center gap-2">
                            {categories.map((category) => (
                                <button
                                    key={category}
                                    onClick={() => setSelectedCategory(category)}
                                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${selectedCategory === category
                                        ? "bg-teal-500 text-white"
                                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                                        }`}
                                >
                                    {category}
                                </button>
                            ))}
                        </div>

                        {/* Search */}
                        <div className="relative w-full md:w-80">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search articles..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* All Posts Grid */}
            <section className="py-16">
                <div className="container-custom">
                    {filteredPosts.length === 0 ? (
                        <div className="text-center py-16">
                            <p className="text-gray-500 text-lg">No articles found matching your criteria.</p>
                        </div>
                    ) : (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {filteredPosts.map((post, index) => (
                                <motion.div
                                    key={post.id}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.05 }}
                                >
                                    <GlassCard glow="teal" className="overflow-hidden group h-full flex flex-col">
                                        <div className="relative overflow-hidden h-48">
                                            <Image
                                                src={post.image || post.image_url || 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=800&auto=format&fit=crop'}
                                                alt={post.title}
                                                fill
                                                className="object-cover transition-transform duration-500 group-hover:scale-105"
                                                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                            />
                                            <div className="absolute top-4 left-4">
                                                <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-teal-600 text-xs font-bold rounded-full">
                                                    {post.category}
                                                </span>
                                            </div>
                                        </div>
                                        <GlassCardContent className="p-6 flex-1 flex flex-col">
                                            <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                                                <span className="flex items-center gap-1">
                                                    <Calendar className="h-3.5 w-3.5" />
                                                    {new Date(post.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                                </span>
                                                <span className="flex items-center gap-1">
                                                    <Clock className="h-3.5 w-3.5" />
                                                    {post.read_time}
                                                </span>
                                            </div>
                                            <h3 className="text-lg font-bold text-navy-900 group-hover:text-teal-600 transition-colors mb-3 line-clamp-2">
                                                {post.title}
                                            </h3>
                                            <p className="text-gray-600 text-sm line-clamp-3 flex-1">
                                                {post.excerpt}
                                            </p>
                                            <div className="flex items-center justify-between pt-4 mt-4 border-t border-gray-100">
                                                <span className="flex items-center gap-2 text-sm text-gray-500">
                                                    <User className="h-4 w-4" />
                                                    {post.author}
                                                </span>
                                                <Button variant="link" className="text-teal-600 p-0 h-auto font-semibold">
                                                    Read More
                                                    <ArrowRight className="ml-1 h-4 w-4" />
                                                </Button>
                                            </div>
                                        </GlassCardContent>
                                    </GlassCard>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* Newsletter Section */}
            <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
                <div className="container-custom">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="max-w-2xl mx-auto text-center"
                    >
                        <span className="inline-block px-4 py-1.5 rounded-full bg-teal-500/10 text-teal-600 text-sm font-semibold uppercase tracking-wide mb-4">
                            Stay Updated
                        </span>
                        <h2 className="heading-lg text-navy-900 mb-4">
                            Subscribe to School Updates
                        </h2>
                        <p className="text-gray-600 mb-8">
                            Get the latest school news, academic updates, and success stories directly in your inbox.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="flex-1 px-6 py-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
                            />
                            <Button className="btn-gold px-8 py-4 rounded-xl whitespace-nowrap">
                                Subscribe
                            </Button>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    )
}

