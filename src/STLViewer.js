import React from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { STLLoader } from "three/examples/jsm/loaders/STLLoader";
import { useLoader } from "@react-three/fiber";

function Model({ url }) {
  const geometry = useLoader(STLLoader, url);

  return (
    <mesh>
      <primitive object={geometry} />
      <meshStandardMaterial color="gray" />
    </mesh>
  );
}

export default function STLViewer({ fileUrl }) {
  return (
    <Canvas camera={{ position: [0, 0, 5] }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <OrbitControls />
      {fileUrl && <Model url={fileUrl} />}
    </Canvas>
  );
}
