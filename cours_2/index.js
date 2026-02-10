import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const mestouches = { ArrowUp: false, ArrowDown: false, ArrowLeft: false, ArrowRight: false };

// Render & scene
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.shadowMap.enabled = true;
const scene = new THREE.Scene();

// Caméra
const camera = new THREE.PerspectiveCamera(80, ratio);
camera.position.set(0, 1, 5);

// Lumière
const pointLight = new THREE.PointLight(0xffffff, 30);
pointLight.position.set(0, 4, 3);
pointLight.castShadow = true;
scene.add(pointLight);

// Ajout du plan
const planeGeometry = new THREE.PlaneGeometry(10, 10);
const planeMaterial = new THREE.MeshStandardMaterial({ color: 0x884444, side: THREE.DoubleSide });
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.rotation.x = Math.PI / 2;
plane.position.y = -1;
plane.receiveShadow = true;
scene.add(plane);

// Ajout du cube
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshStandardMaterial({ color: 0x33ff33 });
const moncube = new THREE.Mesh(geometry, material);

// Et sa texture
const textureLoader = new THREE.TextureLoader();
textureLoader.load("./textures/texture_foshu.jpg", (texture) => {
  const materialTexture = new THREE.MeshStandardMaterial({ map: texture });
  moncube.material = materialTexture;
});

((moncube.position.y = 1), 5);
moncube.castShadow = true;
scene.add(moncube);

// Ajout objet 3D GLTF
let glasses;
const loader = new GLTFLoader();
loader.load("./assets/sunglasses.glb", function (gltf) {
  gltf.scene.traverse((node) => {
    if (node.isMesh) {
      node.castShadow = true;
    }
  });

  glasses = gltf.scene;
  glasses.scale.set(12, 12, 12);
  glasses.position.x = 1.5;
  glasses.position.z = 2;
  glasses.position.y = 0;

  scene.add(glasses);
});

// Updater en boucle pour l'animation
function monUpdater() {
  moncube.rotation.x += 0.01;
  moncube.rotation.y += 0.015;
  renderer.render(scene, camera);
  requestAnimationFrame(monUpdater);

  // if (mestouches.ArrowUp) {
  //   moncube.position.z -= 0.1;
  // }
  // if (mestouches.ArrowDown) {
  //   moncube.position.z += 0.1;
  // }
  // if (mestouches.ArrowLeft) {
  //   moncube.position.x -= 0.1;
  // }
  // if (mestouches.ArrowRight) {
  //   moncube.position.x += 0.1;
  // }
}

monUpdater();

//

const mouse = new THREE.Vector2();

// window.addEventListener('mousemove', function(ev) {
//   mouse.x = (ev.clientX / window.innerWidth) * 2 - 1;
//   mouse.y = -(ev.clientY / window.innerHeight) * 2 + 1;

//   moncube.position.x = mouse.x * 5;
//   moncube.position.y = mouse.y * 5;
// });

// Écouteurs pour détecter les touches pressées et relâchées
// window.addEventListener("keydown", (event) => {
//   if (mestouches.hasOwnProperty(event.key)) {
//     mestouches[event.key] = true;
//   }
// });

// window.addEventListener("keyup", (event) => {
//   if (mestouches.hasOwnProperty(event.key)) {
//     mestouches[event.key] = false;
//   }
// });

//

const controls = new OrbitControls(camera, renderer.domElement);

camera.position.set(0, 3, 10);
controls.update();

function animate() {
	controls.update();
	renderer.render( scene, camera );
}