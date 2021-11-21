import React, { useRef } from 'react'
import { useFrame } from '@react-three/fiber'

const Lights = React.memo(() => {
	const lights = useRef()

	//
	useFrame(() => {
		lights.current.rotation.y = lights.current.rotation.z += 0.01
	})

	//
	return (
		<group ref={lights}>
			<ambientLight intensity={0.5} color={0xfae7e7} />
			<directionalLight position={[10, 10, 5]} intensity={2.5} />
			<directionalLight position={[0, 10, 5]} intensity={1} />
			<pointLight position={[0, -10, 5]} intensity={1} />
		</group>
	)
})

export default Lights
