var arrayX = [];
var arrayY = [];
var arrayZ = [];
var arrX = [];
var arrY = [];
var arrZ = [];
var lines;
var temp;
var cam;
var vs;
var chars = [];
var bg = 255;
var stk = 255;
var fll= 0;
var stkw = 3;
var aspect;
var fs = false;
var cc = 0;
var c2 = 1;
var alpha = 0;
var beta = 0;
var gamma = 0;
var transparency = 255;
var transparency2 = 255;
var counter = 0;
var counter2 = 0;
var limit =25000;
var timing = 0;
var timing2 = 0;
var back = 255;

function preload() {
   MonoThin = loadFont('SuisseIntlMono-Thin-WebXL.ttf');
   MonoRegular = loadFont('SuisseIntlMono-Regular-WebXL.ttf')
   lines = loadStrings('paper2_Pointcloud_DEL4.txt');
}
/////////////////
////////////////
function setup() {
  if (window.DeviceOrientationEvent) {
     window.addEventListener('deviceorientation', onOrientationChange);
   }

vs = createVector(300,0,1200);
createCanvas(windowWidth,windowHeight, WEBGL);

left = createA('site', 'Home');
right = createA('team', 'Team');
tads = createA('http://t-ads.org', 'T_ADS', '_blank');
uni = createA('https://arch.t.u-tokyo.ac.jp', 'UTokyo', '_blank');

exit = createElement('h2', 'x');
exit.class('button');

maintext = createElement('div', '<h2 style="font-family: SuisseIntlMono-Regular-WebXL; background: rgba(255,255,255,0);"> Hardware configuration</h2> We selected a budget 2D LIDAR from the company <a href=https://www.slamtec.com/en/Lidar/A1 style="font-size: 100%; text-decoration: UNDERLINE;">SLAMTEC</a> due to its relatively low price and simple open source interface. Its relatively light data load, averaging at around 2000 to 4000 points per second in real world situations proved to be essential in real-time data acquisition and 3D mapping. The LIDAR is mounted to an HTC VIVE controller using a series of bolted together 3D-printed elements. This system provides an adequate distance between fingers on the controller and the spinning laser rangefinding module and ensures adequate visibility of tracking points on the controller itself. The controller handle blocks 22° of the LIDAR`s 360° scan radius. <img src="images/axon.png" alt="axon"> The existing trigger, buttons, and touchpad of the VR hardware are utilized for fine-grain user scanning control of the virtual experience, furthering the possibilities of interaction. Scanning only occurs when the trigger is held down. Upon release, the newest points are suspended in time until replaced by further scanning. With the touchpad, both the scan radius and distance can be defined; the X axis serves as a slider ranging from 0° to 320°, and the Y axis on touchpad press serves as a distance delimiter ranging from 0 to 12 meters. <h2 style="font-family: SuisseIntlMono-Regular-WebXL; background: rgba(255,255,255,0);">3D mapping 2D single-plane data</h2> Mounting a 2D LIDAR to a VR controller capable of high precision six degrees of freedom position and rotation tracking requires the calculation of quaternion transformations to match the two coordinate systems. A Python script running on the steamVR-enabled computer receives from the LIDAR the polar coordinate angle θ and its corresponding distance d and converts them to Cartesian coordinates in a world coordinate system. In this same script, calls to OpenVR API return the controller coordinates in Cartesian format, xc, yc, and zc as an offset position from a tracking base station c, as well as Euler angles α (roll), β (pitch) and γ (yaw), this time based on the controller`s local coordinates. The use of external 6DoF tracking solves the problem of loop closure present in internal tracking systems adopted by self-contained scanners to a larger extent. This enables a significantly greater scan coherence and freedom of movement as the HTC VIVE tracking system corrects internally accumulated positional and orientational drift by employing a 250Hz infrared synchronization pulse emitted from two fixed-location base stations. For scientific research, this equates to a low latency, high precision tracking system, with only minor setbacks, i.e. the steamVR general coordinate system is tilted with respect to the physical ground and can suddenly change. <img src="images/coords.png" alt="axon"> <h2 style="font-family: SuisseIntlMono-Regular-WebXL; background: rgba(255,255,255,0);"> VR immersion & complete system map </h2> We employ a custom immersive experience with the use of the Processing library <a href=https://bitbucket.org/jamespazzi/vivep5/src/master/ style="font-size: 100%; text-decoration: UNDERLINE;">ViveP5</a>. This library, similarly to the aforementioned Python script, calls the OpenVR API to track the HTC VIVE`s headset transformation matrix, and display a virtual environment. As a result, the user can actively and freely navigate within a delimited tracking area, aiding in the perception of virtual spatial dimensions. The overall experience setup comprises of an HTC VIVE controller, LIDAR, headset, a sufficiently powerful steamVR enabled computer, and optionally, a Raspberry Pi 3B+ to allow the LIDAR to run independently of the computer performing the calculations. <img src="images/setup.png" alt="axon"> As a result of the development of our scanning system, two contrasting scanning scales are available: object-scale scanning, with an estimated maximum resolution of 1.5mm, and room-scale scanning. Although precise, the user-generated point cloud does not appear homogeneous due to the unique locomotion each specific user generates. The result is a person-specific map and interpretation of the space which can be seen on this page`s pointcloud. <br> <br> <p>Special thanks to <a href=http://yiyuan.space/ style="font-size: 100%; text-decoration:underline; font-family: SuisseIntlMono-Regular-WebXL;">Yiyuan Qian</a> for the illustrations and helping with the text.</p>');

maintext2 = createElement('div', '<h2 style="font-family: SuisseIntlMono-Regular-WebXL; background: rgba(255,255,255,0);"> Hardware configuration</h2> We selected a budget 2D LIDAR from the company <a href=https://www.slamtec.com/en/Lidar/A1 style="font-size: 100%; text-decoration: UNDERLINE;">SLAMTEC</a> due to its relatively low price and simple open source interface. Its relatively light data load, averaging at around 2000 to 4000 points per second in real world situations proved to be essential in real-time data acquisition and 3D mapping. The LIDAR is mounted to an HTC VIVE controller using a series of bolted together 3D-printed elements. This system provides an adequate distance between fingers on the controller and the spinning laser rangefinding module and ensures adequate visibility of tracking points on the controller itself. The controller handle blocks 22° of the LIDAR`s 360° scan radius. <img src="images/axon.png" alt="axon"> The existing trigger, buttons, and touchpad of the VR hardware are utilized for fine-grain user scanning control of the virtual experience, furthering the possibilities of interaction. Scanning only occurs when the trigger is held down. Upon release, the newest points are suspended in time until replaced by further scanning. With the touchpad, both the scan radius and distance can be defined; the X axis serves as a slider ranging from 0° to 320°, and the Y axis on touchpad press serves as a distance delimiter ranging from 0 to 12 meters. <h2 style="font-family: SuisseIntlMono-Regular-WebXL; background: rgba(255,255,255,0);">3D mapping 2D single-plane data</h2> Mounting a 2D LIDAR to a VR controller capable of high precision six degrees of freedom position and rotation tracking requires the calculation of quaternion transformations to match the two coordinate systems. A Python script running on the steamVR-enabled computer receives from the LIDAR the polar coordinate angle θ and its corresponding distance d and converts them to Cartesian coordinates in a world coordinate system. In this same script, calls to OpenVR API return the controller coordinates in Cartesian format, xc, yc, and zc as an offset position from a tracking base station c, as well as Euler angles α (roll), β (pitch) and γ (yaw), this time based on the controller`s local coordinates. The use of external 6DoF tracking solves the problem of loop closure present in internal tracking systems adopted by self-contained scanners to a larger extent. This enables a significantly greater scan coherence and freedom of movement as the HTC VIVE tracking system corrects internally accumulated positional and orientational drift by employing a 250Hz infrared synchronization pulse emitted from two fixed-location base stations. For scientific research, this equates to a low latency, high precision tracking system, with only minor setbacks, i.e. the steamVR general coordinate system is tilted with respect to the physical ground and can suddenly change. <img src="images/coords.png" alt="axon"> <h2 style="font-family: SuisseIntlMono-Regular-WebXL; background: rgba(255,255,255,0);"> VR immersion & complete system map </h2> We employ a custom immersive experience with the use of the Processing library <a href=https://bitbucket.org/jamespazzi/vivep5/src/master/ style="font-size: 100%; text-decoration: UNDERLINE;">ViveP5</a>. This library, similarly to the aforementioned Python script, calls the OpenVR API to track the HTC VIVE`s headset transformation matrix, and display a virtual environment. As a result, the user can actively and freely navigate within a delimited tracking area, aiding in the perception of virtual spatial dimensions. The overall experience setup comprises of an HTC VIVE controller, LIDAR, headset, a sufficiently powerful steamVR enabled computer, and optionally, a Raspberry Pi 3B+ to allow the LIDAR to run independently of the computer performing the calculations. <img src="images/setup.png" alt="axon"> As a result of the development of our scanning system, two contrasting scanning scales are available: object-scale scanning, with an estimated maximum resolution of 1.5mm, and room-scale scanning. Although precise, the user-generated point cloud does not appear homogeneous due to the unique locomotion each specific user generates. The result is a person-specific map and interpretation of the space which can be seen on this page`s pointcloud.<br> <br> <p>Special thanks to <a href=http://yiyuan.space/ style="font-size: 100%; text-decoration:underline; font-family: SuisseIntlMono-Regular-WebXL;">Yiyuan Qian</a> for the illustrations and helping with the text.</p>');

maintext.class('scrollBox');
maintext.hide();
maintext2.class('scrollBox');

click = createElement('div', '<h2>Click anywhere to open text</h2>');
  click.position(windowWidth/20, windowHeight-windowHeight/8);
click.class('vertical');
click.hide();

left.position(15, 10);
right.position(windowWidth-90,10);
uni.position(15, windowHeight-40);
tads.position(windowWidth-90,windowHeight-40);

aspect = windowWidth/windowHeight;

textFont(MonoThin);

textAlign(LEFT, CENTER);
setAttributes('antialias', true);



for (var i = 0 ; i < lines.length; i++) {
    temp = split(lines[i], ' ');
    arrayX.push(float(temp[0])*0.4);
    arrX.push(float(temp[0])*0.4);
    arrayY.push(float(temp[1])*0.4);
    arrY.push(float(temp[1])*0.4);
    arrayZ.push(float(temp[2])*0.4);
    arrZ.push(float(temp[2])*0.4);
}
timing2 = arrayX.length;
arrX.reverse();
arrY.reverse();
arrZ.reverse();
cam = createCamera();
perspective(60 * PI/180, aspect, 0.1, 100000);
}
////////////////
////////////////
function windowResized() {
resizeCanvas(windowWidth, windowHeight);
left.position(15, 10);
right.position(windowWidth-90,10);
tads.position(windowWidth-90,windowHeight-40);
uni.position(15, windowHeight-40);
  click.position(windowWidth/20, windowHeight-windowHeight/8);
aspect = windowWidth/windowHeight;
}

