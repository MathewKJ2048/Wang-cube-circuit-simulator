import { BoxGeometry, GridHelper , Mesh, MeshBasicMaterial, PerspectiveCamera, Scene, Vector3, WebGLRenderer } from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";
import type { UIState } from "./UI";
import { TileType, WangFile } from "./logic";
import { Color, Vector } from "./util";
import { getConnectionSize, getCoreSize } from "./render_util";





export const previewW = window.innerHeight/2
export const previewH = previewW

export function getPerspectiveCamera()
{
	return new PerspectiveCamera(75, previewW/previewH, 0.1, 1000)
}

/*
scene is a state variable that lives in this file
no other file should be able to access it
*/

const scene : Scene = new Scene()


export function setUpPreview(ui_state: UIState) : void
{
	const renderer = new WebGLRenderer({ antialias: true });
	renderer.setSize(previewW,previewH);
	renderer.setPixelRatio(previewW/previewH)
	document.getElementById('preview-canvas-container')?.appendChild(renderer.domElement)


	new OrbitControls(ui_state.perspectiveCamera, renderer.domElement)
	ui_state.perspectiveCamera.position.setZ(2)

	function animate()
	{
		requestAnimationFrame(animate)
		renderer.render(scene,ui_state.perspectiveCamera)
	}
	animate()
}

function getLines(m : Mesh) : Mesh[]
{
	if(!(m.geometry instanceof BoxGeometry))
	{
		return []
	}
	const boxGeometry = m.geometry as BoxGeometry;
	const w = boxGeometry.parameters.width
	const h = boxGeometry.parameters.height
	const d = boxGeometry.parameters.depth
	const t = 0.02
	
	const edgeMaterial = new MeshBasicMaterial({ color: Color.toNumber(new Color(255,255,255)) });
	const edgeGroup : Mesh[] = [];

	function createEdge(position: Vector3, dimensions: Vector3)
	{
        const edgeGeo = new BoxGeometry(dimensions.x, dimensions.y, dimensions.z);
        const edgeMesh = new Mesh(edgeGeo, edgeMaterial);
        edgeMesh.position.copy(m.position.clone().add(position));
        edgeGroup.push(edgeMesh);
    };

	const widthWiseDimensions = new Vector3(w,t,t)
	const heightWiseDimensions = new Vector3(t,h,t)
	const depthWiseDimensions = new Vector3(t,t,d)

	//width-wise edges
	createEdge(new Vector3(0,h/2,d/2),widthWiseDimensions)
	createEdge(new Vector3(0,-h/2,d/2),widthWiseDimensions)
	createEdge(new Vector3(0,h/2,-d/2),widthWiseDimensions)
	createEdge(new Vector3(0,-h/2,-d/2),widthWiseDimensions)

	//height-wise edges
	createEdge(new Vector3(w/2,0,d/2),heightWiseDimensions)
	createEdge(new Vector3(w/2,0,-d/2),heightWiseDimensions)
	createEdge(new Vector3(-w/2,0,d/2),heightWiseDimensions)
	createEdge(new Vector3(-w/2,0,-d/2),heightWiseDimensions)

	//depth-wise edges
	createEdge(new Vector3(w/2,h/2,0),depthWiseDimensions)
	createEdge(new Vector3(-w/2,h/2,0),depthWiseDimensions)
	createEdge(new Vector3(w/2,-h/2,0),depthWiseDimensions)
	createEdge(new Vector3(-w/2,-h/2,0),depthWiseDimensions)
	

    return edgeGroup
}

function placeTile(tt : TileType, offset : Vector, wf : WangFile) : void
{
	const m = getCoreSize()
	const c = getConnectionSize()
	const off = m/2+c/4

	function addEdgeLines(m : Mesh)
	{
		getLines(m).forEach(m_ => scene.add(m_))
	}
	function setPosition(cuboidMesh: Mesh, x:number, y:number, z:number)
	{
		cuboidMesh.position.x = offset.x+x
		cuboidMesh.position.y = offset.y+y
		cuboidMesh.position.z = z
	}

	const geometry = new BoxGeometry(m,m,m)
	const material = new MeshBasicMaterial({
	color: Color.toNumber(tt.color)
	});
	const coreCube = new Mesh(geometry, material)
	setPosition(coreCube,0,0,0)
	scene.add(coreCube)
	addEdgeLines(coreCube)

	
	function getColorNumber(s : string) : number
	{
		return Color.toNumber(WangFile.getColorFromString(s,wf))
	}

	const frontMaterial = new MeshBasicMaterial({color: getColorNumber(tt.front)});
	const backMaterial = new MeshBasicMaterial({color: getColorNumber(tt.back)});
	const upMaterial = new MeshBasicMaterial({color: getColorNumber(tt.up)});
	const downMaterial = new MeshBasicMaterial({color: getColorNumber(tt.down)});
	const leftMaterial = new MeshBasicMaterial({color: getColorNumber(tt.left)});
	const rightMaterial = new MeshBasicMaterial({color: getColorNumber(tt.right)});

	const frontBackGeometry = new BoxGeometry(c,c,c/2)
	const upDownGeometry = new BoxGeometry(c,c/2,c)
	const leftRightGeometry = new BoxGeometry(c/2,c,c)
	
	
	const frontCuboid = new Mesh(frontBackGeometry,frontMaterial)
	setPosition(frontCuboid,0,0,off)
	scene.add(frontCuboid)
	addEdgeLines(frontCuboid)

	const backCuboid = new Mesh(frontBackGeometry,backMaterial)
	setPosition(backCuboid,0,0,-off)
	scene.add(backCuboid)
	addEdgeLines(backCuboid)

	const leftCuboid = new Mesh(leftRightGeometry,leftMaterial)
	setPosition(leftCuboid,-off,0,0)
	scene.add(leftCuboid)
	addEdgeLines(leftCuboid)

	const rightCuboid = new Mesh(leftRightGeometry,rightMaterial)
	setPosition(rightCuboid,off,0,0)
	scene.add(rightCuboid)
	addEdgeLines(rightCuboid)

	const upCuboid = new Mesh(upDownGeometry,upMaterial)
	setPosition(upCuboid,0,off,0)
	scene.add(upCuboid)
	addEdgeLines(upCuboid)

	const downCuboid = new Mesh(upDownGeometry,downMaterial)
	setPosition(downCuboid,0,-off,0)
	scene.add(downCuboid)
	addEdgeLines(downCuboid)
}

function rebuildScene(ui_state : UIState, wf : WangFile) : void
{
	while(scene.children.length > 0){ 
		scene.remove(scene.children[0]); 
	}

	const pt = ui_state.getPickedToken()
	if(pt === null)return
	if(TileType.isTileType(pt))
	{
		placeTile(pt,new Vector(0,0),wf)
		const gridHelper = new GridHelper(3, 3);
		gridHelper.rotation.x = Math.PI / 2;
		scene.add(gridHelper);
	}
	
}

// called from updateEditor since the preview cannot call any other updates
export function updatePreview(ui_state : UIState, wf : WangFile)
{
	rebuildScene(ui_state, wf)
}