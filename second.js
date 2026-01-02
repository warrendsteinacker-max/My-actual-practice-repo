import * as THREE from 'three';

// 1. Setup Scene, Camera, and Renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// 2. Create the Tree Group
const treeGroup = new THREE.Group();

// --- THE TRUNK ---
const trunkGeom = new THREE.CylinderGeometry(0.2, 0.4, 2, 8, 10); // 10 height segments for smooth bending
const trunkMat = new THREE.MeshStandardMaterial({ color: 0x4d2902 });
const trunk = new THREE.Mesh(trunkGeom, trunkMat);
trunk.position.y = 1; 
treeGroup.add(trunk);

// --- THE LEAVES ---
const leafGeom = new THREE.IcosahedronGeometry(1, 1);
const leafMat = new THREE.MeshStandardMaterial({ color: 0x2d5a27, flatShading: true });
const leaves = new THREE.Mesh(leafGeom, leafMat);
leaves.position.y = 2.5;
treeGroup.add(leaves);

scene.add(treeGroup);

// 3. Lighting
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(5, 5, 5);
scene.add(light);
scene.add(new THREE.AmbientLight(0x404040));

camera.position.z = 7;
camera.position.y = 2;

// 4. Animation Loop (The "Bending" Logic)
function animate() {
    requestAnimationFrame(animate);
    const time = Date.now() * 0.002;

    // BENDING THE TRUNK
    const positions = trunkGeom.attributes.position;
    for (let i = 0; i < positions.count; i++) {
        const x = positions.getX(i);
        const y = positions.getY(i);
        
        // Only bend the top parts (where y > 0)
        // We use Math.sin to create the swaying motion
        const sway = Math.sin(time) * 0.2 * (y / 2); 
        positions.setX(i, x + sway);
    }
    positions.needsUpdate = true; // Tell Three.js the geometry changed

    // Move leaves to follow the top of the trunk
    leaves.position.x = Math.sin(time) * 0.2;

    renderer.render(scene, camera);
}

animate();