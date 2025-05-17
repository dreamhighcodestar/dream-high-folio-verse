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

    // Create diverse particle shapes instead of just squares
    const createRandomParticles = () => {
      const starsGeometry = new THREE.BufferGeometry();
      const starsCount = 7000;
      const posArray = new Float32Array(starsCount * 3);
      const colorsArray = new Float32Array(starsCount * 3);
      const sizeArray = new Float32Array(starsCount);
      const opacityArray = new Float32Array(starsCount);
      const shapeArray = new Float32Array(starsCount); // For different shapes

      for (let i = 0; i < starsCount * 3; i += 3) {
        // Position (improved sphere distribution)
        const radius = 50 + Math.random() * 200;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        
        posArray[i] = radius * Math.sin(phi) * Math.cos(theta);
        posArray[i + 1] = radius * Math.sin(phi) * Math.sin(theta);
        posArray[i + 2] = radius * Math.cos(phi);
        
        // Star size variance - more dramatic size differences
        sizeArray[i/3] = Math.random() < 0.15 ? 0.3 + Math.random() * 0.4 : 0.05 + Math.random() * 0.15;
        
        // Random opacity for twinkling effect
        opacityArray[i/3] = 0.7 + Math.random() * 0.3;
        
        // Shape type (0-3 for different shapes)
        shapeArray[i/3] = Math.floor(Math.random() * 4);
        
        // Enhanced star colors - more vibrant
        const colorChoice = Math.random();
        if (colorChoice > 0.85) {
          // Blue tint stars
          colorsArray[i] = 0.5 + Math.random() * 0.3;
          colorsArray[i + 1] = 0.7 + Math.random() * 0.3;
          colorsArray[i + 2] = 1.0;
        } else if (colorChoice > 0.7) {
          // Yellow tint stars
          colorsArray[i] = 1.0;
          colorsArray[i + 1] = 0.8 + Math.random() * 0.2;
          colorsArray[i + 2] = 0.4 + Math.random() * 0.3;
        } else if (colorChoice > 0.55) {
          // Red tint stars
          colorsArray[i] = 1.0;
          colorsArray[i + 1] = 0.2 + Math.random() * 0.3;
          colorsArray[i + 2] = 0.2 + Math.random() * 0.3;
        } else if (colorChoice > 0.4) {
          // Purple tint stars
          colorsArray[i] = 0.7 + Math.random() * 0.3;
          colorsArray[i + 1] = 0.2 + Math.random() * 0.2;
          colorsArray[i + 2] = 0.8 + Math.random() * 0.2;
        } else {
          // White/blue stars
          const bright = 0.8 + Math.random() * 0.2;
          colorsArray[i] = bright;
          colorsArray[i + 1] = bright;
          colorsArray[i + 2] = bright + Math.random() * 0.2;
        }
      }

      starsGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
      starsGeometry.setAttribute('color', new THREE.BufferAttribute(colorsArray, 3));
      
      return { geometry: starsGeometry, sizes: sizeArray, shapes: shapeArray, opacity: opacityArray };
    };

    // Create different particle groups with varied shapes
    const createShapedParticles = () => {
      const { geometry, sizes, shapes, opacity } = createRandomParticles();
      
      // Create different texture shapes for particles
      const createCircleTexture = () => {
        const canvas = document.createElement('canvas');
        canvas.width = 32;
        canvas.height = 32;
        const ctx = canvas.getContext('2d');
        if (!ctx) return null;
        
        ctx.beginPath();
        ctx.arc(16, 16, 14, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fillStyle = 'white';
        ctx.fill();
        
        const texture = new THREE.CanvasTexture(canvas);
        texture.needsUpdate = true;
        return texture;
      };
      
      const createTriangleTexture = () => {
        const canvas = document.createElement('canvas');
        canvas.width = 32;
        canvas.height = 32;
        const ctx = canvas.getContext('2d');
        if (!ctx) return null;
        
        ctx.beginPath();
        ctx.moveTo(16, 2);
        ctx.lineTo(30, 28);
        ctx.lineTo(2, 28);
        ctx.closePath();
        ctx.fillStyle = 'white';
        ctx.fill();
        
        const texture = new THREE.CanvasTexture(canvas);
        texture.needsUpdate = true;
        return texture;
      };
      
      const createStarTexture = () => {
        const canvas = document.createElement('canvas');
        canvas.width = 32;
        canvas.height = 32;
        const ctx = canvas.getContext('2d');
        if (!ctx) return null;
        
        ctx.beginPath();
        const spikes = 5;
        const outerRadius = 14;
        const innerRadius = 6;
        
        let rot = Math.PI / 2 * 3;
        let x = 16;
        let y = 16;
        let step = Math.PI / spikes;
        
        ctx.moveTo(x, y - outerRadius);
        for (let i = 0; i < spikes; i++) {
          x = 16 + Math.cos(rot) * outerRadius;
          y = 16 + Math.sin(rot) * outerRadius;
          ctx.lineTo(x, y);
          rot += step;
          
          x = 16 + Math.cos(rot) * innerRadius;
          y = 16 + Math.sin(rot) * innerRadius;
          ctx.lineTo(x, y);
          rot += step;
        }
        ctx.lineTo(16, 16 - outerRadius);
        ctx.closePath();
        ctx.fillStyle = 'white';
        ctx.fill();
        
        const texture = new THREE.CanvasTexture(canvas);
        texture.needsUpdate = true;
        return texture;
      };
      
      const createDiamondTexture = () => {
        const canvas = document.createElement('canvas');
        canvas.width = 32;
        canvas.height = 32;
        const ctx = canvas.getContext('2d');
        if (!ctx) return null;
        
        ctx.beginPath();
        ctx.moveTo(16, 2);  // Top
        ctx.lineTo(30, 16); // Right
        ctx.lineTo(16, 30); // Bottom
        ctx.lineTo(2, 16);  // Left
        ctx.closePath();
        ctx.fillStyle = 'white';
        ctx.fill();
        
        const texture = new THREE.CanvasTexture(canvas);
        texture.needsUpdate = true;
        return texture;
      };
      
      // Create the particle textures
      const circleTexture = createCircleTexture();
      const triangleTexture = createTriangleTexture();
      const starTexture = createStarTexture();
      const diamondTexture = createDiamondTexture();
      
      if (!circleTexture || !triangleTexture || !starTexture || !diamondTexture) return null;
      
      const textures = [circleTexture, triangleTexture, starTexture, diamondTexture];
      
      // Create separate particle systems for each shape type
      const particleSystems = [];
      
      for (let shapeType = 0; shapeType < 4; shapeType++) {
        const shapeIndices = Array.from({ length: shapes.length })
          .map((_, i) => i)
          .filter(i => shapes[i] === shapeType);
          
        if (shapeIndices.length === 0) continue;
        
        const shapeGeometry = new THREE.BufferGeometry();
        const positions = new Float32Array(shapeIndices.length * 3);
        const colors = new Float32Array(shapeIndices.length * 3);
        
        shapeIndices.forEach((originalIndex, newIndex) => {
          // Copy position
          const origPosIndex = originalIndex * 3;
          const newPosIndex = newIndex * 3;
          positions[newPosIndex] = geometry.attributes.position.array[origPosIndex];
          positions[newPosIndex + 1] = geometry.attributes.position.array[origPosIndex + 1];
          positions[newPosIndex + 2] = geometry.attributes.position.array[origPosIndex + 2];
          
          // Copy color
          const origColorIndex = originalIndex * 3;
          const newColorIndex = newIndex * 3;
          colors[newColorIndex] = geometry.attributes.color.array[origColorIndex];
          colors[newColorIndex + 1] = geometry.attributes.color.array[origColorIndex + 1];
          colors[newColorIndex + 2] = geometry.attributes.color.array[origColorIndex + 2];
        });
        
        shapeGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        shapeGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
        
        const material = new THREE.PointsMaterial({
          size: 0.2,
          map: textures[shapeType],
          vertexColors: true,
          transparent: true,
          opacity: 0.95,
          sizeAttenuation: true,
          depthWrite: false,
        });
        
        const particles = new THREE.Points(shapeGeometry, material);
        scene.add(particles);
        particleSystems.push(particles);
      }
      
      return particleSystems;
    };
    
    const starSystems = createShapedParticles();
    
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

    // Mouse movement effect with more sensitivity
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

      // Rotate star systems
      if (starSystems) {
        starSystems.forEach((system, i) => {
          if (system) {
            system.rotation.x += 0.0001 * (i + 1);
            system.rotation.y += 0.0002 * (i + 1);
          }
        });
      }
      
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
      starSystems && starSystems.forEach(system => {
        system.position.y = scrollY * 0.005;
      });
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
