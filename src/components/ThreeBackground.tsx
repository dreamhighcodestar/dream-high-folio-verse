
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
    const starsCount = 7000; // Increased stars count for more density
    const posArray = new Float32Array(starsCount * 3);
    const colorsArray = new Float32Array(starsCount * 3);
    const sizeArray = new Float32Array(starsCount);

    for (let i = 0; i < starsCount * 3; i += 3) {
      // Position (improved sphere distribution)
      const radius = 50 + Math.random() * 200; // Increased distance variance
      const theta = Math.random() * Math.PI * 2; // Angle around y axis
      const phi = Math.acos(2 * Math.random() - 1); // Angle from y axis
      
      posArray[i] = radius * Math.sin(phi) * Math.cos(theta);
      posArray[i + 1] = radius * Math.sin(phi) * Math.sin(theta);
      posArray[i + 2] = radius * Math.cos(phi);
      
      // Star size variance - more dramatic size differences
      sizeArray[i/3] = Math.random() < 0.15 ? 0.3 + Math.random() * 0.4 : 0.05 + Math.random() * 0.15;
      
      // Enhanced star colors - more vibrant
      const colorChoice = Math.random();
      if (colorChoice > 0.85) {
        // Blue tint stars
        colorsArray[i] = 0.5 + Math.random() * 0.3; // R
        colorsArray[i + 1] = 0.7 + Math.random() * 0.3; // G
        colorsArray[i + 2] = 1.0; // B
      } else if (colorChoice > 0.7) {
        // Yellow tint stars
        colorsArray[i] = 1.0; // R
        colorsArray[i + 1] = 0.8 + Math.random() * 0.2; // G
        colorsArray[i + 2] = 0.4 + Math.random() * 0.3; // B
      } else if (colorChoice > 0.55) {
        // Red tint stars
        colorsArray[i] = 1.0; // R
        colorsArray[i + 1] = 0.2 + Math.random() * 0.3; // G
        colorsArray[i + 2] = 0.2 + Math.random() * 0.3; // B
      } else if (colorChoice > 0.4) {
        // Purple tint stars - new color
        colorsArray[i] = 0.7 + Math.random() * 0.3; // R
        colorsArray[i + 1] = 0.2 + Math.random() * 0.2; // G
        colorsArray[i + 2] = 0.8 + Math.random() * 0.2; // B
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
      size: 0.2, // Larger size for more pronounced stars
      vertexColors: true,
      transparent: true,
      opacity: 0.95,
      sizeAttenuation: true,
    });

    const starField = new THREE.Points(starsGeometry, starsMaterial);
    scene.add(starField);
    
    // Create distant galaxies - more and larger galaxies
    const createGalaxy = (x: number, y: number, z: number, size: number, color: THREE.Color) => {
      const galaxyGeometry = new THREE.BufferGeometry();
      const galaxyParticles = 2000; // More particles for denser galaxies
      const galaxyPositions = new Float32Array(galaxyParticles * 3);
      
      for (let i = 0; i < galaxyParticles; i++) {
        const i3 = i * 3;
        const radius = Math.random() * size;
        const spinAngle = radius * 0.8; // More spiral
        const branchAngle = (i % 4) * Math.PI * 2 / 4; // 4 spiral arms
        
        const randomX = Math.pow(Math.random(), 3) * (Math.random() < 0.5 ? 1 : -1) * 0.8;
        const randomY = Math.pow(Math.random(), 3) * (Math.random() < 0.5 ? 1 : -1) * 0.8;
        const randomZ = Math.pow(Math.random(), 3) * (Math.random() < 0.5 ? 1 : -1) * 0.8;

        galaxyPositions[i3] = Math.cos(branchAngle + spinAngle) * radius + randomX;
        galaxyPositions[i3 + 1] = randomY * 0.5;
        galaxyPositions[i3 + 2] = Math.sin(branchAngle + spinAngle) * radius + randomZ;
      }
      
      galaxyGeometry.setAttribute('position', new THREE.BufferAttribute(galaxyPositions, 3));
      
      const galaxyMaterial = new THREE.PointsMaterial({
        size: 0.15,
        sizeAttenuation: true,
        color: color,
        transparent: true,
        opacity: 0.9,
        blending: THREE.AdditiveBlending
      });
      
      const galaxy = new THREE.Points(galaxyGeometry, galaxyMaterial);
      galaxy.position.set(x, y, z);
      scene.add(galaxy);
      return galaxy;
    };
    
    // Add more distant galaxies for visual interest
    const galaxies = [
      createGalaxy(-30, -10, -80, 6, new THREE.Color(0x9988ff)),
      createGalaxy(40, 20, -100, 7, new THREE.Color(0xff8866)),
      createGalaxy(-20, 40, -120, 8, new THREE.Color(0x88aaff)),
      createGalaxy(60, -30, -90, 5, new THREE.Color(0xff66aa)), // New pink galaxy
      createGalaxy(-50, 25, -110, 7, new THREE.Color(0x66ffbb)), // New teal galaxy
    ];

    // Nebula clouds (enhanced brightness and size)
    const nebulaCount = 12; // More nebulae for a fuller space scene
    const nebulae: THREE.Mesh[] = [];

    for (let i = 0; i < nebulaCount; i++) {
      const size = 20 + Math.random() * 40; // Larger nebulae
      const geometry = new THREE.SphereGeometry(size, 32, 32);
      
      // Create nebula with more vibrant colors
      let nebulaColor;
      const colorType = Math.random();
      
      if (colorType > 0.7) {
        // Purple/blue nebula
        nebulaColor = new THREE.Color(
          0.4 + Math.random() * 0.2, 
          0.1 + Math.random() * 0.2, 
          0.6 + Math.random() * 0.4
        );
      } else if (colorType > 0.4) {
        // Teal/blue nebula
        nebulaColor = new THREE.Color(
          0.1 + Math.random() * 0.2, 
          0.4 + Math.random() * 0.3, 
          0.6 + Math.random() * 0.4
        );
      } else if (colorType > 0.2) {
        // Red/orange nebula
        nebulaColor = new THREE.Color(
          0.6 + Math.random() * 0.4, 
          0.2 + Math.random() * 0.2, 
          0.1 + Math.random() * 0.2
        );
      } else {
        // Green/teal nebula (new color)
        nebulaColor = new THREE.Color(
          0.1 + Math.random() * 0.2, 
          0.6 + Math.random() * 0.4, 
          0.3 + Math.random() * 0.3
        );
      }
      
      const material = new THREE.MeshBasicMaterial({
        color: nebulaColor,
        transparent: true,
        opacity: 0.05 + Math.random() * 0.08, // More visible nebulae
        side: THREE.DoubleSide,
      });
      
      const nebula = new THREE.Mesh(geometry, material);
      
      // Position nebulae in a more distributed manner
      nebula.position.set(
        (Math.random() - 0.5) * 200,
        (Math.random() - 0.5) * 200,
        -60 - Math.random() * 180
      );
      
      // Random rotation for more natural look
      nebula.rotation.x = Math.random() * Math.PI;
      nebula.rotation.y = Math.random() * Math.PI;
      nebula.rotation.z = Math.random() * Math.PI;
      
      scene.add(nebula);
      nebulae.push(nebula);
    }
    
    // Add distant stars with lens flares for visual interest
    const createDistantStar = (x: number, y: number, z: number, size: number, color: number) => {
      const starGeometry = new THREE.SphereGeometry(size, 16, 16);
      const starMaterial = new THREE.MeshBasicMaterial({ color: color });
      const star = new THREE.Mesh(starGeometry, starMaterial);
      star.position.set(x, y, z);
      
      // Add larger glow effect
      const glowGeometry = new THREE.SphereGeometry(size * 2.5, 16, 16);
      const glowMaterial = new THREE.MeshBasicMaterial({ 
        color: color, 
        transparent: true, 
        opacity: 0.5,
        blending: THREE.AdditiveBlending
      });
      const glow = new THREE.Mesh(glowGeometry, glowMaterial);
      star.add(glow);
      
      scene.add(star);
      return star;
    };
    
    // Create more bright stars
    const brightStars = [
      createDistantStar(-50, 30, -200, 0.8, 0xffaa66),  // Orange
      createDistantStar(70, -40, -150, 1.0, 0x88aaff),  // Blue
      createDistantStar(-30, -60, -180, 0.6, 0xffffff),  // White
      createDistantStar(40, 60, -220, 0.9, 0xff88ee),   // Pink
      createDistantStar(-70, -20, -160, 0.7, 0x88ffaa),  // Teal
    ];

    // Enhanced mouse movement effect with more sensitivity
    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;

    const handleMouseMove = (event: MouseEvent) => {
      targetMouseX = (event.clientX / window.innerWidth) * 2 - 1;
      targetMouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Parallax effect on scroll with increased effect
    let scrollY = 0;
    const handleScroll = () => {
      scrollY = window.scrollY;
    };
    
    window.addEventListener('scroll', handleScroll);

    // Add time-based autonomic movement even without mouse input
    let time = 0;

    // Animation
    const animate = () => {
      requestAnimationFrame(animate);
      
      time += 0.002; // Increment time for autonomous movement
      
      // Smooth mouse movement
      mouseX += (targetMouseX - mouseX) * 0.08; // Increased responsiveness
      mouseY += (targetMouseY - mouseY) * 0.08;

      // Add autonomous camera movement even without mouse input
      const autonomousX = Math.sin(time * 0.5) * 0.3;
      const autonomousY = Math.cos(time * 0.3) * 0.2;
      
      // Combine mouse and autonomous movement
      const combinedX = mouseX * 3 + autonomousX;
      const combinedY = mouseY * 3 + autonomousY;

      // Rotate star field with enhanced motion
      starField.rotation.x += 0.0003;
      starField.rotation.y += 0.0004;
      
      // Galaxies with more dynamic rotation
      galaxies.forEach((galaxy, i) => {
        galaxy.rotation.y += 0.0005 + (i * 0.0002);
        galaxy.rotation.z += 0.0003 + (i * 0.0001);
        
        // Add some autonomous movement to galaxies
        galaxy.position.x += Math.sin(time + i) * 0.02;
        galaxy.position.y += Math.cos(time * 0.7 + i) * 0.02;
      });

      // Make nebulae pulse and drift more dramatically
      nebulae.forEach((nebula, i) => {
        const t = time + i;
        const scale = 1 + Math.sin(t) * 0.06; // More pronounced pulsing
        nebula.scale.set(scale, scale, scale);
        nebula.rotation.y += 0.0003 * (i % 3 === 0 ? 1 : -1);
        nebula.position.x += Math.sin(t * 0.7) * 0.03; // More movement
        nebula.position.y += Math.cos(t * 0.5) * 0.03;
      });
      
      // Make bright stars pulse more dramatically
      brightStars.forEach((star, i) => {
        const t = time * 2 + i * 2;
        const pulseFactor = 0.85 + Math.sin(t) * 0.15; // More dramatic pulsing
        star.scale.set(pulseFactor, pulseFactor, pulseFactor);
        
        // Add subtle movement to stars
        star.position.x += Math.sin(t * 0.3) * 0.02;
        star.position.y += Math.cos(t * 0.4) * 0.02;
      });

      // Camera movement based on combined mouse position and autonomous movement
      camera.position.x += (combinedX - camera.position.x) * 0.03;
      camera.position.y += (-combinedY - camera.position.y) * 0.03;
      camera.rotation.x = -combinedY * 0.2;
      camera.rotation.y = -combinedX * 0.2;
      
      // Enhanced parallax effect on scroll
      starField.position.y = scrollY * 0.005;
      // Move other elements based on scroll for enhanced parallax
      nebulae.forEach((nebula, i) => {
        nebula.position.y += scrollY * 0.001 * (i % 3 === 0 ? 1 : -1);
      });
      
      // Make the scene respond to device orientation if available
      window.addEventListener('deviceorientation', (event) => {
        if (event.beta && event.gamma) {
          const beta = event.beta / 90; // -1 to 1
          const gamma = event.gamma / 90; // -1 to 1
          camera.position.x += (gamma * 3 - camera.position.x) * 0.02;
          camera.position.y += (-beta * 3 - camera.position.y) * 0.02;
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
