"use client";

import { useEffect, useRef } from "react";
import { MotionValue } from "framer-motion";

interface NeuralSphereProps {
  scrollYProgress?: MotionValue<number>;
}

export default function NeuralSphere({ scrollYProgress }: NeuralSphereProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
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

    const NODE_COUNT = 150;
    const MAX_CONNECTION_DISTANCE = 80;

    type Vector3 = { x: number; y: number; z: number };
    const nodes: { shapes: Vector3[] }[] = [];

    const phi = Math.PI * (3 - Math.sqrt(5)); 
    for (let i = 0; i < NODE_COUNT; i++) {
      // 0: Dispersed
      const s0 = { 
        x: (Math.random() - 0.5) * 8, 
        y: (Math.random() - 0.5) * 8, 
        z: (Math.random() - 0.5) * 8 
      };

      // 1: Sphere (Hero / Conclusion)
      const y1 = 1 - (i / (NODE_COUNT - 1)) * 2; 
      const radiusAtY = Math.sqrt(1 - y1 * y1); 
      const theta1 = phi * i; 
      const s1 = { 
        x: Math.cos(theta1) * radiusAtY, 
        y: y1, 
        z: Math.sin(theta1) * radiusAtY 
      };

      // 2: DNA Double Helix (Philosophy)
      const t2 = i / NODE_COUNT;
      const angle2 = t2 * Math.PI * 10; 
      const strand = i % 2 === 0 ? 1 : -1;
      const s2 = {
        x: Math.cos(angle2) * 0.6 * strand,
        y: t2 * 2.4 - 1.2,
        z: Math.sin(angle2) * 0.6 * strand
      };

      // 3: Torus (What We Do)
      const u3 = Math.random() * Math.PI * 2;
      const v3 = Math.random() * Math.PI * 2;
      const s3 = {
        x: (0.7 + 0.3 * Math.cos(v3)) * Math.cos(u3),
        y: (0.7 + 0.3 * Math.cos(v3)) * Math.sin(u3),
        z: 0.3 * Math.sin(v3)
      };

      // 4: Data Tornado (Process)
      const t4 = i / NODE_COUNT;
      const angle4 = t4 * Math.PI * 16;
      const r4 = 1 - t4 * 0.8; 
      const s4 = {
        x: Math.cos(angle4) * r4,
        y: t4 * 2.0 - 1.0,
        z: Math.sin(angle4) * r4
      };

      // 5: Team Clusters (3 Hubs)
      const cluster = i % 3;
      const angle5 = (cluster / 3) * Math.PI * 2;
      const s5 = {
        x: Math.cos(angle5) * 0.8 + (Math.random() - 0.5) * 0.5,
        y: Math.sin(angle5) * 0.8 + (Math.random() - 0.5) * 0.5,
        z: (Math.random() - 0.5) * 0.5
      };

      nodes.push({ shapes: [s0, s1, s2, s3, s4, s5] });
    }

    const render = () => {
      const width = canvas.offsetWidth;
      const height = canvas.offsetHeight;
      
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
      }

      ctx.clearRect(0, 0, width, height);

      rotation += 0.005;
      const time = Date.now() * 0.001;

      const centerX = width / 2;
      const centerY = height / 2;

      const scroll = scrollRef.current;
      
      const screenMin = Math.min(width, height);
      const isMobile = width < 768;
      const baseRadius = isMobile ? screenMin * 0.3 : 140;
      const maxExtraRadius = isMobile ? screenMin * 0.7 : 450;
      
      let currentRadius = baseRadius;
      
      // Scale phase for Torus (Services) & Tornado (Process)
      if (scroll > 0.35 && scroll <= 0.45) {
        const progress = (scroll - 0.35) / 0.1; 
        currentRadius = baseRadius + (progress * maxExtraRadius);
      } else if (scroll > 0.45 && scroll <= 0.7) {
        currentRadius = baseRadius + maxExtraRadius;
      } else if (scroll > 0.7 && scroll <= 0.78) {
        const progress = (scroll - 0.7) / 0.08;
        currentRadius = (baseRadius + maxExtraRadius) - (progress * maxExtraRadius);
      }

      // Add continuous breathing to the radius (±4% oscillation)
      const breath = Math.sin(time * 2) * 0.04;
      currentRadius *= (1 + breath);

      // Waypoints for shape morphing based on scroll
      const waypoints = [
        { s: 0.00, shape: 0 },
        { s: 0.05, shape: 1 }, // Hero: Assemble to Sphere
        { s: 0.15, shape: 1 }, 
        { s: 0.22, shape: 2 }, // Philosophy: Morph to DNA
        { s: 0.30, shape: 2 }, 
        { s: 0.38, shape: 3 }, // What We Do: Morph to Torus
        { s: 0.55, shape: 3 }, 
        { s: 0.62, shape: 4 }, // Process: Morph to Tornado
        { s: 0.70, shape: 4 }, 
        { s: 0.78, shape: 5 }, // Team: Morph to 3 Clusters
        { s: 0.85, shape: 5 }, 
        { s: 0.90, shape: 1 }, // Footer: Morph back to Sphere
        { s: 0.95, shape: 1 }, 
        { s: 1.00, shape: 0 }  // End: Disperse
      ];

      let sIdx1 = 0;
      let sIdx2 = 0;
      let morph = 0;

      for (let i = 0; i < waypoints.length - 1; i++) {
        if (scroll >= waypoints[i].s && scroll <= waypoints[i+1].s) {
          sIdx1 = waypoints[i].shape;
          sIdx2 = waypoints[i+1].shape;
          const rawInterp = (scroll - waypoints[i].s) / (waypoints[i+1].s - waypoints[i].s);
          morph = rawInterp * rawInterp * (3 - 2 * rawInterp); // Smoothstep easing
          break;
        }
      }
      if (scroll > waypoints[waypoints.length - 1].s) {
        sIdx1 = waypoints[waypoints.length - 1].shape;
        sIdx2 = sIdx1;
        morph = 0;
      }
      
      const isDispersed = (sIdx1 === 0 && sIdx2 === 0);
      const connectionOpacityMultiplier = isDispersed ? 0 : 
         (sIdx1 === 0 ? morph : (sIdx2 === 0 ? 1 - morph : 1));

      const CAMERA_Z = 300; 
      const totalRotation = rotation + scroll * Math.PI * 4;

      const projectedNodes = nodes.map((node, i) => {
        // Subtle drift based on time and node index for a "living" fluid effect
        const driftX = Math.sin(time * 1.5 + i) * 0.08;
        const driftY = Math.cos(time * 1.2 + i) * 0.08;
        const driftZ = Math.sin(time * 1.8 + i) * 0.08;

        const p1 = node.shapes[sIdx1];
        const p2 = node.shapes[sIdx2];

        // Interpolate between the two current active shapes
        const ux = p1.x * (1 - morph) + p2.x * morph + driftX;
        const uy = p1.y * (1 - morph) + p2.y * morph + driftY;
        const uz = p1.z * (1 - morph) + p2.z * morph + driftZ;

        const nx = ux * currentRadius;
        const ny = uy * currentRadius;
        const nz = uz * currentRadius;

        // Dynamic, continuously shifting tilt axes
        const tiltX = 0.2 + Math.sin(time * 0.5) * 0.15;
        const tiltZ = Math.cos(time * 0.4) * 0.1;

        // Rotate around Y axis
        const rotX = nx * Math.cos(totalRotation) - nz * Math.sin(totalRotation);
        const rotZ = nz * Math.cos(totalRotation) + nx * Math.sin(totalRotation);
        
        // Tilt X
        const finalY = ny * Math.cos(tiltX) - rotZ * Math.sin(tiltX);
        const tempZ = rotZ * Math.cos(tiltX) + ny * Math.sin(tiltX);

        // Tilt Z
        const finalX = rotX * Math.cos(tiltZ) - finalY * Math.sin(tiltZ);
        const finalFinalY = finalY * Math.cos(tiltZ) + rotX * Math.sin(tiltZ);

        const depth = CAMERA_Z + tempZ;
        
        if (depth <= 10) {
          return { x: 0, y: 0, z: tempZ, scale: 0, visible: false, original: {x: nx, y: ny, z: nz} };
        }

        const scale = CAMERA_Z / depth;
        
        return {
          x: centerX + finalX * scale,
          y: centerY + finalFinalY * scale,
          z: tempZ,
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

        // Glow is brighter when fully dispersed (shape 0)
        let extraGlow = 0;
        if (sIdx1 === 0 && sIdx2 === 0) extraGlow = 0.5;
        else if (sIdx1 === 0) extraGlow = 0.5 * (1 - morph);
        else if (sIdx2 === 0) extraGlow = 0.5 * morph;

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
