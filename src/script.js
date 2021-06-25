import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as dat from "dat.gui";

//Loading

const textureLoader = new THREE.TextureLoader();
const normalTexture = textureLoader.load("/textures/NormalMap.png");

// Debug
// const gui = new dat.GUI();

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

// Objects
const geometry = new THREE.SphereBufferGeometry(0.5, 64, 64);

// Materials

const material = new THREE.MeshStandardMaterial();
material.metalness = 0.5;
material.roughness = 0.2;
material.normalMap = normalTexture;

material.color = new THREE.Color(0x292929);

// Mesh
const sphere = new THREE.Mesh(geometry, material);
scene.add(sphere);

// Lights --------------------------- & GUI

////////// LIGHT 1
const pointLight1 = new THREE.PointLight(0xffffff, 0.1);
pointLight1.position.x = 2;
pointLight1.position.y = 3;
pointLight1.position.z = 4;
pointLight1.intensity = 0;
scene.add(pointLight1);

// const light1 = gui.addFolder("Light 1");

// light1.add(pointLight1.position, "x").min(-13).max(3).step(0.01);
// light1.add(pointLight1.position, "y").min(-6).max(3).step(0.01);
// light1.add(pointLight1.position, "z").min(-13).max(3).step(0.01);
// light1.add(pointLight1, "intensity").min(0).max(10).step(0.01);

// const light1Color = {
// 	color: 0xff0000,
// };

// light1.addColor(light1Color, "color").onChange(() => {
// 	pointLight1.color.set(light1Color.color);
// });

// const pointLightHelper1 = new THREE.PointLightHelper(pointLight1, 0.5);
// scene.add(pointLightHelper1);

/////// LIGHT 2

const pointLight2 = new THREE.PointLight(0x249d, 0.1);
pointLight2.position.x = 3;
pointLight2.position.y = 2.3;
pointLight2.position.z = -1.46;
pointLight2.intensity = 3.13;
scene.add(pointLight2);

// const light2 = gui.addFolder("Light 2");

// light2.add(pointLight2.position, "x").min(-13).max(3).step(0.01);
// light2.add(pointLight2.position, "y").min(-6).max(3).step(0.01);
// light2.add(pointLight2.position, "z").min(-13).max(3).step(0.01);
// light2.add(pointLight2, "intensity").min(0).max(10).step(0.01);

// const light2Color = {
// 	color: 0xff0000,
// };

// light2.addColor(light2Color, "color").onChange(() => {
// 	pointLight2.color.set(light2Color.color);
// });

// const pointLightHelper2 = new THREE.PointLightHelper(pointLight2, 0.5);
// scene.add(pointLightHelper2);

//////////// Light 3

const pointLight3 = new THREE.PointLight(0xff3f00, 0.1);
pointLight3.position.x = -3.4;
pointLight3.position.y = -2;
pointLight3.position.z = -0.03;
pointLight3.intensity = 1.5;

scene.add(pointLight3);

// const light3 = gui.addFolder("Light 3");

// light3.add(pointLight3.position, "x").min(-13).max(3).step(0.01);
// light3.add(pointLight3.position, "y").min(-6).max(3).step(0.01);
// light3.add(pointLight3.position, "z").min(-13).max(3).step(0.01);
// light3.add(pointLight3, "intensity").min(0).max(10).step(0.01);

// const light3Color = {
// 	color: 0xff0000,
// };

// light3.addColor(light3Color, "color").onChange(() => {
// 	pointLight3.color.set(light3Color.color);
// });

// const pointLightHelper3 = new THREE.PointLightHelper(pointLight3, 0.5);
// scene.add(pointLightHelper3);

/**
 * Sizes
 */
const sizes = {
	width: window.innerWidth,
	height: window.innerHeight,
};

window.addEventListener("resize", () => {
	// Update sizes
	sizes.width = window.innerWidth;
	sizes.height = window.innerHeight;

	// Update camera
	camera.aspect = sizes.width / sizes.height;
	camera.updateProjectionMatrix();

	// Update renderer
	renderer.setSize(sizes.width, sizes.height);
	renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
	75,
	sizes.width / sizes.height,
	0.1,
	100
);
camera.position.x = 0;
camera.position.y = 0;
camera.position.z = 2;
scene.add(camera);

// Controls
// const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
	canvas: canvas,
	alpha: true,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */

document.addEventListener("mousemove", onDocumentMouseMove);

let mouseX = 0;
let mouseY = 0;
let targetX = 0;
let targetY = 0;

const windowHalfX = window.innerWidth / 2;
const windowHalfY = window.innerHeight / 2;

function onDocumentMouseMove(event) {
	mouseX = event.clientX - windowHalfX;
	mouseY = event.clientY - windowHalfY;
}

const updateSphere = (event) => {
	sphere.position.y = window.scrollY * 0.001;
};

window.addEventListener("scroll", updateSphere);

const clock = new THREE.Clock();

const tick = () => {
	targetX = mouseX * 0.001;
	targetY = mouseY * 0.001;

	const elapsedTime = clock.getElapsedTime();

	// Update objects
	sphere.rotation.y = 0.5 * elapsedTime;

	sphere.rotation.y += 0.5 * (targetX - sphere.rotation.y);
	sphere.rotation.x += 0.5 * (targetY - sphere.rotation.x);
	sphere.position.z += -1 * (targetY - sphere.rotation.x);
	// Update Orbital Controls
	// controls.update()

	// Render
	renderer.render(scene, camera);

	// Call tick again on the next frame
	window.requestAnimationFrame(tick);
};

tick();

class TypeWriter {
	constructor(txtElement, words, wait = 3000) {
		this.txtElement = txtElement;
		this.words = words;
		this.txt = "";
		this.wordIndex = 0;
		this.wait = parseInt(wait, 10);
		this.type();
		this.isDeleting = false;
	}

	type() {
		// Current index of word
		const current = this.wordIndex % this.words.length;
		// Get full text of current word
		const fullTxt = this.words[current];

		// Check if deleting
		if (this.isDeleting) {
			// Remove char
			this.txt = fullTxt.substring(0, this.txt.length - 1);
		} else {
			// Add char
			this.txt = fullTxt.substring(0, this.txt.length + 1);
		}

		// Insert txt into element
		this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;

		// Initial Type Speed
		let typeSpeed = 300;

		if (this.isDeleting) {
			typeSpeed /= 2;
		}

		// If word is complete
		if (!this.isDeleting && this.txt === fullTxt) {
			// Make pause at end
			typeSpeed = this.wait;
			// Set delete to true
			this.isDeleting = true;
		} else if (this.isDeleting && this.txt === "") {
			this.isDeleting = false;
			// Move to next word
			this.wordIndex++;
			// Pause before start typing
			typeSpeed = 500;
		}

		setTimeout(() => this.type(), typeSpeed);
	}
}

// Init On DOM Load
document.addEventListener("DOMContentLoaded", init);

// Init App
function init() {
	const txtElement = document.querySelector(".txt-type");
	const words = JSON.parse(txtElement.getAttribute("data-words"));
	const wait = txtElement.getAttribute("data-wait");
	// Init TypeWriter
	new TypeWriter(txtElement, words, wait);
}
