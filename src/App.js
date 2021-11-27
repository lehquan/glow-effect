import React, { Suspense } from 'react'
import {OrbitControls, Environment} from '@react-three/drei';
import { Canvas } from '@react-three/fiber'
import Sphere from './components/Sphere';
import Lights from './components/Lights';
import PlaneBackground from './components/PlaneBackground';

const App = () => {
  return (
      <Suspense fallback={<span>loading...</span>}>
        <Canvas linear dpr={[1, 2]} gl={{ preserveDrawingBuffer: true }} camera={{ fov: 45, position: [0, 0, 200] }}>
          <color attach="background" args={['#020C1B']} />
          <Lights/>
          <Environment preset='night' />
          <OrbitControls />
          <Sphere/>
          <PlaneBackground/>
        </Canvas>
      </Suspense>
  )
}


export default App;
