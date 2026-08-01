"use client";

import { useEffect, useRef } from "react";
import { MotionValue } from "framer-motion";

interface NeuralSphereProps {
  scrollYProgress?: MotionValue<number>;
}

export default function NeuralSphere({ scrollYProgress }: NeuralSphereProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // Ref to hold the current scroll value so the animation loop can read it synchronously
  const scrollRef = useRef(0);

  useEffect(() => {
    if (scrollYProgress) {
      const unsubscribe = scrollYProgress.on("change", (latest) => {
        scrollRef.current = latest;
      });
      return () => unsubscribe();
    }
  }, [scrollYProgress]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let rotation = 0;

    const NODE_COUNT = 80;
    const MAX_CONNECTION_DISTANCE = 80;

    const nodes: { x: number; y: number; z: number }[] = [];

    // Distribute nodes evenly using Fibonacci sphere on a normalized unit sphere (radius 1)
    const phi = Math.PI * (3 - Math.sqrt(5)); // golden angle
    for (let i = 0; i < NODE_COUNT; i++) {
      const y = 1 - (i / (NODE_COUNT - 1)) * 2; 
      const radiusAtY = Math.sqrt(1 - y * y); 
      const theta = phi * i; 

      const x = Math.cos(theta) * radiusAtY;
      const z = Math.sin(theta) * radiusAtY;

      nodes.push({ x, y, z });
    }

    const render = () => {
      // Use offsetWidth so the canvas pixel resolution matches screen resolution
      const width = canvas.offsetWidth;
      const height = canvas.offsetHeight;
      
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
      }

      ctx.clearRect(0, 0, width, height);

      rotation += 0.005;

      const centerX = width / 2;
      const centerY = height / 2;

      // Scroll-driven math
      const scroll = scrollRef.current;
      
      // Responsive dynamic base radius calculation
      const screenMin = Math.min(width, height);
      const isMobile = width < 768;
      const baseRadius = isMobile ? screenMin * 0.3 : 120;
      const maxExtraRadius = isMobile ? screenMin * 0.8 : 480;
      
      let currentRadius = baseRadius;
      
      // Sync radius expansion with page.tsx scroll breakpoints
      if (scroll > 0.3 && scroll <= 0.55) {
        // Expanding phase
        const progress = (scroll - 0.3) / 0.25; 
        currentRadius = baseRadius + (progress * maxExtraRadius);
      } else if (scroll > 0.55 && scroll <= 0.9) {
        // Fully expanded
        currentRadius = baseRadius + maxExtraRadius;
      } else if (scroll > 0.9) {
        // Collapsing phase (symmetrical to expansion)
        const progress = Math.min(1, (scroll - 0.9) / 0.1);
        currentRadius = (baseRadius + maxExtraRadius) - (progress * maxExtraRadius);
      }

      // Camera Z distance (how far the "eye" is from the center of the sphere)
      const CAMERA_Z = 300; 

      const totalRotation = rotation + scroll * Math.PI * 4;

      const projectedNodes = nodes.map((node) => {
        // Apply radius to unit sphere coordinates
        const nx = node.x * currentRadius;
        const ny = node.y * currentRadius;
        const nz = node.z * currentRadius;

        // Rotate around Y axis
        const rotX = nx * Math.cos(totalRotation) - nz * Math.sin(totalRotation);
        const rotZ = nz * Math.cos(totalRotation) + nx * Math.sin(totalRotation);
        
        // Tilt slightly around X axis
        const tilt = 0.2;
        const finalY = ny * Math.cos(tilt) - rotZ * Math.sin(tilt);
        const finalZ = rotZ * Math.cos(tilt) + ny * Math.sin(tilt);

        // Perspective projection: scale = focal_length / (focal_length + Z)
        // If finalZ approaches -CAMERA_Z, scale goes to infinity (we pass through it)
        const depth = CAMERA_Z + finalZ;
        
        // If depth <= 0, the node is behind the camera! We should clip it.
        if (depth <= 10) {
          return { x: 0, y: 0, z: finalZ, scale: 0, visible: false, original: {x: nx, y: ny, z: nz} };
        }

        const scale = CAMERA_Z / depth;
        
        return {
          x: centerX + rotX * scale,
          y: centerY + finalY * scale,
          z: finalZ,
          scale,
          visible: true,
          original: {x: nx, y: ny, z: nz}
        };
      });

      // Filter visible nodes
      const visibleNodes = projectedNodes.filter(n => n.visible);

      // Sort by Z to render back-to-front
      visibleNodes.sort((a, b) => b.z - a.z);

      // Draw connections
      ctx.lineWidth = 1.5;
      for (let i = 0; i < visibleNodes.length; i++) {
        for (let j = i + 1; j < visibleNodes.length; j++) {
          const dx = visibleNodes[i].original.x - visibleNodes[j].original.x;
          const dy = visibleNodes[i].original.y - visibleNodes[j].original.y;
          const dz = visibleNodes[i].original.z - visibleNodes[j].original.z;
          // Calculate distance in 3D space based on current radius
          const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);
          
          // Max connection distance scales with the current radius so it doesn't break when huge
          const dynamicMaxDist = MAX_CONNECTION_DISTANCE * (currentRadius / 120);

          if (distance < dynamicMaxDist) {
            const opacity = (1 - distance / dynamicMaxDist) * 0.8;
            // Nodes close to camera (z ~ -300) are highly visible, far nodes fade out
            const zOpacity = Math.max(0, Math.min(1, (currentRadius + CAMERA_Z - visibleNodes[i].z) / (currentRadius * 2)));
            
            ctx.beginPath();
            ctx.moveTo(visibleNodes[i].x, visibleNodes[i].y);
            ctx.lineTo(visibleNodes[j].x, visibleNodes[j].y);
            ctx.strokeStyle = `rgba(39, 230, 210, ${opacity * zOpacity})`;
            ctx.stroke();
          }
        }
      }

      // Draw nodes
      visibleNodes.forEach((node) => {
        // Prevent huge nodes when very close to camera
        const radius = Math.min(20, Math.max(1, 4 * node.scale));
        
        // Z-based opacity
        const opacity = Math.max(0, Math.min(1, (currentRadius + CAMERA_Z - node.z) / (currentRadius * 2)));

        // Subtle premium smooth radial gradient glow
        const glowRadius = radius * 2.5;
        const gradient = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, glowRadius);
        gradient.addColorStop(0, `rgba(255, 255, 255, ${opacity * 0.9})`); // Softer white core
        gradient.addColorStop(0.3, `rgba(39, 230, 210, ${opacity * 0.4})`); // Subtle teal ring
        gradient.addColorStop(1, `rgba(39, 230, 210, 0)`);                  // Smooth fade to transparent

        ctx.beginPath();
        ctx.arc(node.x, node.y, glowRadius, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  return (
    <div className="relative h-full w-full flex items-center justify-center">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full mix-blend-screen"
        style={{ pointerEvents: "none" }}
      />
    </div>
  );
}
