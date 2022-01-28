import { FontLoader } from "./three.js";
import { TextGeometry } from "./three.js";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 10, 1000);
const renderer = new THREE.WebGLRenderer();

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const woodTexture = new THREE.TextureLoader('assets/textures/wood_texture.jpg');

let stars, starGeo;

lighting();
particles();
text();

function text() {
  const fontLoader = new FontLoader();
  fontLoader.load('assets/fonts/Nasalization Rg_Regular.json', function (font) {

    const textGeo = new TextGeometry('Maia', {
      font: font,
      size: 80,
      height: 5,
      curveSegments: 12,
      bevelEnabled: false,
      bevelThickness: 10,
      bevelSize: 8,
      bevelOffset: 0,
      bevelSegments: 5
    });

    const textMat = new THREE.MeshPhongMaterial({ map: woodTexture });
    const textMesh = new THREE.Mesh(textGeo, textMat);
    scene.add(textMesh);
  });
};

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

  let sprite = new THREE.TextureLoader().load("assets/images/star.png");
  let starMaterial = new THREE.PointsMaterial({
    color: 0xffb6c1,
    size: 0.7,
    map: sprite,
  });

  stars = new THREE.Points(starGeo, starMaterial);
  scene.add(stars);
}

function animateParticles() {
  if (stars.position.y < -25) {
    stars.position.y = 35;
  }
  starGeo.verticesNeedUpdate = true;
  stars.position.y -= 1.2;
}

function lighting() {
  const light = new THREE.HemisphereLight(0xffca99, 0x9a53e6, 1);
  scene.add(light);

  const pointLight = new THREE.PointLight(0xff0000, 1, 100);
  pointLight.position.set(50, 50, 50);
  scene.add(pointLight);
}

function animate() {
  requestAnimationFrame(animate);

  animateParticles();

  renderer.render(scene, camera);
}

animate();