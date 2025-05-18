
import * as THREE from 'three';

export interface SceneSetup {
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  renderer: THREE.WebGLRenderer;
}

export const setupScene = (container: HTMLDivElement): SceneSetup => {
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
  container.appendChild(renderer.domElement);
  
  return { scene, camera, renderer };
};

export const handleWindowResize = (camera: THREE.PerspectiveCamera, renderer: THREE.WebGLRenderer): void => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
};

export const disposeScene = (scene: THREE.Scene, renderer: THREE.WebGLRenderer, container: HTMLDivElement): void => {
  if (container.contains(renderer.domElement)) {
    container.removeChild(renderer.domElement);
  }
  
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
