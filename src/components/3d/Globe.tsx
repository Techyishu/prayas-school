"use client"

import { useRef, useMemo, Suspense } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import {
    Sphere,
    OrbitControls,
    Stars,
    Float,
    MeshDistortMaterial,
    GradientTexture,
    Sparkles,
    useTexture
} from "@react-three/drei"
import * as THREE from "three"

// Destination coordinates (lat, lng) for visa markers
const destinations = [
    { name: "USA", lat: 39.8283, lng: -98.5795, color: "#3B82F6" },
    { name: "Canada", lat: 56.1304, lng: -106.3468, color: "#EF4444" },
    { name: "Australia", lat: -25.2744, lng: 133.7751, color: "#10B981" },
    { name: "UK", lat: 55.3781, lng: -3.4360, color: "#8B5CF6" },
    { name: "India", lat: 20.5937, lng: 78.9629, color: "#F59E0B" },
]

// Convert lat/lng to 3D coordinates
function latLngToVector3(lat: number, lng: number, radius: number): THREE.Vector3 {
    const phi = (90 - lat) * (Math.PI / 180)
    const theta = (lng + 180) * (Math.PI / 180)

    const x = -(radius * Math.sin(phi) * Math.cos(theta))
    const y = radius * Math.cos(phi)
    const z = radius * Math.sin(phi) * Math.sin(theta)

    return new THREE.Vector3(x, y, z)
}

// Glowing marker component for visa destinations
function VisaMarker({ lat, lng, color, name }: { lat: number; lng: number; color: string; name: string }) {
    const markerRef = useRef<THREE.Mesh>(null)
    const glowRef = useRef<THREE.Mesh>(null)
    const position = useMemo(() => latLngToVector3(lat, lng, 2.05), [lat, lng])

    useFrame((state) => {
        if (markerRef.current) {
            const scale = 1 + Math.sin(state.clock.elapsedTime * 2 + lat) * 0.2
            markerRef.current.scale.setScalar(scale)
        }
        if (glowRef.current) {
            const glowScale = 1 + Math.sin(state.clock.elapsedTime * 1.5 + lng) * 0.3
            glowRef.current.scale.setScalar(glowScale * 2)
        }
    })

    return (
        <group position={position}>
            {/* Outer glow */}
            <mesh ref={glowRef}>
                <sphereGeometry args={[0.08, 16, 16]} />
                <meshBasicMaterial color={color} transparent opacity={0.3} />
            </mesh>
            {/* Inner marker */}
            <mesh ref={markerRef}>
                <sphereGeometry args={[0.05, 16, 16]} />
                <meshBasicMaterial color={color} />
            </mesh>
        </group>
    )
}

// Light beam connections between destinations
function ConnectionBeams() {
    const linesRef = useRef<THREE.Group>(null)
    const indiaPos = useMemo(() => latLngToVector3(20.5937, 78.9629, 2.05), [])

    const connections = useMemo(() => {
        return destinations
            .filter(d => d.name !== "India")
            .map(dest => {
                const destPos = latLngToVector3(dest.lat, dest.lng, 2.05)
                const midPoint = new THREE.Vector3()
                    .addVectors(indiaPos, destPos)
                    .multiplyScalar(0.5)
                    .normalize()
                    .multiplyScalar(3.5) // Arc height

                const curve = new THREE.QuadraticBezierCurve3(indiaPos, midPoint, destPos)
                return { curve, color: dest.color, name: dest.name }
            })
    }, [indiaPos])

    useFrame((state) => {
        if (linesRef.current) {
            linesRef.current.rotation.y = state.clock.elapsedTime * 0.05
        }
    })

    return (
        <group ref={linesRef}>
            {connections.map((conn, i) => {
                const points = conn.curve.getPoints(50)
                const geometry = new THREE.BufferGeometry().setFromPoints(points)

                return (
                    <line key={conn.name}>
                        <bufferGeometry attach="geometry" {...geometry} />
                        <lineBasicMaterial
                            attach="material"
                            color={conn.color}
                            transparent
                            opacity={0.5}
                            linewidth={2}
                        />
                    </line>
                )
            })}
        </group>
    )
}

