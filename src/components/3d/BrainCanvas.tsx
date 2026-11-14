import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';

interface BrainCanvasProps {
  scrollProgress?: number;
  onBrainClick?: () => void;
  className?: string;
}

// Procedural anti-aliased soft circular glow sprite texture to eliminate square particle artifacts
function createCircularParticleTexture(): THREE.Texture {
  const canvas = document.createElement('canvas');
  canvas.width = 64;
  canvas.height = 64;
  const ctx = canvas.getContext('2d')!;

  ctx.clearRect(0, 0, 64, 64);
  const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 30);
  gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
  gradient.addColorStop(0.22, 'rgba(255, 255, 255, 0.92)');
  gradient.addColorStop(0.52, 'rgba(255, 255, 255, 0.42)');
  gradient.addColorStop(0.82, 'rgba(255, 255, 255, 0.08)');
  gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 64, 64);

  const texture = new THREE.CanvasTexture(canvas);
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.generateMipmaps = false;
  return texture;
}

// Keyframe pose definition along normalized scroll path
interface BrainPose {
  x: number;
  y: number;
  z: number;
  rotX: number;
  rotYOffset: number;
  rotZ: number;
}

function lerpPose(a: BrainPose, b: BrainPose, t: number): BrainPose {
  return {
    x: THREE.MathUtils.lerp(a.x, b.x, t),
    y: THREE.MathUtils.lerp(a.y, b.y, t),
    z: THREE.MathUtils.lerp(a.z, b.z, t),
    rotX: THREE.MathUtils.lerp(a.rotX, b.rotX, t),
    rotYOffset: THREE.MathUtils.lerp(a.rotYOffset, b.rotYOffset, t),
    rotZ: THREE.MathUtils.lerp(a.rotZ, b.rotZ, t),
  };
}

// Returns smooth, continuously interpolated pose across the four sections
function getInterpolatedPose(progress: number, isWide: boolean): BrainPose {
  const p = THREE.MathUtils.clamp(progress, 0, 1);

  // Keyframe 0: Hero (p = 0.0) - Centered, floating majestically
  const kHero: BrainPose = {
    x: 0,
    y: 0,
    z: 0,
    rotX: 0.10,
    rotYOffset: 0.0,
    rotZ: 0.0,
  };

  // Keyframe 1: Founder (p = 0.33) - Subtle shift alongside founder portrait
  const kFounder: BrainPose = {
    x: isWide ? 1.65 : 0,
    y: isWide ? -0.05 : 0.35,
    z: isWide ? -0.2 : -0.7,
    rotX: -0.10,
    rotYOffset: -0.30, // subtle ~17° turn toward founder narrative
    rotZ: 0.05,
  };

  // Keyframe 2: Projects (p = 0.67) - Subtle shift to display cognitive hubs
  const kProjects: BrainPose = {
    x: isWide ? -1.55 : 0,
    y: isWide ? 0.18 : 0.35,
    z: isWide ? 0.25 : -0.6,
    rotX: 0.20,
    rotYOffset: 0.26, // subtle ~15° turn toward projects
    rotZ: -0.05,
  };

  // Keyframe 3: Connect (p = 1.0) - Return to serene centered silhouette
  const kConnect: BrainPose = {
    x: 0,
    y: -0.35,
    z: -0.6,
    rotX: 0.06,
    rotYOffset: 0.0,
    rotZ: 0.0,
  };

  if (p <= 0.33) {
    const t = THREE.MathUtils.smoothstep(p, 0.0, 0.33);
    return lerpPose(kHero, kFounder, t);
  } else if (p <= 0.67) {
    const t = THREE.MathUtils.smoothstep(p, 0.33, 0.67);
    return lerpPose(kFounder, kProjects, t);
  } else {
    const t = THREE.MathUtils.smoothstep(p, 0.67, 1.0);
    return lerpPose(kProjects, kConnect, t);
  }
}

