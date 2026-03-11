import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

const container = document.getElementById("viewer");

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  45,
  700 / 500,
  0.1,
  1000
);
camera.position.set(0, 0, 5);

const renderer = new THREE.WebGLRenderer({
  alpha: true,
  antialias: true
});
renderer.setSize(700, 500);
renderer.setPixelRatio(window.devicePixelRatio);
container.appendChild(renderer.domElement);

// Luces
const ambientLight = new THREE.AmbientLight(0xffffff, 1.3);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1.2);
directionalLight.position.set(3, 4, 5);
scene.add(directionalLight);

// Geometría provisional
const geometry = new THREE.BoxGeometry(2.4, 1.5, 1.2);

const loader = new THREE.TextureLoader();

const textureFront = loader.load("./camera-front.png");
const textureBack = loader.load("./camera-back.png");
const textureSide = loader.load("./camera-close.png");

const materials = [
  new THREE.MeshStandardMaterial({ map: textureSide }),  // derecha
  new THREE.MeshStandardMaterial({ map: textureSide }),  // izquierda
  new THREE.MeshStandardMaterial({ map: textureSide }),  // arriba
  new THREE.MeshStandardMaterial({ map: textureSide }),  // abajo
  new THREE.MeshStandardMaterial({ map: textureFront }), // frente
  new THREE.MeshStandardMaterial({ map: textureBack })   // atrás
];

const model = new THREE.Mesh(geometry, materials);
scene.add(model);

// Controles
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.06;
controls.enableZoom = false;
controls.autoRotate = true;
controls.autoRotateSpeed = 1.2;

// Resize
window.addEventListener("resize", () => {
  const width = container.clientWidth || 700;
  const height = container.clientHeight || 500;

  camera.aspect = width / height;
  camera.updateProjectionMatrix();

  renderer.setSize(width, height);
});

// Animación
function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}

animate();