import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';


// Render & scene
const renderer = new THREE.WebGLRenderer({canvas});
renderer.shadowMap.enabled = true;
const scene = new THREE.Scene(); 


// Caméra
const camera = new THREE.PerspectiveCamera(80,ratio);
camera.position.set(0,1,5);


// Lumière
const pointLight = new THREE.PointLight(0xffffff, 30)
pointLight.position.set(0, 4, 3)
pointLight.castShadow = true
scene.add(pointLight)


// Ajout du plan
const planeGeometry = new THREE.PlaneGeometry(10,10);
const planeMaterial = new THREE.MeshStandardMaterial({color: 0x884444, side: THREE.DoubleSide});
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.rotation.x = Math.PI / 2;
plane.position.y = -1;
plane.receiveShadow = true;
scene.add(plane);


// Ajout du cube
const geometry = new THREE.BoxGeometry(1,1,1);
const material = new THREE.MeshStandardMaterial({ color: 0x33ff33 });
const moncube = new THREE.Mesh(geometry, material);

// Et sa texture
const textureLoader = new THREE.TextureLoader()
textureLoader.load('./textures/texture_foshu.jpg', (texture) => {
    const materialTexture = new THREE.MeshStandardMaterial({ map: texture })
    moncube.material = materialTexture
})

moncube.position.y = 1,5;
moncube.castShadow = true;
scene.add(moncube);


// Ajout objet 3D GLTF
let glasses
const loader = new GLTFLoader()
loader.load('./assets/sunglasses.glb', function(gltf){ 

    gltf.scene.traverse((node) => {
        if (node.isMesh) {
            node.castShadow = true;
        }
    });

    glasses = gltf.scene
    glasses.scale.set(12, 12, 12)
    glasses.position.x = 1.5
    glasses.position.z = 2
    glasses.position.y = 0

    scene.add(glasses);
});


// Updater en boucle pour l'animation
function monUpdater(){
    moncube.rotation.x += 0.01;
    moncube.rotation.y += 0.015;
    renderer.render(scene,camera);
    requestAnimationFrame(monUpdater);
}

monUpdater();