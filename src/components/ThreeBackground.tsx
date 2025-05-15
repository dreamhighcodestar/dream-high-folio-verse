
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

    // Stars with enhanced colors and distribution
    const starsGeometry = new THREE.BufferGeometry();
    const starsCount = 5000; // Increased stars count
    const posArray = new Float32Array(starsCount * 3);
    const colorsArray = new Float32Array(starsCount * 3);
    const sizeArray = new Float32Array(starsCount);

    for (let i = 0; i < starsCount * 3; i += 3) {
      // Position (improved sphere distribution)
      const radius = 50 + Math.random() * 150; // Increased distance variance
      const theta = Math.random() * Math.PI * 2; // Angle around y axis
      const phi = Math.acos(2 * Math.random() - 1); // Angle from y axis
      
      posArray[i] = radius * Math.sin(phi) * Math.cos(theta);
      posArray[i + 1] = radius * Math.sin(phi) * Math.sin(theta);
      posArray[i + 2] = radius * Math.cos(phi);
      
      // Star size variance
      sizeArray[i/3] = Math.random() < 0.1 ? 0.2 + Math.random() * 0.3 : 0.05 + Math.random() * 0.15;
      
      // Enhanced star colors
      const colorChoice = Math.random();
      if (colorChoice > 0.85) {
        // Blue tint stars
        colorsArray[i] = 0.6 + Math.random() * 0.3; // R
        colorsArray[i + 1] = 0.8 + Math.random() * 0.2; // G
        colorsArray[i + 2] = 1.0; // B
      } else if (colorChoice > 0.7) {
        // Yellow tint stars
        colorsArray[i] = 1.0; // R
        colorsArray[i + 1] = 0.8 + Math.random() * 0.2; // G
        colorsArray[i + 2] = 0.5 + Math.random() * 0.2; // B
      } else if (colorChoice > 0.55) {
        // Red tint stars
        colorsArray[i] = 1.0; // R
        colorsArray[i + 1] = 0.3 + Math.random() * 0.3; // G
        colorsArray[i + 2] = 0.3 + Math.random() * 0.3; // B
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
      size: 0.15,
      vertexColors: true,
      transparent: true,
      opacity: 0.9,
      sizeAttenuation: true,
    });

    const starField = new THREE.Points(starsGeometry, starsMaterial);
    scene.add(starField);
    
    // Create distant galaxies
    const createGalaxy = (x: number, y: number, z: number, size: number, color: THREE.Color) => {
      const galaxyGeometry = new THREE.BufferGeometry();
      const galaxyParticles = 1000;
      const galaxyPositions = new Float32Array(galaxyParticles * 3);
      
      for (let i = 0; i < galaxyParticles; i++) {
        const i3 = i * 3;
        const radius = Math.random() * size;
        const spinAngle = radius * 0.5;
        const branchAngle = (i % 3) * Math.PI * 2 / 3;
        
        const randomX = Math.pow(Math.random(), 3) * (Math.random() < 0.5 ? 1 : -1) * 0.5;
        const randomY = Math.pow(Math.random(), 3) * (Math.random() < 0.5 ? 1 : -1) * 0.5;
        const randomZ = Math.pow(Math.random(), 3) * (Math.random() < 0.5 ? 1 : -1) * 0.5;

        galaxyPositions[i3] = Math.cos(branchAngle + spinAngle) * radius + randomX;
        galaxyPositions[i3 + 1] = randomY * 0.5;
        galaxyPositions[i3 + 2] = Math.sin(branchAngle + spinAngle) * radius + randomZ;
      }
      
      galaxyGeometry.setAttribute('position', new THREE.BufferAttribute(galaxyPositions, 3));
      
      const galaxyMaterial = new THREE.PointsMaterial({
        size: 0.1,
        sizeAttenuation: true,
        color: color,
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending
      });
      
      const galaxy = new THREE.Points(galaxyGeometry, galaxyMaterial);
      galaxy.position.set(x, y, z);
      scene.add(galaxy);
      return galaxy;
    };
    
    // Add several distant galaxies
    const galaxies = [
      createGalaxy(-30, -10, -80, 4, new THREE.Color(0x9988ff)),
      createGalaxy(40, 20, -100, 5, new THREE.Color(0xff8866)),
      createGalaxy(-20, 40, -120, 6, new THREE.Color(0x88aaff)),
    ];

    // Nebula clouds (enhanced)
    const nebulaCount = 8; // Increased number of nebulae
    const nebulae: THREE.Mesh[] = [];

    for (let i = 0; i < nebulaCount; i++) {
      const size = 15 + Math.random() * 30;
      const geometry = new THREE.SphereGeometry(size, 32, 32);
      
      // Create nebula with more vibrant colors
      let nebulaColor;
      const colorType = Math.random();
      
      if (colorType > 0.7) {
        // Purple/blue nebula
        nebulaColor = new THREE.Color(
          0.3 + Math.random() * 0.2, 
          0.1 + Math.random() * 0.2, 
          0.5 + Math.random() * 0.4
        );
      } else if (colorType > 0.4) {
        // Teal/blue nebula
        nebulaColor = new THREE.Color(
          0.1 + Math.random() * 0.2, 
          0.3 + Math.random() * 0.3, 
          0.5 + Math.random() * 0.5
        );
      } else {
        // Red/orange nebula
        nebulaColor = new THREE.Color(
          0.5 + Math.random() * 0.5, 
          0.2 + Math.random() * 0.2, 
          0.1 + Math.random() * 0.2
        );
      }
      
      const material = new THREE.MeshBasicMaterial({
        color: nebulaColor,
        transparent: true,
        opacity: 0.04 + Math.random() * 0.05,
        side: THREE.DoubleSide,
      });
      
      const nebula = new THREE.Mesh(geometry, material);
      
      // Position nebulae in a more distributed manner
      nebula.position.set(
        (Math.random() - 0.5) * 150,
        (Math.random() - 0.5) * 150,
        -50 - Math.random() * 150
      );
      
      // Random rotation for more natural look
      nebula.rotation.x = Math.random() * Math.PI;
      nebula.rotation.y = Math.random() * Math.PI;
      nebula.rotation.z = Math.random() * Math.PI;
      
      scene.add(nebula);
      nebulae.push(nebula);
    }
    
    // Add a few distant stars with lens flares for visual interest
    const createDistantStar = (x: number, y: number, z: number, size: number, color: number) => {
      const starGeometry = new THREE.SphereGeometry(size, 16, 16);
      const starMaterial = new THREE.MeshBasicMaterial({ color: color });
      const star = new THREE.Mesh(starGeometry, starMaterial);
      star.position.set(x, y, z);
      
      // Add glow effect
      const glowGeometry = new THREE.SphereGeometry(size * 1.5, 16, 16);
      const glowMaterial = new THREE.MeshBasicMaterial({ 
        color: color, 
        transparent: true, 
        opacity: 0.4,
        blending: THREE.AdditiveBlending
      });
      const glow = new THREE.Mesh(glowGeometry, glowMaterial);
      star.add(glow);
      
      scene.add(star);
      return star;
    };
    
    // Create a few bright stars
    const brightStars = [
      createDistantStar(-50, 30, -200, 0.5, 0xffaa66),  // Orange
      createDistantStar(70, -40, -150, 0.7, 0x88aaff),  // Blue
      createDistantStar(-30, -60, -180, 0.4, 0xffffff),  // White
    ];

    // Enhanced mouse movement effect
    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;

    const handleMouseMove = (event: MouseEvent) => {
      targetMouseX = (event.clientX / window.innerWidth) * 2 - 1;
      targetMouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Parallax effect on scroll
    let scrollY = 0;
    const handleScroll = () => {
      scrollY = window.scrollY;
    };
    
    window.addEventListener('scroll', handleScroll);

    // Animation
    const animate = () => {
      requestAnimationFrame(animate);
      
      // Smooth mouse movement
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      // Rotate star field with smoother motion
      starField.rotation.x += 0.0001;
      starField.rotation.y += 0.0002;
      
      // Rotate galaxies slowly
      galaxies.forEach((galaxy, i) => {
        galaxy.rotation.y += 0.0004 + (i * 0.0001);
        galaxy.rotation.z += 0.0002 + (i * 0.0001);
      });

      // Make nebulae pulse and drift slightly
      nebulae.forEach((nebula, i) => {
        const t = Date.now() * 0.0001 + i;
        const scale = 1 + Math.sin(t) * 0.04;
        nebula.scale.set(scale, scale, scale);
        nebula.rotation.y += 0.0002 * (i % 3 === 0 ? 1 : -1);
        nebula.position.x += Math.sin(t * 0.5) * 0.01;
        nebula.position.y += Math.cos(t * 0.5) * 0.01;
      });
      
      // Make bright stars pulse
      brightStars.forEach((star, i) => {
        const t = Date.now() * 0.001 + i * 2;
        const pulseFactor = 0.9 + Math.sin(t) * 0.1;
        star.scale.set(pulseFactor, pulseFactor, pulseFactor);
      });

      // Camera slight movement based on mouse with scroll influence
      camera.position.x += (mouseX * 3 - camera.position.x) * 0.02;
      camera.position.y += (-mouseY * 3 - camera.position.y) * 0.02;
      camera.rotation.x = -mouseY * 0.2;
      camera.rotation.y = -mouseX * 0.2;
      
      // Slight parallax effect on scroll
      starField.position.y = scrollY * 0.003;
      
      // Make the scene respond slightly to device orientation if available
      window.addEventListener('deviceorientation', (event) => {
        if (event.beta && event.gamma) {
          const beta = event.beta / 90; // -1 to 1
          const gamma = event.gamma / 90; // -1 to 1
          camera.position.x += (gamma * 2 - camera.position.x) * 0.01;
          camera.position.y += (-beta * 2 - camera.position.y) * 0.01;
        }
      }, false);

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
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('deviceorientation', () => {}, false);
    };
  }, []);

  return <div ref={mountRef} className="fixed top-0 left-0 w-full h-full -z-10" />;
};

export default ThreeBackground;
