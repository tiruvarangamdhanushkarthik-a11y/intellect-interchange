import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { COMMUNITIES_DATA } from '../../data/communitiesData';
import { ambientAudio } from '../../audio/ambientSynth';

interface UniverseCanvasProps {
  activeCommunityId: string | null;
  onSelectCommunity: (id: string | null) => void;
  onCoreClick?: () => void;
  isLowPowerMode?: boolean;
}

// Function to generate high-resolution crisp 3D minimal sprite label
function createLabelSprite(text: string, accentColor: string): THREE.Sprite {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 128;
  const ctx = canvas.getContext('2d')!;

  ctx.clearRect(0, 0, 512, 128);
  ctx.fillStyle = 'rgba(6, 9, 15, 0.9)';
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
  ctx.lineWidth = 3;

  // Rounded pill background
  const r = 24;
  const x = 20;
  const y = 20;
  const w = 472;
  const h = 88;

  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  // Subtle accent dot on left
  ctx.fillStyle = accentColor;
  ctx.beginPath();
  ctx.arc(60, 64, 8, 0, Math.PI * 2);
  ctx.fill();

  // Minimalist silver typography
  ctx.fillStyle = '#f8fafc';
  ctx.font = '600 32px "Space Grotesk", sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(text, 266, 64);

  const texture = new THREE.CanvasTexture(canvas);
  texture.minFilter = THREE.LinearFilter;
  const spriteMat = new THREE.SpriteMaterial({
    map: texture,
    transparent: true,
    opacity: 0.95,
    depthWrite: false,
  });

  const sprite = new THREE.Sprite(spriteMat);
  sprite.scale.set(1.45, 0.36, 1);
  return sprite;
}

