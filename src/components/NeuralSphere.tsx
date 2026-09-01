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

    const NODE_COUNT = 100;
    const MAX_CONNECTION_DISTANCE = 80;

    // We store the target (sphere) and dispersed (scattered) positions for each node
    const nodes: { 
      target: { x: number; y: number; z: number }; 
      dispersed: { x: number; y: number; z: number };
    }[] = [];

    const phi = Math.PI * (3 - Math.sqrt(5)); 
    for (let i = 0; i < NODE_COUNT; i++) {
      const y = 1 - (i / (NODE_COUNT - 1)) * 2; 
      const radiusAtY = Math.sqrt(1 - y * y); 
      const theta = phi * i; 

      const x = Math.cos(theta) * radiusAtY;
      const z = Math.sin(theta) * radiusAtY;

      // Dispersed state: random spread over a much larger volume
      const dx = (Math.random() - 0.5) * 6;
      const dy = (Math.random() - 0.5) * 6;
      const dz = (Math.random() - 0.5) * 6;

      nodes.push({ 
        target: { x, y, z }, 
        dispersed: { x: dx, y: dy, z: dz } 
      });
    }

    // Easing function for smooth convergence
    const easeInOutCubic = (t: number) => t < .5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;

    const render = () => {
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

      const scroll = scrollRef.current;
      
      const screenMin = Math.min(width, height);
      const isMobile = width < 768;
      const baseRadius = isMobile ? screenMin * 0.3 : 120;
      const maxExtraRadius = isMobile ? screenMin * 0.8 : 480;
      
      let currentRadius = baseRadius;
      
      // Scale phase: 0.3 to 0.55 (expand), 0.55 to 0.85 (hold), 0.85 to 0.92 (shrink)
      if (scroll > 0.3 && scroll <= 0.55) {
        const progress = (scroll - 0.3) / 0.25; 
        currentRadius = baseRadius + (progress * maxExtraRadius);
      } else if (scroll > 0.55 && scroll <= 0.85) {
        currentRadius = baseRadius + maxExtraRadius;
      } else if (scroll > 0.85 && scroll <= 0.92) {
        const progress = (scroll - 0.85) / 0.07;
        currentRadius = (baseRadius + maxExtraRadius) - (progress * maxExtraRadius);
      }

      // Assembly phase: 0.0 to 0.15 (assemble), 0.92 to 1.0 (disperse)
      let assemblyProgress = 1;
      if (scroll < 0.15) {
        assemblyProgress = scroll / 0.15;
      } else if (scroll > 0.92) {
        assemblyProgress = 1 - ((scroll - 0.92) / 0.08);
      }
      
      const easedAssembly = easeInOutCubic(Math.max(0, Math.min(1, assemblyProgress)));
      const connectionOpacityMultiplier = easedAssembly; 

      const CAMERA_Z = 300; 
      const totalRotation = rotation + scroll * Math.PI * 4;

      const projectedNodes = nodes.map((node) => {
        // Interpolate between dispersed and target positions
        const ux = node.dispersed.x * (1 - easedAssembly) + node.target.x * easedAssembly;
        const uy = node.dispersed.y * (1 - easedAssembly) + node.target.y * easedAssembly;
        const uz = node.dispersed.z * (1 - easedAssembly) + node.target.z * easedAssembly;

        const nx = ux * currentRadius;
        const ny = uy * currentRadius;
        const nz = uz * currentRadius;

        const rotX = nx * Math.cos(totalRotation) - nz * Math.sin(totalRotation);
        const rotZ = nz * Math.cos(totalRotation) + nx * Math.sin(totalRotation);
        
        const tilt = 0.2;
        const finalY = ny * Math.cos(tilt) - rotZ * Math.sin(tilt);
        const finalZ = rotZ * Math.cos(tilt) + ny * Math.sin(tilt);

        const depth = CAMERA_Z + finalZ;
        
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

      const visibleNodes = projectedNodes.filter(n => n.visible);
      visibleNodes.sort((a, b) => b.z - a.z);

      ctx.lineWidth = 1.5;
      for (let i = 0; i < visibleNodes.length; i++) {
        for (let j = i + 1; j < visibleNodes.length; j++) {
          const dx = visibleNodes[i].original.x - visibleNodes[j].original.x;
          const dy = visibleNodes[i].original.y - visibleNodes[j].original.y;
          const dz = visibleNodes[i].original.z - visibleNodes[j].original.z;
          const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);
          
          const dynamicMaxDist = MAX_CONNECTION_DISTANCE * (currentRadius / 120);

          if (distance < dynamicMaxDist) {
            const opacity = (1 - distance / dynamicMaxDist) * 0.8;
            const zOpacity = Math.max(0, Math.min(1, (currentRadius + CAMERA_Z - visibleNodes[i].z) / (currentRadius * 2)));
            
            ctx.beginPath();
            ctx.moveTo(visibleNodes[i].x, visibleNodes[i].y);
            ctx.lineTo(visibleNodes[j].x, visibleNodes[j].y);
            ctx.strokeStyle = `rgba(39, 230, 210, ${opacity * zOpacity * connectionOpacityMultiplier})`;
            ctx.stroke();
          }
        }
      }

      visibleNodes.forEach((node) => {
        const radius = Math.min(20, Math.max(1, 4 * node.scale));
        const opacity = Math.max(0, Math.min(1, (currentRadius + CAMERA_Z - node.z) / (currentRadius * 2)));

        // When dispersed, nodes glow brighter
        const extraGlow = (1 - easedAssembly) * 0.5;
        const glowRadius = radius * (2.5 + extraGlow * 2);
        
        const gradient = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, glowRadius);
        gradient.addColorStop(0, `rgba(255, 255, 255, ${Math.min(1, opacity * 0.9 + extraGlow)})`);
        gradient.addColorStop(0.3, `rgba(39, 230, 210, ${opacity * 0.4})`);
        gradient.addColorStop(1, `rgba(39, 230, 210, 0)`);

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
