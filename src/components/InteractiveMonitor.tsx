import React, { Suspense, useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Float, ContactShadows, RoundedBox, Environment, Lightformer, useTexture } from '@react-three/drei';
import * as THREE from 'three';
import { useInView } from 'framer-motion';
import { laptopColors } from './laptopColors';

interface LaptopProps {
    color: string;
}

// Keyboard rows as relative key widths; each row is stretched to the same total width
const KEY_ROWS = [
    { depth: 0.11, keys: Array(14).fill(1) },
    { depth: 0.19, keys: [...Array(13).fill(1), 1.6] },
    { depth: 0.19, keys: [1.6, ...Array(13).fill(1)] },
    { depth: 0.19, keys: [1.9, ...Array(11).fill(1), 1.9] },
    { depth: 0.19, keys: [2.4, ...Array(10).fill(1), 2.4] },
    { depth: 0.19, keys: [1, 1, 1, 1.3, 5.6, 1.3, 1, 1, 1] },
];
const KEYBOARD_WIDTH = 3.3;
const KEY_GAP = 0.035;
const KEY_COUNT = KEY_ROWS.reduce((n, r) => n + r.keys.length, 0);

/** Every key in one instanced mesh: a single draw call instead of one per key */
const Keyboard: React.FC = () => {
    const ref = useRef<THREE.InstancedMesh>(null);

    useLayoutEffect(() => {
        const mesh = ref.current;
        if (!mesh) return;
        const m = new THREE.Matrix4();
        const turn = new THREE.Quaternion();
        let i = 0;
        let z = -0.62;
        for (const row of KEY_ROWS) {
            const units = row.keys.reduce((a, b) => a + b, 0);
            const unit = (KEYBOARD_WIDTH - KEY_GAP * (row.keys.length - 1)) / units;
            let x = -KEYBOARD_WIDTH / 2;
            for (const k of row.keys) {
                const w = k * unit;
                m.compose(new THREE.Vector3(x + w / 2, 0, z + row.depth / 2), turn, new THREE.Vector3(w, 0.022, row.depth));
                mesh.setMatrixAt(i++, m);
                x += w + KEY_GAP;
            }
            z += row.depth + KEY_GAP;
        }
        mesh.instanceMatrix.needsUpdate = true;
    }, []);

    return (
        <instancedMesh ref={ref} args={[undefined, undefined, KEY_COUNT]}>
            <boxGeometry />
            <meshStandardMaterial color="#1c1d1f" roughness={0.65} metalness={0.1} />
        </instancedMesh>
    );
};

const LaptopModel: React.FC<LaptopProps> = ({ color }) => {
    const group = useRef<THREE.Group>(null);
    // The portfolio's own first view on the screen
    const screen = useTexture('/laptop/pantalla.webp', (t) => {
        t.colorSpace = THREE.SRGBColorSpace;
        t.anisotropy = 8;
    });
    const trackpad = useMemo(() => new THREE.Color(color).multiplyScalar(0.9), [color]);

    // Subtle rotation effect
    useFrame((state) => {
        if (group.current) {
            group.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.1;
        }
    });

    // Aluminium: its shine comes from the studio reflections set up in the scene
    const aluminium = <meshStandardMaterial color={color} metalness={0.85} roughness={0.32} envMapIntensity={1.1} />;

    return (
        <group ref={group} dispose={null}>
            {/* Base */}
            <group position={[0, -0.05, 0]}>
                <RoundedBox args={[4, 0.12, 2.8]} radius={0.05} smoothness={4}>
                    {aluminium}
                </RoundedBox>

                {/* Keyboard well and keys */}
                <mesh position={[0, 0.0605, -0.18]} rotation={[-Math.PI / 2, 0, 0]}>
                    <planeGeometry args={[3.42, 1.32]} />
                    <meshStandardMaterial color="#0d0e0f" roughness={0.8} />
                </mesh>
                <group position={[0, 0.072, -0.2]}>
                    <Keyboard />
                </group>

                {/* Trackpad */}
                <RoundedBox args={[1.5, 0.004, 0.92]} radius={0.002} smoothness={2} position={[0, 0.061, 0.86]}>
                    <meshStandardMaterial color={trackpad} metalness={0.6} roughness={0.45} />
                </RoundedBox>
            </group>

            {/* Hinge */}
            <mesh position={[0, 0.02, -1.36]} rotation={[0, 0, Math.PI / 2]}>
                <cylinderGeometry args={[0.055, 0.055, 3.3, 20]} />
                <meshStandardMaterial color="#1a1b1c" metalness={0.7} roughness={0.35} />
            </mesh>

            {/* Lid, opened a little past 90 degrees */}
            <group position={[0, 0.02, -1.4]} rotation={[-0.2, 0, 0]}>
                <RoundedBox args={[4, 2.8, 0.07]} radius={0.035} smoothness={4} position={[0, 1.4, -0.035]}>
                    {aluminium}
                </RoundedBox>

                {/* Black glass bezel */}
                <RoundedBox args={[3.96, 2.76, 0.004]} radius={0.002} smoothness={2} position={[0, 1.4, 0.001]}>
                    <meshStandardMaterial color="#050505" roughness={0.06} metalness={0.2} />
                </RoundedBox>

                {/* Display: unlit so the screenshot keeps its real colors */}
                <mesh position={[0, 1.36, 0.0035]}>
                    <planeGeometry args={[3.74, 2.43]} />
                    <meshBasicMaterial map={screen} toneMapped={false} />
                </mesh>

                {/* Camera */}
                <mesh position={[0, 2.68, 0.004]}>
                    <circleGeometry args={[0.022, 16]} />
                    <meshStandardMaterial color="#1d2a30" roughness={0.2} />
                </mesh>
            </group>
        </group>
    );
};

