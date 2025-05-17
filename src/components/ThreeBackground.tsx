
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { createShapedParticles } from './three/ShapedParticles';
import { createGalaxy } from './three/Galaxy';
import { createNebulae } from './three/Nebula';
import { createBrightStars } from './three/DistantStar';
import { 
  createAnimationState, 
  setupEventListeners, 
  updateAnimation, 
  AnimationState 
} from './three/AnimationSystem';

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

    // Create shaped particles (stars)
    const starSystems = createShapedParticles();
    if (starSystems) {
      starSystems.forEach(system => scene.add(system));
    }
    
    // Create distant galaxies
    const galaxies = [
      createGalaxy(-30, -10, -80, 6, new THREE.Color(0x9988ff)),
      createGalaxy(40, 20, -100, 7, new THREE.Color(0xff8866)),
      createGalaxy(-20, 40, -120, 8, new THREE.Color(0x88aaff)),
      createGalaxy(60, -30, -90, 5, new THREE.Color(0xff66aa)),
      createGalaxy(-50, 25, -110, 7, new THREE.Color(0x66ffbb)),
    ];
    galaxies.forEach(galaxy => scene.add(galaxy));

    // Create nebula clouds
    const nebulaCount = 12;
    const nebulae = createNebulae(nebulaCount);
    nebulae.forEach(nebula => scene.add(nebula));

    // Create distant bright stars
    const brightStars = createBrightStars();
    brightStars.forEach(star => scene.add(star));

    // Setup animation state and event listeners
    const animationState: AnimationState = createAnimationState();
    
    // Handle window resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    // Setup event listeners
    const cleanup = setupEventListeners(animationState, handleResize);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      
      // Update all animations
      updateAnimation(animationState, camera, starSystems, galaxies, nebulae, brightStars);
      
      // Render scene
      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      cleanup();
      if (mountRef.current?.contains(renderer.domElement)) {
        mountRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={mountRef} className="fixed top-0 left-0 w-full h-full -z-10" />;
};

export default ThreeBackground;
