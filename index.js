import * as THREE from 'three';
import {OrbitControls} from 'https://cdn.jsdelivr.net/npm/three@0.164.1/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui';

//dat gui for edits
const gui = new dat.GUI();
const world = {
  plane: {
    width: 10,
    height: 10,
    widthSegments: 10,
    heightSegments: 10
  }
}

//adjust width
gui.add(world.plane, 'width', 1, 20).onChange(generatePlane);

//adjust height
gui.add(world.plane, 'height', 1, 20).onChange(generatePlane);

//adjust width segments 
gui.add(world.plane, 'widthSegments', 1, 50).onChange(generatePlane);

//adjust height segments 
gui.add(world.plane, 'heightSegments', 1, 50).onChange(generatePlane);

function generatePlane() {
  planeMesh.geometry.dispose();
  planeMesh.geometry = new THREE.PlaneGeometry(world.plane.width, world.plane.height,world.plane.widthSegments,world.plane.heightSegments);

  const {array} = planeMesh.geometry.attributes.position;

  for(let i = 0; i < array.length; i+= 3){
    const x = array[i];
    const y = array[i + 1];
    const z = array[i + 2];

    array[i + 2] = z + Math.random();
}
}
// creating a scene
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(devicePixelRatio);
document.body.appendChild(renderer.domElement);

new OrbitControls(camera, renderer.domElement);
camera.position.z = 5;

const planeGeometry = new THREE.PlaneGeometry(5,5,10,10);
const planeMaterial = new THREE.MeshPhongMaterial({ color: 0xff0000, side: THREE.DoubleSide, flatShading: true});
const planeMesh = new THREE.Mesh(planeGeometry, planeMaterial);
scene.add(planeMesh);

//Plane texture
const {array} = planeMesh.geometry.attributes.position
console.log(planeMesh.geometry.attributes.position.array);
  for(let i = 0; i < array.length; i+= 3){
    const x = array[i];
    const y = array[i + 1];
    const z = array[i + 2];

    array[i + 2] = z + Math.random();
}

//adding light
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(0, 0, 1);
scene.add(light);

const backLight = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(0, 0, -1);
scene.add(backLight);

function animate() {
  requestAnimationFrame(animate)
  // render the scene
  renderer.render(scene, camera)
  // planeMesh.rotation.x += 0.01
  // planeMesh.rotation.y += 0.01
}

animate();