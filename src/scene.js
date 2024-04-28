import * as THREE from "three";
import { PLYLoader } from "three/examples/jsm/loaders/PLYLoader.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { VOXLoader } from "three/examples/jsm/loaders/VOXLoader.js";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader.js";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader.js";
const loader = new GLTFLoader();

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
  const groundMaterial = new THREE.MeshLambertMaterial({
    color: 0x138510,
    side: THREE.DoubleSide,
  });
  const ground = new THREE.Mesh(groundGeometry, groundMaterial);
  ground.rotation.x = Math.PI / 2;
  ground.position.y = -5;
  scene.add(ground);
};

const grasses = () => {
  const grassMaterial = new THREE.MeshLambertMaterial({ color: 0x135510 });
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
  const woodenMaterial = new THREE.MeshLambertMaterial({ map: woodenTexture });
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
  const groundMaterial = new THREE.MeshLambertMaterial({
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
  const pathMaterial = new THREE.MeshLambertMaterial({ map: stoneTexture });
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
  const lineMaterial = new THREE.MeshLambertMaterial({ color: 0xffffff });
  const carRoadMaterial = new THREE.MeshLambertMaterial({ color: 0x8c8c8c });
  const roadMaterial = new THREE.MeshLambertMaterial({ color: 0x7c7c7c });
  const borjurMaterial = new THREE.MeshLambertMaterial({ color: 0x6c6c6c });

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
  const material = new THREE.MeshLambertMaterial({ color: 0x8b4513 });
  const cylinder = new THREE.Mesh(geometry, material);
  const flowerPot = cylinder.clone();
  flowerPot.position.set(-8, -2, -22);
  cylinder.position.set(8, -2, -22);
  scene.add(cylinder);
  scene.add(flowerPot);
};

const house = () => {
  const uudMaterial = new THREE.MeshStandardMaterial({ color: 0x7c7c7c });
  const hanaMaterial = new THREE.MeshLambertMaterial({ color: 0xc9c9c9 });
  const directionalLight = new THREE.DirectionalLight(0x9c9c9c, 10);
  const uudGeometry = new THREE.BoxGeometry(20, 3, 10);
  const uud2Geometry = new THREE.BoxGeometry(70, 5, 60);
  const hanaGeometry = new THREE.BoxGeometry(1, 18, 48);
  const uud = new THREE.Mesh(uudGeometry, uudMaterial);
  const uud2 = new THREE.Mesh(uud2Geometry, uudMaterial);
  const hana = new THREE.Mesh(hanaGeometry, hanaMaterial);
  const hana1 = new THREE.Mesh(hanaGeometry, hanaMaterial);
  // directionalLight.castShadow = true;

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
  const hanaBosooMaterial = new THREE.MeshLambertMaterial({ color: 0xc9c9c9 });
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

  const tsaadhanaGeometry = new THREE.BoxGeometry(69, 18, 1);
  const tsaadhanaMaterial = new THREE.MeshLambertMaterial({ color: 0xc3c3c3 });
  const tsaadhana = new THREE.Mesh(tsaadhanaGeometry, tsaadhanaMaterial);

  tsaadhana.position.set(0, 6.5, 41.5);

  scene.add(tsaadhana);
};

const door = () => {
  const doorGeometry = new THREE.BoxGeometry(10, 16, 1);
  const doorMaterial = new THREE.MeshLambertMaterial({ color: 0x714424 });
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

const light = () => {
  var light = new THREE.PointLight(0xffffff, 10000, 10000);
  var light1 = new THREE.PointLight(0xffffff, 10000, 10000);
  var light2 = new THREE.PointLight(0xffffff, 10000, 10000);
  var light3 = new THREE.PointLight(0xffffff, 10000, 10000);
  light.position.set(0, 60, -30);
  light3.position.set(-100, 60, 10);
  light2.position.set(100, 50, 10);
  light1.position.set(0, 50, 20);
  scene.add(light);
  scene.add(light2);
  scene.add(light3);
  scene.add(light1);
};

const createWindow = (a, b, c, d, e) => {
  const windowGeometry = new THREE.BoxGeometry(6, 0.5, 1);
  const windowMaterial = new THREE.MeshLambertMaterial({ color: 0x000020 });
  const windowMesh = new THREE.Mesh(windowGeometry, windowMaterial);
  windowMesh.position.set(a, b, c);
  scene.add(windowMesh);

  const windowupGeometry = new THREE.BoxGeometry(0.5, 13.5, 1);

  const windowUpMesh = new THREE.Mesh(windowupGeometry, windowMaterial);
  const windowUpMesh1 = new THREE.Mesh(windowupGeometry, windowMaterial);
  windowUpMesh.position.set(d, e, -5.5);
  windowUpMesh1.position.set(d, e, -5.5);
  scene.add(windowUpMesh);
  scene.add(windowUpMesh1);

  const glassGeometry = new THREE.BoxGeometry(5, 13.25, 1);
  const glassMaterial = new THREE.MeshBasicMaterial({
    color: 0x000055,
    transparent: true,
    opacity: 0.15,
  });
  const glass = new THREE.Mesh(glassGeometry, glassMaterial);
  glass.position.set(a, 6.5, -5.5);
  scene.add(glass);
};
const zuragt = () => {
  // Create TV
  function createStink(stink) {
    const tvGeometry = new THREE.BoxGeometry(4, 2.5, 0.1);
    const tvMaterial = new THREE.MeshLambertMaterial({ color: 0x808080 });
    const tv = new THREE.Mesh(tvGeometry, tvMaterial);
    tv.position.z = 0.01;
    tv.position.y = 1.7;

    // Create screen with video texture
    const video = document.createElement("video");
    video.src = "your-video-url.mp4";
    video.crossOrigin = "anonymous";
    video.loop = true;
    video.muted = true;
    video.play();

    const texture = new THREE.VideoTexture(video);
    texture.minFilter = THREE.LinearFilter;
    texture.magFilter = THREE.LinearFilter;
    texture.format = THREE.RGBFormat;

    const screenGeometry = new THREE.PlaneGeometry(3.8, 2.1);
    const screenMaterial = new THREE.MeshLambertMaterial({ map: texture });
    const screen = new THREE.Mesh(screenGeometry, screenMaterial);
    screen.position.z = 0.1;
    screen.position.y = 1.75;

    // Create stand
    const standGeometry = new THREE.BoxGeometry(9, 0.9, 0.9);
    const standMaterial = new THREE.MeshLambertMaterial({ color: 0x444444 });
    const stand = new THREE.Mesh(standGeometry, standMaterial);
    stand.position.y = 0.04;
    stand.position.z = 0.1;

    // Create left door
    const leftDoorGeometry = new THREE.BoxGeometry(4.5, 0.9, 0.05);
    const leftDoorMaterial = new THREE.MeshLambertMaterial({ color: 0xa9a9a9 });
    const leftDoor = new THREE.Mesh(leftDoorGeometry, leftDoorMaterial);
    leftDoor.position.x = -2.26;
    leftDoor.position.y = 0.05;
    leftDoor.position.z = 0.545; // Adjust this value as needed

    // Create left door hinge
    const leftDoorHingeGeometry = new THREE.BoxGeometry(0.1, 0.1, 0.1);
    const leftDoorHingeMaterial = new THREE.MeshLambertMaterial({
      color: 0x888888,
    });
    const leftDoorHinge = new THREE.Mesh(
      leftDoorHingeGeometry,
      leftDoorHingeMaterial
    );
    leftDoorHinge.position.x = -2.3; // Adjust position based on door position
    leftDoorHinge.position.y = 0.05;
    leftDoorHinge.position.z = 0.565; // Adjust position based on door position

    // Create right door
    const rightDoorGeometry = new THREE.BoxGeometry(4.5, 0.9, 0.05);
    const rightDoorMaterial = new THREE.MeshLambertMaterial({
      color: 0xa9a9a9,
    });
    const rightDoor = new THREE.Mesh(rightDoorGeometry, rightDoorMaterial);
    rightDoor.position.x = 2.26;
    rightDoor.position.y = 0.05;
    rightDoor.position.z = 0.545; // Adjust this value as needed

    // Create right door hinge
    const rightDoorHingeGeometry = new THREE.BoxGeometry(0.1, 0.1, 0.1);
    const rightDoorHingeMaterial = new THREE.MeshLambertMaterial({
      color: 0x888888,
    });
    const rightDoorHinge = new THREE.Mesh(
      rightDoorHingeGeometry,
      rightDoorHingeMaterial
    );
    rightDoorHinge.position.x = 2.3; // Adjust position based on door position
    rightDoorHinge.position.y = 0.05;
    rightDoorHinge.position.z = 0.565; // Adjust position based on door position

    const stinkGroup = new THREE.Group();
    stinkGroup.add(
      tv,
      stand,
      screen,
      rightDoorHinge,
      leftDoorHinge,
      leftDoor,
      rightDoor
    ); // Add TV, stand, and screen to stinkGroup

    return stinkGroup;
  }
  const allah = createStink();
  allah.position.set(-0.1, -2, 40);
  allah.rotation.y = Math.PI;
  scene.add(allah);

  // Define the scale factors for each axis
  const scaleX = 3.3; // Scale factor along the x-axis
  const scaleY = 3.3; // Scale factor along the y-axis
  const scaleZ = 3.3; // Scale factor along the z-axis

  // Apply scaling to the object
  allah.scale.set(scaleX, scaleY, scaleZ);
};

const stand = (a, b, c) => {
  const geometry = new THREE.CylinderGeometry(1.5, 1.5, 20, 32);
  const material = new THREE.MeshLambertMaterial({ color: 0xffffff });
  const cylinder = new THREE.Mesh(geometry, material);
  cylinder.position.set(a, b, c);
  scene.add(cylinder);
};
const carpet = () => {
  // Load the texture image
  const textureLoader = new THREE.TextureLoader();
  const texture = textureLoader.load(
    "https://media.istockphoto.com/id/183236859/photo/grey-carpet.jpg?s=612x612&w=0&k=20&c=NChjhIROKzSWCGCUpzATKbwlV6ovPHvDXkj4ue97pX8="
  );

  // Create material with the texture
  const carpetMaterial = new THREE.MeshBasicMaterial({ map: texture });

  // Create carpet geometry and apply the material
  const carpetGeometry = new THREE.BoxGeometry(10, 0.1, 5); // Adjust size as needed
  const carpet = new THREE.Mesh(carpetGeometry, carpetMaterial);
  carpet.position.set(-0.7, -2, 21);
  carpet.scale.set(3, 2, 4); // Adjust the scale factors as needed
  scene.add(carpet);
};

const roof1 = () => {};

const flowers = () => {
  loader.load(
    "../icon/blue_flower_animated.glb",
    function (gltf) {
      // Set the position of the model
      gltf.scene.position.set(65, 29.2, -68);
      gltf.scene.rotation.y = Math.PI / 2;

      // Scale down the model
      gltf.scene.scale.set(10, 10, 10);

      scene.add(gltf.scene);
    },
    function (xhr) {
      console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
    },
    function (error) {
      console.error("Error loading GLTF model", error);
    }
  );
};

flowers();
carpet();
roof1();
zuragt();
flower();
ground();
grasses();
fence();
path();
house();
road();
stand(32, 5, -16);
stand(-32, 5, -16);
stand(8, 5, -16);
stand(-8, 5, -16);
door();

createWindow(14, -0.25, -5.5, 11.25, 6.75);
createWindow(14, 13.25, -5.5, 16.75, 6.75);

createWindow(25.5, 13.25, -5.5, 16.75 + 6, 6.75);
createWindow(14 + 11.5, -0.25, -5.5, 11.25 + 17, 6.75);

createWindow(-25.5, 13.25, -5.5, -16.75 - 6, 6.75);
createWindow(-37 + 11.5, -0.25, -5.5, -11.25 - 17, 6.75);

createWindow(-14, -0.25, -5.5, -16.75, 6.75);
createWindow(-14 + 0, 13.25, -5.5, -11.25, 6.75);
light();
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
