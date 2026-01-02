import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { ConvexGeometry } from 'three/addons/geometries/ConvexGeometry.js';

// 1. SCENE SETUP
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('app').appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
const loader = new THREE.TextureLoader();

// 2. TEXTURE LOADING
// Ensure this file is in your public/textures/ folder
const treeTexture = loader.load('/textures/jude-infantini-mI-QcAP95Ok-unsplash.jpg');
treeTexture.wrapS = treeTexture.wrapT = THREE.RepeatWrapping;

// 3. GEOMETRY FUNCTIONS

// Function for Bent Cones (Trunk/Branches) using Lathe
function createBentCone(baseWidth, height, bendAmount) {
    const points = [];
    for (let i = 0; i <= 20; i++) {
        const y = (i / 20) * height;
        const radius = baseWidth * (1 - i / 20); // Tapers to 0 at top
        const x = Math.pow(i / 20, 2) * bendAmount; // Curves based on height
        points.push(new THREE.Vector2(radius + x, y));
    }
    const geometry = new THREE.LatheGeometry(points, 32);
    const material = new THREE.MeshStandardMaterial({ map: treeTexture });
    return new THREE.Mesh(geometry, material);
}

// Function for Gnarled Knots using ConvexGeometry
function createGnarledKnot(scale) {
    const points = [];
    for (let i = 0; i < 30; i++) {
        points.push(new THREE.Vector3(
            (Math.random() - 0.5) * scale,
            (Math.random() - 0.5) * scale,
            (Math.random() - 0.5) * scale
        ));
    }
    const geometry = new ConvexGeometry(points);
    const material = new THREE.MeshStandardMaterial({ 
        map: treeTexture, 
        flatShading: true // Makes it look rough and dead
    });
    return new THREE.Mesh(geometry, material);
}

// 4. BUILD THE TREE
const treeGroup = new THREE.Group();

// Main Trunk
const trunk = createBentCone(0.5, 6, 2.5);
treeGroup.add(trunk);

// Branches sprouting from different heights
const branch1 = createBentCone(0.15, 3.5, -1.5);
branch1.position.set(1.1, 3.8, 0); 
branch1.rotation.z = Math.PI / 3;
treeGroup.add(branch1);

const branch2 = createBentCone(0.12, 3, 1.2);
branch2.position.set(1.4, 4.6, 0.2);
branch2.rotation.z = -Math.PI / 4;
treeGroup.add(branch2);

// Adding Knots for extra realism
const knot1 = createGnarledKnot(0.7);
knot1.position.set(0.2, 2.5, 0.1); // Knot on middle of trunk
treeGroup.add(knot1);

const knot2 = createGnarledKnot(0.5);
knot2.position.set(1.0, 4.0, 0); // Knot at a branch joint
treeGroup.add(knot2);

scene.add(treeGroup);

// 5. LIGHTING & ATMOSPHERE (TranZit Style)
const sun = new THREE.DirectionalLight(0xffffff, 2);
sun.position.set(5, 10, 5);
scene.add(sun);
scene.add(new THREE.AmbientLight(0x404040, 0.8));

scene.fog = new THREE.FogExp2(0x111111, 0.07); 
scene.background = new THREE.Color(0x050505);

camera.position.set(0, 5, 12);

// 6. ANIMATION LOOP
function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}
animate();

// Handle Resizing
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});