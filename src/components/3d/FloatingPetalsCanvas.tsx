import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const FloatingPetalsCanvas: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 50;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Velvet Burgundy Rose Petals Only (snow/rain particles removed)
    const petalCount = 32;
    const petalsGroup = new THREE.Group();

    // Curved petal geometry using custom shape
    const petalShape = new THREE.Shape();
    petalShape.moveTo(0, 0);
    petalShape.bezierCurveTo(1.2, 1.5, 1.8, 3.5, 0, 4.5);
    petalShape.bezierCurveTo(-1.8, 3.5, -1.2, 1.5, 0, 0);

    const petalGeometry = new THREE.ShapeGeometry(petalShape, 12);
    // Add subtle curvature to petal vertices
    const posAttribute = petalGeometry.attributes.position;
    for (let i = 0; i < posAttribute.count; i++) {
      const y = posAttribute.getY(i);
      const x = posAttribute.getX(i);
      posAttribute.setZ(i, Math.sin(y * 0.8) * 0.4 - Math.abs(x) * 0.2);
    }
    petalGeometry.computeVertexNormals();

    const petalMaterial = new THREE.MeshStandardMaterial({
      color: 0x5a121d, // Deep romantic burgundy
      roughness: 0.6,
      metalness: 0.1,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.88,
    });

    // Lights for 3D petals
    const ambientLight = new THREE.AmbientLight(0xfff5ea, 1.2);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffdfa9, 1.5);
    dirLight.position.set(20, 40, 30);
    scene.add(dirLight);

    const petalMeshes: {
      mesh: THREE.Mesh;
      rotSpeed: { x: number; y: number; z: number };
      driftSpeed: { x: number; y: number };
      swayOffset: number;
    }[] = [];

    for (let i = 0; i < petalCount; i++) {
      const mesh = new THREE.Mesh(petalGeometry, petalMaterial);
      const scale = 0.5 + Math.random() * 0.8;
      mesh.scale.set(scale, scale, scale);

      mesh.position.set(
        (Math.random() - 0.5) * 80,
        (Math.random() - 0.5) * 80,
        (Math.random() - 0.5) * 30
      );

      mesh.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      );

      petalsGroup.add(mesh);
      petalMeshes.push({
        mesh,
        rotSpeed: {
          x: (Math.random() - 0.5) * 0.035,
          y: (Math.random() - 0.5) * 0.045,
          z: (Math.random() - 0.5) * 0.035,
        },
        driftSpeed: {
          x: (Math.random() - 0.5) * 0.035,
          y: -0.085 - Math.random() * 0.055,
        },
        swayOffset: Math.random() * Math.PI * 2,
      });
    }

    scene.add(petalsGroup);

    // Mouse Parallax
    let targetMouseX = 0;
    let targetMouseY = 0;
    let currentMouseX = 0;
    let currentMouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      targetMouseX = (e.clientX / window.innerWidth - 0.5) * 6;
      targetMouseY = (e.clientY / window.innerHeight - 0.5) * 6;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Handle Resize
    const handleResize = () => {
      if (!container) return;
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    // Animation Loop
    let animationId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse follow
      currentMouseX += (targetMouseX - currentMouseX) * 0.05;
      currentMouseY += (targetMouseY - currentMouseY) * 0.05;

      camera.position.x = currentMouseX;
      camera.position.y = -currentMouseY;
      camera.lookAt(0, 0, 0);

      // Animate Petals at smooth, natural falling rate
      petalMeshes.forEach((item) => {
        item.mesh.rotation.x += item.rotSpeed.x;
        item.mesh.rotation.y += item.rotSpeed.y;
        item.mesh.rotation.z += item.rotSpeed.z;

        item.mesh.position.y += item.driftSpeed.y;
        item.mesh.position.x += Math.sin(elapsedTime * 1.3 + item.swayOffset) * 0.04;

        // Reset if drifted below viewport
        if (item.mesh.position.y < -45) {
          item.mesh.position.y = 45;
          item.mesh.position.x = (Math.random() - 0.5) * 80;
        }
      });

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      petalGeometry.dispose();
      petalMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-[2] overflow-hidden"
      aria-hidden="true"
    />
  );
};
