var arrayX = [];
var arrayY = [];
var arrayZ = [];
var lines;
var temp;
var cam;
var vs;
var chars = [];
var bg = 128;
var stk = 128;
var fll= 128;
var stkw = 3;
var aspect;
var fs = false;
var cc = 0;
var c2 = 0;
var alpha = 0;
var beta = 0;
var gamma = 0;
var transparency = 255;
var counter = 0;
var dismiss = document.cookie;
var randomchars;

function preload() {
   MonoThin = loadFont('SuisseIntlMono-Thin-WebXL.ttf');
   MonoRegular = loadFont('SuisseIntlMono-Regular-WebXL.ttf')
   lines = loadStrings('POINTS.txt');
}
/////////////////
////////////////
function setup() {
  if (window.DeviceOrientationEvent) {
     window.addEventListener('deviceorientation', onOrientationChange);
   }

vs = createVector(300,0,1200);
createCanvas(windowWidth,windowHeight, WEBGL);

left = createA('tech', 'Tech');
right = createA('team', 'Team');
tads = createA('http://t-ads.org', 'T_ADS', '_blank');
uni = createA('https://arch.t.u-tokyo.ac.jp', 'UTokyo', '_blank');

exit = createElement('h2', 'x');
exit.class('button');
exit.hide();

maintext = createElement('div', '<h2 style="font-size: 100%; font-family: SuisseIntlMono-Regular-WebXL;">Reducing Unnecessary Complexity: <br> Temporally-bound Immersive Virtual Perception of Space</h2> <br> Society today is experiencing an unprecedented data explosion in real-world and industry 3D scanning, due to increasing memory capacity and facilitation of data acquisition. Improvements such as higher resolution, faster refresh rates and more accurate material detection are set as development goals for most real-world scanning device manufacturers, directly leading to ever-increasing data processing requirements. If affordability is not considered, most users tend to aim for products with higher data acquisition ability. Both manufacturers` and customers` preferences reflect society`s attitude towards maximizing information—acceptance, and the struggle for more memory to store it. <br> <br>However, the pursuit for data complexity is questionable. If we take a look at technologically independent fields, fields related to the arts to a greater extent, movements rejecting excessive information are articulate and plentiful. Already in the past, Post-WW1 Modern architecture and art, for example, were preoccupied by an optimism-driven rejection of prior ornament-based cultural emancipation in the pursuit of an artistic tabula rasa, a universal purity exceeding commonality, a reduction to the essence of formal articulation. Movements like De Stijl pioneered such rejective delimitations, aiming for a "less is more" statement, and continue to influence thought in artistic and art-adjacent fields to this day. <br><br> Although the technology backing real-world scanning pushes towards state-of-the-art technological pinnacles, the purpose of such a process remains somewhat undeveloped. A majority of 3D scanning processes (photogrammetry, structured light, etc.) aim to create the most precise identical clone of the physical world imaginable. They aim for an overall reproduction that can be measured or copied. Newer purposes such as real-time scanning for robotic and autonomous navigation purposes have only very recently been conceived as the technology advanced to achieve faster scanning rates with adequate resolution. <br><br> In a determined preoccupation with maximizing information, one must begin to question how humans could be actively involved in this unending data acquisition. Could scanning be shifted towards a productive process, a constructor? <br><br> We propose a method for an immersive virtual perception of space, which drives users to actively examine acquired real-time distance information, free of socially constructed attributes like materiality, color, and other and temporally limited, to construct a virtual environment based on the physical world with the bare minimum of data required for spatial comprehension. <br> <br>This website utilizes WebGL to render 3D pointcloud spaces created by our scanning system. Tap the screen to reset view if needed and check out the other Pointclouds under <a href="tech" style="font-size: 100%; text-decoration:underline;">Tech</a> & <a href="team" style="font-size: 100%;text-decoration:underline;">Team</a>. ');
maintext2 = createElement('div', '<h2 style="font-family: SuisseIntlMono-Regular-WebXL;">Reducing Unnecessary Complexity: <br> Temporally-bound Immersive Virtual Perception of Space</h2> Society today is experiencing an unprecedented data explosion in real-world and industry 3D scanning, due to increasing memory capacity and facilitation of data acquisition. Improvements such as higher resolution, faster refresh rates and more accurate material detection are set as development goals for most real-world scanning device manufacturers, directly leading to ever-increasing data processing requirements. If affordability is not considered, most users tend to aim for products with higher data acquisition ability. Both manufacturers` and customers` preferences reflect society`s attitude towards maximizing information—acceptance, and the struggle for more memory to store it. <br> <br>However, the pursuit for data complexity is questionable. If we take a look at technologically independent fields, fields related to the arts to a greater extent, movements rejecting excessive information are articulate and plentiful. Already in the past, Post-WW1 Modern architecture and art, for example, were preoccupied by an optimism-driven rejection of prior ornament-based cultural emancipation in the pursuit of an artistic tabula rasa, a universal purity exceeding commonality, a reduction to the essence of formal articulation. Movements like De Stijl pioneered such rejective delimitations, aiming for a "less is more" statement, and continue to influence thought in artistic and art-adjacent fields to this day. <br><br> Although the technology backing real-world scanning pushes towards state-of-the-art technological pinnacles, the purpose of such a process remains somewhat undeveloped. A majority of 3D scanning processes (photogrammetry, structured light, etc.) aim to create the most precise identical clone of the physical world imaginable. They aim for an overall reproduction that can be measured or copied. Newer purposes such as real-time scanning for robotic and autonomous navigation purposes have only very recently been conceived as the technology advanced to achieve faster scanning rates with adequate resolution. <br><br> In a determined preoccupation with maximizing information, one must begin to question how humans could be actively involved in this unending data acquisition. Could scanning be shifted towards a productive process, a constructor? <br><br> We propose a method for an immersive virtual perception of space, which drives users to actively examine acquired real-time distance information, free of socially constructed attributes like materiality, color, and other and temporally limited, to construct a virtual environment based on the physical world with the bare minimum of data required for spatial comprehension. <br> <br>This website utilizes WebGL to render 3D pointcloud spaces created by our scanning system. Check out the other Pointclouds under <a href="tech" style="font-size: 100%; text-decoration:underline;">Tech</a> & <a href="team" style="font-size: 100%;text-decoration:underline;">Team</a>. ');

siteinfo = createImg('popup2000.png', 'info')

siteinfo.class('popup');
siteinfo.hide();

maintext.class('scrollBox');
maintext.hide();

maintext2.class('scrollBox');
maintext2.hide();

left.position(15, 10);
right.position(windowWidth-90,10);
uni.position(15, windowHeight-40);
tads.position(windowWidth-90,windowHeight-40);

aspect = windowWidth/windowHeight;

textFont(MonoThin);
// textSize(30);
textAlign(LEFT, CENTER);
setAttributes('antialias', true);

for (var i = 0 ; i < lines.length; i++) {
    temp = split(lines[i], ' ');
    arrayX.push(float(temp[0])*0.4);
    arrayY.push(float(temp[1])*0.4);
    arrayZ.push(float(temp[2])*0.4);
}
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
aspect = windowWidth/windowHeight;
}

