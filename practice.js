import * as THREE from 'three';
// Change the OrbitControls line to this:
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
// 1. Scene & Camera Setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 3.5;

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
document.body.appendChild(renderer.domElement);

// 2. Interactive Controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

// 3. Texture Loading (Referencing the /public folder)
const loader = new THREE.TextureLoader();

// 4. Earth Base Layer
const earthGeo = new THREE.IcosahedronGeometry(1, 12);
const earthMat = new THREE.MeshStandardMaterial({
  map: loader.load('/textures/00_earthmap1k.jpg'),
});
const earthMesh = new THREE.Mesh(earthGeo, earthMat);
scene.add(earthMesh);

// 5. Night Lights Layer (Additive Blending)
const lightsMat = new THREE.MeshBasicMaterial({
  map: loader.load('/textures/00_earthlights1k.jpg'),
  blending: THREE.AdditiveBlending, 
});
const lightsMesh = new THREE.Mesh(earthGeo, lightsMat);
scene.add(lightsMesh);

// 6. Cloud Layer (Floating slightly above)
const cloudMat = new THREE.MeshStandardMaterial({
  map: loader.load('/textures/00_earthclouds1k.jpg'),
  transparent: true,
  opacity: 0.4,
  blending: THREE.AdditiveBlending,
});
const cloudsMesh = new THREE.Mesh(earthGeo, cloudMat);
cloudsMesh.scale.setScalar(1.005); // Lifts clouds above surface
scene.add(cloudsMesh);

// 7. Lighting
const sunLight = new THREE.DirectionalLight(0xffffff, 2);
sunLight.position.set(-2, 0.5, 1.5);
scene.add(sunLight);

// 8. Animation Loop
function animate() {
  requestAnimationFrame(animate);
  
  // Real-time rotation for your automated logs
  earthMesh.rotation.y += 0.001;
  lightsMesh.rotation.y += 0.001;
  cloudsMesh.rotation.y += 0.0012;

  controls.update();
  renderer.render(scene, camera);
}
animate();

// Responsive Resize
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});






//////now i just have to formulate the threed enviroment which I think I will prompt AI to make and then find tools to modifey it as I want
///////    going to use this logic to create elements in game https://www.youtube.com/watch?v=K_CwmMlNmQo