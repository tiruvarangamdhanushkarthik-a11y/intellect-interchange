import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import type { IdeaQuestion } from '../../types';

interface QuestionGalaxy3DProps {
  questions: IdeaQuestion[];
  onSelectQuestion: (question: IdeaQuestion) => void;
}

export const QuestionGalaxy3D: React.FC<QuestionGalaxy3DProps> = ({
  questions,
  onSelectQuestion,
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const selectedQuestionRef = useRef(onSelectQuestion);
  selectedQuestionRef.current = onSelectQuestion;

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    const width = container.clientWidth;
    const height = container.clientHeight;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 8);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const group = new THREE.Group();
    scene.add(group);

    const ambientLight = new THREE.AmbientLight(0xffffff, 1.5);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0x00f0ff, 3, 20);
    scene.add(pointLight);

    // Place questions on a 3D spiral constellation
    const nodes: THREE.Mesh[] = [];
    questions.forEach((q, idx) => {
      const angle = (idx / questions.length) * Math.PI * 2;
      const radius = 2.5 + (idx % 3) * 0.8;
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * (radius * 0.6) + ((idx % 2) - 0.5) * 0.8;
      const z = (Math.sin(angle * 2) * 1.5);

      const geo = new THREE.SphereGeometry(0.2, 16, 16);
      const color = q.category === 'education' ? 0x38bdf8 : q.category === 'ai-tech' ? 0x00f0ff : q.category === 'student-reality' ? 0xf43f5e : 0xa855f7;
      const mat = new THREE.MeshStandardMaterial({
        color,
        emissive: color,
        emissiveIntensity: 0.7,
        roughness: 0.3,
        metalness: 0.7,
      });

      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.set(x, y, z);
      mesh.userData = { question: q, basePos: [x, y, z] };
      group.add(mesh);
      nodes.push(mesh);
    });

    // Ambient stars
    const starGeo = new THREE.BufferGeometry();
    const starCount = 400;
    const starPos = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount * 3; i++) {
      starPos[i] = (Math.random() - 0.5) * 16;
    }
    starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
    const starMat = new THREE.PointsMaterial({ size: 0.03, color: 0x818cf8, transparent: true, opacity: 0.5 });
    const starSystem = new THREE.Points(starGeo, starMat);
    scene.add(starSystem);

    let frameId: number;
    let time = 0;

    const animate = () => {
      frameId = requestAnimationFrame(animate);
      time += 0.01;
      group.rotation.y += 0.003;
      group.rotation.x = Math.sin(time * 0.2) * 0.05;

      nodes.forEach((mesh, i) => {
        const base = mesh.userData.basePos;
        mesh.position.y = base[1] + Math.sin(time + i) * 0.08;
      });

      renderer.render(scene, camera);
    };

    frameId = requestAnimationFrame(animate);

    const handlePointerDown = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const mouse = new THREE.Vector2(
        ((e.clientX - rect.left) / rect.width) * 2 - 1,
        -((e.clientY - rect.top) / rect.height) * 2 + 1
      );
      const raycaster = new THREE.Raycaster();
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(nodes);
      if (intersects.length > 0) {
        const q = intersects[0].object.userData.question;
        if (q) selectedQuestionRef.current(q);
      }
    };

    container.addEventListener('click', handlePointerDown);

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
      container.removeEventListener('click', handlePointerDown);
      cancelAnimationFrame(frameId);
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [questions]);

  return (
    <div className="relative w-full h-80 rounded-3xl bg-slate-950/80 border border-slate-800 overflow-hidden group">
      <div ref={mountRef} className="w-full h-full cursor-pointer" />
      <div className="absolute bottom-3 left-4 text-[10px] font-mono text-slate-500 pointer-events-none">
        ✦ 3D QUESTION COSMOS • CLICK A NODE TO EXAMINE PERSPECTIVES
      </div>
    </div>
  );
};
