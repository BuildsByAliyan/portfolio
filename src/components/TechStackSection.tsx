import * as THREE from 'three';
import { useRef, useMemo, useState, useEffect, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import {
  BallCollider,
  Physics,
  RigidBody,
  CylinderCollider,
  RapierRigidBody,
} from '@react-three/rapier';
import FadeIn from './FadeIn';

// ✅ Exactly 17 images
const IMAGE_URLS = [
  '/images/react-original.webp',
  '/images/javascript-original.webp',
  '/images/typescript-original.webp',
  '/images/html5-original.webp',
  '/images/css3-original.webp',
  '/images/tailwindcss-original.webp',
  '/images/figma-original.webp',
  '/images/nodejs-original.webp',
  '/images/canva-original.webp',
  '/images/photoshop-original.webp',
  '/images/flutter-original.webp',
  '/images/github-original.webp',
  '/images/linux-original.webp',
  '/images/microsoftexcel-original.webp',
  '/images/python-original.webp',
  '/images/ubuntu-original.webp',
  '/images/openai-original.webp',
];

// Skill labels — used only for the tag list below the canvas, in the
// same order as IMAGE_URLS so the row reads as a legend for the balls.
const SKILL_LABELS = [
  'React', 'JavaScript', 'TypeScript', 'HTML5',
  'CSS3', 'Tailwind CSS', 'Figma', 'Node.js',
  'Canva', 'Photoshop', 'Flutter', 'GitHub',
  'Linux', 'MS Excel', 'Python', 'Ubuntu', 'OpenAI',
];

// ✅ Exactly 17 balls — larger scales for desktop visibility
// (count now matches IMAGE_URLS/SKILL_LABELS; scale range and physics
// below are otherwise untouched)
const spheres = [...Array(17)].map(() => ({
  scale: [1.1, 1.3, 1.2, 1.4, 1.25][Math.floor(Math.random() * 5)],
}));

type SphereProps = {
  vec?: THREE.Vector3;
  scale: number;
  r?: typeof THREE.MathUtils.randFloatSpread;
  material: THREE.MeshStandardMaterial;
  geometry: THREE.SphereGeometry;
  isActive: boolean;
};

function SphereGeo({
  vec = new THREE.Vector3(),
  scale,
  r = THREE.MathUtils.randFloatSpread,
  material,
  geometry,
  isActive,
}: SphereProps) {
  const api = useRef<RapierRigidBody | null>(null);

  useFrame((_state, delta) => {
    if (!isActive || !api.current) return;
    delta = Math.min(0.1, delta);
    const impulse = vec
      .copy(api.current.translation() as THREE.Vector3)
      .normalize()
      .multiply(
        new THREE.Vector3(
          -50 * delta * scale,
          -150 * delta * scale,
          -50 * delta * scale
        )
      );
    api.current.applyImpulse(impulse, true);
  });

  return (
    <RigidBody
      linearDamping={0.75}
      angularDamping={0.15}
      friction={0.2}
      position={[r(30), r(20) - 25, r(20) - 10]}
      ref={api}
      colliders={false}
    >
      <BallCollider args={[scale]} />
      <CylinderCollider
        rotation={[Math.PI / 2, 0, 0]}
        position={[0, 0, 1.2 * scale]}
        args={[0.15 * scale, 0.275 * scale]}
      />
      <mesh
        castShadow
        receiveShadow
        scale={scale}
        geometry={geometry}
        material={material}
        rotation={[0.3, 1, 1]}
      />
    </RigidBody>
  );
}

function Pointer({
  vec = new THREE.Vector3(),
  isActive,
}: {
  vec?: THREE.Vector3;
  isActive: boolean;
}) {
  const ref = useRef<RapierRigidBody>(null);

  useFrame(({ pointer, viewport }) => {
    if (!isActive || !ref.current) return;
    ref.current.setNextKinematicTranslation(
      vec.lerp(
        new THREE.Vector3(
          (pointer.x * viewport.width) / 2,
          (pointer.y * viewport.height) / 2,
          0
        ),
        0.2
      )
    );
  });

  return (
    <RigidBody
      position={[100, 100, 100]}
      type="kinematicPosition"
      colliders={false}
      ref={ref}
    >
      <BallCollider args={[3]} />
    </RigidBody>
  );
}

function Balls({ isActive }: { isActive: boolean }) {
  const textures = useTexture(IMAGE_URLS);
  const sphereGeometry = useMemo(() => new THREE.SphereGeometry(1, 28, 28), []);

  const materials = useMemo(() =>
    textures.map((tex) => {
      tex.colorSpace = THREE.SRGBColorSpace;
      return new THREE.MeshStandardMaterial({
        map: tex,
        roughness: 0.4,
        metalness: 0.1,
      });
    }), [textures]
  );

  return (
    <>
      <Pointer isActive={isActive} />
      {spheres.map((props, i) => (
        <SphereGeo
          key={i}
          {...props}
          geometry={sphereGeometry}
          material={materials[i]}
          isActive={isActive}
        />
      ))}
    </>
  );
}

function BallScene({ isActive }: { isActive: boolean }) {
  return (
    <Canvas
      shadows
      onCreated={({ gl }) => {
        gl.shadowMap.type = THREE.PCFShadowMap;
        gl.toneMappingExposure = 1.5;
      }}
      gl={{
        alpha: true,
        stencil: false,
        depth: false,
        antialias: false,
        powerPreference: 'high-performance',
      }}
      camera={{ position: [0, 0, 20], fov: 42, near: 1, far: 100 }}
      style={{ width: '100%', height: '100%' }}
    >
      <ambientLight intensity={1.2} />
      <spotLight
        position={[20, 20, 25]}
        penumbra={1}
        angle={0.2}
        color="white"
        castShadow
        shadow-mapSize={[512, 512]}
      />
      <directionalLight position={[0, 5, -4]} intensity={2} />
      <pointLight position={[-10, 10, 10]} intensity={0.6} color="#96ff19" />

      <Physics gravity={[0, 0, 0]}>
        <Suspense fallback={null}>
          <Balls isActive={isActive} />
        </Suspense>
      </Physics>
    </Canvas>
  );
}

const TechStackSection = () => {
  const [isActive, setIsActive] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsActive(entry.isIntersecting),
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="techstack"
      className="relative w-full overflow-hidden bg-[#0C0C0C] px-5 sm:px-8 md:px-10 pt-20 sm:pt-24 md:pt-28 pb-16 sm:pb-20"
    >
      {/* Ambient background glow, matches the rest of the site */}
      <div className="absolute left-1/2 top-0 h-80 w-[60%] -translate-x-1/2 rounded-full bg-[#96ff19]/[0.04] blur-3xl pointer-events-none" />

      {/* Eyebrow tag */}
      <FadeIn y={20}>
        <div className="flex items-center justify-center gap-3 mb-4">
          <span className="h-px w-8 bg-[#96ff19]" />
          <span className="text-xs font-medium uppercase tracking-[0.25em] text-[#96ff19]">
            What I Work With
          </span>
          <span className="h-px w-8 bg-[#96ff19]" />
        </div>
      </FadeIn>

      <FadeIn y={40}>
        <h2
          className="hero-heading text-center font-black uppercase tracking-tight leading-none mb-3"
          style={{ fontSize: 'clamp(2.5rem, 10vw, 130px)' }}
        >
          Tech Stack
        </h2>
      </FadeIn>

      <FadeIn delay={0.15} y={20}>
        <p
          className="text-center font-light text-[#D7E2EA]/40 mb-8 sm:mb-10"
          style={{ fontSize: 'clamp(0.8rem, 1.3vw, 0.95rem)' }}
        >
          17 tools, 17 balls — move your mouse over them to play around
        </p>
      </FadeIn>

      <div
        className="relative w-full mx-auto"
        style={{
          height: 'clamp(300px, 42vw, 460px)',
          overflow: 'clip',
          maxWidth: '1100px',
        }}
      >
        {/* Soft inner border frame around the scene, echoes the photo
            frame treatment used in the About section */}
        <div className="absolute inset-0 rounded-3xl border border-[#D7E2EA]/[0.06] pointer-events-none" />

        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(150,255,25,0.04) 0%, transparent 70%)',
          }}
        />

        {isActive ? (
          <BallScene isActive={isActive} />
        ) : (
          <div className="flex h-full items-center justify-center">
            <div className="flex flex-col items-center gap-3">
              <span className="h-2 w-2 rounded-full bg-[#96ff19]/40 animate-pulse" />
              <p className="text-[#D7E2EA]/25 text-xs uppercase tracking-widest">
                Scroll to activate
              </p>
            </div>
          </div>
        )}
      </div>

      <FadeIn delay={0.3} y={20}>
        <div className="mx-auto mt-8 flex flex-wrap justify-center gap-2 sm:gap-3 max-w-3xl">
          {SKILL_LABELS.map((tech) => (
            <span
              key={tech}
              className="rounded-full border border-[#D7E2EA]/10 bg-[#D7E2EA]/[0.03] px-3.5 py-1.5 text-xs font-medium uppercase tracking-widest text-[#D7E2EA]/50 transition-all duration-200 hover:border-[#96ff19]/50 hover:bg-[#96ff19]/[0.06] hover:text-[#96ff19]"
            >
              {tech}
            </span>
          ))}
        </div>
      </FadeIn>
    </section>
  );
};

export default TechStackSection;