function draw() {
  cursor(CROSS);
  camera(-400,200,800,0,0,0, 0,1,0);

var back2 = back
var back3 = back
  if (back <= 110){
    back2 = 110;
    back3 = 140;
  }
  background(back,back2,back3);
  cam.setPosition(vs.x,vs.y,vs.z);

  if (aspect <0.77){
    left.style('color', color(0));
    right.style('color', color(0));
    uni.style('color', color(0));
    tads.style('color', color(0));
    click.hide();
    fade();
    back = counter;
    fll = transparency;
    reset2();
    vs.set(300,-750,1400);
    maintext2.hide();
    exit.hide();
    maintext.position(windowWidth/20, windowHeight/10);
    maintext.size(windowWidth-windowWidth/12, windowHeight-windowHeight/4.5);
    maintext.show();
  }


 if((deviceOrientation === LANDSCAPE)){
    vs.set(-200,-500,500);
    if (aspect > 1.5){
      left.style('color', color(255,255,255));
      right.style('color', color(255,255,255));
      uni.style('color', color(255,255,255));
      tads.style('color', color(255,255,255));
      exit.hide();
      fade2();
      back = transparency2;
      fll = counter2;
      reset();
    left.hide();
    right.hide();
    tads.hide();
    uni.hide();
  }
  else {
    left.show();
    right.show();
    tads.show();
    uni.show();
}

    if (orientation == 90){
        cam.tilt(radians(10*PI)+radians(gamma-PI/2));
        cam.pan(radians(beta-PI/4));
        }
    if (orientation == -90){
        cam.tilt(radians(10*PI)+radians(-gamma-PI/2));
        cam.pan(radians(-beta-PI/4));
        }
    }
 if(deviceOrientation === PORTRAIT){

   exit.hide();
   fade();
   back = counter;
   fll = transparency;
   reset2();
   left.show();
   right.show();
   tads.show();
   uni.show();
  vs.set(-600,-400,1200);
   maintext.show();
 }

else {
  if (aspect >= 0.77){
  vs.set(-200,-500,500);
  maintext.hide();
 cam.pan(map(mouseX-(windowWidth/2),-(windowWidth/2),windowWidth/2,PI/8,-PI/8));
 cam.tilt(map(mouseY-(windowHeight/2),-(windowHeight/2),windowHeight/2,-PI/6,PI/6));

 if ((deviceOrientation !== LANDSCAPE)){
 maintext2.position(windowWidth/2+windowWidth/15, windowHeight/8);
 maintext2.size(windowWidth/2-windowWidth/5, windowHeight-windowHeight/4);
 exit.position(windowWidth-windowWidth/7.5, windowHeight/13);
}

if ((c2==1)){
  if ((deviceOrientation !== LANDSCAPE)|| (aspect < 1.5)){
  left.style('color', color(0));
  right.style('color', color(0));
  uni.style('color', color(0));
  tads.style('color', color(0));
  fade();
  back = counter;
  fll = transparency;
  reset2();
  let col = color(0,0,0,counter);
  exit.show();
  maintext2.show();
  maintext2.style('color', col);
  maintext2.style('backround-color', col);
  click.hide();
}
}
else{
  exit.hide();
  maintext2.hide();
}
if (c2 == 0){
  click.show();
  fade2();
  back = transparency2;
  fll = counter2;
  reset();
  left.style('color', color(255,255,255));
  right.style('color', color(255,255,255));
  uni.style('color', color(255,255,255));
  tads.style('color', color(255,255,255));
}
}
}
if ((deviceOrientation === LANDSCAPE) && (aspect < 1.5)){
maintext2.position(windowWidth/2+windowWidth/15, windowHeight/8);
maintext2.size(windowWidth/2-windowWidth/5, windowHeight-windowHeight/4);
 exit.position(windowWidth-windowWidth/7.5, windowHeight/13);
}

if (fll <= 128){
  fll = 128;
}
stroke(fll);
strokeWeight(stkw);

beginShape(POINTS);

if (frameCount%2 < 1){
  timing = timing+1200;
  if (timing > limit){
  timing2 = timing2-1200;
}
  if (timing < limit){
    timing2 = arrayX.length;
  }
}
if (timing-limit > arrayX.length){
  timing = 0;
}
for (var i = timing; i < arrayX.length; i++){
  var x = arrayX[i];
  var y = arrayY[i];
  var z = arrayZ[i];
  vertex(x,y,z);
}
for (var i = timing2 ; i < arrayX.length; i++){
  var x = arrX[i];
  var y = arrY[i];
  var z = arrZ[i];
  vertex(x,y,z);
}

endShape();

}
/////////////
/////////////
function touchStarted(){
  cc =1;
  if (deviceOrientation === LANDSCAPE){
    fs = fullscreen();
    if (!fs) {
      fullscreen(true);
    }
  }
  }
