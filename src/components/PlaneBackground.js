import {useFrame} from '@react-three/fiber';
import {useRef} from 'react';
import * as THREE from 'three'

const PlaneBackground = () => {
  const ref = useRef()

  let m = new THREE.ShaderMaterial({
    uniforms: {
      color1: { value: new THREE.Color(0x310e68) },
      color2: { value: new THREE.Color(0x090214) },
      ratio: { value: window.innerWidth / window.innerHeight },
    },
    transparent: true,
    vertexShader: `varying vec2 vUv;
      void main(){
        vUv = uv;
        gl_Position = vec4(position, 1.);
      }`,
    fragmentShader: `varying vec2 vUv;
        uniform vec3 color1;
        uniform vec3 color2;
        uniform float ratio;
        void main(){
        	vec2 uv = (vUv - 0.5) * vec2(ratio, 0.5);
          gl_FragColor = vec4( mix( color1, color2, length(uv)), .3 );
        }`,
  })

  useFrame(({ camera, clock }) => {

    // Move mesh to be flush with camera
    ref.current.position.copy(camera.position)
    ref.current.quaternion.copy(camera.quaternion)

    // Apply offset
    ref.current.translateZ(-1)
  })

  //
  return (
      <mesh ref={ref} position={[0, 0, 0]} material={m}>
        <planeBufferGeometry args={[2, 2]} />
      </mesh>
  )
}

export default PlaneBackground