export const BrainCanvas: React.FC<BrainCanvasProps> = ({
  scrollProgress = 0,
  onBrainClick,
  className = '',
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [webGLSupported, setWebGLSupported] = useState<boolean>(true);

  // Core Three.js references
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const brainRootRef = useRef<THREE.Group | null>(null);
  const leftHemisphereRef = useRef<THREE.Mesh | null>(null);
  const rightHemisphereRef = useRef<THREE.Mesh | null>(null);
  const cerebellumRef = useRef<THREE.Group | null>(null);
  const stemRef = useRef<THREE.Mesh | null>(null);
  const synapseParticlesRef = useRef<THREE.Points | null>(null);
  const pulseBeamsRef = useRef<{ mesh: THREE.Mesh; curve: THREE.CatmullRomCurve3; speed: number; progress: number }[]>([]);

  // Interaction tracking & rotation smoothing
  const pointerPos = useRef<{ x: number; y: number; targetX: number; targetY: number }>({
    x: 0,
    y: 0,
    targetX: 0,
    targetY: 0,
  });
  const touchStartPos = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const isDraggingTouch = useRef<boolean>(false);
  const scrollProgRef = useRef<number>(scrollProgress);
  scrollProgRef.current = scrollProgress;

  // Frame-rate independent continuous idle rotation & smoothed scroll progress
  const idleRotYRef = useRef<number>(-0.3);
  const smoothProgressRef = useRef<number>(scrollProgress);

  // Generate procedural organic cortex geometry with anatomical sulci and gyri convolutions
  const createCortexGeometry = useCallback((isRight: boolean, segments = 96) => {
    // Start with a high-resolution sphere
    const geom = new THREE.SphereGeometry(1.0, segments, segments);
    const posAttr = geom.attributes.position;
    const vertex = new THREE.Vector3();

    for (let i = 0; i < posAttr.count; i++) {
      vertex.fromBufferAttribute(posAttr, i);

      // Normalize to spherical coordinates
      let u = vertex.x;
      let v = vertex.y;
      let w = vertex.z;

      // 1. General Brain Anatomical Shape (Ellipsoidal elongation and temporal curve)
      // Brain is elongated along Z (front-to-back), wider at parietal (Y > 0.1), tapered at frontal pole (Z > 0.6)
      u *= 0.82; // lateral width
      v *= 0.92; // vertical height
      w *= 1.15; // anterior-posterior length

      // Frontal lobe tapering & occipital rounding
      if (w > 0.2) {
        // Frontal pole tapers inward
        const taper = 1.0 - (w - 0.2) * 0.18;
        u *= taper;
      }

      // Temporal lobe downward lateral bulge
      if (v < 0.0 && w > -0.3 && w < 0.4) {
        const tempBulge = Math.sin((w + 0.3) / 0.7 * Math.PI) * (1.0 - Math.abs(v));
        u *= 1.0 + tempBulge * 0.22;
        v *= 1.0 + tempBulge * 0.12;
      }

      // Medial Flat Cleft (Interhemispheric longitudinal fissure)
      // Flatten the medial side (left: x > 0, right: x < 0)
      const sign = isRight ? 1 : -1;
      const medialDist = u * sign;
      if (medialDist < 0.08) {
        // Cleft indentation between hemispheres
        u = sign * Math.max(0.04, medialDist + 0.02);
      }

      // 2. Multi-frequency Gyri & Sulci Harmonic Convolutions
      // High-frequency harmonic trigonometric equations create anatomical brain folds
      const theta = Math.atan2(Math.sqrt(u * u + w * w), v);
      const phi = Math.atan2(u, w);

      // Primary deep fissures (lateral sulcus & central sulcus simulation)
      const gyrusPrimary = Math.sin(phi * 7.0 + Math.cos(theta * 5.0) * 2.2) * 0.055;
      // Secondary undulating cortical convolutions
      const gyrusSecondary = Math.sin(theta * 14.0 + Math.sin(phi * 12.0) * 1.8) * 0.038;
      // Tertiary fine micro-sulci
      const gyrusTertiary = Math.cos(phi * 24.0 + theta * 18.0) * 0.016;

      const displacement = 1.0 + gyrusPrimary + gyrusSecondary + gyrusTertiary;

      vertex.set(u * displacement, v * displacement, w * displacement);

      // Slight hemisphere lateral displacement along X
      vertex.x += sign * 0.06;

      posAttr.setXYZ(i, vertex.x, vertex.y, vertex.z);
    }

    geom.computeVertexNormals();
    return geom;
  }, []);

  // Generate Cerebellum geometry (posterior-inferior with dense horizontal folia striations)
  const createCerebellumGeometry = useCallback((isRight: boolean, segments = 56) => {
    const geom = new THREE.SphereGeometry(0.42, segments, segments);
    const pos = geom.attributes.position;
    const v = new THREE.Vector3();
    const sign = isRight ? 1 : -1;

    for (let i = 0; i < pos.count; i++) {
      v.fromBufferAttribute(pos, i);
      // Flatten into an oblate oval tucked under occipital lobe
      v.x = v.x * 0.75 + sign * 0.22;
      v.y = v.y * 0.55 - 0.52;
      v.z = v.z * 0.65 - 0.55;

      // Tight horizontal folia striations
      const folia = Math.sin(v.y * 55.0) * 0.014;
      v.addScaledVector(v.clone().normalize(), folia);

      pos.setXYZ(i, v.x, v.y, v.z);
    }
    geom.computeVertexNormals();
    return geom;
  }, []);

  // Generate Brainstem geometry (inferior central structure extending downward)
  const createStemGeometry = useCallback((segments = 40) => {
    const geom = new THREE.CylinderGeometry(0.14, 0.10, 0.85, segments, segments);
    const pos = geom.attributes.position;
    const v = new THREE.Vector3();

    for (let i = 0; i < pos.count; i++) {
      v.fromBufferAttribute(pos, i);
      // Slightly curve anteriorly as it descends
      const curve = Math.sin((v.y + 0.4) * 2.0) * 0.05;
      v.z += curve - 0.2;
      v.y -= 0.65;
      pos.setXYZ(i, v.x, v.y, v.z);
    }
    geom.computeVertexNormals();
    return geom;
  }, []);

  // Initialize Three.js scene
  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Check WebGL availability
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    if (!gl) {
      setWebGLSupported(false);
      return;
    }

    // 1. Scene, Camera, Renderer
    const width = container.clientWidth;
    const height = container.clientHeight;
    const isMobile = window.innerWidth < 768;

    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
    camera.position.set(0, 0, isMobile ? 6.2 : 5.4);
    cameraRef.current = camera;

    // High-precision WebGL renderer with hardware MSAA and performance-capped DPR
    const dpr = window.devicePixelRatio || 1;
    const maxDpr = isMobile ? Math.min(dpr, 2.0) : Math.min(dpr, 2.5);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
      precision: 'highp',
      stencil: false,
      depth: true,
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(maxDpr);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.20;
    container.innerHTML = '';
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // 2. Dual-Tone Cinematic Lighting (Norxy Cyberpunk Aesthetic: Amber on right, Cyan on left)
    // Warm Amber / Orange Key Light
    const amberKeyLight = new THREE.DirectionalLight('#F28A45', 3.4);
    amberKeyLight.position.set(5.0, 3.2, 4.0);
    scene.add(amberKeyLight);

    // Warm Orange Rim Light
    const orangeRimLight = new THREE.PointLight('#E66A35', 2.6, 18);
    orangeRimLight.position.set(4.5, -2.5, -2.0);
    scene.add(orangeRimLight);

    // Cool Cyan Counter / Accent Light
    const cyanLight = new THREE.DirectionalLight('#31B9E8', 3.0);
    cyanLight.position.set(-5.0, 1.8, 3.8);
    scene.add(cyanLight);

    // Cool Blue Sub-Rim Fill
    const blueFillLight = new THREE.PointLight('#527DA8', 2.2, 16);
    blueFillLight.position.set(-4.0, -3.0, -2.5);
    scene.add(blueFillLight);

    // Deep Charcoal Ambient Lighting
    const ambientLight = new THREE.AmbientLight('#11151C', 0.95);
    scene.add(ambientLight);

    // Subtle overhead white kicker for surface specular highlights
    const topKicker = new THREE.DirectionalLight('#F5F5F5', 1.1);
    topKicker.position.set(0, 6.0, 1.0);
    scene.add(topKicker);

    // 3. Materials
    // Ultra-sharp Satin Physical Material with crisp specular sheen and refined clearcoat
    const brainMaterial = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color('#d1d5db'),
      roughness: 0.42,
      metalness: 0.12,
      clearcoat: 0.45,
      clearcoatRoughness: 0.22,
      reflectivity: 0.65,
      transmission: 0.04,
      thickness: 0.8,
    });

    const stemMaterial = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#c5c8cf'),
      roughness: 0.48,
      metalness: 0.08,
    });

    // 4. Construct Anatomical Brain Hierarchy with Enhanced Tessellation
    const brainRoot = new THREE.Group();
    brainRootRef.current = brainRoot;
    scene.add(brainRoot);

    // Hemispheres: High-resolution tessellation (112 segments on desktop, 64 on mobile)
    const segments = isMobile ? 64 : 112;
    const leftGeom = createCortexGeometry(false, segments);
    const rightGeom = createCortexGeometry(true, segments);

    const leftHemi = new THREE.Mesh(leftGeom, brainMaterial);
    const rightHemi = new THREE.Mesh(rightGeom, brainMaterial);
    leftHemisphereRef.current = leftHemi;
    rightHemisphereRef.current = rightHemi;
    brainRoot.add(leftHemi);
    brainRoot.add(rightHemi);

    // Cerebellum
    const cerebellumGroup = new THREE.Group();
    const cerebLeftGeom = createCerebellumGeometry(false, isMobile ? 36 : 60);
    const cerebRightGeom = createCerebellumGeometry(true, isMobile ? 36 : 60);
    const cerebLeft = new THREE.Mesh(cerebLeftGeom, brainMaterial);
    const cerebRight = new THREE.Mesh(cerebRightGeom, brainMaterial);
    cerebellumGroup.add(cerebLeft);
    cerebellumGroup.add(cerebRight);
    cerebellumRef.current = cerebellumGroup;
    brainRoot.add(cerebellumGroup);

    // Brainstem
    const stemGeom = createStemGeometry(isMobile ? 24 : 44);
    const stem = new THREE.Mesh(stemGeom, stemMaterial);
    stemRef.current = stem;
    brainRoot.add(stem);

    // 5. Neural Synapse Particles (Anti-Aliased Circular Glow Sprites)
    const particleCount = isMobile ? 320 : 640;
    const particleGeom = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleColors = new Float32Array(particleCount * 3);

    const amberCol = new THREE.Color('#F28A45');
    const orangeCol = new THREE.Color('#E66A35');
    const cyanCol = new THREE.Color('#31B9E8');
    const blueCol = new THREE.Color('#527DA8');
    const softCoreCol = new THREE.Color('#F5F5F5');

    for (let i = 0; i < particleCount; i++) {
      // Pick surface point hugging cortex contour
      const side = Math.random() > 0.5 ? 1 : -1;
      const phi = Math.random() * Math.PI * 2;
      const costheta = Math.random() * 2 - 1;
      const theta = Math.acos(costheta);

      const r = 1.018 + Math.random() * 0.095;
      const px = r * 0.84 * Math.sin(theta) * Math.cos(phi) + side * 0.06;
      const py = r * 0.92 * Math.cos(theta);
      const pz = r * 1.15 * Math.sin(theta) * Math.sin(phi);

      particlePositions[i * 3] = px;
      particlePositions[i * 3 + 1] = py;
      particlePositions[i * 3 + 2] = pz;

      // Rich Cyberpunk Dual-Tone Color Gradient:
      // Right side -> warm amber/orange, Left side -> cyan/cool blue
      const lerpFactor = THREE.MathUtils.clamp((px + 0.8) / 1.6, 0, 1);
      const leftColor = Math.random() > 0.35 ? cyanCol : blueCol;
      const rightColor = Math.random() > 0.35 ? amberCol : orangeCol;
      const col = new THREE.Color().lerpColors(leftColor, rightColor, lerpFactor);

      // Subtle core luminescence on ~5% of points, avoiding harsh white squares
      if (Math.random() > 0.95) {
        col.lerp(softCoreCol, 0.45);
      }

      particleColors[i * 3] = col.r;
      particleColors[i * 3 + 1] = col.g;
      particleColors[i * 3 + 2] = col.b;
    }

    particleGeom.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    particleGeom.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));

    // Create soft circular glow texture to eliminate square pixel rendering artifacts
    const particleTexture = createCircularParticleTexture();

    const particleMat = new THREE.PointsMaterial({
      size: isMobile ? 0.040 : 0.048,
      map: particleTexture,
      vertexColors: true,
      transparent: true,
      opacity: 0.88,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const synapsePoints = new THREE.Points(particleGeom, particleMat);
    synapseParticlesRef.current = synapsePoints;
    brainRoot.add(synapsePoints);

    // 6. Traveling Synaptic Impulse Pulses (smooth 16x16 spherical geometry)
    const impulseBeams: { mesh: THREE.Mesh; curve: THREE.CatmullRomCurve3; speed: number; progress: number }[] = [];
    const beamCount = isMobile ? 8 : 16;
    const beamMatAmber = new THREE.MeshBasicMaterial({ color: '#F28A45' });
    const beamMatCyan = new THREE.MeshBasicMaterial({ color: '#31B9E8' });
    const sphereGeom = new THREE.SphereGeometry(0.024, 16, 16);

    for (let b = 0; b < beamCount; b++) {
      const isRight = b % 2 === 0;
      const sign = isRight ? 1 : -1;
      const pts: THREE.Vector3[] = [];
      const steps = 4;
      for (let s = 0; s < steps; s++) {
        const t = s / (steps - 1);
        const z = -0.7 + t * 1.5;
        const y = Math.sin(t * Math.PI) * 0.7 - 0.1;
        const x = (Math.cos(t * Math.PI * 1.5) * 0.7 + 0.2) * sign;
        pts.push(new THREE.Vector3(x, y, z));
      }
      const curve = new THREE.CatmullRomCurve3(pts);
      const mesh = new THREE.Mesh(sphereGeom, isRight ? beamMatAmber : beamMatCyan);
      brainRoot.add(mesh);
      impulseBeams.push({
        mesh,
        curve,
        speed: 0.003 + Math.random() * 0.004,
        progress: Math.random(),
      });
    }
    pulseBeamsRef.current = impulseBeams;

    // Initial orientation
    brainRoot.rotation.y = -0.3;
    brainRoot.rotation.x = 0.10;

    // 7. Animation Loop with Smooth Continuous Rotation & Bounded Scroll Choreography
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const delta = Math.min(clock.getDelta(), 0.1);
      const elapsedTime = clock.getElapsedTime();

      // Pointer interpolation (smooth spring parallax) - frame-rate independent
      const pointerDamping = 1.0 - Math.exp(-8.0 * delta);
      pointerPos.current.x += (pointerPos.current.targetX - pointerPos.current.x) * pointerDamping;
      pointerPos.current.y += (pointerPos.current.targetY - pointerPos.current.y) * pointerDamping;

      const pX = pointerPos.current.x;
      const pY = pointerPos.current.y;

      // Frame-rate independent smooth scroll progress tracking
      const targetScrollProgress = THREE.MathUtils.clamp(scrollProgRef.current, 0, 1);
      const scrollDamping = 1.0 - Math.exp(-4.5 * delta);
      smoothProgressRef.current += (targetScrollProgress - smoothProgressRef.current) * scrollDamping;
      const progress = smoothProgressRef.current;

      // Continuous, slow, smooth, monotonic idle spin (completely uncoupled from scroll)
      idleRotYRef.current += delta * 0.055; // ~3.15 deg/sec, majestic & calm

      if (brainRootRef.current) {
        const root = brainRootRef.current;

        // Subtle biological respiration breathing
        const respiration = 1.0 + Math.sin(elapsedTime * 1.6) * 0.012;
        root.scale.set(respiration, respiration, respiration);

        // Responsive layout check
        const isWide = window.innerWidth >= 1024;

        // Smooth continuous keyframed pose along normalized scroll progress
        const pose = getInterpolatedPose(progress, isWide);

        // Interactive mouse / touch parallax tilt (subtle & responsive)
        const mouseTiltX = -pY * 0.14;
        const mouseTiltY = pX * 0.22;

        // Frame-rate independent exponential lerp for transforms
        const transformDamping = 1.0 - Math.exp(-5.5 * delta);

        root.position.x += (pose.x - root.position.x) * transformDamping;
        root.position.y += (pose.y - root.position.y) * transformDamping;
        root.position.z += (pose.z - root.position.z) * transformDamping;

        root.rotation.x += (pose.rotX + mouseTiltX - root.rotation.x) * transformDamping;
        // Target Y rotation is composed of: continuous idle spin + subtle bounded scroll offset + mouse tilt
        const targetRotY = idleRotYRef.current + pose.rotYOffset + mouseTiltY;
        root.rotation.y += (targetRotY - root.rotation.y) * transformDamping;
        root.rotation.z += (pose.rotZ - root.rotation.z) * transformDamping;
      }

      // Animate synaptic impulses (frame-rate scaled)
      const impulseSpeedScale = delta / 0.016;
      for (const beam of pulseBeamsRef.current) {
        beam.progress = (beam.progress + beam.speed * impulseSpeedScale) % 1.0;
        const pt = beam.curve.getPointAt(beam.progress);
        beam.mesh.position.copy(pt);
      }

      // Rotate particle cloud slightly for alive feeling
      if (synapseParticlesRef.current) {
        synapseParticlesRef.current.rotation.y = Math.sin(elapsedTime * 0.5) * 0.02;
      }

      renderer.render(scene, camera);
    };

    animate();

    // 8. Event Listeners: Mouse Parallax, Touch & Dynamic High-DPI Resize
    const handlePointerMove = (e: MouseEvent) => {
      const normX = (e.clientX / window.innerWidth) * 2 - 1;
      const normY = -(e.clientY / window.innerHeight) * 2 + 1;
      pointerPos.current.targetX = normX;
      pointerPos.current.targetY = normY;
    };

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        touchStartPos.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
        isDraggingTouch.current = true;
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isDraggingTouch.current || e.touches.length === 0) return;
      const deltaX = (e.touches[0].clientX - touchStartPos.current.x) / window.innerWidth;
      const deltaY = (e.touches[0].clientY - touchStartPos.current.y) / window.innerHeight;
      pointerPos.current.targetX = THREE.MathUtils.clamp(deltaX * 3.0, -1.0, 1.0);
      pointerPos.current.targetY = THREE.MathUtils.clamp(-deltaY * 3.0, -1.0, 1.0);
    };

    const handleTouchEnd = () => {
      isDraggingTouch.current = false;
      pointerPos.current.targetX = 0;
      pointerPos.current.targetY = 0;
    };

    const handleResize = () => {
      if (!container || !rendererRef.current || !cameraRef.current) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      const isMob = window.innerWidth < 768;
      const currDpr = window.devicePixelRatio || 1;
      const effectiveDpr = isMob ? Math.min(currDpr, 2.0) : Math.min(currDpr, 2.5);

      cameraRef.current.aspect = newWidth / newHeight;
      cameraRef.current.position.z = isMob ? 6.2 : 5.4;
      cameraRef.current.updateProjectionMatrix();

      rendererRef.current.setPixelRatio(effectiveDpr);
      rendererRef.current.setSize(newWidth, newHeight);
    };

    window.addEventListener('mousemove', handlePointerMove, { passive: true });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
      window.removeEventListener('resize', handleResize);

      // Clean up geometries, textures and materials
      renderer.dispose();
      leftGeom.dispose();
      rightGeom.dispose();
      cerebLeftGeom.dispose();
      cerebRightGeom.dispose();
      stemGeom.dispose();
      particleGeom.dispose();
      particleTexture.dispose();
      sphereGeom.dispose();
      brainMaterial.dispose();
      stemMaterial.dispose();
      particleMat.dispose();
      beamMatAmber.dispose();
      beamMatCyan.dispose();
      if (renderer.domElement && renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
    };
  }, [createCortexGeometry, createCerebellumGeometry, createStemGeometry]);

  return (
    <div
      ref={mountRef}
      onClick={onBrainClick}
      className={`relative w-full h-full cursor-grab active:cursor-grabbing select-none overflow-hidden ${className}`}
      style={{ touchAction: 'pan-y' }}
      aria-label="Interactive 3D Realistic Cyberpunk Human Brain"
      role="img"
    >
      {/* Fallback if WebGL is unavailable */}
      {!webGLSupported && (
        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center text-slate-400 bg-[#08090C]">
          <div className="w-48 h-48 rounded-full border border-white/10 flex items-center justify-center mb-4 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-tr from-[#31B9E8]/20 to-[#F28A45]/20 animate-pulse" />
            <span className="font-mono text-xs uppercase tracking-widest text-[#F5F5F5] z-10">
              INTELLECT CORE
            </span>
          </div>
          <p className="text-xs text-[#A8ADB7] max-w-sm">
            Interactive 3D biological cortex visualizer running in standard mode.
          </p>
        </div>
      )}
    </div>
  );
};
