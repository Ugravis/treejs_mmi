import * as THREE from 'three'
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js"
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';


/* Base */


// Scene
const renderer = new THREE.WebGLRenderer({ 
  canvas: document.getElementById('canvas'),
  antialias: true 
})
const scene = new THREE.Scene()
renderer.shadowMap.enabled = true;

// Camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
camera.position.z = 5

// Lights
const light = new THREE.AmbientLight(0xffffff, 1) // Lumière globale
scene.add(light)

const directionalLight = new THREE.DirectionalLight(0xffffff, 1)
directionalLight.position.set(5, 5, 5)
scene.add(directionalLight)

// Plan
const planeGeometry = new THREE.PlaneGeometry(10, 10)
const planeMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff, side: THREE.DoubleSide })
const plane = new THREE.Mesh(planeGeometry, planeMaterial)
plane.rotation.x = Math.PI / 2
plane.position.y = 0
plane.receiveShadow = true
scene.add(plane)


/* Gestion animation */


const clock = new THREE.Clock()
const loader = new GLTFLoader()
let mixer

loader.load('./assets/punchAnimation.glb', function (gltf) {
    const model = gltf.scene
    scene.add(model)

    if (gltf.animations && gltf.animations.length > 0) {
      playAnimation(gltf);
    }
  },
  undefined,
  function (e) {
    console.error("Error during GLTF load:", e);
  }
)

function playAnimation(gltf) {
  mixer = new THREE.AnimationMixer(gltf.scene);
  
  const action = mixer.clipAction(gltf.animations[0]);
  action.play();
}

loop(); 

function loop() {
  const delta = clock.getDelta()
  if (mixer) mixer.update(delta)
  
  renderer.render(scene, camera)
  requestAnimationFrame(loop)
}


/* Orbit */


const controls = new OrbitControls(camera, renderer.domElement)
camera.position.set(0, 3, 10)
controls.update()