/** Mounts once the model (and its screen texture) is ready: compile the shaders, then start drawing */
const WhenReady: React.FC<{ onReady: () => void }> = ({ onReady }) => {
    const { gl, scene, camera } = useThree();
    useEffect(() => {
        gl.compileAsync(scene, camera).then(onReady);
    }, [gl, scene, camera, onReady]);
    return null;
};

interface InteractiveMonitorProps {
    initialColor?: string;
    onReady?: () => void; // the scene compiled and is about to draw its first frame
}

export const InteractiveMonitor: React.FC<InteractiveMonitorProps> = ({ initialColor, onReady }) => {
    const [color, setColor] = useState(initialColor ?? laptopColors[0].value);
    const [scale, setScale] = useState(1);
    const [positionY, setPositionY] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);
    const onScreen = useInView(containerRef);
    // Shaders compile in the background (KHR_parallel_shader_compile); drawing starts once they are ready,
    // so the first frame does not freeze the page
    const [compiled, setCompiled] = useState(false);
    const ready = useCallback(() => {
        setCompiled(true);
        onReady?.();
    }, [onReady]);

    useEffect(() => {
        const handleResize = () => {
            const isMobile = window.innerWidth <= 768; // same breakpoint as the phone still
            setScale(isMobile ? 1.25 : 1); // big enough on phones to read the screen
            setPositionY(isMobile ? -0.85 : 0); // centered in the phone box, just above its shadow
        };

        handleResize(); // Set initial scale
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div className="interactive-3d-container" ref={containerRef}>
            <div className="canvas-wrapper">
                <Canvas
                    frameloop={compiled && onScreen ? 'always' : 'never'}
                    gl={{ antialias: true, alpha: true }}
                    dpr={[1, 2]}
                >
                    <PerspectiveCamera makeDefault position={[0, 2, 11.5]} fov={35} />
                    <ambientLight intensity={0.35} />
                    <spotLight position={[15, 20, 15]} angle={0.3} penumbra={1} intensity={2} />
                    <pointLight position={[0, 0, -12]} intensity={2.5} color={color} distance={20} /> {/* Rim Light */}

                    {/* Studio reflections for the metal, drawn once on the GPU: no HDR file to download */}
                    <Environment resolution={64} frames={1}>
                        <Lightformer form="rect" intensity={2.5} position={[0, 6, 2]} rotation={[Math.PI / 2, 0, 0]} scale={[10, 4, 1]} />
                        <Lightformer form="rect" intensity={1.5} position={[-6, 2, 3]} rotation={[0, Math.PI / 2, 0]} scale={[6, 3, 1]} />
                        <Lightformer form="rect" intensity={1.2} position={[6, 1, 4]} rotation={[0, -Math.PI / 2, 0]} scale={[6, 3, 1]} />
                        <Lightformer form="ring" intensity={0.8} position={[0, 1, -8]} scale={4} />
                        <Lightformer form="rect" intensity={0.8} position={[0, -5, 2]} rotation={[-Math.PI / 2, 0, 0]} scale={[10, 4, 1]} />
                    </Environment>

                    <Suspense fallback={null}>
                        <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
                            <group scale={scale} position={[0, positionY, 0]}>
                                <LaptopModel color={color} />
                            </group>
                        </Float>
                        <WhenReady onReady={ready} />
                    </Suspense>

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
                {laptopColors.map((c) => (
                    <button
                        key={c.name}
                        className={`color-btn ${color === c.value ? 'active' : ''}`}
                        onClick={() => setColor(c.value)}
                        style={{ backgroundColor: c.value }}
                        title={c.name}
                        aria-label={`Color ${c.name}`}
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
        @media (max-width: 768px) {
          .interactive-3d-container {
            height: 350px;
            margin-top: -30px;
          }
        }
        .canvas-wrapper {
          width: 100%;
          height: 100%;
          cursor: grab;
        }
        .canvas-wrapper:active {
          cursor: grabbing;
        }
      `}</style>
        </div>
    );
};
