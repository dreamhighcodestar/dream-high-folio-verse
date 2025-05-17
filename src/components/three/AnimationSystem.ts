
import * as THREE from 'three';

export interface AnimationState {
  time: number;
  mouseX: number;
  mouseY: number;
  targetMouseX: number;
  targetMouseY: number;
  scrollY: number;
}

export const createAnimationState = (): AnimationState => ({
  time: 0,
  mouseX: 0,
  mouseY: 0,
  targetMouseX: 0,
  targetMouseY: 0,
  scrollY: 0
});

export const setupEventListeners = (
  animationState: AnimationState,
  handleResize: () => void
): (() => void) => {
  const handleMouseMove = (event: MouseEvent): void => {
    animationState.targetMouseX = (event.clientX / window.innerWidth) * 2 - 1;
    animationState.targetMouseY = -(event.clientY / window.innerHeight) * 2 + 1;
  };

  const handleScroll = (): void => {
    animationState.scrollY = window.scrollY;
  };

  window.addEventListener('mousemove', handleMouseMove);
  window.addEventListener('scroll', handleScroll);
  window.addEventListener('resize', handleResize);

  // Handle device orientation if available
  window.addEventListener('deviceorientation', (event) => {
    if (event.beta && event.gamma) {
      const beta = event.beta / 90; // -1 to 1
      const gamma = event.gamma / 90; // -1 to 1
      animationState.targetMouseX = gamma;
      animationState.targetMouseY = -beta;
    }
  }, false);

  // Return cleanup function
  return () => {
    window.removeEventListener('mousemove', handleMouseMove);
    window.removeEventListener('scroll', handleScroll);
    window.removeEventListener('resize', handleResize);
    window.removeEventListener('deviceorientation', () => {}, false);
  };
};

export const updateAnimation = (
  animationState: AnimationState,
  camera: THREE.PerspectiveCamera,
  starSystems: THREE.Points[] | null,
  galaxies: THREE.Points[],
  nebulae: THREE.Mesh[],
  brightStars: THREE.Mesh[]
): void => {
  // Increment time for autonomous movement
  animationState.time += 0.002;
  
  // Smooth mouse movement
  animationState.mouseX += (animationState.targetMouseX - animationState.mouseX) * 0.08;
  animationState.mouseY += (animationState.targetMouseY - animationState.mouseY) * 0.08;

  // Add autonomous camera movement even without mouse input
  const autonomousX = Math.sin(animationState.time * 0.5) * 0.3;
  const autonomousY = Math.cos(animationState.time * 0.3) * 0.2;
  
  // Combine mouse and autonomous movement
  const combinedX = animationState.mouseX * 3 + autonomousX;
  const combinedY = animationState.mouseY * 3 + autonomousY;

  // Rotate star systems
  if (starSystems) {
    starSystems.forEach((system, i) => {
      system.rotation.x += 0.0001 * (i + 1);
      system.rotation.y += 0.0002 * (i + 1);
    });
  }
  
  // Galaxies with more dynamic rotation
  galaxies.forEach((galaxy, i) => {
    galaxy.rotation.y += 0.0005 + (i * 0.0002);
    galaxy.rotation.z += 0.0003 + (i * 0.0001);
    
    // Add some autonomous movement to galaxies
    galaxy.position.x += Math.sin(animationState.time + i) * 0.02;
    galaxy.position.y += Math.cos(animationState.time * 0.7 + i) * 0.02;
  });

  // Make nebulae pulse and drift more dramatically
  nebulae.forEach((nebula, i) => {
    const t = animationState.time + i;
    const scale = 1 + Math.sin(t) * 0.06; // More pronounced pulsing
    nebula.scale.set(scale, scale, scale);
    nebula.rotation.y += 0.0003 * (i % 3 === 0 ? 1 : -1);
    nebula.position.x += Math.sin(t * 0.7) * 0.03; // More movement
    nebula.position.y += Math.cos(t * 0.5) * 0.03;
  });
  
  // Make bright stars pulse more dramatically
  brightStars.forEach((star, i) => {
    const t = animationState.time * 2 + i * 2;
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
  starSystems && starSystems.forEach(system => {
    system.position.y = animationState.scrollY * 0.005;
  });
  nebulae.forEach((nebula, i) => {
    nebula.position.y += animationState.scrollY * 0.001 * (i % 3 === 0 ? 1 : -1);
  });
};
