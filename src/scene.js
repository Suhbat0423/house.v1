import * as THREE from "three";

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x87ceeb);

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

let cameraRadius = 10;
let cameraAzimuth = 0;
let cameraElevation = 0;
let isMouseDown = false;
let prevMouseX = 0;
let prevMouseY = 0;
camera.position.z = 3;

// ============================ render ==========================

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

//============================= camera ==========================

const onMouseDown = () => {
  isMouseDown = true;
};

const onMouseUp = () => {
  isMouseDown = false;
};

const onMouseMove = (event) => {
  if (isMouseDown) {
    cameraAzimuth += -((event.clientX - prevMouseX) * 0.5);
    cameraElevation += (event.clientY - prevMouseY) * 0.5;
    cameraElevation = Math.min(90, Math.max(0, cameraElevation));
    updateCameraPosition();
  }
  prevMouseX = event.clientX;
  prevMouseY = event.clientY;
};

const onMouseWheel = (event) => {
  const delta = Math.max(-4, Math.min(4, event.deltaY || -event.detail));
  cameraRadius -= delta;
  cameraRadius = Math.max(8, cameraRadius);
  updateCameraPosition();
};

const updateCameraPosition = () => {
  const azimuthRad = (cameraAzimuth * Math.PI) / 180;
  const elevationRad = (cameraElevation * Math.PI) / 180;

  camera.position.x =
    cameraRadius * Math.sin(azimuthRad) * Math.cos(elevationRad);
  camera.position.y = cameraRadius * Math.sin(elevationRad);
  camera.position.z =
    cameraRadius * Math.cos(azimuthRad) * Math.cos(elevationRad);

  camera.lookAt(0, 0, 0);
  camera.updateMatrix();
};

// =========================== creating object ==================

const ground = () => {
  const groundGeometry = new THREE.PlaneGeometry(100, 100);
  const groundMaterial = new THREE.MeshBasicMaterial({
    color: 0x138510,
    side: THREE.DoubleSide,
  });
  const ground = new THREE.Mesh(groundGeometry, groundMaterial);
  ground.rotation.x = Math.PI / 2;
  ground.position.y = -5;
  scene.add(ground);
};

const grasses = () => {
  const grassMaterial = new THREE.MeshBasicMaterial({ color: 0x135510 });
  const grassGeometry = new THREE.BoxGeometry(0.1, 1, 0.1);
  const numberOfGrasses = 5000;
  for (let i = 0; i < numberOfGrasses; i++) {
    const grass = new THREE.Mesh(grassGeometry, grassMaterial);
    grass.position.x = Math.random() * 100 - 50;
    grass.position.z = Math.random() * 100 - 50;
    grass.position.y = 0.5;
    scene.add(grass);
    grass.position.y = -4.7;
  }
};

const fence = () => {
  const textureLoader = new THREE.TextureLoader();
  const woodenTexture = textureLoader.load(
    "https://lh5.googleusercontent.com/q9d4NZYc7XUzH_cF1k34rVw_B7gmKyDklp720O1Ck2c0r__J79s_PFdVefZCdG3wJ0i3hnMADr1Q7YVVHEx2btN9j78DRjtd9pUbA8iNhIrXSnfMws7a1NQ-Wlxt5kXNBHVC_SIs"
  );
  const woodenMaterial = new THREE.MeshBasicMaterial({ map: woodenTexture });
  const fenceGeometry = new THREE.BoxGeometry(0.5, 10, 0.2);
  const fenceGeometry1 = new THREE.BoxGeometry(0.2, 10, 0.5);
  const fenceYGeometry = new THREE.BoxGeometry(0.1, 0.5, 100);
  const fenceY1Geometry = new THREE.BoxGeometry(100, 0.5, 0.1);

  const fence1 = new THREE.Mesh(fenceGeometry, woodenMaterial);
  const fence2 = new THREE.Mesh(fenceGeometry1, woodenMaterial);
  const fenceY = new THREE.Mesh(fenceYGeometry, woodenMaterial);
  const fenceY1 = new THREE.Mesh(fenceYGeometry, woodenMaterial);
  const fencex1 = new THREE.Mesh(fenceYGeometry, woodenMaterial);
  const fencex11 = new THREE.Mesh(fenceYGeometry, woodenMaterial);
  const fencez = new THREE.Mesh(fenceY1Geometry, woodenMaterial);
  const fencez1 = new THREE.Mesh(fenceY1Geometry, woodenMaterial);

  fencez1.position.set(0, 2, 50);
  fencez.position.set(0, -2.5, 50);
  fence1.position.set(0, 0, 50);
  fence2.position.set(50, 0, 0);
  fenceY.position.set(50, -2.5, 0);
  fenceY1.position.set(50, 2, 0);
  fencex1.position.set(-50, 2, -0);
  fencex11.position.set(-50, -2.5, -0);

  scene.add(fencez1);
  scene.add(fencez);
  scene.add(fenceY);
  scene.add(fenceY1);
  scene.add(fence1);
  scene.add(fence2);
  scene.add(fencex1);
  scene.add(fencex11);
  const groundGeometry = new THREE.PlaneGeometry(100, 100);
  const groundMaterial = new THREE.MeshBasicMaterial({
    color: 0x138510,
    side: THREE.DoubleSide,
  });
  const ground = new THREE.Mesh(groundGeometry, groundMaterial);
  ground.rotation.x = Math.PI / 2;
  ground.position.y = -5;
  scene.add(ground);

  for (let i = 0; i < 101; i++) {
    const fenceClone1 = fence1.clone();
    const fenceClone2 = fence2.clone();
    const fenceClone3 = fence2.clone();

    fenceClone1.position.set(-50 + i * 1, 0, 50);
    fenceClone2.position.set(50, 0, -50 + i * 1);
    fenceClone3.position.set(-50, 0, -50 + i * 1);
    scene.add(fenceClone1);
    scene.add(fenceClone2);
    scene.add(fenceClone3);
  }
};