// Main Earth globe component
function EarthGlobe({ mousePosition }: { mousePosition: { x: number; y: number } }) {
    const globeRef = useRef<THREE.Mesh>(null)
    const atmosphereRef = useRef<THREE.Mesh>(null)

    useFrame((state, delta) => {
        if (globeRef.current) {
            // Auto rotation
            globeRef.current.rotation.y += delta * 0.1

            // Subtle mouse follow
            globeRef.current.rotation.x = THREE.MathUtils.lerp(
                globeRef.current.rotation.x,
                mousePosition.y * 0.2,
                0.02
            )
        }
        if (atmosphereRef.current) {
            atmosphereRef.current.rotation.y += delta * 0.05
        }
    })

    return (
        <group>
            {/* Main globe */}
            <mesh ref={globeRef}>
                <sphereGeometry args={[2, 64, 64]} />
                <meshStandardMaterial
                    color="#0c1445"
                    metalness={0.4}
                    roughness={0.7}
                    transparent
                    opacity={0.95}
                />
            </mesh>

            {/* Globe wireframe overlay */}
            <mesh>
                <sphereGeometry args={[2.01, 32, 32]} />
                <meshBasicMaterial
                    color="#00D9FF"
                    wireframe
                    transparent
                    opacity={0.15}
                />
            </mesh>

            {/* Atmosphere glow */}
            <mesh ref={atmosphereRef} scale={1.15}>
                <sphereGeometry args={[2, 64, 64]} />
                <meshBasicMaterial
                    color="#00D9FF"
                    transparent
                    opacity={0.1}
                    side={THREE.BackSide}
                />
            </mesh>

            {/* Visa destination markers */}
            {destinations.map((dest) => (
                <VisaMarker
                    key={dest.name}
                    lat={dest.lat}
                    lng={dest.lng}
                    color={dest.color}
                    name={dest.name}
                />
            ))}

            {/* Connection beams */}
            <ConnectionBeams />
        </group>
    )
}

// Scene wrapper with lights and camera
function GlobeScene({ mousePosition }: { mousePosition: { x: number; y: number } }) {
    return (
        <>
            {/* Lighting */}
            <ambientLight intensity={0.3} />
            <pointLight position={[10, 10, 10]} intensity={1} color="#00D9FF" />
            <pointLight position={[-10, -10, -10]} intensity={0.5} color="#F59E0B" />
            <spotLight
                position={[5, 5, 5]}
                angle={0.3}
                penumbra={1}
                intensity={1}
                color="#ffffff"
            />

            {/* Stars background */}
            <Stars
                radius={100}
                depth={50}
                count={5000}
                factor={4}
                saturation={0}
                fade
                speed={1}
            />

            {/* Sparkles around globe */}
            <Sparkles
                count={100}
                scale={8}
                size={2}
                speed={0.4}
                opacity={0.5}
                color="#00D9FF"
            />

            {/* The Earth globe */}
            <Float
                speed={2}
                rotationIntensity={0.2}
                floatIntensity={0.5}
            >
                <EarthGlobe mousePosition={mousePosition} />
            </Float>

            {/* Camera controls */}
            <OrbitControls
                enableZoom={false}
                enablePan={false}
                autoRotate
                autoRotateSpeed={0.5}
                minPolarAngle={Math.PI / 3}
                maxPolarAngle={Math.PI / 1.5}
            />
        </>
    )
}

// Loading fallback
function GlobeLoader() {
    return (
        <mesh>
            <sphereGeometry args={[2, 32, 32]} />
            <meshBasicMaterial color="#0c1445" wireframe />
        </mesh>
    )
}

// Main exported component
export function Globe3D({ className = "" }: { className?: string }) {
    const mousePosition = useRef({ x: 0, y: 0 })

    const handleMouseMove = (e: React.MouseEvent) => {
        const rect = e.currentTarget.getBoundingClientRect()
        mousePosition.current = {
            x: ((e.clientX - rect.left) / rect.width) * 2 - 1,
            y: -((e.clientY - rect.top) / rect.height) * 2 + 1
        }
    }

    return (
        <div
            className={`w-full h-full ${className}`}
            onMouseMove={handleMouseMove}
        >
            <Canvas
                camera={{ position: [0, 0, 6], fov: 50 }}
                dpr={[1, 2]}
                gl={{
                    antialias: true,
                    alpha: true,
                    powerPreference: "high-performance"
                }}
            >
                <Suspense fallback={<GlobeLoader />}>
                    <GlobeScene mousePosition={mousePosition.current} />
                </Suspense>
            </Canvas>
        </div>
    )
}

export default Globe3D
