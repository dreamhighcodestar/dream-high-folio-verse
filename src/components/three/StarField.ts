
import * as THREE from 'three';

export interface StarLayer {
  stars: THREE.Points;
  speedFactor: number;
}

// Creates multiple star layers with different sizes and depths
export const createStarField = (count: number, size: number, maxDepth: number, colorIntensity: number): THREE.Points => {
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
  
  return new THREE.Points(geometry, material);
};

export const createStarLayers = (): StarLayer[] => {
  return [
    { stars: createStarField(12000, 0.1, 200, 1.0), speedFactor: 0.1 },  // Distant small stars
    { stars: createStarField(6000, 0.15, 150, 1.2), speedFactor: 0.08 },  // Mid-distance stars
    { stars: createStarField(3000, 0.2, 100, 1.4), speedFactor: 0.06 },   // Closer stars
    { stars: createStarField(1000, 0.3, 50, 1.6), speedFactor: 0.04 }     // Very close bright stars
  ];
};