const path = () => {
  const textureLoader = new THREE.TextureLoader();
  const stoneTexture = textureLoader.load(
    "https://images.rawpixel.com/image_800/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvbHIvcHg3MjgxMjUtaW1hZ2Uta3d2eGgwMzAuanBn.jpg"
  );
  const pathMaterial = new THREE.MeshBasicMaterial({ map: stoneTexture });
  const pathGeometry = new THREE.BoxGeometry(10, 2, 10);
  const pathMesh = new THREE.Mesh(pathGeometry, pathMaterial);
  const path1 = pathMesh.clone();
  const path2 = pathMesh.clone();
  pathMesh.position.set(0, -5.1, -44);
  path1.position.set(0, -5.1, -35);
  path2.position.set(0, -5.1, -25);
  scene.add(pathMesh);
  scene.add(path1);
  scene.add(path2);
};

const road = () => {
  const roadGeometry = new THREE.BoxGeometry(100, 1, 20);
  const borjurGeometry = new THREE.BoxGeometry(100, 2, 1);
  const carRoadGeometry = new THREE.BoxGeometry(100, 1, 60);
  const lineGeometry = new THREE.BoxGeometry(10, 1, 1);
  const lineMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
  const carRoadMaterial = new THREE.MeshBasicMaterial({ color: 0x8c8c8c });
  const roadMaterial = new THREE.MeshBasicMaterial({ color: 0x7c7c7c });
  const borjurMaterial = new THREE.MeshBasicMaterial({ color: 0x6c6c6c });

  const line = new THREE.Mesh(lineGeometry, lineMaterial);
  const carRoad = new THREE.Mesh(carRoadGeometry, carRoadMaterial);
  const roadMesh = new THREE.Mesh(roadGeometry, roadMaterial);
  const borjur = new THREE.Mesh(borjurGeometry, borjurMaterial);

  for (let i = 0; i < 4; i++) {
    const lineClone = line.clone();
    lineClone.position.set(-45 + i * 30, -6.9, -90);
    scene.add(lineClone);
  }

  carRoad.position.set(0, -7, -80);
  roadMesh.position.set(0, -5.5, -60);
  borjur.position.set(0, -6, -70);

  scene.add(roadMesh);
  scene.add(borjur);
  scene.add(carRoad);
};

