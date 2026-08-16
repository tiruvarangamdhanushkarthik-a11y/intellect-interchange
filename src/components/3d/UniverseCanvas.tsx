import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { KNOWLEDGE_NODES_DATA } from '../../data/knowledgeNodesData';
import type { NodeCategory } from '../../types';
import { ambientAudio } from '../../audio/ambientSynth';

interface UniverseCanvasProps {
  activeNodeId: NodeCategory | null;
  onSelectNode: (id: NodeCategory | null) => void;
  isLowPowerMode?: boolean;
}

// Function to generate high-resolution crisp 3D sprite label
function createLabelSprite(text: string, color: string): THREE.Sprite {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 128;
  const ctx = canvas.getContext('2d')!;

  ctx.clearRect(0, 0, 512, 128);
  ctx.fillStyle = 'rgba(6, 10, 20, 0.75)';
  ctx.strokeStyle = color;
  ctx.lineWidth = 4;
  
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

  // Text
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 36px "Space Grotesk", sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(text, 256, 64);

  const texture = new THREE.CanvasTexture(canvas);
  texture.minFilter = THREE.LinearFilter;
  const spriteMat = new THREE.SpriteMaterial({
    map: texture,
    transparent: true,
    opacity: 0.85,
    depthWrite: false,
  });

  const sprite = new THREE.Sprite(spriteMat);
  sprite.scale.set(1.4, 0.35, 1);
  return sprite;
}

