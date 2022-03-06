//variables
const
  scene = new THREE.Scene(),
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000),
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
  colors = ['#DD6031', '#6689A1', '#EABE7C', '#ECE4B7', '#D9DD92', '#995D81', '#F6F740'],
  maxColors = colors.length,
  screenRender = renderer.domElement

screenRender.id = 'canvasScreen'

//set some options
renderer.setSize(600, 400)
hemiLightR.translateX(10)

//put the screen on the DOM
document.body.appendChild(screenRender)

//add elements to the scene
scene.add(cube, hemiLight, hemiLightR, ambiLight)
//positioning the cam
camera.position.z = 25


function animate() { //this function will animate the cube
  requestAnimationFrame(animate);
  cube.rotation.x += 0.02;
  cube.rotation.y += 0.02;
  cube.position.y -= 0.2
  if (cube.position.y < -25) {
    cube.position.y = 25
    cube.position.x = rendomiser(-10, 10)
    let newColor = colors[rendomiser(0, maxColors)]
    cube.material.color.set(newColor)
    // console.log(newColor)
  }
  renderer.render(scene, camera);
}


function rendomiser(min, max) { //helper function to randomize the stuff
  return Math.floor(Math.random() * (max - min)) + min
}


animate();
