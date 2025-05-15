
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const ThreeBackground: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 15;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x030508, 1); // Darker space color
    mountRef.current.appendChild(renderer.domElement);

    // Stars
    const starsGeometry = new THREE.BufferGeometry();
    const starsCount = 3000;
    const posArray = new Float32Array(starsCount * 3);
    const colorsArray = new Float32Array(starsCount * 3);

    for (let i = 0; i < starsCount * 3; i += 3) {
      // Position (sphere distribution)
      const radius = 50 + Math.random() * 50; // Distance from center
      const theta = Math.random() * Math.PI * 2; // Angle around y axis
      const phi = Math.acos(2 * Math.random() - 1); // Angle from y axis
      
      posArray[i] = radius * Math.sin(phi) * Math.cos(theta);
      posArray[i + 1] = radius * Math.sin(phi) * Math.sin(theta);
      posArray[i + 2] = radius * Math.cos(phi);
      
      // Colors (some stars blueish, some yellowish)
      const colorChoice = Math.random();
      if (colorChoice > 0.8) {
        // Blue tint stars
        colorsArray[i] = 0.6 + Math.random() * 0.3; // R
        colorsArray[i + 1] = 0.8 + Math.random() * 0.2; // G
        colorsArray[i + 2] = 1.0; // B
      } else if (colorChoice > 0.5) {
        // Yellow tint stars
        colorsArray[i] = 1.0; // R
        colorsArray[i + 1] = 0.8 + Math.random() * 0.2; // G
        colorsArray[i + 2] = 0.5 + Math.random() * 0.2; // B
      } else {
        // White/blue stars
        const bright = 0.8 + Math.random() * 0.2;
        colorsArray[i] = bright; // R
        colorsArray[i + 1] = bright; // G
        colorsArray[i + 2] = bright + Math.random() * 0.2; // B
      }
    }

    starsGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    starsGeometry.setAttribute('color', new THREE.BufferAttribute(colorsArray, 3));

    const starsMaterial = new THREE.PointsMaterial({
      size: 0.1,
      vertexColors: true,
      transparent: true,
      opacity: 0.9,
      sizeAttenuation: true,
    });

    const starField = new THREE.Points(starsGeometry, starsMaterial);
    scene.add(starField);

    // Nebula clouds (distant gas clouds)
    const nebulaCount = 5;
    const nebulae: THREE.Mesh[] = [];

    for (let i = 0; i < nebulaCount; i++) {
      const size = 15 + Math.random() * 20;
      const geometry = new THREE.SphereGeometry(size, 32, 32);
      
      // Create nebula with custom shader material
      const material = new THREE.MeshBasicMaterial({
        color: new THREE.Color(
          0.2 + Math.random() * 0.3, 
          0.2 + Math.random() * 0.2, 
          0.4 + Math.random() * 0.4
        ),
        transparent: true,
        opacity: 0.03 + Math.random() * 0.04,
        side: THREE.DoubleSide,
      });
      
      const nebula = new THREE.Mesh(geometry, material);
      
      // Position nebulae far away
      nebula.position.set(
        (Math.random() - 0.5) * 100,
        (Math.random() - 0.5) * 100,
        -50 - Math.random() * 100
      );
      
      scene.add(nebula);
      nebulae.push(nebula);
    }

    // Mouse movement effect
    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (event: MouseEvent) => {
      mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Animation
    const animate = () => {
      requestAnimationFrame(animate);

      // Rotate star field slowly
      starField.rotation.x += 0.0002;
      starField.rotation.y += 0.0003;

      // Make nebulae pulse slightly
      nebulae.forEach((nebula, i) => {
        const t = Date.now() * 0.0001 + i;
        const scale = 1 + Math.sin(t) * 0.04;
        nebula.scale.set(scale, scale, scale);
      });

      // Camera slight movement based on mouse
      camera.position.x += (mouseX * 2 - camera.position.x) * 0.005;
      camera.position.y += (mouseY * 2 - camera.position.y) * 0.005;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
    };

    animate();

    // Handle window resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      if (mountRef.current?.contains(renderer.domElement)) {
        mountRef.current.removeChild(renderer.domElement);
      }
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return <div ref={mountRef} className="fixed top-0 left-0 w-full h-full -z-10" />;
};

export default ThreeBackground;
