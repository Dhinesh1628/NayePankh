import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { QuadraticBezierLine } from '@react-three/drei';

const toVector = (lat, lon, radius) => {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  const x = -radius * Math.sin(phi) * Math.cos(theta);
  const y = radius * Math.cos(phi);
  const z = radius * Math.sin(phi) * Math.sin(theta);
  return [x, y, z];
};

const LOCATIONS = [
  { name: 'Delhi', lat: 28.6, lon: 77.2 },
  { name: 'Mumbai', lat: 19.1, lon: 72.9 },
  { name: 'Nairobi', lat: -1.3, lon: 36.8 },
  { name: 'Jakarta', lat: -6.2, lon: 106.8 },
  { name: 'Sao Paulo', lat: -23.6, lon: -46.6 },
  { name: 'London', lat: 51.5, lon: -0.1 },
];

const RADIUS = 1.6;

const RotatingGroup = ({ children }) => {
  const ref = useRef();
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.18;
  });
  return <group ref={ref}>{children}</group>;
};

const Markers = () => {
  const points = useMemo(
    () => LOCATIONS.map((loc) => ({ ...loc, pos: toVector(loc.lat, loc.lon, RADIUS) })),
    []
  );

  const arcs = useMemo(() => {
    const pairs = [];
    for (let i = 0; i < points.length; i++) {
      const next = points[(i + 1) % points.length];
      pairs.push([points[i].pos, next.pos]);
    }
    return pairs;
  }, [points]);

  return (
    <>
      {points.map((p, i) => (
        <mesh key={i} position={p.pos}>
          <sphereGeometry args={[0.035, 12, 12]} />
          <meshStandardMaterial color="#E98C2B" emissive="#E98C2B" emissiveIntensity={1.2} />
        </mesh>
      ))}
      {arcs.map(([start, end], i) => {
        const mid = [
          (start[0] + end[0]) / 2,
          (start[1] + end[1]) / 2 + 0.5,
          (start[2] + end[2]) / 2,
        ];
        return (
          <QuadraticBezierLine
            key={i}
            start={start}
            end={end}
            points={[start, mid, end]}
            color="#2E9683"
            lineWidth={1}
            transparent
            opacity={0.55}
          />
        );
      })}
    </>
  );
};

const Globe3D = () => (
  <Canvas camera={{ position: [0, 0, 4.2], fov: 45 }} dpr={[1, 1.5]} gl={{ alpha: true, antialias: true }}>
    <ambientLight intensity={0.6} />
    <pointLight position={[3, 2, 4]} intensity={1.2} color="#F2A84F" />
    <pointLight position={[-3, -2, -3]} intensity={0.5} color="#1F7A6C" />

    <RotatingGroup>
      <mesh>
        <sphereGeometry args={[RADIUS, 48, 48]} />
        <meshStandardMaterial color="#15564C" wireframe transparent opacity={0.35} />
      </mesh>
      <mesh>
        <sphereGeometry args={[RADIUS * 0.995, 48, 48]} />
        <meshStandardMaterial color="#0E2A2B" transparent opacity={0.55} />
      </mesh>
      <Markers />
    </RotatingGroup>
  </Canvas>
);

export default Globe3D;
