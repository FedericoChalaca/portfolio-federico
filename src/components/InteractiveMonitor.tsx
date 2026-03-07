import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Float, Text, ContactShadows, RoundedBox } from '@react-three/drei';
import * as THREE from 'three';

interface LaptopProps {
    color: string;
}

const LaptopModel: React.FC<LaptopProps> = ({ color }) => {
    const group = useRef<THREE.Group>(null);

    // Subtle rotation effect
    useFrame((state) => {
        if (group.current) {
            group.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.1;
        }
    });

    return (
        <group ref={group} dispose={null}>
            {/* Base / Keyboard part */}
            <group position={[0, -0.05, 0]}>
                <RoundedBox args={[4, 0.15, 2.8]} radius={0.05} smoothness={4}>
                    <meshPhysicalMaterial
                        color={color}
                        roughness={0.2}
                        metalness={0.8}
                        clearcoat={1}
                        clearcoatRoughness={0.1}
                    />
                </RoundedBox>

                {/* Keyboard Grid - Detailed Look */}
                <group position={[0, 0.08, -0.2]}>
                    {[...Array(5)].map((_, row) => (
                        <group key={row} position={[0, 0, row * 0.3 - 0.6]}>
                            {[...Array(10)].map((_, col) => (
                                <mesh key={col} position={[col * 0.35 - 1.57, 0, 0]}>
                                    <boxGeometry args={[0.3, 0.02, 0.25]} />
                                    <meshStandardMaterial color="#888" roughness={0.4} />
                                </mesh>
                            ))}
                        </group>
                    ))}
                </group>

                <group position={[0, 0.08, 0.9]} rotation={[-Math.PI / 2, 0, 0]}>
                    <mesh>
                        <planeGeometry args={[1.4, 0.9]} />
                        <meshStandardMaterial
                            color={color}
                            roughness={0.4}
                            metalness={0.1}
                            opacity={0.4}
                            transparent
                        />
                    </mesh>
                    {/* Stronger Border effect for trackpad visibility on dark colors */}
                    <mesh position={[0, 0, 0.001]}>
                        <planeGeometry args={[1.42, 0.92]} />
                        <meshStandardMaterial color="#fff" opacity={0.3} transparent />
                    </mesh>
                </group>
            </group>

            {/* Hinge Cylinder */}
            <mesh position={[0, 0.02, -1.4]} rotation={[0, 0, Math.PI / 2]}>
                <cylinderGeometry args={[0.08, 0.08, 3.9, 12]} />
                <meshStandardMaterial color="#444" metalness={0.9} roughness={0.1} />
            </mesh>

            {/* Screen / Lid - Adjusted rotation to match 90-100 degrees */}
            <group position={[0, 0.02, -1.4]} rotation={[-0.2, 0, 0]}>
                <mesh position={[0, 1.4, 0]}>
                    <RoundedBox args={[4, 2.8, 0.1]} radius={0.05} smoothness={4}>
                        <meshPhysicalMaterial
                            color={color}
                            roughness={0.1}
                            metalness={0.5}
                            clearcoat={1}
                            clearcoatRoughness={0.1}
                            emissive={color}
                            emissiveIntensity={0.25}
                        />
                    </RoundedBox>

                    {/* Display surface */}
                    <mesh position={[0, 0, 0.051]}>
                        <planeGeometry args={[3.85, 2.65]} />
                        <meshStandardMaterial
                            color="#000"
                            emissive="#000"
                            roughness={0}
                        />

                        {/* Screen Content area */}
                        <mesh position={[0, 0, 0.001]}>
                            <planeGeometry args={[3.7, 2.5]} />
                            <meshStandardMaterial color="#080808" />

                            {/* Subtle Code Overlay */}
                            <Text
                                position={[0, 0, 0.01]}
                                fontSize={0.18}
                                color={color}
                                maxWidth={3}
                                lineHeight={1.6}
                                textAlign="left"
                                anchorX="center"
                                anchorY="middle"
                            >
                                {`const dev = {\n  status: "Ready",\n  vision: "Minimalist",\n  output: "Premium"\n};`}
                            </Text>
                        </mesh>
                    </mesh>
                </mesh>
            </group>
        </group >
    );
};

export const InteractiveMonitor: React.FC = () => {
    const [color, setColor] = useState('#3E5A47'); // Default Forest Green from palette

    const colors = [
        { name: 'Forest', value: '#3E5A47' },
        { name: 'Sand', value: '#ebdcd0' },
        { name: 'Terracotta', value: '#c48a71' },
        { name: 'Charcoal', value: '#2c312e' }
    ];

    return (
        <div className="interactive-3d-container">
            <div className="canvas-wrapper">
                <Canvas shadows gl={{ antialias: true, alpha: true }} dpr={[1, 2]}>
                    <PerspectiveCamera makeDefault position={[0, 2, 11.5]} fov={35} />
                    <ambientLight intensity={1.2} />
                    <spotLight position={[15, 20, 15]} angle={0.3} penumbra={1} intensity={2.5} castShadow />
                    <spotLight position={[-15, 20, 10]} angle={0.3} penumbra={1} intensity={1.5} color="#fff" />
                    <pointLight position={[0, 5, 0]} intensity={2} color="#fff" distance={10} />
                    <pointLight position={[5, -5, -5]} intensity={1.5} color="#fff" />
                    <pointLight position={[0, 0, -12]} intensity={2.5} color={color} distance={20} /> {/* Rim Light */}

                    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
                        <LaptopModel color={color} />
                    </Float>

                    <ContactShadows
                        position={[0, -1.2, 0]}
                        opacity={0.4}
                        scale={10}
                        blur={2.5}
                        far={4}
                    />

                    <OrbitControls
                        enableZoom={false}
                        minPolarAngle={Math.PI / 3}
                        maxPolarAngle={Math.PI / 2}
                    />
                </Canvas>
            </div>

            <div className="color-controls">
                {colors.map((c) => (
                    <button
                        key={c.name}
                        className={`color-btn ${color === c.value ? 'active' : ''}`}
                        onClick={() => setColor(c.value)}
                        style={{ backgroundColor: c.value }}
                        title={c.name}
                    />
                ))}
            </div>

            <style>{`
        .interactive-3d-container {
          position: relative;
          width: 100%;
          height: 750px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }
        .canvas-wrapper {
          width: 100%;
          height: 100%;
          cursor: grab;
        }
        .canvas-wrapper:active {
          cursor: grabbing;
        }
        .color-controls {
          position: absolute;
          bottom: 20px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          gap: 12px;
          padding: 8px 16px;
          background: var(--color-bg-card);
          backdrop-filter: blur(8px);
          border-radius: var(--radius-full);
          border: 1px solid var(--color-border);
          z-index: 10;
        }
        .color-btn {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          border: 2px solid transparent;
          cursor: pointer;
          transition: all var(--transition-fast);
        }
        .color-btn.active {
          border-color: var(--color-text);
          transform: scale(1.2);
        }
        .color-btn:hover {
          transform: scale(1.1);
        }
      `}</style>
        </div>
    );
};
