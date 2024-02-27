import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'

import { Globe } from './Globe'

export function Earth() {
  return (
    <>
      <Canvas camera={{ position: [0, 0, 20], fov: 75 }}>
        <ambientLight intensity={0.2} />
        <directionalLight position={[0, 1, 1]} />
        <directionalLight position={[-2, 1, 1]} />
        
        <Globe></Globe>

        <OrbitControls />
      </Canvas>
    </>
  )
}