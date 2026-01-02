import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// 1. SCENE SETUP
const w = window.innerWidth;
const h = window.innerHeight;
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, w / h, 0.1, 1000);
camera.position.z = 3;
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(w, h);
// Set color space for realistic textures
renderer.outputColorSpace = THREE.SRGBColorSpace;
document.body.appendChild(renderer.domElement);

// 2. CONTROLS
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.03;

// 3. TEXTURE LOADER
const loader = new THREE.TextureLoader();

// 4. THE EARTH (Base Layer)
const geometry = new THREE.IcosahedronGeometry(1, 12);
const earthMat = new THREE.MeshStandardMaterial({
  map: loader.load('/textures/00_earthmap1k.jpg'),
});
const earthMesh = new THREE.Mesh(geometry, earthMat);
scene.add(earthMesh);

// 5. NIGHT LIGHTS (Additive Layer)
const lightsMat = new THREE.MeshBasicMaterial({
  map: loader.load('/textures/00_earthlights1k.jpg'),
  blending: THREE.AdditiveBlending, // This makes the lights "shine" through
});
const lightsMesh = new THREE.Mesh(geometry, lightsMat);
scene.add(lightsMesh);

// 6. CLOUDS (Floating Layer)
const cloudMat = new THREE.MeshStandardMaterial({
  map: loader.load('/textures/00_earthclouds1k.jpg'),
  transparent: true,
  opacity: 0.4,
  blending: THREE.AdditiveBlending,
});
const cloudsMesh = new THREE.Mesh(geometry, cloudMat);
cloudsMesh.scale.setScalar(1.003); // Slightly larger so it floats
scene.add(cloudsMesh);

// 7. LIGHTING (Sunlight)
const sunLight = new THREE.DirectionalLight(0xffffff, 2.0);
sunLight.position.set(-2, 0.5, 1.5);
scene.add(sunLight);

// 8. ANIMATION LOOP
function animate() {
  requestAnimationFrame(animate);
  
  // Rotate each layer at different speeds for realism
  earthMesh.rotation.y += 0.001;
  lightsMesh.rotation.y += 0.001;
  cloudsMesh.rotation.y += 0.0013; 
  
  controls.update();
  renderer.render(scene, camera);
}

animate();

// Handle Window Resize
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});






//////now i just have to formulate the threed enviroment which I think I will prompt AI to make and then find tools to modifey it as I want
///////    going to use this logic to create elements in game https://www.youtube.com/watch?v=K_CwmMlNmQo