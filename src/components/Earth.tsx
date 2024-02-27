import { Canvas } from '@react-three/fiber'
import { Bloom, EffectComposer } from '@react-three/postprocessing'
import { OrbitControls } from '@react-three/drei';


import { Globe } from './Globe'
import { Halo } from './Halo'

export function Earth() {
  return (
    <>
      <Canvas camera={{ position: [0, 0, 20], fov: 75 }}>
        <ambientLight intensity={0.2} />
        <directionalLight position={[0, 1, 1]} />
        <directionalLight position={[-2, 1, 1]} />
        <directionalLight position={[1, 1, 2]} color={0xFF00FF} />
        
        <Globe></Globe>
        <EffectComposer>
          <Bloom luminanceThreshold={0} luminanceSmoothing={0.9} height={500} />
        </EffectComposer>
        {/* <Halo /> */}

        <OrbitControls />
      </Canvas>
    </>
  )
}