export const UniverseCanvas: React.FC<UniverseCanvasProps> = ({
  activeCommunityId,
  onSelectCommunity,
  onCoreClick,
  isLowPowerMode = false,
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [isHoveringCore, setIsHoveringCore] = useState<boolean>(false);
  const [webGLSupported, setWebGLSupported] = useState<boolean>(true);

  // References for animation loop
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const targetCamPos = useRef<THREE.Vector3>(new THREE.Vector3(0, 0, 9.0));
  const targetCamLook = useRef<THREE.Vector3>(new THREE.Vector3(0, 0, 0));
  const nodesGroupRef = useRef<THREE.Group | null>(null);
  const coreMeshRef = useRef<THREE.Group | null>(null);
  const coreHitMeshRef = useRef<THREE.Mesh | null>(null);
  const linesGroupRef = useRef<THREE.Group | null>(null);
  const pulseSparksRef = useRef<{ mesh: THREE.Mesh; curve: THREE.CatmullRomCurve3; speed: number; progress: number }[]>([]);
  const particlesRef = useRef<THREE.Points | null>(null);
  const pointerPos = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const orbitAngles = useRef<{ theta: number; phi: number; radius: number }>({
    theta: 0,
    phi: Math.PI / 2,
    radius: 9.0,
  });

  // Dynamic Camera travel on activeCommunityId change
  useEffect(() => {
    if (!activeCommunityId) {
      targetCamPos.current.set(
        orbitAngles.current.radius * Math.sin(orbitAngles.current.phi) * Math.sin(orbitAngles.current.theta),
        orbitAngles.current.radius * Math.cos(orbitAngles.current.phi),
        orbitAngles.current.radius * Math.sin(orbitAngles.current.phi) * Math.cos(orbitAngles.current.theta)
      );
      targetCamLook.current.set(0, 0, 0);
    } else {
      const community = COMMUNITIES_DATA.find((c) => c.id === activeCommunityId);
      if (community) {
        const [nx, ny, nz] = community.coords;
        const targetNodeVec = new THREE.Vector3(nx, ny, nz);
        const offset = targetNodeVec.clone().normalize().multiplyScalar(3.2);
        targetCamPos.current.copy(targetNodeVec).add(offset);
        targetCamLook.current.copy(targetNodeVec);
      }
    }
  }, [activeCommunityId]);

  // Main Three.js Scene Setup & Loop
  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Check WebGL availability safely
    try {
      const testCanvas = document.createElement('canvas');
      const gl = testCanvas.getContext('webgl') || testCanvas.getContext('experimental-webgl');
      if (!gl) {
        setWebGLSupported(false);
        return;
      }
    } catch {
      setWebGLSupported(false);
      return;
    }

    // 1. SCENE
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.fog = new THREE.FogExp2(0x030508, 0.045);

    // 2. CAMERA
    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0, 9.0);
    cameraRef.current = camera;

    // 3. RENDERER
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: !isLowPowerMode,
        alpha: true,
        powerPreference: 'high-performance',
      });
    } catch {
      setWebGLSupported(false);
      return;
    }

    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isLowPowerMode ? 1 : 2));
    renderer.setClearColor(0x000000, 0);
    rendererRef.current = renderer;
    container.replaceChildren(renderer.domElement);

    // 4. MINIMAL FUTURISTIC LIGHTING (Silver & Electric-Blue key accents)
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambientLight);

    const silverKeyLight = new THREE.PointLight(0xf8fafc, 2.8, 25);
    silverKeyLight.position.set(3, 4, 5);
    scene.add(silverKeyLight);

    const electricBlueFill = new THREE.PointLight(0x38bdf8, 2.2, 20);
    electricBlueFill.position.set(-3, -3, 4);
    scene.add(electricBlueFill);

    // 5. THE SIGNATURE 3D INTELLECT CORE (Refined Minimal Futurism)
    const coreGroup = new THREE.Group();
    coreMeshRef.current = coreGroup;

    // A. Outer Silver Geometric Wireframe Icosahedron
    const nucleusGeo = new THREE.IcosahedronGeometry(0.92, isLowPowerMode ? 1 : 2);
    const nucleusMat = new THREE.MeshBasicMaterial({
      color: 0xe2e8f0,
      wireframe: true,
      transparent: true,
      opacity: 0.38,
    });
    const nucleusMesh = new THREE.Mesh(nucleusGeo, nucleusMat);
    coreGroup.add(nucleusMesh);

    // B. Inner Obsidian Monolith Sphere with electric-blue specular
    const coreSolidGeo = new THREE.SphereGeometry(0.58, 32, 32);
    const coreSolidMat = new THREE.MeshStandardMaterial({
      color: 0x070c16,
      emissive: 0x0284c7,
      emissiveIntensity: 0.55,
      roughness: 0.2,
      metalness: 0.9,
    });
    const coreSolid = new THREE.Mesh(coreSolidGeo, coreSolidMat);
    coreGroup.add(coreSolid);

    // C. Architectural Silver Gyroscopic Rings
    const ringGeo = new THREE.TorusGeometry(1.38, 0.012, 16, 64);
    const ringMat1 = new THREE.MeshBasicMaterial({
      color: 0x94a3b8,
      transparent: true,
      opacity: 0.35,
    });
    const ring1 = new THREE.Mesh(ringGeo, ringMat1);
    ring1.rotation.x = Math.PI / 3;

    const ringMat2 = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.3,
    });
    const ring2 = new THREE.Mesh(ringGeo, ringMat2);
    ring2.rotation.y = Math.PI / 4;
    ring2.rotation.x = -Math.PI / 6;

    coreGroup.add(ring1);
    coreGroup.add(ring2);

    // D. Core Hit Proxy for click interaction
    const coreHitGeo = new THREE.SphereGeometry(1.5, 16, 16);
    const coreHitMat = new THREE.MeshBasicMaterial({ visible: false });
    const coreHitMesh = new THREE.Mesh(coreHitGeo, coreHitMat);
    coreHitMesh.userData = { isCore: true };
    coreHitMeshRef.current = coreHitMesh;
    coreGroup.add(coreHitMesh);

    scene.add(coreGroup);

    // 6. ORBITING COMMUNITY NODES & SYNAPTIC PATHWAYS
    const nodesGroup = new THREE.Group();
    nodesGroupRef.current = nodesGroup;

    const linesGroup = new THREE.Group();
    linesGroupRef.current = linesGroup;
    scene.add(linesGroup);

    const pulseSparks: { mesh: THREE.Mesh; curve: THREE.CatmullRomCurve3; speed: number; progress: number }[] = [];

    COMMUNITIES_DATA.forEach((community) => {
      const nodeSubGroup = new THREE.Group();
      nodeSubGroup.position.set(...community.coords);
      nodeSubGroup.userData = { id: community.id, isCommunityNode: true, basePos: [...community.coords] };

      // Inner Core Sphere
      const nodeGeo = new THREE.SphereGeometry(0.26, 24, 24);
      const nodeMat = new THREE.MeshStandardMaterial({
        color: new THREE.Color(community.color),
        emissive: new THREE.Color(community.color),
        emissiveIntensity: 0.65,
        roughness: 0.25,
        metalness: 0.8,
      });
      const nodeMesh = new THREE.Mesh(nodeGeo, nodeMat);
      nodeSubGroup.add(nodeMesh);

      // Silver Hairline Halo
      const haloGeo = new THREE.RingGeometry(0.32, 0.44, 32);
      const haloMat = new THREE.MeshBasicMaterial({
        color: 0xf8fafc,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.28,
      });
      const halo = new THREE.Mesh(haloGeo, haloMat);
      halo.userData = { isHalo: true };
      nodeSubGroup.add(halo);

      // Fine Wireframe Orbit Ring
      const outerRingGeo = new THREE.TorusGeometry(0.48, 0.006, 8, 32);
      const outerRingMat = new THREE.MeshBasicMaterial({
        color: new THREE.Color(community.color),
        transparent: true,
        opacity: 0.25,
      });
      const outerRing = new THREE.Mesh(outerRingGeo, outerRingMat);
      outerRing.rotation.x = Math.PI / 4;
      nodeSubGroup.add(outerRing);

      // 3D Billboard Sprite Label
      const spriteLabel = createLabelSprite(community.shortTag, community.color);
      spriteLabel.position.set(0, 0.58, 0);
      nodeSubGroup.add(spriteLabel);

      // Hit proxy for precise click & touch targeting
      const hitGeo = new THREE.SphereGeometry(0.78, 12, 12);
      const hitMat = new THREE.MeshBasicMaterial({ visible: false });
      const hitMesh = new THREE.Mesh(hitGeo, hitMat);
      hitMesh.userData = { id: community.id, isCommunityNode: true };
      nodeSubGroup.add(hitMesh);

      nodesGroup.add(nodeSubGroup);

      // Subtle Synaptic Hairline Spline to Core
      const points = [
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(community.coords[0] * 0.5, community.coords[1] * 0.5 + 0.2, community.coords[2] * 0.5),
        new THREE.Vector3(...community.coords),
      ];
      const curve = new THREE.CatmullRomCurve3(points);
      const curvePoints = curve.getPoints(24);
      const lineGeo = new THREE.BufferGeometry().setFromPoints(curvePoints);
      const lineMat = new THREE.LineBasicMaterial({
        color: 0x94a3b8,
        transparent: true,
        opacity: 0.22,
      });
      const line = new THREE.Line(lineGeo, lineMat);
      line.userData = { id: community.id };
      linesGroup.add(line);

      // Animated Synaptic Pulse Spark
      const sparkGeo = new THREE.SphereGeometry(0.04, 8, 8);
      const sparkMat = new THREE.MeshBasicMaterial({
        color: 0xf8fafc,
        transparent: true,
        opacity: 0.9,
      });
      const sparkMesh = new THREE.Mesh(sparkGeo, sparkMat);
      linesGroup.add(sparkMesh);

      pulseSparks.push({
        mesh: sparkMesh,
        curve,
        speed: 0.15 + Math.random() * 0.06,
        progress: Math.random(),
      });
    });

    pulseSparksRef.current = pulseSparks;
    scene.add(nodesGroup);

    // 7. CELESTIAL STARDUST PARTICLES (Calm, Minimal, Non-Noisy)
    const particleCount = isLowPowerMode ? 400 : 1200;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleColors = new Float32Array(particleCount * 3);

    const silverColor = new THREE.Color(0xf1f5f9);
    const slateColor = new THREE.Color(0x94a3b8);
    const skyColor = new THREE.Color(0x38bdf8);

    for (let i = 0; i < particleCount; i++) {
      const radius = 2.2 + Math.random() * 9.0;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      particlePositions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      particlePositions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      particlePositions[i * 3 + 2] = radius * Math.cos(phi);

      const chosenColor = Math.random() > 0.6 ? silverColor : Math.random() > 0.3 ? slateColor : skyColor;
      particleColors[i * 3] = chosenColor.r;
      particleColors[i * 3 + 1] = chosenColor.g;
      particleColors[i * 3 + 2] = chosenColor.b;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));

    const particleMat = new THREE.PointsMaterial({
      size: isLowPowerMode ? 0.025 : 0.035,
      vertexColors: true,
      transparent: true,
      opacity: 0.45,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const particleSystem = new THREE.Points(particleGeo, particleMat);
    particlesRef.current = particleSystem;
    scene.add(particleSystem);

    // 8. RESIZE HANDLER
    const handleResize = () => {
      if (!container || !rendererRef.current || !cameraRef.current) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      cameraRef.current.aspect = w / h;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // 9. HIGH-PRECISION ANIMATION LOOP
    let animationFrameId: number;
    let lastTime = performance.now();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const time = performance.now();
      const delta = Math.min((time - lastTime) / 1000, 0.1);
      lastTime = time;

      // Rotate Intellect Core
      if (coreGroup) {
        coreGroup.rotation.y += delta * 0.18;
        coreGroup.rotation.x = Math.sin(time * 0.0005) * 0.08;
        const pulse = 1 + Math.sin(time * 0.002) * 0.04;
        nucleusMesh.scale.set(pulse, pulse, pulse);
        ring1.rotation.z += delta * 0.22;
        ring2.rotation.y += delta * 0.18;
      }

      // Rotate Stardust Particles
      if (particleSystem) {
        particleSystem.rotation.y += delta * 0.02;
      }

      // Animate Synaptic Pulses along splines
      pulseSparks.forEach((spark) => {
        if (spark && spark.curve && spark.mesh) {
          spark.progress = (spark.progress + delta * spark.speed) % 1;
          const pt = spark.curve.getPoint(spark.progress);
          if (pt) {
            spark.mesh.position.copy(pt);
          }
        }
      });

      // Float community nodes
      if (nodesGroup) {
        nodesGroup.children.forEach((child, i) => {
          const base = (child.userData as { basePos: number[] }).basePos;
          if (base) {
            child.position.y = base[1] + Math.sin(time * 0.0014 + i * 0.9) * 0.08;
            child.position.x = base[0] + Math.cos(time * 0.001 + i * 0.7) * 0.04;
          }

          child.children.forEach((sub) => {
            if (sub.userData.isHalo) {
              sub.lookAt(camera.position);
            }
          });
        });
      }

      // Smooth Camera tweening (lerp)
      const lerpSpeed = 0.045;
      camera.position.lerp(targetCamPos.current, lerpSpeed);
      const currentLook = new THREE.Vector3();
      camera.getWorldDirection(currentLook);
      const targetLookDir = targetCamLook.current.clone().sub(camera.position).normalize();
      currentLook.lerp(targetLookDir, lerpSpeed);
      camera.lookAt(camera.position.clone().add(currentLook));

      // Parallax mouse damping when not actively inspecting
      if (!activeCommunityId) {
        camera.position.x += (pointerPos.current.x * 0.6 - camera.position.x * 0.1) * delta;
        camera.position.y += (-pointerPos.current.y * 0.6 - camera.position.y * 0.1) * delta;
      }

      renderer.render(scene, camera);
    };

    animate();

    // CLEANUP
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      container.replaceChildren();
    };
  }, [isLowPowerMode, activeCommunityId]);

  // Raycasting & Pointer Handlers
  const handlePointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (!containerRectRef(mountRef.current)) return;
    const rect = mountRef.current!.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    pointerPos.current = { x, y };

    if (!sceneRef.current || !cameraRef.current) return;

    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(new THREE.Vector2(x, y), cameraRef.current);

    // 1. Check Community Node Intersection
    if (nodesGroupRef.current) {
      const intersects = raycaster.intersectObjects(nodesGroupRef.current.children, true);
      if (intersects.length > 0) {
        let parentNode = intersects[0].object;
        while (parentNode.parent && !parentNode.userData.isCommunityNode) {
          parentNode = parentNode.parent;
        }

        const id = parentNode.userData.id as string;
        if (id && id !== hoveredId) {
          setHoveredId(id);
          ambientAudio.playHarmonicChime(500 + COMMUNITIES_DATA.findIndex(c => c.id === id) * 70, 'sine', 0.04);
        }
        return;
      }
    }

    // 2. Check Intellect Core Intersection
    if (coreMeshRef.current) {
      const coreIntersects = raycaster.intersectObjects(coreMeshRef.current.children, true);
      if (coreIntersects.length > 0) {
        setIsHoveringCore(true);
        return;
      }
    }

    if (hoveredId !== null) setHoveredId(null);
    if (isHoveringCore) setIsHoveringCore(false);
  }, [hoveredId, isHoveringCore]);

  const handleClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRectRef(mountRef.current) || !sceneRef.current || !cameraRef.current) return;
    const rect = mountRef.current!.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(new THREE.Vector2(x, y), cameraRef.current);

    // 1. Check if clicked a community node
    if (nodesGroupRef.current) {
      const intersects = raycaster.intersectObjects(nodesGroupRef.current.children, true);
      if (intersects.length > 0) {
        let parentNode = intersects[0].object;
        while (parentNode.parent && !parentNode.userData.isCommunityNode) {
          parentNode = parentNode.parent;
        }
        const id = parentNode.userData.id as string;
        if (id) {
          onSelectCommunity(id);
          ambientAudio.playHarmonicChime(660, 'sine', 0.08);
          return;
        }
      }
    }

    // 2. Check if clicked the central Intellect Core
    if (coreMeshRef.current) {
      const coreIntersects = raycaster.intersectObjects(coreMeshRef.current.children, true);
      if (coreIntersects.length > 0) {
        ambientAudio.playHarmonicChime(528, 'sine', 0.1);
        if (onCoreClick) {
          onCoreClick();
        } else {
          onSelectCommunity(null);
        }
      }
    }
  }, [onSelectCommunity, onCoreClick]);

  function containerRectRef(el: HTMLDivElement | null): boolean {
    return !!el;
  }

  return (
    <div
      ref={mountRef}
      onPointerMove={handlePointerMove}
      onClick={handleClick}
      className="relative w-full h-full cursor-grab active:cursor-grabbing select-none"
    >
      {/* 2D Fallback view if WebGL is disabled */}
      {!webGLSupported && (
        <div className="absolute inset-0 flex items-center justify-center p-6 text-center bg-slate-950/95 z-10">
          <div className="max-w-md p-8 rounded-3xl glass-studio border border-slate-700/50 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-slate-900 border border-slate-700 mx-auto flex items-center justify-center text-slate-300">
              <span className="w-2.5 h-2.5 rounded-full bg-sky-400 animate-ping" />
            </div>
            <h3 className="text-xl font-bold font-display text-white">THE INTELLECT CORE</h3>
            <p className="text-xs text-slate-400">
              Interactive 2D mode active. Explore our 5 student communities below.
            </p>
          </div>
        </div>
      )}

      {/* Floating Hover Indicator & Core Prompt */}
      {hoveredId && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full glass-studio border border-sky-400/30 text-sky-200 text-xs font-mono tracking-wider pointer-events-none animate-in fade-in zoom-in-95 duration-150 shadow-[0_4px_24px_rgba(56,189,248,0.15)] flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse" />
          <span>INSPECT {COMMUNITIES_DATA.find(c => c.id === hoveredId)?.name.toUpperCase()}</span>
        </div>
      )}

      {isHoveringCore && !hoveredId && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full glass-studio border border-slate-700 text-slate-300 text-xs font-mono tracking-wider pointer-events-none animate-in fade-in zoom-in-95 duration-150 shadow-[0_4px_24px_rgba(0,0,0,0.5)] flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-slate-300 animate-pulse" />
          <span>THE INTELLECT CORE • CLICK TO EXPLORE</span>
        </div>
      )}
    </div>
  );
};
