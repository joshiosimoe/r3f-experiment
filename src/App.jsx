import { Canvas, useFrame } from "@react-three/fiber"
import { useRef, useState } from "react"
import './App.css'

const Cube = ({position, size, color}) => {
  const ref = useRef();
  
  useFrame((state, delta) => {
    ref.current.rotation.x += delta;
    ref.current.rotation.y += delta * 2.0;
    ref.current.position.z = Math.sin(state.clock.elapsedTime) * 2;
    console.log(state.clock.elapsedTime);
  })
  
  return(
    <mesh position={position} ref={ref}>
          <boxGeometry args={size} />
          <meshStandardMaterial color={color}/>
    </mesh>
  )
}

const Sphere = ({ position, size, color}) => {
  const ref = useRef();
  
  const[isHovered, setIsHovered] = useState(false);
  const[isClicked, setIsClicked] = useState(false);

  useFrame((state, delta) => {
    const speed = isHovered ? 1 : 0.2;
    ref.current.rotation.y += delta * speed;
  })
  
  return (
    <mesh 
      position={position} 
      ref={ref} 
      onPointerEnter={(event) => (event.stopPropagation(), setIsHovered(true))}
      onPointerLeave={() => setIsHovered(false)}
      onClick={() => setIsClicked(!isClicked)}
      scale={isClicked ? 1.5 : 1}
    >
        <sphereGeometry size={size}/>
        <meshStandardMaterial color={isHovered ? color : "lightblue"} wireframe/>
    </mesh>
  )
}

const Torus = ({ position, size, color}) => {
  return (
    <mesh position={position}>
        <torusGeometry size={size}/>
        <meshStandardMaterial color={color}/>
    </mesh>
  )
}

const TorusKnot = ({ position, size, color}) => {
  const ref = useRef();
  
  useFrame((state, delta) => {
    ref.current.rotation.x += delta;
    ref.current.rotation.y += delta * 2.0;
    ref.current.position.z = Math.sin(state.clock.elapsedTime) * 2;
  })
  
  return (
    <mesh position={position} ref={ref}>
        <torusKnotGeometry size={size}/>
        <meshStandardMaterial color={color}/>
    </mesh>
  )
}

const App = () => {

  
  return (
    <>
      <Canvas>
        <directionalLight position={[0,0,2]} intensity={1}/>
        {/* <ambientLight intensity={1}/> */}

        {/* <group position={[0,-1,0]}>
          <Cube position={[1,0,0]} color="green" size={[1,1,1]}/>
          <Cube position={[-1,0,0]} color="yellow" size={[1,1,1]}/>
          <Cube position={[1,2,0]} color="red" size={[1,1,1]}/>
          <Cube position={[-1,2,0]} color="blue" size={[1,1,1]}/>
        </group> */}

        <Sphere position={[0,0,0]} size={[1,30,30]} color={"orange"}/>
        {/* <Torus position={[2,0,0]} size={[0.8, 0.1, 30, 30]} color={"blue"}/>
        <TorusKnot position={[-2,0,0]} size={[0.5,0.1,1000,50]} color={"hotpink"}/> */}
      </Canvas>
    </>
  )
}

export default App
