import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// Scene Setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Load Earth Textures (Make sure these are in your /public folder!)
const loader = new THREE.TextureLoader();
const earthGroup = new THREE.Group();
scene.add(earthGroup);

const geo = new THREE.IcosahedronGeometry(1, 12);
const mat = new THREE.MeshStandardMaterial({
  map: loader.load('/textures/00_earthmap1k.jpg'),
});
const earthMesh = new THREE.Mesh(geo, mat);
earthGroup.add(earthMesh);

// Lights
const sunLight = new THREE.DirectionalLight(0xffffff, 1.5);
sunLight.position.set(-2, 0.5, 1.5);
scene.add(sunLight);

camera.position.z = 3;

// Animation Loop
function animate() {
  requestAnimationFrame(animate);
  earthMesh.rotation.y += 0.002;
  renderer.render(scene, camera);
}
animate();






//////now i just have to formulate the threed enviroment which I think I will prompt AI to make and then find tools to modifey it as I want
///////    going to use this logic to create elements in game https://www.youtube.com/watch?v=K_CwmMlNmQo