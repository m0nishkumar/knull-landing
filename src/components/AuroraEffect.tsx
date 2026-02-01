'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  uniform float uTime;
  uniform vec2 uResolution;
  varying vec2 vUv;

  // Simplex noise function
  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }

  float snoise(vec2 v) {
    const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy));
    vec2 x0 = v - i + dot(i, C.xx);
    vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod289(i);
    vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
    vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy), dot(x12.zw, x12.zw)), 0.0);
    m = m * m;
    m = m * m;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);
    vec3 g;
    g.x = a0.x * x0.x + h.x * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }

  // Function to create a single stream
  float stream(vec2 uv, float offset, float width, float speed, float swirl) {
    float flow = uv.y + uTime * speed;
    float swirlOffset = sin(uv.y * swirl + uTime * 0.5) * 0.05;
    float dist = abs(uv.x - 0.5 + offset + swirlOffset);
    float noise = snoise(vec2(uv.x * 4.0 + offset * 10.0, flow * 3.0)) * 0.5 + 0.5;
    float streamWidth = width + noise * 0.03;
    return smoothstep(streamWidth, 0.0, dist) * (0.5 + noise * 0.5);
  }

  void main() {
    vec2 uv = vUv;
    
    // Rotate coordinates for diagonal effect (top-left to bottom-right)
    float angle = 0.785398; // 45 degrees
    vec2 center = vec2(0.5, 0.5);
    vec2 rotatedUv = uv - center;
    float cosA = cos(angle);
    float sinA = sin(angle);
    rotatedUv = vec2(
      rotatedUv.x * cosA - rotatedUv.y * sinA,
      rotatedUv.x * sinA + rotatedUv.y * cosA
    );
    rotatedUv += center;

    // Create multiple swirling streams
    float stream1 = stream(rotatedUv, 0.0, 0.08, 0.12, 3.0);
    float stream2 = stream(rotatedUv, 0.06, 0.05, 0.18, 4.0);
    float stream3 = stream(rotatedUv, -0.05, 0.06, 0.15, 2.5);
    float stream4 = stream(rotatedUv, 0.03, 0.04, 0.22, 5.0);
    float stream5 = stream(rotatedUv, -0.08, 0.04, 0.1, 3.5);
    float stream6 = stream(rotatedUv, 0.1, 0.03, 0.25, 6.0);
    
    // Combine streams
    float combinedStreams = stream1 + stream2 * 0.8 + stream3 * 0.9 + stream4 * 0.6 + stream5 * 0.7 + stream6 * 0.5;
    combinedStreams = min(combinedStreams, 1.5); // Soft clamp

    // Aurora colors - more vibrant
    vec3 color1 = vec3(0.4, 0.45, 1.0);     // Bright Indigo
    vec3 color2 = vec3(0.65, 0.4, 1.0);     // Vibrant Purple
    vec3 color3 = vec3(0.1, 0.85, 0.95);    // Bright Cyan
    vec3 color4 = vec3(0.3, 0.9, 0.6);      // Teal accent

    // Mix colors based on position and noise
    float flow = rotatedUv.y + uTime * 0.1;
    float colorNoise1 = snoise(vec2(rotatedUv.x * 2.0, flow * 1.5)) * 0.5 + 0.5;
    float colorNoise2 = snoise(vec2(rotatedUv.x * 3.0 + 50.0, flow * 2.0 + uTime * 0.05)) * 0.5 + 0.5;
    
    vec3 auroraColor = mix(color1, color2, colorNoise1);
    auroraColor = mix(auroraColor, color3, colorNoise2 * 0.7);
    auroraColor = mix(auroraColor, color4, sin(flow * 4.0 + uTime) * 0.3 + 0.2);

    // Enhanced brightness with pulsing (Reduced intensity)
    float pulse = sin(uTime * 0.8) * 0.1 + 1.0;
    float brightness = combinedStreams * pulse * 0.3;

    // Final color with reduced intensity
    vec3 finalColor = auroraColor * brightness;
    float alpha = combinedStreams * 0.4;


    gl_FragColor = vec4(finalColor, alpha);
  }
`;


function AuroraMesh() {
  const meshRef = useRef<THREE.Mesh>(null);

  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) }
  }), []);

  useFrame((state) => {
    if (meshRef.current) {
      const material = meshRef.current.material as THREE.ShaderMaterial;
      material.uniforms.uTime.value = state.clock.elapsedTime;
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, 0]}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
}

export default function AuroraEffect() {
  return (
    <div
      className="absolute inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
    >
      <Canvas
        camera={{ position: [0, 0, 1], fov: 75 }}
        style={{ background: 'transparent' }}
        gl={{ alpha: true, antialias: true }}
      >
        <AuroraMesh />
      </Canvas>
    </div>
  );
}
