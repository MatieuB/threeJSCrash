'use strict'
console.log('connected');
var w = window.innerWidth;
var h = window.innerHeight
var scene = new THREE.Scene();
var camera = new
 THREE.PerspectiveCamera(75,w/h,0.1,1000);
// camera params
// field of view 75 degrees, bigger = see more
// ratio: w/h
// near  & farclipping plane
var cube,fighter;
var renderer = new THREE.WebGLRenderer();
renderer.setSize(w,h);

// adding a skybox for virtual environment...later
// var skyBox = new THREE.BoxGeometry(10000,10000,10000)
// var boxMaterials = [
//   new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load("hw_sahara/sahara_bk.tga"),side:THREE.DoubleSide}),
//   new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load("hw_sahara/sahara_dn.tga"),side:THREE.DoubleSide}),
//   new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load("hw_sahara/sahara_ft.tga"),side:THREE.DoubleSide}),
//   new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load("hw_sahara/sahara_lf.tga"),side:THREE.DoubleSide}),
//   new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load("hw_sahara/sahara_rt.tga"),side:THREE.DoubleSide}),
//   new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load("hw_sahara/sahara_up.tga"),side:THREE.DoubleSide})
// ]
// scene.add(skyBox)

document.body.appendChild(renderer.domElement);
// account for window resizes
window.addEventListener('resize',()=>{
  console.log("being resized....");
  var width = window.innerWidth;
  var height = window.innerHeight;
  renderer.setSize(width,height);
  camera.aspect = width/height;
  // keeps same ratios-no distoriton
  camera.updateProjectionMatrix();


})
var controls = new THREE.OrbitControls(camera,renderer.domElement)


// do a tausus geometry example
// create shape
// var geometry = new THREE.TorusKnotGeometry(5, 3, 30, 12)

function makeCubes(a,b,c,d,e,f){

  var loader = new THREE.TextureLoader()
  var shapeMaterials = [
    new THREE.MeshLambertMaterial({map: loader.load("images/dino.png"),side:THREE.DoubleSide}),
    new THREE.MeshLambertMaterial({map: loader.load("images/question.jpeg"),side:THREE.DoubleSide}),
    new THREE.MeshLambertMaterial({map: loader.load("images/question.jpeg"),side:THREE.DoubleSide}),
    new THREE.MeshPhongMaterial({map: loader.load("images/question.jpeg"),side:THREE.DoubleSide}),
    new THREE.MeshPhongMaterial({map: loader.load("images/question.jpeg"),side:THREE.DoubleSide}),
    new THREE.MeshPhongMaterial({map: loader.load("images/question.jpeg"),side:THREE.DoubleSide})
  ]
  var material = new THREE.MultiMaterial(
    shapeMaterials
  )
  var geometry = new THREE.BoxGeometry( a,b,c );
  cube = new THREE.Mesh( geometry, material );
  cube.position.set(d,e,f);
  scene.add( cube );
}
for (var i = 0; i < 200; i++) {
  var r1 = Math.floor(Math.random()*2)
  var r2 = Math.floor(Math.random()*2)
  var r3 = Math.floor(Math.random()*2)
  var r4 = Math.floor(Math.random()*-40)
  var r5 = Math.floor(Math.random()*30)
  var r6 = Math.floor(Math.random()*-30)
  makeCubes(r1,r2,r3,r4,r5,r6)

}
// create material color or image texture

// // add shape to scene
// var shape = new THREE.Mesh(geometry,material);
// scene.add(shape);

camera.position.z = 4;

// mesh based material does not need light
// lambert - matte
// phong - shiny,
// blinn- in between

// takes color and intensity values
var ambientLight = new THREE.AmbientLight(0xFFFFFF,2.0)
var light1 = new THREE.PointLight(0xff0040,4,40)
var light2 = new THREE.PointLight(0xff0070,2,30)
var light3 = new THREE.PointLight(0xff0FFF,6,50)
var light4 = new THREE.PointLight(0xffffff,3,48)
var dirLight = new THREE.DirectionalLight(0xffffff,0,1,0)
scene.add(dirLight)
var spot = new THREE.SpotLight(0xf45f90,20)
spot.position.set(0,5,0)
scene.add(spot);
var lights = [light1,light2,light3,light4];
for (var i = 0; i < lights.length; i++) {
  scene.add(lights[i])
}
// game logic
// draw
function render() {
  renderer.render(scene,camera)
}
// loading in a model!!!
var tieLoader = new THREE.ObjectLoader();
// tieLoader.name = "fighter"
// tieLoader.position(5,5,5)
tieLoader.load("models/tieFighter.json",object=>{
  object.name = "fighter"
  scene.add(object)
  fighter = scene.getObjectByName("fighter")
  console.log('================',fighter);
})
// fighter.position.set(5,5,5)

function update() {
  cube.rotation.x += 0.002;
  cube.rotation.y += 0.005;
  var time = Date.now() * 0.005;
  // look into who the sin/cos is changing light
  light1.position.x = Math.sin(time*0.7)*30
  light1.position.y = Math.cos(time*0.5)*40
  light2.position.x = Math.sin(time*0.7)*30
  light2.position.y = Math.cos(time*0.5)*40
  light3.position.x = Math.sin(time*0.7)*30
  light3.position.y = Math.cos(time*0.5)*40
  light4.position.x = Math.sin(time*0.7)*30
  light4.position.y = Math.sin(time*0.5)*40
  fighter.rotation.y -= 0.005;
  fighter.rotation.x -= 0.007;
  fighter.position.y += 0.005;
  fighter.position.z -= 0.009;

  // shape.rotation.y -= 0.005;
  // shape.position.x += 0.0001;
  // shape.position.y += 3;
}
// specifies update/render/repeat
// game loop: init, update, draw
function gameLoop() {
  requestAnimationFrame(gameLoop)
  update()
  render()
}
gameLoop();
