
import * as THREE from 'three';
import { StarLayer } from './StarField';

export interface SpaceAnimationState {
  time: number;
}

export const createAnimationState = (): SpaceAnimationState => ({
  time: 0
});

export const updateSpaceAnimation = (
  animationState: SpaceAnimationState,
  camera: THREE.PerspectiveCamera,
  starLayers: StarLayer[],
  brightStars: THREE.Points[]
): void => {
  // Increment time for autonomous movement
  animationState.time += 0.0005; // Slower time increment for gentler movement
  
  // Very subtle autonomous camera movement for 3D effect
  const autonomousX = Math.sin(animationState.time * 0.2) * 0.1;
  const autonomousY = Math.cos(animationState.time * 0.15) * 0.05;
  
  // Apply only autonomous movement to camera - independent of mouse
  camera.position.x += (autonomousX - camera.position.x) * 0.01;
  camera.position.y += (autonomousY - camera.position.y) * 0.01;
  
  // Very subtle camera rotation for enhanced 3D feel
  camera.rotation.x = Math.sin(animationState.time * 0.1) * 0.015;
  camera.rotation.y = Math.sin(animationState.time * 0.13) * 0.01;

  // Rotate star systems slowly and independently
  starLayers.forEach(layer => {
    // Each layer rotates at a different pace
    layer.stars.rotation.x += 0.00005 * layer.speedFactor * 10;
    layer.stars.rotation.y += 0.00007 * layer.speedFactor * 10;
    
    // Add some gentle waviness to the star field
    const waveX = Math.sin(animationState.time * (0.05 + layer.speedFactor * 0.2)) * 0.05;
    const waveY = Math.cos(animationState.time * (0.04 + layer.speedFactor * 0.2)) * 0.03;
    
    layer.stars.position.x = waveX;
    layer.stars.position.y = waveY;
  });
  
  // Subtle pulsing for bright stars
  brightStars.forEach((star, i) => {
    const pulseFactor = 0.9 + Math.sin(animationState.time * 10 + i) * 0.1;
    if (star.material instanceof THREE.PointsMaterial) {
      star.material.size = star.material.size * 0.99 + star.material.size * 0.01 * pulseFactor;
    }
  });
};