export const UniverseCanvas: React.FC<UniverseCanvasProps> = ({
  activeNodeId,
  onSelectNode,
  isLowPowerMode = false,
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [fps, setFps] = useState<number>(60);

  // References for animation loop
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const targetCamPos = useRef<THREE.Vector3>(new THREE.Vector3(0, 0, 9.5));
  const targetCamLook = useRef<THREE.Vector3>(new THREE.Vector3(0, 0, 0));
  const nodesGroupRef = useRef<THREE.Group | null>(null);
  const coreMeshRef = useRef<THREE.Group | null>(null);
  const linesGroupRef = useRef<THREE.Group | null>(null);
  const pulseSparksRef = useRef<{ mesh: THREE.Mesh; curve: THREE.CatmullRomCurve3; speed: number; progress: number }[]>([]);
  const particlesRef = useRef<THREE.Points | null>(null);
  const isInteractingRef = useRef<boolean>(false);
  const pointerPos = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const prevMousePos = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const orbitAngles = useRef<{ theta: number; phi: number; radius: number }>({
    theta: 0,
    phi: Math.PI / 2,
    radius: 9.5,
  });

  // Dynamic Camera travel on activeNodeId change
  useEffect(() => {
    if (!activeNodeId) {
      // Return to overview orbit
      targetCamPos.current.set(
        orbitAngles.current.radius * Math.sin(orbitAngles.current.phi) * Math.sin(orbitAngles.current.theta),
        orbitAngles.current.radius * Math.cos(orbitAngles.current.phi),
        orbitAngles.current.radius * Math.sin(orbitAngles.current.phi) * Math.cos(orbitAngles.current.theta)
      );
      targetCamLook.current.set(0, 0, 0);
    } else {
      const node = KNOWLEDGE_NODES_DATA.find((n) => n.id === activeNodeId);
      if (node) {
        ambientAudio.playWarpTransition();
        const [nx, ny, nz] = node.coords;
        const nodeVec = new THREE.Vector3(nx, ny, nz);
        const dir = nodeVec.clone().normalize();
        // Position camera slightly offset from target node
        targetCamPos.current.copy(nodeVec).add(dir.clone().multiplyScalar(2.2)).add(new THREE.Vector3(0, 0.4, 0));
        targetCamLook.current.copy(nodeVec);
      }
    }
  }, [activeNodeId]);

  // Keyboard navigation shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }
      const num = parseInt(e.key, 10);
      if (num >= 1 && num <= KNOWLEDGE_NODES_DATA.length) {
        const targetNode = KNOWLEDGE_NODES_DATA[num - 1];
        onSelectNode(targetNode.id);
      } else if (e.key === '0' || e.key === 'Escape') {
        onSelectNode(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onSelectNode]);

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    isInteractingRef.current = true;
    prevMousePos.current = { x: e.clientX, y: e.clientY };
  }, []);

  const handlePointerUp = useCallback(() => {
    isInteractingRef.current = false;
  }, []);

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      const rect = mountRef.current?.getBoundingClientRect();
      if (!rect) return;

      pointerPos.current.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      pointerPos.current.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      if (isInteractingRef.current && !activeNodeId) {
        const deltaX = e.clientX - prevMousePos.current.x;
        const deltaY = e.clientY - prevMousePos.current.y;
        prevMousePos.current = { x: e.clientX, y: e.clientY };

        orbitAngles.current.theta -= deltaX * 0.005;
        orbitAngles.current.phi = Math.max(0.2, Math.min(Math.PI - 0.2, orbitAngles.current.phi - deltaY * 0.005));

        const r = orbitAngles.current.radius;
        targetCamPos.current.set(
          r * Math.sin(orbitAngles.current.phi) * Math.sin(orbitAngles.current.theta),
          r * Math.cos(orbitAngles.current.phi),
          r * Math.sin(orbitAngles.current.phi) * Math.cos(orbitAngles.current.theta)
        );
      }
    },
    [activeNodeId]
  );

  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      if (!cameraRef.current || !sceneRef.current || !nodesGroupRef.current) return;

      const rect = mountRef.current?.getBoundingClientRect();
      if (!rect) return;

      const mouse = new THREE.Vector2(
        ((e.clientX - rect.left) / rect.width) * 2 - 1,
        -((e.clientY - rect.top) / rect.height) * 2 + 1
      );

      const raycaster = new THREE.Raycaster();
      raycaster.setFromCamera(mouse, cameraRef.current);

      const intersects = raycaster.intersectObjects(nodesGroupRef.current.children, true);
      if (intersects.length > 0) {
        let obj: THREE.Object3D | null = intersects[0].object;
        while (obj && !obj.userData?.nodeId && obj.parent !== nodesGroupRef.current) {
          obj = obj.parent;
        }
        if (obj?.userData?.nodeId) {
          onSelectNode(obj.userData.nodeId as NodeCategory);
        }
      }
    },
    [onSelectNode]
  );

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // 1. Scene Setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.fog = new THREE.FogExp2(0x030508, 0.045);

    // 2. Camera Setup
    const width = container.clientWidth;
    const height = container.clientHeight;
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 9.5);
    cameraRef.current = camera;

    // 3. Renderer Setup
    const renderer = new THREE.WebGLRenderer({
      antialias: !isLowPowerMode,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isLowPowerMode ? 1 : 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    rendererRef.current = renderer;
    container.appendChild(renderer.domElement);

    // 4. Lighting
    const ambientLight = new THREE.AmbientLight(0x0a1628, 2.5);
    scene.add(ambientLight);

    const cyanPointLight = new THREE.PointLight(0x00f0ff, 4, 15);
    cyanPointLight.position.set(0, 0, 0);
    scene.add(cyanPointLight);

    const violetPointLight = new THREE.PointLight(0x818cf8, 2.5, 20);
    violetPointLight.position.set(0, 4, 3);
    scene.add(violetPointLight);

    // 5. HUMAN THINKING CORE
    const coreGroup = new THREE.Group();
    coreMeshRef.current = coreGroup;

    // Inner glowing nucleus sphere
    const nucleusGeo = new THREE.IcosahedronGeometry(0.85, isLowPowerMode ? 2 : 4);
    const nucleusMat = new THREE.MeshBasicMaterial({
      color: 0x00f0ff,
      wireframe: true,
      transparent: true,
      opacity: 0.45,
    });
    const nucleusMesh = new THREE.Mesh(nucleusGeo, nucleusMat);
    coreGroup.add(nucleusMesh);

    // Core Solid Mesh
    const coreSolidGeo = new THREE.SphereGeometry(0.55, 32, 32);
    const coreSolidMat = new THREE.MeshStandardMaterial({
      color: 0x051329,
      emissive: 0x00d4e5,
      emissiveIntensity: 0.6,
      roughness: 0.2,
      metalness: 0.9,
    });
    const coreSolid = new THREE.Mesh(coreSolidGeo, coreSolidMat);
    coreGroup.add(coreSolid);

    // Outer Synaptic Geometric Rings
    const ringGeo = new THREE.TorusGeometry(1.3, 0.015, 16, 64);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x818cf8,
      transparent: true,
      opacity: 0.35,
    });
    const ring1 = new THREE.Mesh(ringGeo, ringMat);
    ring1.rotation.x = Math.PI / 3;
    const ring2 = new THREE.Mesh(ringGeo, ringMat);
    ring2.rotation.y = Math.PI / 4;
    ring2.rotation.x = -Math.PI / 6;
    coreGroup.add(ring1);
    coreGroup.add(ring2);

    scene.add(coreGroup);

    // 6. FLOATING KNOWLEDGE NODES
    const nodesGroup = new THREE.Group();
    nodesGroupRef.current = nodesGroup;

    const linesGroup = new THREE.Group();
    linesGroupRef.current = linesGroup;
    scene.add(linesGroup);

    const pulseSparks: { mesh: THREE.Mesh; curve: THREE.CatmullRomCurve3; speed: number; progress: number }[] = [];

    KNOWLEDGE_NODES_DATA.forEach((nodeData, idx) => {
      const nodeSubGroup = new THREE.Group();
      nodeSubGroup.position.set(...nodeData.coords);
      nodeSubGroup.userData = { nodeId: nodeData.id, nodeIndex: idx, basePos: [...nodeData.coords] };

      // Node Inner Nucleus
      const nodeGeo = new THREE.SphereGeometry(0.3, 24, 24);
      const nodeMat = new THREE.MeshStandardMaterial({
        color: new THREE.Color(nodeData.color),
        emissive: new THREE.Color(nodeData.color),
        emissiveIntensity: 0.8,
        roughness: 0.3,
        metalness: 0.8,
      });
      const nodeSphere = new THREE.Mesh(nodeGeo, nodeMat);
      nodeSubGroup.add(nodeSphere);

      // Node Outer Halo
      const haloGeo = new THREE.RingGeometry(0.38, 0.44, 32);
      const haloMat = new THREE.MeshBasicMaterial({
        color: new THREE.Color(nodeData.color),
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.4,
      });
      const halo = new THREE.Mesh(haloGeo, haloMat);
      halo.userData = { isHalo: true };
      nodeSubGroup.add(halo);

      // 3D Billboard Sprite Label
      const spriteLabel = createLabelSprite(nodeData.name, nodeData.color);
      spriteLabel.position.set(0, 0.65, 0);
      nodeSubGroup.add(spriteLabel);

      // Hit proxy
      const hitGeo = new THREE.SphereGeometry(0.7, 12, 12);
      const hitMat = new THREE.MeshBasicMaterial({ visible: false });
      const hitMesh = new THREE.Mesh(hitGeo, hitMat);
      nodeSubGroup.add(hitMesh);

      nodesGroup.add(nodeSubGroup);

      // Synaptic Connection Line to Core
      const points = [
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(nodeData.coords[0] * 0.5, nodeData.coords[1] * 0.5 + 0.3, nodeData.coords[2] * 0.5),
        new THREE.Vector3(...nodeData.coords),
      ];
      const curve = new THREE.CatmullRomCurve3(points);
      const curvePoints = curve.getPoints(24);
      const lineGeo = new THREE.BufferGeometry().setFromPoints(curvePoints);
      const lineMat = new THREE.LineBasicMaterial({
        color: new THREE.Color(nodeData.color),
        transparent: true,
        opacity: 0.25,
      });
      const line = new THREE.Line(lineGeo, lineMat);
      linesGroup.add(line);

      // Animated Synaptic Pulse Spark
      const sparkGeo = new THREE.SphereGeometry(0.045, 8, 8);
      const sparkMat = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0.9,
      });
      const sparkMesh = new THREE.Mesh(sparkGeo, sparkMat);
      linesGroup.add(sparkMesh);

      pulseSparks.push({
        mesh: sparkMesh,
        curve,
        speed: 0.15 + Math.random() * 0.1,
        progress: Math.random(),
      });
    });

    pulseSparksRef.current = pulseSparks;
    scene.add(nodesGroup);

    // 7. PARTICLES NEBULA
    const particleCount = isLowPowerMode ? 600 : 2200;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const cyanColor = new THREE.Color(0x00f0ff);
    const violetColor = new THREE.Color(0x818cf8);
    const whiteColor = new THREE.Color(0xffffff);

    for (let i = 0; i < particleCount; i++) {
      const radius = 2.5 + Math.random() * 12;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);

      const mixed = Math.random();
      const col = mixed < 0.5 ? cyanColor : mixed < 0.85 ? violetColor : whiteColor;
      colors[i * 3] = col.r;
      colors[i * 3 + 1] = col.g;
      colors[i * 3 + 2] = col.b;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const particleMat = new THREE.PointsMaterial({
      size: isLowPowerMode ? 0.04 : 0.05,
      vertexColors: true,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending,
    });

    const particleSystem = new THREE.Points(particleGeo, particleMat);
    particlesRef.current = particleSystem;
    scene.add(particleSystem);

    // 8. Animation Loop
    let animationFrameId: number;
    let lastTime = performance.now();
    let frameCount = 0;
    let fpsTime = performance.now();
    const raycaster = new THREE.Raycaster();
    const currentCamLook = new THREE.Vector3(0, 0, 0);

    const animate = (time: number) => {
      animationFrameId = requestAnimationFrame(animate);
      const delta = (time - lastTime) * 0.001;
      lastTime = time;

      frameCount++;
      if (time - fpsTime >= 1000) {
        setFps(Math.round((frameCount * 1000) / (time - fpsTime)));
        frameCount = 0;
        fpsTime = time;
      }

      // Rotate Core
      if (coreGroup) {
        coreGroup.rotation.y += delta * 0.25;
        coreGroup.rotation.x = Math.sin(time * 0.0006) * 0.15;
        const pulse = 1 + Math.sin(time * 0.002) * 0.05;
        nucleusMesh.scale.set(pulse, pulse, pulse);
      }

      // Rotate Particle Nebula
      if (particleSystem) {
        particleSystem.rotation.y += delta * 0.04;
      }

      // Animate Synaptic Pulses
      pulseSparks.forEach((spark) => {
        spark.progress = (spark.progress + delta * spark.speed) % 1;
        const pt = spark.curve.getPoint(spark.progress);
        spark.mesh.position.copy(pt);
      });

      // Float nodes
      if (nodesGroup) {
        nodesGroup.children.forEach((child, i) => {
          const base = (child.userData as { basePos: number[] }).basePos;
          if (base) {
            child.position.y = base[1] + Math.sin(time * 0.0015 + i * 0.8) * 0.12;
            child.position.x = base[0] + Math.cos(time * 0.0012 + i * 0.6) * 0.08;
          }

          child.children.forEach((sub) => {
            if (sub.userData.isHalo) {
              sub.lookAt(camera.position);
            }
          });
        });
      }

      // Raycasting
      if (camera && scene && nodesGroup) {
        raycaster.setFromCamera(new THREE.Vector2(pointerPos.current.x, pointerPos.current.y), camera);
        const intersects = raycaster.intersectObjects(nodesGroup.children, true);

        if (intersects.length > 0) {
          let obj: THREE.Object3D | null = intersects[0].object;
          while (obj && !obj.userData?.nodeId && obj.parent !== nodesGroup) {
            obj = obj.parent;
          }
          if (obj?.userData?.nodeId) {
            const hoveredId = obj.userData.nodeId;
            setHoveredNode(hoveredId);
            document.body.style.cursor = 'pointer';
          }
        } else {
          setHoveredNode(null);
          document.body.style.cursor = 'default';
        }
      }

      // Smooth camera lerp
      const lerpSpeed = activeNodeId ? 0.06 : 0.04;
      camera.position.lerp(targetCamPos.current, lerpSpeed);
      currentCamLook.lerp(targetCamLook.current, lerpSpeed);
      camera.lookAt(currentCamLook);

      renderer.render(scene, camera);
    };

    animationFrameId = requestAnimationFrame(animate);

    // 9. Resize Handling
    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      particleGeo.dispose();
      particleMat.dispose();
    };
  }, [isLowPowerMode, activeNodeId, onSelectNode]);

  return (
    <div className="relative w-full h-full select-none overflow-hidden">
      <div
        ref={mountRef}
        className="w-full h-full cursor-grab active:cursor-grabbing"
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerMove={handlePointerMove}
        onClick={handleClick}
      />

      {/* Floating 3D Node Tooltip & Indicator */}
      {hoveredNode && !activeNodeId && (
        <div className="pointer-events-none absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3 px-5 py-2.5 rounded-full bg-slate-950/80 border border-cyan-400/40 backdrop-blur-md shadow-[0_0_25px_rgba(0,240,255,0.25)] animate-fade-in">
          <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
          <span className="text-xs uppercase tracking-widest text-cyan-200 font-mono">
            {KNOWLEDGE_NODES_DATA.find((n) => n.id === hoveredNode)?.name}
          </span>
          <span className="text-[11px] text-slate-400 font-sans">Click to inspect domain</span>
        </div>
      )}

      {/* Spatial Controls Indicator */}
      <div className="absolute top-4 left-4 z-10 hidden md:flex items-center gap-3 px-3 py-1.5 rounded-lg bg-slate-950/60 border border-slate-800/80 backdrop-blur-sm text-[11px] text-slate-400 font-mono">
        <span className="inline-block w-1.5 h-1.5 rounded-full bg-cyan-400" />
        <span>DRAG TO ROTATE • CLICK TO INSPECT • KEYS 1-8 TO JUMP • ESC FOR ORBIT</span>
        <span className="ml-2 text-slate-500">{fps} FPS</span>
      </div>
    </div>
  );
};
