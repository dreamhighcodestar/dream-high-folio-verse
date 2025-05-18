
import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { setupScene, handleWindowResize, disposeScene } from './three/SceneSetup';
import { createStarLayers, StarLayer } from './three/StarField';
import { createBrightStars } from './three/BrightStar';
import { createAnimationState, updateSpaceAnimation } from './three/SpaceAnimationSystem';

const ThreeBackground: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // Set up scene, camera, and renderer
    const { scene, camera, renderer } = setupScene(mountRef.current);
    
    // Create star layers
    const starLayers: StarLayer[] = createStarLayers();
    starLayers.forEach(layer => scene.add(layer.stars));
    
    // Create bright stars
    const brightStars = createBrightStars();
    brightStars.forEach(star => scene.add(star));
    
    // Animation state
    const animationState = createAnimationState();
    
    // Animation loop
    const animate = () => {
      updateSpaceAnimation(animationState, camera, starLayers, brightStars);
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };
    
    animate();
    
    // Handle window resize
    const resizeHandler = () => handleWindowResize(camera, renderer);
    window.addEventListener('resize', resizeHandler);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeHandler);
      disposeScene(scene, renderer, mountRef.current!);
    };
  }, []);

  return <div ref={mountRef} className="fixed top-0 left-0 w-full h-full -z-10" />;
};

export default ThreeBackground;
