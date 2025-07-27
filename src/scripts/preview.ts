import { Mesh, MeshBasicMaterial, PerspectiveCamera, Scene, TorusGeometry, WebGLRenderer } from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";
import type { UIState } from "./UI";
import type { WangFile } from "./logic";


// import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

export const previewW = window.innerHeight/2
export const previewH = previewW

export function getPerspectiveCamera()
{
	return new PerspectiveCamera(75, previewW/previewH, 0.1, 1000)
}

function getScene(ui_state: UIState, wf : WangFile) : Scene
{
	const scene : Scene = new Scene()
	console.log(wf)
	const geometry = new TorusGeometry(10, 3, 16, 100)
	const material = new MeshBasicMaterial({
		color: 0xFF6347
	});

	ui_state.perspectiveCamera.position.setZ(30)

	const torus = new Mesh(geometry, material)

	scene.add(torus)
	return scene
}

export function setUpPreview(ui_state: UIState, wf : WangFile) : void
{
	const renderer = new WebGLRenderer({ antialias: true });
	renderer.setSize(previewW,previewH);
	renderer.setPixelRatio(previewW/previewH)
	document.getElementById('preview-canvas-container')?.appendChild(renderer.domElement)

	new OrbitControls(ui_state.perspectiveCamera, renderer.domElement)

	function animate()
	{
		requestAnimationFrame(animate)
		renderer.render(getScene(ui_state,wf),ui_state.perspectiveCamera)
	}
	animate()
	console.log("preview setup complete")
}



export function previewCanvastest() : void
{
	const scene : Scene = new Scene()

	console.log("scene created")

	


	const renderer = new WebGLRenderer({ antialias: true });

	const W = window.innerHeight/2
	const H = window.innerHeight/2
	
	renderer.setSize(W,H);
	renderer.setPixelRatio(W/H)

	document.getElementById('preview-canvas-container')?.appendChild(renderer.domElement)
	console.log(renderer.domElement)
	
	
	// 3. Verify WebGL context was created
	if (!renderer.getContext()) {
		throw new Error('WebGL context creation failed');
	}
	console.log("Renderer successfully created with custom canvas");

	const camera = new PerspectiveCamera(75, W/H, 0.1, 1000)

	console.log("camera created")
	camera.position.setZ(30)



	renderer.render(scene, camera)

	new OrbitControls(camera, renderer.domElement)

	const geometry = new TorusGeometry(10, 3, 16, 100)
	const material = new MeshBasicMaterial( {
		color: 0xFF6347
	});

	const torus = new Mesh(geometry, material)

	scene.add(torus)
	renderer.render(
		scene, camera
	)

	function animate()
	{
		requestAnimationFrame(animate)
		renderer.render(scene, camera)
	}
	animate()
}

