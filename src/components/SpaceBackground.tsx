
import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

const SpaceBackground: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // Create scene
    const scene = new THREE.Scene();
    
    // Create camera with wider field of view for more immersive effect
    const camera = new THREE.PerspectiveCamera(85, window.innerWidth / window.innerHeight, 0.1, 2000);
    camera.position.z = 20;
    
    // Create renderer with better quality settings
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000510, 1);
    mountRef.current.appendChild(renderer.domElement);

    // Create multiple particle systems for layered stars
    const createStarLayer = (count: number, size: number, depth: number, colorIntensity: number) => {
      const geometry = new THREE.BufferGeometry();
      const positions = new Float32Array(count * 3);
      const colors = new Float32Array(count * 3);
      
      for (let i = 0; i < count; i++) {
        const i3 = i * 3;
        
        // Distribute stars in sphere for more realistic space feel
        const radius = depth * (0.5 + Math.random() * 0.5);
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        
        positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
        positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
        positions[i3 + 2] = radius * Math.cos(phi);
        
        // Create color variations
        const color = new THREE.Color();
        if (Math.random() > 0.8) {
          // Blue stars
          color.setRGB(0.7 + Math.random() * 0.3 * colorIntensity, 
                       0.8 + Math.random() * 0.2 * colorIntensity, 
                       1.0 * colorIntensity);
        } else if (Math.random() > 0.6) {
          // Yellow/orange stars
          color.setRGB(1.0 * colorIntensity, 
                       0.8 + Math.random() * 0.2 * colorIntensity, 
                       0.3 + Math.random() * 0.3 * colorIntensity);
        } else if (Math.random() > 0.4) {
          // Red stars
          color.setRGB(1.0 * colorIntensity, 
                       0.3 + Math.random() * 0.2 * colorIntensity, 
                       0.2 + Math.random() * 0.2 * colorIntensity);
        } else {
          // White stars
          const brightness = 0.7 + Math.random() * 0.3 * colorIntensity;
          color.setRGB(brightness, brightness, brightness);
        }
        
        colors[i3] = color.r;
        colors[i3 + 1] = color.g;
        colors[i3 + 2] = color.b;
      }
      
      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
      
      const material = new THREE.PointsMaterial({
        size: size,
        sizeAttenuation: true,
        vertexColors: true,
        transparent: true,
        opacity: 0.9,
        depthWrite: false,
        blending: THREE.AdditiveBlending
      });
      
      const stars = new THREE.Points(geometry, material);
      scene.add(stars);
      return stars;
    };
    
    // Create multiple star layers for parallax effect
    const starLayers = [
      createStarLayer(10000, 0.1, 200, 1.0),    // Distant small stars
      createStarLayer(5000, 0.2, 150, 1.2),     // Mid-distance stars
      createStarLayer(2000, 0.4, 100, 1.5),     // Closer, brighter stars
      createStarLayer(500, 0.6, 50, 1.8)        // Very close bright stars
    ];

    // Create glowing nebulas
    const createNebula = (size: number, color: THREE.Color, x: number, y: number, z: number) => {
      const geometry = new THREE.IcosahedronGeometry(size, 4);
      
      // Create custom shader material for glowing effect
      const material = new THREE.MeshBasicMaterial({
        color: color,
        transparent: true,
        opacity: 0.03,
        side: THREE.DoubleSide,
        blending: THREE.AdditiveBlending
      });
      
      const nebula = new THREE.Mesh(geometry, material);
      nebula.position.set(x, y, z);
      
      // Create multiple nested meshes for volumetric effect
      const nebulaGroup = new THREE.Group();
      nebulaGroup.add(nebula);
      
      for (let i = 0.8; i > 0.2; i -= 0.15) {
        const nebulaInner = new THREE.Mesh(
          new THREE.IcosahedronGeometry(size * i, 2),
          new THREE.MeshBasicMaterial({
            color: color,
            transparent: true,
            opacity: 0.06,
            side: THREE.DoubleSide,
            blending: THREE.AdditiveBlending
          })
        );
        
        // Offset slightly for more volumetric appearance
        nebulaInner.position.set(
          (Math.random() - 0.5) * size * 0.3,
          (Math.random() - 0.5) * size * 0.3,
          (Math.random() - 0.5) * size * 0.3
        );
        
        nebulaGroup.add(nebulaInner);
      }
      
      scene.add(nebulaGroup);
      return nebulaGroup;
    };
    
    // Create several nebulas with different colors and positions
    const nebulas = [
      createNebula(30, new THREE.Color(0.2, 0.1, 0.8), -80, 20, -150),  // Purple
      createNebula(50, new THREE.Color(0.8, 0.1, 0.2), 100, -50, -200), // Red
      createNebula(40, new THREE.Color(0.1, 0.5, 0.8), -20, -80, -180), // Blue
      createNebula(60, new THREE.Color(0.1, 0.7, 0.3), 70, 60, -250),   // Green
      createNebula(35, new THREE.Color(0.8, 0.5, 0.1), -120, -30, -220) // Orange
    ];
    
    // Create distant galaxies
    const createGalaxy = (size: number, color: THREE.Color, x: number, y: number, z: number) => {
      const particleCount = 5000;
      const geometry = new THREE.BufferGeometry();
      const positions = new Float32Array(particleCount * 3);
      
      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        const radius = Math.random() * size;
        const spinAngle = radius * 3; // Spiral factor
        const branchAngle = (i % 5) * Math.PI * 2 / 5; // 5 spiral arms
        
        // Add spiral shape with randomness
        positions[i3] = Math.cos(branchAngle + spinAngle) * radius + (Math.random() - 0.5) * (radius * 0.3);
        positions[i3 + 1] = (Math.random() - 0.5) * (radius * 0.15); // Thickness
        positions[i3 + 2] = Math.sin(branchAngle + spinAngle) * radius + (Math.random() - 0.5) * (radius * 0.3);
      }
      
      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      
      const material = new THREE.PointsMaterial({
        size: 0.2,
        color: color,
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending,
        sizeAttenuation: true
      });
      
      const galaxy = new THREE.Points(geometry, material);
      galaxy.position.set(x, y, z);
      scene.add(galaxy);
      return galaxy;
    };
    
    // Create several galaxies
    const galaxies = [
      createGalaxy(15, new THREE.Color(0.9, 0.8, 1.0), -120, 40, -350),
      createGalaxy(20, new THREE.Color(1.0, 0.8, 0.7), 150, -70, -400),
      createGalaxy(18, new THREE.Color(0.7, 0.9, 1.0), -60, -100, -320),
      createGalaxy(22, new THREE.Color(0.8, 1.0, 0.8), 100, 120, -450)
    ];
    
    // Create brighter stars with glow effect
    const createBrightStar = (size: number, color: THREE.Color, x: number, y: number, z: number) => {
      // Core star
      const starGeometry = new THREE.SphereGeometry(size, 16, 16);
      const starMaterial = new THREE.MeshBasicMaterial({
        color: color,
        transparent: true,
        opacity: 0.9
      });
      const star = new THREE.Mesh(starGeometry, starMaterial);
      
      // Create glow effect
      const glowSize = size * 8;
      const glowGeometry = new THREE.SphereGeometry(glowSize, 16, 16);
      const glowMaterial = new THREE.MeshBasicMaterial({
        color: color,
        transparent: true,
        opacity: 0.15,
        side: THREE.BackSide,
        blending: THREE.AdditiveBlending
      });
      const glow = new THREE.Mesh(glowGeometry, glowMaterial);
      
      // Create lens flare effect with sprites
      const flareTexture = new THREE.TextureLoader().load(
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABGdBTUEAALGPC/xhBQAAAAlwSFlzAAAOwgAADsIBFShKgAAAABh0RVh0U29mdHdhcmUAcGFpbnQubmV0IDQuMC41ZYUyZQAAAKtJREFUWEftlksKgDAMBXu03or36UZv4loPUwpZCEKbP8GFLuaxGJNK6VN9ZXN4+324bQ/jLlg/Ldi8B83BjUTgEoEzrp4UCVwi0BytSA0EnIkFU4FBG7BBPSvJ+4xtUwF+CvS5gU8QCPDz8wyBLh6olbvwEyCwLAn70IB2KcvawDsIBLx7GxoIBAJBLFADCSSQQAIJJJBAAgkkkEACCSSQQAIJJsz/jHKKlOoDFQjdYNzOZxYAAAAASUVORK5CYII='
      );
      
      const flareSpriteMaterial = new THREE.SpriteMaterial({
        map: flareTexture,
        color: color,
        transparent: true,
        blending: THREE.AdditiveBlending
      });
      
      const flare = new THREE.Sprite(flareSpriteMaterial);
      flare.scale.set(glowSize * 4, glowSize * 4, 1);
      
      // Group all elements
      const starGroup = new THREE.Group();
      starGroup.add(star);
      starGroup.add(glow);
      starGroup.add(flare);
      starGroup.position.set(x, y, z);
      scene.add(starGroup);
      
      return starGroup;
    };
    
    // Create bright stars
    const brightStars = [
      createBrightStar(0.5, new THREE.Color(1.0, 0.9, 0.6), -80, 40, -100),
      createBrightStar(0.8, new THREE.Color(0.6, 0.8, 1.0), 120, -50, -150),
      createBrightStar(0.6, new THREE.Color(1.0, 0.7, 0.7), -40, -70, -120),
      createBrightStar(0.7, new THREE.Color(0.7, 1.0, 0.8), 60, 80, -180),
      createBrightStar(0.5, new THREE.Color(0.9, 0.8, 1.0), -100, 30, -200),
      createBrightStar(0.4, new THREE.Color(1.0, 1.0, 0.9), 90, -60, -160),
    ];
    
    // Mouse movement and parallax effect - REDUCED INFLUENCE
    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;
    
    window.addEventListener('mousemove', (event) => {
      // Reduced mouse sensitivity by 50%
      targetMouseX = (event.clientX / window.innerWidth - 0.5);
      targetMouseY = (event.clientY / window.innerHeight - 0.5) * -1;
    });
    
    // Touch movement for mobile - REDUCED INFLUENCE
    window.addEventListener('touchmove', (event) => {
      if (event.touches.length > 0) {
        // Reduced touch sensitivity by 50%
        targetMouseX = (event.touches[0].clientX / window.innerWidth - 0.5);
        targetMouseY = (event.touches[0].clientY / window.innerHeight - 0.5) * -1;
      }
    });
    
    // Scroll effect for parallax
    let scrollY = 0;
    window.addEventListener('scroll', () => {
      scrollY = window.scrollY;
    });
    
    // Device orientation for mobile - REDUCED INFLUENCE
    window.addEventListener('deviceorientation', (event) => {
      if (event.beta && event.gamma) {
        // Reduced orientation sensitivity by 50%
        targetMouseX = (event.gamma / 90) * 0.75;
        targetMouseY = (event.beta / 90) * 0.75;
      }
    });
    
    // Animation loop with enhanced effects
    let time = 0;
    
    const animate = () => {
      time += 0.001; // Slowed down the autonomous time progression by 66%
      
      // Reduced mouse movement influence by making the easing slower
      mouseX += (targetMouseX - mouseX) * 0.02; // Reduced from 0.05
      mouseY += (targetMouseY - mouseY) * 0.02; // Reduced from 0.05
      
      // Autonomous movement - slowed down but increased in influence relative to mouse
      const autonomousX = Math.sin(time * 0.5) * 0.7; // Increased autonomous influence
      const autonomousY = Math.cos(time * 0.35) * 0.7; // Increased autonomous influence
      
      // Combined movement factors - mouse has less influence
      const moveX = (mouseX * 0.3) + autonomousX; // Mouse has 30% influence
      const moveY = (mouseY * 0.3) + autonomousY; // Mouse has 30% influence
      
      // Camera movement - more dramatic but smoother
      camera.position.x = moveX * 10;
      camera.position.y = moveY * 10;
      camera.lookAt(scene.position);
      
      // Rotate star layers at different speeds for parallax - SLOWED DOWN
      starLayers.forEach((layer, i) => {
        const speedFactor = 0.4 - (i * 0.08); // Slowed down by 60%
        layer.rotation.x = time * 0.04 * speedFactor; // Reduced from 0.1
        layer.rotation.y = time * 0.06 * speedFactor; // Reduced from 0.15
        
        // Parallax effect on mouse move - REDUCED
        layer.position.x = -moveX * (10 + i * 15); // Reduced from 20+i*30
        layer.position.y = -moveY * (10 + i * 15); // Reduced from 20+i*30
        
        // Scroll parallax - KEPT THE SAME
        layer.position.y -= scrollY * 0.01 * (i + 1);
      });
      
      // Animate nebulas - pulsate and rotate - SLOWED DOWN
      nebulas.forEach((nebula, i) => {
        const t = time * 0.5 + i; // Slowed down
        // Scale pulsation - reduced range
        const scaleFactor = 1 + Math.sin(t * 0.25) * 0.05; // Reduced from t*0.5 and *0.1
        nebula.scale.set(scaleFactor, scaleFactor, scaleFactor);
        
        // Slow rotation - SLOWED FURTHER
        nebula.rotation.x = t * 0.02; // Reduced from 0.05
        nebula.rotation.y = t * 0.03; // Reduced from 0.08
        nebula.rotation.z = t * 0.01; // Reduced from 0.03
        
        // Subtle position changes - KEPT SUBTLE
        nebula.position.x += Math.sin(t * 0.15) * 0.05; // Reduced from t*0.3 and *0.1
        nebula.position.y += Math.cos(t * 0.1) * 0.05; // Reduced from t*0.2 and *0.1
        
        // Parallax on mouse move - REDUCED
        nebula.position.x -= moveX * 15; // Reduced from 30
        nebula.position.y -= moveY * 15; // Reduced from 30
      });
      
      // Animate galaxies - rotate and move - SLOWED DOWN
      galaxies.forEach((galaxy, i) => {
        galaxy.rotation.x = time * 0.01; // Reduced from 0.02
        galaxy.rotation.y = time * 0.015; // Reduced from 0.03
        galaxy.rotation.z = time * 0.005; // Reduced from 0.01
        
        // Parallax on mouse move - REDUCED
        galaxy.position.x -= moveX * 5; // Reduced from 10
        galaxy.position.y -= moveY * 5; // Reduced from 10
      });
      
      // Animate bright stars - pulse the glow - SLOWED DOWN
      brightStars.forEach((star, i) => {
        const t = time + i; // Slowed down from time*2
        const pulseFactor = 0.8 + Math.sin(t * 0.5) * 0.2; // Reduced speed from t
        
        // Apply pulse to glow (child 1) and flare (child 2)
        if (star.children[1]) star.children[1].scale.set(pulseFactor, pulseFactor, pulseFactor);
        if (star.children[2]) star.children[2].scale.set(
          20 * pulseFactor, 
          20 * pulseFactor, 
          1
        );
        
        // Parallax effect - REDUCED
        star.position.x -= moveX * 10; // Reduced from 20
        star.position.y -= moveY * 10; // Reduced from 20
      });
      
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };
    
    animate();
    
    // Handle window resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };
    
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => {
      if (mountRef.current?.contains(renderer.domElement)) {
        mountRef.current.removeChild(renderer.domElement);
      }
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', () => {});
      window.removeEventListener('touchmove', () => {});
      window.removeEventListener('scroll', () => {});
      window.removeEventListener('deviceorientation', () => {}, false);
      
      // Dispose geometries and materials
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          object.geometry.dispose();
          if (object.material instanceof THREE.Material) {
            object.material.dispose();
          } else if (Array.isArray(object.material)) {
            object.material.forEach(material => material.dispose());
          }
        }
      });
    };
  }, []);

  return <div ref={mountRef} className="fixed top-0 left-0 w-full h-full -z-10" />;
};

export default SpaceBackground;
