
import * as THREE from 'three';

// Creates bright points for larger stars with subtle glow
export const createBrightStar = (x: number, y: number, z: number, size: number, color: THREE.Color): THREE.Points => {
  // Core star point
  const geometry = new THREE.BufferGeometry();
  const positions = new Float32Array(3);
  positions[0] = x;
  positions[1] = y;
  positions[2] = z;
  
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  
  const material = new THREE.PointsMaterial({
    size: size,
    color: color,
    transparent: true,
    opacity: 0.9,
    sizeAttenuation: true,
    blending: THREE.AdditiveBlending
  });
  
  return new THREE.Points(geometry, material);
};

export const createBrightStars = (): THREE.Points[] => {
  const brightStars: THREE.Points[] = [];
  
  for (let i = 0; i < 50; i++) {
    const radius = 20 + Math.random() * 150;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    
    const x = radius * Math.sin(phi) * Math.cos(theta);
    const y = radius * Math.sin(phi) * Math.sin(theta);
    const z = radius * Math.cos(phi);
    
    const size = 0.5 + Math.random() * 0.5;
    
    // Create color with slight variations
    let color;
    if (Math.random() > 0.7) {
      // Blue-ish
      color = new THREE.Color(0.8, 0.9, 1.0);
    } else if (Math.random() > 0.4) {
      // Yellow-ish
      color = new THREE.Color(1.0, 0.9, 0.7);
    } else {
      // White
      color = new THREE.Color(1.0, 1.0, 1.0);
    }
    
    const star = createBrightStar(x, y, z, size, color);
    brightStars.push(star);
  }
  
  return brightStars;
};
