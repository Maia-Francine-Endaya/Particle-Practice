const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(65, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

let nameMesh = new THREE.Mesh();
let stars, starGeo;

lighting();
name();
particles();

function particles() {
  const points = [];

  for (let i = 0; i < 6000; i++) {
    let star = new THREE.Vector3(
      Math.random() * 600 - 300,
      Math.random() * 600 - 300,
      Math.random() * 600 - 300
    );
    points.push(star);
  }

  starGeo = new THREE.BufferGeometry().setFromPoints(points);

  let sprite = new THREE.TextureLoader().load("assets/star.png");
  let starMaterial = new THREE.PointsMaterial({
    color: 0xffb6c1,
    size: 0.7,
    map: sprite,
  });

  stars = new THREE.Points(starGeo, starMaterial);
  scene.add(stars);
}

function animateParticles() {
  starGeo.verticesNeedUpdate = true;
  stars.position.y -= 0.9;
}


function name() {
  const woodenTexture = new THREE.TextureLoader().load('assets/textures/wood_texture.jpg');
  const boxGeometry = new THREE.BoxGeometry(15, 5, 10);
  const boxMaterial = new THREE.MeshPhongMaterial({ map: woodenTexture });
  nameMesh = new THREE.Mesh(boxGeometry, boxMaterial);

  box.position.z = -5;
  camera.position.z = 35;

  scene.add(nameMesh);
}

function lighting() {
  const light = new THREE.HemisphereLight(0xffffbb, 0x3b3d80, 1);
  scene.add(light);
}

function animate() {
  requestAnimationFrame(animate);

  box.rotation.x += 0.01;
  box.rotation.y += 0.01;

  renderer.render(scene, camera);
}
animate();