import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { Bloom, EffectComposer } from '@react-three/postprocessing'


import { Globe } from './Globe'

export function Earth() {
  return (
    <>
      <Canvas camera={{ position: [0, 0, 20], fov: 75 }}>
        <ambientLight intensity={0.2} />
        <directionalLight position={[0, 1, 1]} />
        <directionalLight position={[-2, 1, 1]} />
        {/* <directionalLight position={[1, 1, 2]} color={0xFF00FF} /> */} {/* pink */}
        
        <Globe radius={8}></Globe>
        <EffectComposer>
          <Bloom luminanceThreshold={0} luminanceSmoothing={0.9} height={500} />
        </EffectComposer>
        {/* <Halo /> */}

        <OrbitControls />
      </Canvas>
    </>
  )
}