/////////////
/////////////
  function touchEnded(){
    DeviceOrientationEvent.requestPermission()
    .then(response => {
      if (response == 'granted') {
        window.addEventListener('deviceorientation', onOrientationChange)
      }
    })
    .catch(console.error)
}
/////////////
/////////////
function mousePressed(){

  if (windowHeight>=1080){
  mapped2 = map(windowHeight, 1080,2160,0,-100);
}
else{
  mapped2 = 0;
}
  if (aspect >= 1){
  mapped = map(aspect, 1, 2, 0, -150);
  }
  else{
    mapped = map(aspect,1,0,0,80);
  }
  if (deviceOrientation !== LANDSCAPE){
    if (mouseX >=(0) && mouseX <=(windowWidth) && mouseY >= 0 && mouseY <=windowHeight){
        c2 = 1;
    }

  if ((mouseX >= windowWidth-windowWidth/7.5) && (mouseX <=windowWidth-windowWidth/7.5+20) && (mouseY >= windowHeight/13) && (mouseY <= windowHeight/13+50)){
    c2 = 0;
      transparency = 255;
      counter = 0;
  }
}

if ((deviceOrientation === LANDSCAPE) && (aspect < 1.5)){
  if (mouseX >=(0) && mouseX <=(windowWidth) && mouseY >= 0 && mouseY <=windowHeight){
      c2 = 1;
  }

  if ((mouseX >= windowWidth-windowWidth/7.5) && (mouseX <=windowWidth-windowWidth/7.5+20) && (mouseY >= windowHeight/13) && (mouseY <= windowHeight/13+50)){
    c2 = 0;
      transparency = 255;
      counter = 0;
  }
}

}

function onOrientationChange(e){
  alpha = e.alpha;
  beta = e.beta;
  gamma = e.gamma;
}
function fade(){
for (var i = 0; i < 200; i++){
  transparency = transparency-0.05;
  counter = counter+0.05;
}
}

function reset(){
  transparency = 255;
  counter = 0;
}
function reset2(){
  transparency2 = 255;
  counter2 = 0;
}

function fade2(){
for (var i = 0; i < 200; i++){
  transparency2 = transparency2-0.05;
  counter2 = counter2+0.05;
}
}
