"use client"

import { useRef, useState } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Float, MeshDistortMaterial, Environment, ContactShadows } from "@react-three/drei"
import * as THREE from "three"
import { Suspense } from "react"

interface ServiceIcon3DProps {
    type: "plane" | "document" | "briefcase" | "family"
    color: string
    isHovered?: boolean
}

// Airplane icon
function PlaneIcon({ isHovered }: { isHovered: boolean }) {
    const ref = useRef<THREE.Group>(null)

    useFrame((state) => {
        if (ref.current) {
            ref.current.rotation.y = state.clock.elapsedTime * (isHovered ? 2 : 0.5)
            if (isHovered) {
                ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 2) * 0.2
            }
        }
    })

    return (
        <group ref={ref} scale={isHovered ? 1.3 : 1}>
            {/* Fuselage */}
            <mesh>
                <capsuleGeometry args={[0.2, 0.8, 8, 16]} />
                <MeshDistortMaterial
                    color="#3B82F6"
                    distort={isHovered ? 0.3 : 0.1}
                    speed={2}
                    metalness={0.8}
                    roughness={0.2}
                />
            </mesh>
            {/* Wings */}
            <mesh position={[0, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
                <boxGeometry args={[0.1, 1.2, 0.3]} />
                <meshStandardMaterial color="#60A5FA" metalness={0.6} roughness={0.3} />
            </mesh>
            {/* Tail */}
            <mesh position={[0, 0.45, 0]} rotation={[0, 0, 0]}>
                <boxGeometry args={[0.3, 0.2, 0.1]} />
                <meshStandardMaterial color="#2563EB" metalness={0.6} roughness={0.3} />
            </mesh>
        </group>
    )
}

// Document icon
function DocumentIcon({ isHovered }: { isHovered: boolean }) {
    const ref = useRef<THREE.Group>(null)

    useFrame((state) => {
        if (ref.current) {
            ref.current.rotation.y = state.clock.elapsedTime * (isHovered ? 1.5 : 0.3)
            if (isHovered) {
                ref.current.scale.setScalar(1.3 + Math.sin(state.clock.elapsedTime * 3) * 0.1)
            } else {
                ref.current.scale.setScalar(1)
            }
        }
    })

    return (
        <group ref={ref}>
            {/* Main document */}
            <mesh>
                <boxGeometry args={[0.6, 0.8, 0.05]} />
                <MeshDistortMaterial
                    color="#10B981"
                    distort={isHovered ? 0.2 : 0.05}
                    speed={2}
                    metalness={0.7}
                    roughness={0.3}
                />
            </mesh>
            {/* Lines */}
            {[0.2, 0, -0.2].map((y, i) => (
                <mesh key={i} position={[0, y, 0.03]}>
                    <boxGeometry args={[0.4, 0.05, 0.01]} />
                    <meshBasicMaterial color="#34D399" />
                </mesh>
            ))}
            {/* Corner fold */}
            <mesh position={[0.2, 0.3, 0.03]}>
                <boxGeometry args={[0.15, 0.15, 0.02]} />
                <meshStandardMaterial color="#059669" metalness={0.5} roughness={0.4} />
            </mesh>
        </group>
    )
}

// Briefcase icon
function BriefcaseIcon({ isHovered }: { isHovered: boolean }) {
    const ref = useRef<THREE.Group>(null)

    useFrame((state) => {
        if (ref.current) {
            ref.current.rotation.y = isHovered
                ? state.clock.elapsedTime * 2
                : Math.sin(state.clock.elapsedTime * 0.5) * 0.3
        }
    })

    return (
        <group ref={ref} scale={isHovered ? 1.3 : 1}>
            {/* Main body */}
            <mesh>
                <boxGeometry args={[0.9, 0.6, 0.35]} />
                <MeshDistortMaterial
                    color="#8B5CF6"
                    distort={isHovered ? 0.15 : 0.05}
                    speed={2}
                    metalness={0.6}
                    roughness={0.4}
                />
            </mesh>
            {/* Handle */}
            <mesh position={[0, 0.4, 0]}>
                <torusGeometry args={[0.15, 0.03, 8, 24, Math.PI]} />
                <meshStandardMaterial color="#A78BFA" metalness={0.8} roughness={0.2} />
            </mesh>
            {/* Lock */}
            <mesh position={[0, 0, 0.18]}>
                <boxGeometry args={[0.15, 0.1, 0.02]} />
                <meshStandardMaterial color="#F59E0B" metalness={0.9} roughness={0.1} />
            </mesh>
        </group>
    )
}

// Family icon (group of spheres)
function FamilyIcon({ isHovered }: { isHovered: boolean }) {
    const ref = useRef<THREE.Group>(null)

    useFrame((state) => {
        if (ref.current) {
            ref.current.rotation.y = state.clock.elapsedTime * (isHovered ? 1 : 0.2)
            if (isHovered) {
                ref.current.children.forEach((child, i) => {
                    child.position.y = Math.sin(state.clock.elapsedTime * 3 + i) * 0.1
                })
            }
        }
    })

    return (
        <group ref={ref} scale={isHovered ? 1.2 : 1}>
            {/* Parent 1 */}
            <mesh position={[-0.25, 0.15, 0]}>
                <sphereGeometry args={[0.25, 32, 32]} />
                <MeshDistortMaterial
                    color="#EC4899"
                    distort={isHovered ? 0.3 : 0.1}
                    speed={3}
                    metalness={0.5}
                    roughness={0.3}
                />
            </mesh>
            {/* Parent 2 */}
            <mesh position={[0.25, 0.15, 0]}>
                <sphereGeometry args={[0.25, 32, 32]} />
                <MeshDistortMaterial
                    color="#06B6D4"
                    distort={isHovered ? 0.3 : 0.1}
                    speed={3}
                    metalness={0.5}
                    roughness={0.3}
                />
            </mesh>
            {/* Child */}
            <mesh position={[0, -0.2, 0.2]}>
                <sphereGeometry args={[0.18, 32, 32]} />
                <MeshDistortMaterial
                    color="#F59E0B"
                    distort={isHovered ? 0.35 : 0.15}
                    speed={4}
                    metalness={0.5}
                    roughness={0.3}
                />
            </mesh>
        </group>
    )
}

// Main service icon wrapper
function ServiceIconModel({ type, isHovered }: { type: string; isHovered: boolean }) {
    switch (type) {
        case "plane":
            return <PlaneIcon isHovered={isHovered} />
        case "document":
            return <DocumentIcon isHovered={isHovered} />
        case "briefcase":
            return <BriefcaseIcon isHovered={isHovered} />
        case "family":
            return <FamilyIcon isHovered={isHovered} />
        default:
            return null
    }
}

// Scene wrapper
function ServiceIconScene({ type, isHovered }: { type: string; isHovered: boolean }) {
    return (
        <>
            <ambientLight intensity={0.4} />
            <pointLight position={[5, 5, 5]} intensity={1} color="#00D9FF" />
            <pointLight position={[-5, -5, -5]} intensity={0.5} color="#F59E0B" />
            <spotLight position={[0, 5, 0]} angle={0.5} intensity={0.8} color="#ffffff" />

            <Float
                speed={3}
                rotationIntensity={isHovered ? 0.5 : 0.2}
                floatIntensity={isHovered ? 1 : 0.5}
            >
                <ServiceIconModel type={type} isHovered={isHovered} />
            </Float>

            <ContactShadows
                position={[0, -0.8, 0]}
                opacity={0.4}
                scale={3}
                blur={2}
                far={1}
            />
        </>
    )
}

// Loading fallback
function IconLoader() {
    return (
        <mesh>
            <sphereGeometry args={[0.3, 16, 16]} />
            <meshBasicMaterial color="#00D9FF" wireframe />
        </mesh>
    )
}

// Exported component for use in services section
export function ServiceIcon3D({
    type,
    className = ""
}: {
    type: "plane" | "document" | "briefcase" | "family"
    className?: string
}) {
    const [isHovered, setIsHovered] = useState(false)

    return (
        <div
            className={`w-full h-full cursor-pointer ${className}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <Canvas
                camera={{ position: [0, 0, 3], fov: 40 }}
                dpr={[1, 2]}
                gl={{ antialias: true, alpha: true }}
            >
                <Suspense fallback={<IconLoader />}>
                    <ServiceIconScene type={type} isHovered={isHovered} />
                </Suspense>
            </Canvas>
        </div>
    )
}

export default ServiceIcon3D
