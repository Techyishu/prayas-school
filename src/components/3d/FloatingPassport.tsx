"use client"

import { useRef, useMemo } from "react"
import { useFrame } from "@react-three/fiber"
import { Float, MeshTransmissionMaterial, Text, RoundedBox } from "@react-three/drei"
import * as THREE from "three"

interface PassportCardProps {
    position?: [number, number, number]
    rotation?: [number, number, number]
    country: string
    flag: string
    delay?: number
}

// Individual floating passport card
export function PassportCard({
    position = [0, 0, 0],
    rotation = [0, 0, 0],
    country,
    flag,
    delay = 0
}: PassportCardProps) {
    const meshRef = useRef<THREE.Mesh>(null)
    const initialRotation = useRef(rotation)

    useFrame((state) => {
        if (meshRef.current) {
            // Subtle rotation animation
            meshRef.current.rotation.x = initialRotation.current[0] +
                Math.sin(state.clock.elapsedTime * 0.5 + delay) * 0.1
            meshRef.current.rotation.y = initialRotation.current[1] +
                state.clock.elapsedTime * 0.2
        }
    })

    return (
        <Float
            speed={2}
            rotationIntensity={0.5}
            floatIntensity={0.8}
            floatingRange={[-0.2, 0.2]}
        >
            <group position={position}>
                <mesh ref={meshRef} castShadow receiveShadow>
                    <RoundedBox args={[1.6, 1.1, 0.05]} radius={0.05} smoothness={4}>
                        <MeshTransmissionMaterial
                            backside
                            samples={4}
                            thickness={0.3}
                            chromaticAberration={0.1}
                            anisotropy={0.3}
                            distortion={0.2}
                            distortionScale={0.3}
                            temporalDistortion={0.1}
                            iridescence={1}
                            iridescenceIOR={1}
                            iridescenceThicknessRange={[0, 1400]}
                            color="#0c1445"
                            transmission={0.9}
                            roughness={0.1}
                            metalness={0.3}
                        />
                    </RoundedBox>

                    {/* Glowing edge */}
                    <mesh position={[0, 0, 0.03]}>
                        <RoundedBox args={[1.65, 1.15, 0.01]} radius={0.06} smoothness={4}>
                            <meshBasicMaterial color="#00D9FF" transparent opacity={0.3} />
                        </RoundedBox>
                    </mesh>

                    {/* Country label */}
                    <Text
                        position={[0, 0.3, 0.04]}
                        fontSize={0.15}
                        color="#00D9FF"
                        font="/fonts/inter-bold.woff"
                        anchorX="center"
                        anchorY="middle"
                    >
                        {country}
                    </Text>

                    {/* Flag emoji */}
                    <Text
                        position={[0, -0.1, 0.04]}
                        fontSize={0.3}
                        anchorX="center"
                        anchorY="middle"
                    >
                        {flag}
                    </Text>

                    {/* Visa stamp effect */}
                    <Text
                        position={[0, -0.35, 0.04]}
                        fontSize={0.08}
                        color="#F59E0B"
                        anchorX="center"
                        anchorY="middle"
                    >
                        VISA APPROVED
                    </Text>
                </mesh>
            </group>
        </Float>
    )
}

// Main component with multiple floating passports
export function FloatingPassports() {
    const passports = useMemo(() => [
        { country: "UNITED KINGDOM", flag: "🇬🇧", position: [-3, 1.5, 1] as [number, number, number], delay: 0 },
        { country: "CANADA", flag: "🇨🇦", position: [3, 0.5, 0] as [number, number, number], delay: 1 },
        { country: "AUSTRALIA", flag: "🇦🇺", position: [-2.5, -1, 0.5] as [number, number, number], delay: 2 },
        { country: "USA", flag: "🇺🇸", position: [2.5, 2, -0.5] as [number, number, number], delay: 3 },
    ], [])

    return (
        <group>
            {passports.map((passport, index) => (
                <PassportCard
                    key={passport.country}
                    country={passport.country}
                    flag={passport.flag}
                    position={passport.position}
                    delay={passport.delay}
                />
            ))}
        </group>
    )
}

export default FloatingPassports