function draw() {
  cursor(CROSS);
  camera(0,0,800,0,0,0, 0,1,0);
  background(255);
  cam.setPosition(vs.x,vs.y,vs.z);

if (aspect <0.77){
  vs.set(300,-750,1400);
  maintext2.hide();
  exit.hide();
  maintext.position(windowWidth/20, windowHeight/10);
  maintext.size(windowWidth-windowWidth/12, windowHeight-windowHeight/4.5);
  maintext.show();
}

  if ((aspect < 0.77) && (int(dismiss) != 1)){
    siteinfo.show();
    siteinfo.position(windowWidth/8,windowHeight/6);
    siteinfo.size(windowWidth-windowWidth/4, (windowHeight-windowHeight/4)*aspect/(3/4));
  }
  else
  {
    siteinfo.hide();
  }

 if(deviceOrientation === LANDSCAPE){
      vs.set(0,0,1000);
      if (aspect > 1.5){
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
      left.hide();
      right.hide();
      tads.hide();
      uni.hide();
        cam.tilt(radians(10*PI)+radians(-gamma-PI/2));
        cam.pan(radians(-beta-PI/4));
        }
    }
 if(deviceOrientation === PORTRAIT){
   left.show();
   right.show();
   tads.show();
   uni.show();
   vs.set(300,-750,1400);
   maintext.show();
 }

else {
  if (aspect >= 0.77){
  vs.set(300,0,1200);
  maintext.hide();
 cam.pan(map(mouseX-(windowWidth/2),-(windowWidth/2),windowWidth/2,PI/8,-PI/8));
 cam.tilt(map(mouseY-(windowHeight/2),-(windowHeight/2),windowHeight/2,-PI/6,PI/6));

 if ((deviceOrientation !== LANDSCAPE)){
   textSize(15);
   fill(85,transparency);
   text("click",750,-23);
   text("here",1061,23);
   textSize(30);
   text(randomchars,750,0);
 maintext2.position(windowWidth/2+windowWidth/15, windowHeight/8);
 maintext2.size(windowWidth/2-windowWidth/5, windowHeight-windowHeight/4);
  exit.position(windowWidth-windowWidth/7.5, windowHeight/13);
}

if ((deviceOrientation === LANDSCAPE) && (aspect < 1.5)){
  textSize(15);
  fill(85,transparency);
  text("tap",750,-23);
  text("here",1061,23);
  textSize(30);
  text(randomchars,750,0);
maintext2.position(windowWidth/2+windowWidth/15, windowHeight/8);
maintext2.size(windowWidth/2-windowWidth/5, windowHeight-windowHeight/4);
 exit.position(windowWidth-windowWidth/7.5, windowHeight/13);
}

if (c2==1){
  fade();
  let col = color(0,0,0,counter);
  exit.show();
  maintext2.show();
  maintext2.style('color', col);
  maintext2.style('backround-color', col);
}
else{
  exit.hide();
  maintext2.hide();
}
}
}
fill(bg,stk,fll, transparency);

for (let i = 0; i < 13; i++){
  let ran = round(random(100));
    if (ran%2 != 0){
      chars[i] = char(ran);
    }
    else{
      chars[i] = i;
    }
}
if (chars[1] == 1){
chars[1] = "S";
}
if (chars[2] == 2){
chars[2] = "P";
}
if (chars[3] == 3){
chars[3] = "A";
}
if (chars[4] == 4){
chars[4] = "T";
}
if (chars[5] == 5){
chars[5] = "I";
}
if (chars[6] == 6){
chars[6] = "L";
}
if (chars[7] == 7){
chars[7] = "E";
}
if (chars[8] == 8){
chars[8] = "R";
}
if (chars[9] == 9){
chars[9] = "C";
}
if (chars[10] == 10){
chars[10] = "O";
}
if (chars[11] == 11){
chars[11] = "N";
}
if (chars[12] == 12){
chars[12] = ".";
}
randomchars = chars[1]+chars[2]+chars[3]+chars[4]+chars[5]+chars[3]+chars[6]+chars[12]+chars[2]+chars[7]+chars[8]+chars[9]+chars[7]+chars[2]+chars[4]+chars[5]+chars[10]+chars[11];
stroke(bg,stk,fll);
strokeWeight(stkw);
beginShape(POINTS);
rotateX(millis()/60000);
rotateY(-millis()/60000);
for (var i = 0; i < arrayX.length; i++){
  var x = arrayX[i];
  var y = arrayY[i];
  var z = arrayZ[i];
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
  dismiss = 1;
  document.cookie = "1";
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
  if (mouseX >=(0.6872268091306*windowWidth)+mapped+mapped2 && mouseX <=(0.8110733365711*windowWidth)+mapped+mapped2 && mouseY >= 0.4963574550752*windowHeight-15 && mouseY <=0.5050995628946*windowHeight+15){
      c2 = 1;
  }

  if ((mouseX >= windowWidth-windowWidth/7.5) && (mouseX <=windowWidth-windowWidth/7.5+20) && (mouseY >= windowHeight/13) && (mouseY <= windowHeight/13+50)){
    c2 = 0;
      transparency = 255;
      counter = 0;
  }
}
if ((deviceOrientation === LANDSCAPE) && (aspect < 1.5)){
  if (mouseX >=(windowWidth/2) && mouseX <=(windowWidth) && mouseY >= 0 && mouseY <=windowHeight){
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
