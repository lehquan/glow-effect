import React, {  useRef  } from "react";
import * as THREE from "three";
import {useFrame} from '@react-three/fiber';
import glow from "../glow.png";

const Sphere = () => {
  const seedGroupRef = useRef(null)

  const params = {
    radius: 12,
    detail: 1,
  };

 /* const extrudeSettings = React.useMemo(
    () => ({
      steps: 2,
      depth: 4,
      bevelEnabled: true,
      bevelThickness: 1,
      bevelSize: 0,
      bevelOffset: 0,
      bevelSegments: 1,
    }),
    []
  );*/

  // useEffect(() => {
  //
  // }, [sphereMesh.current]);
  // Geometry
  const geo = new THREE.IcosahedronBufferGeometry(params.radius, 1);
  const count = geo.attributes.position.count;
  geo.setAttribute(
      "color",
      new THREE.BufferAttribute(new Float32Array(count * 3), 3)
  );
  const color = new THREE.Color();
  const positions1 = geo.attributes.position;
  const colors1 = geo.attributes.color;
  for (let i = 0; i < count; i++) {
    color.setHSL((positions1.getY(i) / params.radius + 1) / 2, 1.0, 0.5);
    colors1.setXYZ(i, color.r, color.g, color.b);
  }

  // Materials
  const wireframeMaterial = new THREE.MeshBasicMaterial({
    color: new THREE.Color("rgb(255,255,255)"),
    wireframe: true,
  });

  const material = new THREE.MeshStandardMaterial({
    transparent: true,
    opacity: 0.2,
    color: new THREE.Color("rgb(185,191,136)"),
    wireframe: false,
    flatShading: true,
    roughness: 1,
    vertexColors: false,
  });
  material.onBeforeCompile = function (shader) {
    shader.fragmentShader = shader.fragmentShader.replace(
        "gl_FragColor = vec4( outgoingLight, diffuseColor.a );",
        [
          "gl_FragColor = vec4( outgoingLight, diffuseColor.a );",
          "gl_FragColor.a *= pow( gl_FragCoord.z, 10.0 );",
        ].join("\n")
    );
  };
  const mesh = new THREE.Mesh(geo, material);
  let wireframe = new THREE.Mesh(geo, wireframeMaterial);
  mesh.add(wireframe);

  // Make glow effect by sprite
  const textureLoader = new THREE.TextureLoader()
  const glowTexture = textureLoader.load(glow)
  const spriteMaterial = new THREE.SpriteMaterial({
    map: glowTexture,
    color: 'rgb(255,255,255)',
    transparent: true,
    blending: THREE.AdditiveBlending,
    opacity: 0.7,
    depthWrite: false,
  })

  //
  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime()
    seedGroupRef.current.position.y = THREE.MathUtils.lerp(seedGroupRef.current.position.y, (-2 + Math.sin(t)) * 2, 0.1)

    seedGroupRef.current.rotation.y = seedGroupRef.current.rotation.z += 0.01
  })

  return (
      <group ref={seedGroupRef}>
        <primitive
            object={mesh}
            scale={[1, 1, 1]}
            rotation={[0, (Math.PI / 180) * 5, (Math.PI / 180) * 38]}
            position={[0, 0, 0]}
            receiveShadow={true}
        />
        <sprite frustumCulled={true} scale={[40, 40, 1]} position={[0, 0, 0]}>
          <spriteMaterial args={[spriteMaterial]} />
        </sprite>
      </group>

  );
};

export default Sphere;
