const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 10, 1000);
const renderer = new THREE.WebGLRenderer();

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

let stars, starGeo;

lighting();
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