"use client"

import { useRef, useState, useEffect, Suspense } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { Text3D, Center, Float, Environment, MeshReflectorMaterial } from "@react-three/drei"
import * as THREE from "three"

interface Stat3DProps {
    value: number
    suffix: string
    label: string
    delay?: number
}

// Animated 3D number that counts up
function AnimatedNumber({ value, suffix, delay = 0 }: { value: number; suffix: string; delay: number }) {
    const [displayValue, setDisplayValue] = useState(0)
    const textRef = useRef<THREE.Group>(null)
    const [isVisible, setIsVisible] = useState(false)

    // Count up animation
    useEffect(() => {
        const timer = setTimeout(() => setIsVisible(true), delay * 1000)
        return () => clearTimeout(timer)
    }, [delay])

    useEffect(() => {
        if (!isVisible) return

        const duration = 2000
        const startTime = Date.now()

        const animate = () => {
            const elapsed = Date.now() - startTime
            const progress = Math.min(elapsed / duration, 1)

            // Easing function for smooth counting
            const eased = 1 - Math.pow(1 - progress, 4)
            setDisplayValue(Math.floor(value * eased))

            if (progress < 1) {
                requestAnimationFrame(animate)
            }
        }

        requestAnimationFrame(animate)
    }, [value, isVisible])

    useFrame((state) => {
        if (textRef.current && isVisible) {
            // Subtle floating animation
            textRef.current.position.y = Math.sin(state.clock.elapsedTime + delay) * 0.05
            textRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5 + delay) * 0.05
        }
    })

    if (!isVisible) return null

    const displayText = `${displayValue.toLocaleString()}${suffix}`

    return (
        <group ref={textRef}>
            <Center>
                <Text3D
                    font="/fonts/inter_bold.json"
                    size={0.5}
                    height={0.1}
                    curveSegments={12}
                    bevelEnabled
                    bevelThickness={0.02}
                    bevelSize={0.01}
                    bevelOffset={0}
                    bevelSegments={5}
                >
                    {displayText}
                    <meshStandardMaterial
                        color="#F59E0B"
                        metalness={0.9}
                        roughness={0.1}
                        envMapIntensity={1}
                    />
                </Text3D>
            </Center>

            {/* Gold glow effect */}
            <pointLight position={[0, 0, 1]} intensity={0.5} color="#F59E0B" distance={3} />
        </group>
    )
}

// Fallback for when 3D text font isn't available
function FallbackNumber({ value, suffix, delay = 0 }: { value: number; suffix: string; delay: number }) {
    const [displayValue, setDisplayValue] = useState(0)
    const meshRef = useRef<THREE.Mesh>(null)
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        const timer = setTimeout(() => setIsVisible(true), delay * 1000)
        return () => clearTimeout(timer)
    }, [delay])

    useEffect(() => {
        if (!isVisible) return

        const duration = 2000
        const startTime = Date.now()

        const animate = () => {
            const elapsed = Date.now() - startTime
            const progress = Math.min(elapsed / duration, 1)
            const eased = 1 - Math.pow(1 - progress, 4)
            setDisplayValue(Math.floor(value * eased))

            if (progress < 1) {
                requestAnimationFrame(animate)
            }
        }

        requestAnimationFrame(animate)
    }, [value, isVisible])

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1
            meshRef.current.position.y = Math.sin(state.clock.elapsedTime + delay) * 0.1
        }
    })

    if (!isVisible) return null

    return (
        <Float speed={2} rotationIntensity={0.3} floatIntensity={0.5}>
            <mesh ref={meshRef}>
                <boxGeometry args={[2, 0.8, 0.1]} />
                <meshStandardMaterial
                    color="#F59E0B"
                    metalness={0.9}
                    roughness={0.1}
                    transparent
                    opacity={0.9}
                />
            </mesh>
            <pointLight position={[0, 0, 1]} intensity={0.8} color="#F59E0B" distance={3} />
        </Float>
    )
}

// Scene for individual stat
function StatScene({ value, suffix, delay }: { value: number; suffix: string; delay: number }) {
    return (
        <>
            <ambientLight intensity={0.3} />
            <spotLight
                position={[5, 5, 5]}
                angle={0.3}
                penumbra={1}
                intensity={2}
                color="#ffffff"
            />
            <spotLight
                position={[-5, 5, -5]}
                angle={0.3}
                penumbra={1}
                intensity={1}
                color="#F59E0B"
            />

            {/* Try 3D text, fallback to shapes */}
            <FallbackNumber value={value} suffix={suffix} delay={delay} />
        </>
    )
}

// Main stats 3D component
export function Stats3DNumber({
    value,
    suffix,
    delay = 0,
    className = ""
}: Stat3DProps & { className?: string }) {
    return (
        <div className={`h-24 ${className}`}>
            <Canvas
                camera={{ position: [0, 0, 4], fov: 40 }}
                dpr={[1, 2]}
                gl={{ antialias: true, alpha: true }}
            >
                <Suspense fallback={null}>
                    <StatScene value={value} suffix={suffix} delay={delay} />
                </Suspense>
            </Canvas>
        </div>
    )
}

// Full 3D stats section with all numbers
export function Stats3DSection() {
    const stats = [
        { value: 18000, suffix: "+", label: "Visas Processed", delay: 0 },
        { value: 18, suffix: "+", label: "Years Experience", delay: 0.2 },
        { value: 70, suffix: "+", label: "Team Members", delay: 0.4 },
        { value: 100, suffix: "%", label: "Success Rate", delay: 0.6 },
    ]

    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
                <div key={stat.label} className="text-center">
                    <Stats3DNumber
                        value={stat.value}
                        suffix={stat.suffix}
                        label={stat.label}
                        delay={stat.delay}
                    />
                    <div className="text-lg font-semibold text-blue-100 mt-2">
                        {stat.label}
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Stats3DSection
