const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(65, window.innerWidth / window.innerHeight, 0.1, 1000);


scene.background = new THREE.Color(0x6d777d);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const light = new THREE.HemisphereLight(0xffffbb, 0x3b3d80, 1);
scene.add(light);

const woodenTexture = new THREE.TextureLoader().load('assets/textures/wood_texture.jpg');

const boxGeometry = new THREE.BoxGeometry(15, 5, 10);
const boxMaterial = new THREE.MeshPhongMaterial({ map: woodenTexture });
const box = new THREE.Mesh(boxGeometry, boxMaterial);
scene.add(box);

camera.position.z = 35;

function animate() {
  requestAnimationFrame(animate);

  box.rotation.x += 0.01;
  box.rotation.y += 0.01;

  renderer.render(scene, camera);
}
animate();