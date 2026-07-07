import { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface ThreeDCanvasProps {
  activeSectionId: string;
  theme: 'dark' | 'light';
}

export default function ThreeDCanvas({
  activeSectionId,
  theme,
}: ThreeDCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Keep target properties for lerping
  const targetCamPos = useRef(new THREE.Vector3(0, 0, 10));
  const targetCamLookAt = useRef(new THREE.Vector3(0, 0, 0));
  const targetBgColor = useRef(new THREE.Color('#07090e'));
  const mouse = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;

    // 1. Create Scene
    const scene = new THREE.Scene();
    const fogColor = theme === 'light' ? 0xffffff : 0x07090e;
    scene.fog = new THREE.FogExp2(fogColor, 0.04);

    // 2. Create Camera
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 100);
    camera.position.copy(targetCamPos.current);

    // 3. Create Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
      alpha: true,
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // 4. Create 3D Objects

    // A. Interconnected Glowing Digital Globe (Sphere of particles)
    const globeGeometry = new THREE.BufferGeometry();
    const globeCount = 1500;
    const globePositions = new Float32Array(globeCount * 3);
    const globeColors = new Float32Array(globeCount * 3);
    const radius = 3.5;

    const activeColor = new THREE.Color(theme === 'light' ? 0x0d9488 : 0x0df2c9); // teal
    const warningColor = new THREE.Color(theme === 'light' ? 0xbe123c : 0xff0055); // crimson
    const researchColor = new THREE.Color(theme === 'light' ? 0x1d4ed8 : 0x007aff); // cyber blue
    const teamColor = new THREE.Color(theme === 'light' ? 0xb45309 : 0xffd700); // gold

    for (let i = 0; i < globeCount; i++) {
      // Golden spiral distribution for beautiful even uniform spherical coverage
      const phi = Math.acos(-1 + (2 * i) / globeCount);
      const theta = Math.sqrt(globeCount * Math.PI) * phi;

      const x = radius * Math.cos(theta) * Math.sin(phi);
      const y = radius * Math.sin(theta) * Math.sin(phi);
      const z = radius * Math.cos(phi);

      globePositions[i * 3] = x;
      globePositions[i * 3 + 1] = y;
      globePositions[i * 3 + 2] = z;

      // Color variation
      const mixedColor = activeColor.clone().lerp(researchColor, Math.random() * 0.4);
      globeColors[i * 3] = mixedColor.r;
      globeColors[i * 3 + 1] = mixedColor.g;
      globeColors[i * 3 + 2] = mixedColor.b;
    }

    globeGeometry.setAttribute('position', new THREE.BufferAttribute(globePositions, 3));
    globeGeometry.setAttribute('color', new THREE.BufferAttribute(globeColors, 3));

    // Custom circle-texture particle shader/material simulation
    const pCanvas = document.createElement('canvas');
    pCanvas.width = 16;
    pCanvas.height = 16;
    const pCtx = pCanvas.getContext('2d');
    if (pCtx) {
      const grad = pCtx.createRadialGradient(8, 8, 0, 8, 8, 8);
      grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
      grad.addColorStop(0.5, 'rgba(255, 255, 255, 0.5)');
      grad.addColorStop(1, 'rgba(255, 255, 255, 0)');
      pCtx.fillStyle = grad;
      pCtx.fillRect(0, 0, 16, 16);
    }
    const particleTexture = new THREE.CanvasTexture(pCanvas);

    const globeMaterial = new THREE.PointsMaterial({
      size: 0.12,
      map: particleTexture,
      transparent: true,
      blending: theme === 'light' ? THREE.NormalBlending : THREE.AdditiveBlending,
      depthWrite: false,
      vertexColors: true,
    });

    const globeParticles = new THREE.Points(globeGeometry, globeMaterial);
    scene.add(globeParticles);

    // Globe Core Skeleton Wireframe
    const sphereSkeletonGeom = new THREE.IcosahedronGeometry(radius * 0.98, 2);
    const skeletonMat = new THREE.MeshBasicMaterial({
      color: theme === 'light' ? 0xe2e8f0 : 0x141c2f,
      wireframe: true,
      transparent: true,
      opacity: theme === 'light' ? 0.6 : 0.25,
      blending: theme === 'light' ? THREE.NormalBlending : THREE.AdditiveBlending,
    });
    const globeSkeleton = new THREE.Mesh(sphereSkeletonGeom, skeletonMat);
    scene.add(globeSkeleton);

    // B. Connected Databytes Splines
    const connectionsGroup = new THREE.Group();
    const mainNodes: THREE.Vector3[] = [];
    const hotspotCities = [
      new THREE.Vector3(1.2, 2.5, 2.1),   // New Delhi
      new THREE.Vector3(2.4, 1.8, -1.9),  // Kyoto
      new THREE.Vector3(-1.8, 2.1, 2.2),  // Europe hub
      new THREE.Vector3(-2.8, -1.5, 1.1), // Southern hemisphere
    ];

    hotspotCities.forEach((city) => {
      // Create glowing anchor sphere rings for main focus cities
      const ringGeom = new THREE.RingGeometry(0.12, 0.15, 16);
      const ringMat = new THREE.MeshBasicMaterial({
        color: theme === 'light' ? 0x0d9488 : 0x0df2c9,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.8,
      });
      const ring = new THREE.Mesh(ringGeom, ringMat);
      ring.position.copy(city);
      ring.lookAt(new THREE.Vector3(0, 0, 0));
      connectionsGroup.add(ring);
      mainNodes.push(city);
    });

    // Spline curves connecting hubs
    for (let i = 0; i < mainNodes.length; i++) {
      for (let j = i + 1; j < mainNodes.length; j++) {
        const start = mainNodes[i];
        const end = mainNodes[j];
        
        // Arc route curving outwards Slightly to form spatial tech bridges
        const midPoint = new THREE.Vector3()
          .addVectors(start, end)
          .multiplyScalar(0.5)
          .normalize()
          .multiplyScalar(radius * 1.2);

        const curve = new THREE.QuadraticBezierCurve3(start, midPoint, end);
        const points = curve.getPoints(24);
        const curveGeom = new THREE.BufferGeometry().setFromPoints(points);

        const lineMat = new THREE.LineBasicMaterial({
          color: theme === 'light' ? 0x1d4ed8 : 0x007aff,
          transparent: true,
          opacity: theme === 'light' ? 0.35 : 0.2,
          blending: theme === 'light' ? THREE.NormalBlending : THREE.AdditiveBlending,
        });

        const line = new THREE.Line(curveGeom, lineMat);
        connectionsGroup.add(line);
      }
    }
    scene.add(connectionsGroup);

    // C. Glowing Environmental Particle Currents (Wind flow / Waves)
    const flowCount = 600;
    const flowGeometry = new THREE.BufferGeometry();
    const flowPositions = new Float32Array(flowCount * 3);
    const flowSpeeds: number[] = [];
    const flowAngles: number[] = [];

    for (let i = 0; i < flowCount; i++) {
      // Space particles around the main body
      const theta = Math.random() * Math.PI * 2;
      const r = radius * 1.1 + Math.random() * 4.0;
      const h = (Math.random() - 0.5) * 6;

      flowPositions[i * 3] = r * Math.cos(theta);
      flowPositions[i * 3 + 1] = h;
      flowPositions[i * 3 + 2] = r * Math.sin(theta);

      flowSpeeds.push(0.005 + Math.random() * 0.015);
      flowAngles.push(theta);
    }

    flowGeometry.setAttribute('position', new THREE.BufferAttribute(flowPositions, 3));
    const flowMaterial = new THREE.PointsMaterial({
      size: 0.06,
      map: particleTexture,
      color: theme === 'light' ? 0x1d4ed8 : 0x007aff,
      transparent: true,
      opacity: 0.6,
      blending: theme === 'light' ? THREE.NormalBlending : THREE.AdditiveBlending,
      depthWrite: false,
    });

    const flowParticles = new THREE.Points(flowGeometry, flowMaterial);
    scene.add(flowParticles);

    // Seismograph Sandbox Plane (Used for Lab View)
    const gridHelper = new THREE.GridHelper(
      16,
      32,
      theme === 'light' ? 0x0d9488 : 0x0df2c9,
      theme === 'light' ? 0xe2e8f0 : 0x141c2f
    );
    gridHelper.position.y = -4.5;
    gridHelper.material.transparent = true;
    gridHelper.material.opacity = 0;
    scene.add(gridHelper);

    // Interactive custom ripple waves mesh
    const rippleGeometry = new THREE.PlaneGeometry(16, 16, 32, 32);
    const rippleMaterial = new THREE.MeshBasicMaterial({
      color: theme === 'light' ? 0x0d9488 : 0x0df2c9,
      wireframe: true,
      transparent: true,
      opacity: 0,
      blending: theme === 'light' ? THREE.NormalBlending : THREE.AdditiveBlending,
    });
    const rippleMesh = new THREE.Mesh(rippleGeometry, rippleMaterial);
    rippleMesh.rotation.x = -Math.PI / 2;
    rippleMesh.position.y = -4.45;
    scene.add(rippleMesh);

    // 5. Interactive Resize
    const resizeObserver = new ResizeObserver((entries) => {
      if (!entries[0]) return;
      const { width: newWidth, height: newHeight } = entries[0].contentRect;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    });
    resizeObserver.observe(containerRef.current);

    // 6. Mouse Move Interactions
    const onMouseMove = (e: MouseEvent) => {
      mouse.current.targetX = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.targetY = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', onMouseMove);

    // 7. Animation Loop with Camera flight triggers
    let frameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      frameId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();

      // Smoothly update mouse coords to prevent jerky actions
      mouse.current.x += (mouse.current.targetX - mouse.current.x) * 0.05;
      mouse.current.y += (mouse.current.targetY - mouse.current.y) * 0.05;

      // Rotate objects beautifully
      globeParticles.rotation.y = elapsedTime * 0.035 + mouse.current.x * 0.15;
      globeParticles.rotation.x = mouse.current.y * 0.15;
      globeSkeleton.rotation.y = globeParticles.rotation.y;
      globeSkeleton.rotation.x = globeParticles.rotation.x;
      connectionsGroup.rotation.y = globeParticles.rotation.y;
      connectionsGroup.rotation.x = globeParticles.rotation.x;

      // Dynamic Flow particles current drifting loop
      const flowPosArr = flowParticles.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < flowCount; i++) {
        flowAngles[i] += flowSpeeds[i];
        const r = Math.sqrt(
          flowPosArr[i * 3] * flowPosArr[i * 3] +
          flowPosArr[i * 3 + 2] * flowPosArr[i * 3 + 2]
        );
        flowPosArr[i * 3] = r * Math.cos(flowAngles[i]);
        // add wave oscillations
        flowPosArr[i * 3 + 1] += Math.sin(elapsedTime * 2 + i) * 0.002;
        flowPosArr[i * 3 + 2] = r * Math.sin(flowAngles[i]);
      }
      flowParticles.geometry.attributes.position.needsUpdate = true;

      // Smooth section-based settings morphs
      switch (activeSectionId) {
        case 'hero':
          targetCamPos.current.set(0, 0, 7.5);
          targetCamLookAt.current.set(0, 0, 0);
          flowMaterial.color.setHex(theme === 'light' ? 0x1d4ed8 : 0x007aff); // Blue
          globeMaterial.color.setHex(theme === 'light' ? 0x0d9488 : 0x0df2c9); // Teal
          gridHelper.material.opacity = 0;
          rippleMaterial.opacity = 0;
          break;

        case 'doctrine':
          targetCamPos.current.set(-2, 1.5, 6);
          targetCamLookAt.current.set(1, 0, 0);
          flowMaterial.color.setHex(theme === 'light' ? 0x16a34a : 0x39ff14); // Green climate
          globeMaterial.color.setHex(theme === 'light' ? 0x0d9488 : 0x0df2c9);
          gridHelper.material.opacity = 0;
          rippleMaterial.opacity = 0;
          break;

        case 'blueprints':
          // Move side anchor focus to display product schematics cleanly
          targetCamPos.current.set(2.5, -0.5, 5);
          targetCamLookAt.current.set(-1.2, 0.2, 0);
          flowMaterial.color.setHex(theme === 'light' ? 0xe11d48 : 0xff0055); // Disaster theme warning ruby-red
          globeMaterial.color.setHex(theme === 'light' ? 0xd97706 : 0xffaa00); // Warning gold
          gridHelper.material.opacity = 0.1;
          rippleMaterial.opacity = 0.05;
          break;

        case 'consultancy':
          targetCamPos.current.set(0, 4, 8);
          targetCamLookAt.current.set(0, -1, 0);
          flowMaterial.color.setHex(theme === 'light' ? 0x1d4ed8 : 0x007aff); // Connected Tech Blue
          globeMaterial.color.setHex(theme === 'light' ? 0x1d4ed8 : 0x007aff);
          gridHelper.material.opacity = 0.3;
          rippleMaterial.opacity = 0.2;
          break;

        case 'academy':
          targetCamPos.current.set(-1.5, -1, 4.5);
          targetCamLookAt.current.set(0.5, 0.5, 0);
          flowMaterial.color.setHex(theme === 'light' ? 0xd97706 : 0xffd700); // golden
          globeMaterial.color.setHex(theme === 'light' ? 0x334155 : 0xffffff);
          gridHelper.material.opacity = 0.05;
          rippleMaterial.opacity = 0.05;
          break;

        case 'contact':
        default:
          targetCamPos.current.set(0, 0, 8);
          targetCamLookAt.current.set(0, 0, 0);
          gridHelper.material.opacity = 0.1;
          rippleMaterial.opacity = 0.1;
      }

      // Simple subtle resting grid breathing wave
      const positions = rippleGeometry.attributes.position.array as Float32Array;
      for (let i = 0; i < positions.length / 3; i++) {
        const x = positions[i * 3];
        const y = positions[i * 3 + 1];
        const dist = Math.sqrt(x * x + y * y);
        positions[i * 3 + 2] = Math.sin(dist * 0.4 - elapsedTime * 1.5) * 0.04;
      }
      rippleGeometry.attributes.position.needsUpdate = true;
      rippleMaterial.color.setHex(theme === 'light' ? 0x0d9488 : 0x0df2c9);

      // Lerp camera position and lookAt smoothly for Cinematic ease flight transitions
      camera.position.lerp(targetCamPos.current, 0.04);
      
      // Calculate lookAt tracking vector
      const currentLookAt = new THREE.Vector3(0, 0, 0);
      // We estimate looking target by starting from active target and lerping slowly
      currentLookAt.lerp(targetCamLookAt.current, 0.04);
      camera.lookAt(currentLookAt);

      renderer.render(scene, camera);
    };

    animate();

    // 8. Cleanup
    return () => {
      cancelAnimationFrame(frameId);
      resizeObserver.disconnect();
      window.removeEventListener('mousemove', onMouseMove);
      renderer.dispose();
      globeGeometry.dispose();
      globeMaterial.dispose();
      sphereSkeletonGeom.dispose();
      skeletonMat.dispose();
      flowGeometry.dispose();
      flowMaterial.dispose();
      gridHelper.dispose();
      rippleGeometry.dispose();
      rippleMaterial.dispose();
      particleTexture.dispose();
    };
  }, [activeSectionId, theme]);

  return (
    <div ref={containerRef} className="absolute inset-0 w-full h-full pointer-events-none z-0">
      <canvas ref={canvasRef} className="block w-full h-full" />
    </div>
  );
}
