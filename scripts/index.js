//variables
const
  scene = new THREE.Scene(),
  canvasWidth = window.innerWidth,
  canvasHeight = window.innerHeight,
  showScore = document.getElementById('show-score'),
  fov = 60,
  aspect = canvasWidth / canvasHeight,
  near = 0.1,
  far = 200,
  camera = new THREE.PerspectiveCamera(fov, aspect, near, far),
  renderer = new THREE.WebGLRenderer({
    alpha: true,
    premultipliedAlpha: false
  }),
  hemiLight = new THREE.HemisphereLight(0xffffbb, 0x080820, 0.6),
  hemiLightR = new THREE.HemisphereLight(0xffffbb, 0x080820, 0.4),
  ambiLight = new THREE.AmbientLight(0x404040, 0.5),
  geometry = new THREE.BoxGeometry(5, 5, 5),
  material = new THREE.MeshToonMaterial({ color: '#D9DD92' }),
  cube = new THREE.Mesh(geometry, material),
  screenRender = renderer.domElement,
  raycaster = new THREE.Raycaster(),
  spherePointer = new THREE.CircleGeometry(1, 16),
  sphereMat = new THREE.MeshBasicMaterial({ color: 0xffff00 }),
  pointer = new THREE.Vector2();

let
  once = true,
  gravity = 0.2,
  score = 0,
  picky;

screenRender.id = 'canvasScreen'

//set some options
renderer.setSize(canvasWidth, canvasHeight)
hemiLightR.translateX(10)

//put the screen on the DOM
document.body.appendChild(screenRender)

//add elements to the scene
scene.add(cube, hemiLight, hemiLightR, ambiLight)
//positioning the cam
camera.position.z = 30


function animate() { //main function
  requestAnimationFrame(animate)
  raycaster.setFromCamera(pointer, camera)
  cubeAction()
  renderer.render(scene, camera);
}

function cubeAction() {//this function will animate the cube
  cube.rotation.x += 0.02
  cube.rotation.y += 0.02
  cube.position.y -= gravity
  if (cube.position.y < -25) {
    score -= 15
    showScore.innerText = score
    newCicle()
  }
}

function newCicle() {//reset the cube position
  cube.position.y = 25
  cube.position.x = rendomiser(-10, 10)
  cube.material.color.set(newColor())
  if (picky) {
    picky.visible = true
  }
  once = true
}

function rendomiser(min, max) { //helper function to randomize the stuff
  return Math.floor(Math.random() * (max - min)) + min
}

function newColor() {//create new hsl color for every cicle
  return `hsl(${rendomiser(100, 300)}, ${rendomiser(50, 100)}%, 50%)`
}

function onPointerMove(event) {// calculate pointer position 
  pointer.x = (event.clientX / window.innerWidth) * 2 - 1
  pointer.y = - (event.clientY / window.innerHeight) * 2 + 1
}

function checkPointer() {//check if the cursor is on top of the cube
  const intersects = raycaster.intersectObjects(scene.children)
  if (intersects.length && once) {
    picky = intersects[0].object
    once = false
    picky.visible = false
    score += 10
    showScore.innerText = score

    newCicle()
  }
}

screenRender.addEventListener('pointermove', onPointerMove);
screenRender.addEventListener('click', checkPointer);

animate();