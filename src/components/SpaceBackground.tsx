
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

    // Create multiple star layers with different sizes and depths
    const createStarField = (count: number, size: number, maxDepth: number, colorIntensity: number) => {
      const geometry = new THREE.BufferGeometry();
      const positions = new Float32Array(count * 3);
      const colors = new Float32Array(count * 3);
      const sizes = new Float32Array(count);
      
      for (let i = 0; i < count; i++) {
        const i3 = i * 3;
        
        // Distribute stars in sphere for more realistic space feel
        const radius = Math.random() * maxDepth;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        
        positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
        positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
        positions[i3 + 2] = radius * Math.cos(phi);
        
        // Random size variation
        sizes[i] = size * (0.5 + Math.random());
        
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
      geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
      
      // Create point material with custom vertex colors and sizes
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
      createStarField(15000, 0.1, 200, 1.0),  // Distant small stars
      createStarField(8000, 0.15, 150, 1.2),  // Mid-distance stars
      createStarField(4000, 0.2, 100, 1.4),   // Closer stars
      createStarField(1500, 0.3, 50, 1.6)     // Very close bright stars
    ];
    
    // Create cosmic dust particles
    const createCosmicDust = (count: number, size: number, maxDepth: number) => {
      const geometry = new THREE.BufferGeometry();
      const positions = new Float32Array(count * 3);
      const colors = new Float32Array(count * 3);
      
      for (let i = 0; i < count; i++) {
        const i3 = i * 3;
        
        // More clustered distribution for dust effect
        const radius = (5 + Math.random() * Math.random() * maxDepth);
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        
        positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
        positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
        positions[i3 + 2] = radius * Math.cos(phi);
        
        // Dust colors - more subtle blues and purples
        const color = new THREE.Color();
        const hue = 0.6 + Math.random() * 0.2; // Blue to purple range
        const saturation = 0.2 + Math.random() * 0.3; // Not too saturated
        const lightness = 0.2 + Math.random() * 0.3; // Dim to medium brightness
        color.setHSL(hue, saturation, lightness);
        
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
        opacity: 0.5,
        depthWrite: false,
        blending: THREE.AdditiveBlending
      });
      
      const dust = new THREE.Points(geometry, material);
      scene.add(dust);
      return dust;
    };
    
    // Create cosmic dust layers
    const dustLayers = [
      createCosmicDust(20000, 0.06, 120),
      createCosmicDust(15000, 0.08, 100),
      createCosmicDust(10000, 0.1, 80)
    ];

    // Subtle autonomous movement variables
    let time = 0;
    
    // Animation loop with subtle movements
    const animate = () => {
      time += 0.0003; // Very slow movement
      
      // Subtle autonomous rotation of star layers
      starLayers.forEach((layer, i) => {
        const speedFactor = 0.05 - (i * 0.01);
        layer.rotation.x = time * speedFactor;
        layer.rotation.y = time * speedFactor * 1.2;
      });
      
      // Even slower movement for dust layers
      dustLayers.forEach((layer, i) => {
        const speedFactor = 0.02 - (i * 0.005);
        const amplitude = 0.1 + (i * 0.05);
        layer.rotation.x = time * speedFactor;
        layer.rotation.y = time * speedFactor * 0.8;
        
        // Add some subtle swirling effect to the dust
        layer.position.x = Math.sin(time * 0.2 + i) * amplitude;
        layer.position.y = Math.cos(time * 0.15 + i * 0.5) * amplitude;
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
      
      // Dispose geometries and materials
      scene.traverse((object) => {
        if (object instanceof THREE.Points) {
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
