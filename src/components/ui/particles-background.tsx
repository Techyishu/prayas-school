"use client"

import * as React from "react"
import { useEffect, useRef } from "react"

interface Particle {
    x: number
    y: number
    size: number
    speedX: number
    speedY: number
    opacity: number
}

export function ParticlesBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext("2d")
        if (!ctx) return

        let animationFrameId: number
        let particles: Particle[] = []

        const resizeCanvas = () => {
            canvas.width = window.innerWidth
            canvas.height = window.innerHeight
        }

        const createParticles = () => {
            particles = []
            const particleCount = Math.floor((canvas.width * canvas.height) / 15000)

            for (let i = 0; i < particleCount; i++) {
                particles.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    size: Math.random() * 2 + 0.5,
                    speedX: (Math.random() - 0.5) * 0.5,
                    speedY: (Math.random() - 0.5) * 0.5,
                    opacity: Math.random() * 0.5 + 0.2,
                })
            }
        }

        const drawParticle = (particle: Particle) => {
            ctx.beginPath()
            ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
            ctx.fillStyle = `rgba(255, 255, 255, ${particle.opacity})`
            ctx.fill()
        }

        const connectParticles = () => {
            const maxDistance = 150

            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x
                    const dy = particles[i].y - particles[j].y
                    const distance = Math.sqrt(dx * dx + dy * dy)

                    if (distance < maxDistance) {
                        const opacity = (1 - distance / maxDistance) * 0.15
                        ctx.beginPath()
                        ctx.strokeStyle = `rgba(13, 148, 136, ${opacity})`
                        ctx.lineWidth = 0.5
                        ctx.moveTo(particles[i].x, particles[i].y)
                        ctx.lineTo(particles[j].x, particles[j].y)
                        ctx.stroke()
                    }
                }
            }
        }

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height)

            particles.forEach((particle) => {
                particle.x += particle.speedX
                particle.y += particle.speedY

                // Wrap particles around screen
                if (particle.x < 0) particle.x = canvas.width
                if (particle.x > canvas.width) particle.x = 0
                if (particle.y < 0) particle.y = canvas.height
                if (particle.y > canvas.height) particle.y = 0

                drawParticle(particle)
            })

            connectParticles()
            animationFrameId = requestAnimationFrame(animate)
        }

        resizeCanvas()
        createParticles()
        animate()

        window.addEventListener("resize", () => {
            resizeCanvas()
            createParticles()
        })

        return () => {
            cancelAnimationFrame(animationFrameId)
            window.removeEventListener("resize", resizeCanvas)
        }
    }, [])

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 pointer-events-none"
            style={{ opacity: 0.7 }}
        />
    )
}

// World Map SVG with animated dots
export function WorldMapAnimation() {
    return (
        <div className="absolute inset-0 flex items-center justify-center opacity-20 pointer-events-none">
            <svg
                viewBox="0 0 1000 500"
                className="w-full h-full max-w-5xl"
                style={{ filter: "blur(0.5px)" }}
            >
                {/* Simplified world map paths */}
                <defs>
                    <linearGradient id="mapGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#0D9488" stopOpacity="0.5" />
                        <stop offset="100%" stopColor="#1E40AF" stopOpacity="0.5" />
                    </linearGradient>
                </defs>

                {/* Connected dots representing global locations */}
                <g className="map-dots">
                    {/* India */}
                    <circle cx="680" cy="230" r="8" fill="#0D9488" className="map-dot">
                        <animate
                            attributeName="r"
                            values="6;10;6"
                            dur="2s"
                            repeatCount="indefinite"
                        />
                    </circle>

                    {/* USA */}
                    <circle cx="200" cy="180" r="6" fill="#F59E0B" className="map-dot" />

                    {/* Canada */}
                    <circle cx="180" cy="120" r="5" fill="#F59E0B" className="map-dot" />

                    {/* UK */}
                    <circle cx="470" cy="140" r="5" fill="#F59E0B" className="map-dot" />

                    {/* Australia */}
                    <circle cx="820" cy="380" r="5" fill="#F59E0B" className="map-dot" />

                    {/* Germany */}
                    <circle cx="500" cy="150" r="4" fill="#14B8A6" className="map-dot" />

                    {/* Connection lines */}
                    <line x1="680" y1="230" x2="200" y2="180" stroke="url(#mapGradient)" strokeWidth="1" strokeDasharray="5,5" className="connection-line" opacity="0.4" />
                    <line x1="680" y1="230" x2="180" y2="120" stroke="url(#mapGradient)" strokeWidth="1" strokeDasharray="5,5" className="connection-line" opacity="0.4" />
                    <line x1="680" y1="230" x2="470" y2="140" stroke="url(#mapGradient)" strokeWidth="1" strokeDasharray="5,5" className="connection-line" opacity="0.4" />
                    <line x1="680" y1="230" x2="820" y2="380" stroke="url(#mapGradient)" strokeWidth="1" strokeDasharray="5,5" className="connection-line" opacity="0.4" />
                </g>
            </svg>
        </div>
    )
}