const flower = () => {
  const geometry = new THREE.CylinderGeometry(1.5, 1.5, 3, 32);
  const material = new THREE.MeshBasicMaterial({ color: 0x8b4513 });
  const cylinder = new THREE.Mesh(geometry, material);
  const flowerPot = cylinder.clone();
  flowerPot.position.set(-8, -2, -22);
  cylinder.position.set(8, -2, -22);
  scene.add(cylinder);
  scene.add(flowerPot);
};
const house = () => {
  const uudMaterial = new THREE.MeshStandardMaterial({ color: 0x7c7c7c });
  const hanaMaterial = new THREE.MeshBasicMaterial({ color: 0xc9c9c9 });
  const directionalLight = new THREE.DirectionalLight(0x9c9c9c, 10);
  const uudGeometry = new THREE.BoxGeometry(20, 3, 10);
  const uud2Geometry = new THREE.BoxGeometry(70, 5, 60);
  const hanaGeometry = new THREE.BoxGeometry(1, 18, 48);
  const uud = new THREE.Mesh(uudGeometry, uudMaterial);
  const uud2 = new THREE.Mesh(uud2Geometry, uudMaterial);
  const hana = new THREE.Mesh(hanaGeometry, hanaMaterial);
  const hana1 = new THREE.Mesh(hanaGeometry, hanaMaterial);
  directionalLight.castShadow = true;

  uud.position.set(0, -5, -20);
  uud2.position.set(0, -5, 12);
  hana1.position.set(-34.5, 6.5, 18);
  directionalLight.position.set(0, 50, 50);
  hana.position.set(34.5, 6.5, 18);
  scene.add(uud);
  scene.add(uud2);
  scene.add(directionalLight);
  scene.add(hana1);
  scene.add(hana);

  const hanaBosooGeometry = new THREE.BoxGeometry(30, 2, 1);
  const hanaHevteeGeometry = new THREE.BoxGeometry(6, 20, 1);
  const hanaBosooMaterial = new THREE.MeshBasicMaterial({ color: 0xc9c9c9 });
  const hanaBosoo = new THREE.Mesh(hanaHevteeGeometry, hanaBosooMaterial);
  const hana2 = new THREE.Mesh(hanaBosooGeometry, hanaBosooMaterial);
  const hana2Clone = hana2.clone();
  const hanaBosooClone = hanaBosoo.clone();

  const Lhana2Clone = hana2.clone();
  const Lhana21Clone = hana2.clone();
  const Lhana211Clone = hana2.clone();
  const LhanaBosooClone = hanaBosoo.clone();
  const Lhana1BosooClone = hanaBosoo.clone();
  const LhanaGolBosooClone = hanaBosoo.clone();
  const Lhana1GolBosooClone = hanaBosoo.clone();

  Lhana1GolBosooClone.position.set(-20, 4.5, -5.5);
  LhanaGolBosooClone.position.set(20, 4.5, -5.5);
  scene.add(LhanaGolBosooClone);
  scene.add(Lhana1GolBosooClone);

  Lhana211Clone.position.set(0, 14.5, -5.5);
  Lhana2Clone.position.set(20, -1.5, -5.5);
  Lhana21Clone.position.set(20, 14.5, -5.5);
  LhanaBosooClone.position.set(8, 4.5, -5.5);
  Lhana1BosooClone.position.set(31, 5, -5.5);
  scene.add(Lhana1BosooClone);
  scene.add(Lhana2Clone);
  scene.add(Lhana21Clone);
  scene.add(LhanaBosooClone);
  scene.add(Lhana211Clone);

  hanaBosooClone.position.set(-31, 5, -5.5);
  hanaBosoo.position.set(-8, 5, -5.5);
  hana2Clone.position.set(-20, 14.5, -5.5);
  hana2.position.set(-20, -1.5, -5.5);

  const hanaGroup = new THREE.Group();
  hanaGroup.add(hanaBosooClone);
  hanaGroup.add(hanaBosoo);
  hanaGroup.add(hana2);
  hanaGroup.add(hana2Clone);
  scene.add(hanaGroup);

  const tsaadhanaGeometry = new THREE.BoxGeometry(69, 20, 1);
  const tsaadhanaMaterial = new THREE.MeshBasicMaterial({ color: 0xc3c3c3 });
  const tsaadhana = new THREE.Mesh(tsaadhanaGeometry, tsaadhanaMaterial);

  tsaadhana.position.set(0, 5, 41.5);

  scene.add(tsaadhana);
};
const door = () => {
  const doorGeometry = new THREE.BoxGeometry(10, 16, 1);
  const doorMaterial = new THREE.MeshBasicMaterial({ color: 0x714424 });
  const door = new THREE.Mesh(doorGeometry, doorMaterial);
  door.position.set(0, 5.5, -5.5);
  door.name = "door";
  scene.add(door);

  function openDoor() {
    const door = scene.getObjectByName("door");

    if (door) {
      const openAngle = Math.PI / 2;
      door.position.set(4.5, 5.5, -10);

      door.rotation.y += openAngle;
    } else {
      console.error("Door not found in the scene!");
    }
  }
  function closeDoor() {
    const door = scene.getObjectByName("door");

    if (door) {
      const closeAngle = -Math.PI / 2;
      door.rotation.y += closeAngle;
      door.position.set(0, 5.5, -5.5);
    } else {
      console.error("Door not found in the scene!");
    }
  }

  function onKeyDown(event) {
    if (event.key === "o") {
      openDoor();
    }
    if (event.key === "p") {
      closeDoor();
    }
  }

  document.addEventListener("keydown", onKeyDown, false);
};

flower();
ground();
grasses();
fence();
path();
house();
road();
door();
//=========================== animation =========================
function animate() {
  requestAnimationFrame(animate);
  document.addEventListener("mouseup", onMouseUp, false);
  document.addEventListener("mousedown", onMouseDown, false);
  document.addEventListener("mousemove", onMouseMove, false);
  document.addEventListener("wheel", onMouseWheel, { passive: false });
  renderer.render(scene, camera);
}

animate();
