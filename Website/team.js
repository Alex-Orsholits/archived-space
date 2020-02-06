var arrayX = [];
var arrayY = [];
var arrayZ = [];
var arrayX2 = [];
var arrayY2 = [];
var arrayZ2 = [];
var arrayX3 = [];
var arrayY3 = [];
var arrayZ3 = [];
var lines;
var lines2;
var lines3;
var temp;
var temp2;
var temp3;
var cam;
var vs;
var chars = [];
var bg = 200;
var stk = 200;
var fll= 200;
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
var rotation;
var rotations = 0;
var rotcount;
var checkrot = 90;
var checkrot2 = 210;
var checkrot3 = 330;
var offset = 30;
var strk = 4;
var textfade;
var link;
var link2;
var link3;

function preload() {
   MonoThin = loadFont('SuisseIntlMono-Thin-WebXL.ttf');
   MonoRegular = loadFont('SuisseIntlMono-Regular-WebXL.ttf')
   lines = loadStrings('alex-lowres.txt');
   lines2 = loadStrings('yiyuan-lowres.txt');
   lines3 = loadStrings('joe-lowres.txt');
}
/////////////////
////////////////
function setup() {
  if (window.DeviceOrientationEvent) {
     window.addEventListener('deviceorientation', onOrientationChange);
   }

vs = createVector(0,0,1200);
createCanvas(windowWidth,windowHeight, WEBGL);

left = createA('site', 'Home');
right = createA('tech', 'Tech');
tads = createA('http://t-ads.org', 'T_ADS', '_blank');
uni = createA('https://arch.t.u-tokyo.ac.jp', 'UTokyo', '_blank');


yiyuan = createElement('div', '<h2>Yiyuan Qian</h2>  <p> MA Tsinghua & M.Eng (tentative) 東京大学 (UTokyo) - Computational Architecture / Digital Design / Illustration </p> <a id="FadeLink2" href=https://yiyuan.space/ style="font-size: 100%; text-decoration:underline" target="_blank"> Portfolio & Contact</a>');
yiyuan.hide();

alex = createElement('div', '<h2>Alex Orsholits</h2>  <p> BSc EPFL & M.Eng (tentative) 東京大学 (UTokyo) - Computational Architecture / Media Design / Creative Programming</p> <a id="FadeLink" href=https://alexorsholits.art/ style="font-size: 100%; text-decoration:underline" target="_blank"> Portfolio & Contact</a>');
alex.hide();

joe = createElement('div', '<h2>Joe Li</h2>  <p> BA USC & M.Eng (tentative) 東京大学 (UTokyo) - Computational Architecture / Prototyping / Digital Fabrication</p> <a id="FadeLink3" href=https://instagram.com/lizhouzhouli/ style="font-size: 100%; text-decoration:underline" target="_blank">Portfolio & Contact</a>');
joe.hide();

acks = createElement('div', '<p><b><i>Special thanks to</i></b> Associate Professor Yusuke Obuchi of <a href=http://t-ads.org/ style="font-size: 100%; font-family: SuisseIntlMono-Regular-WebXL; text-decoration: underline;"> T-ADS laboratory</a> (UTokyo) for hands-on supervision of this project.</p>');


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
    arrayX.push(float(temp[0]));
    arrayY.push(float(temp[1]));
    arrayZ.push(float(temp[2]));
}
for (var i = 0 ; i < lines2.length; i++) {
    temp2 = split(lines2[i], ' ');
    arrayX2.push(float(temp2[0]));
    arrayY2.push(float(temp2[1]));
    arrayZ2.push(float(temp2[2]));
}
for (var i = 0 ; i < lines3.length; i++) {
    temp3 = split(lines3[i], ' ');
    arrayX3.push(float(temp3[0]));
    arrayY3.push(float(temp3[1]));
    arrayZ3.push(float(temp3[2]));
}

cam = createCamera();
perspective(60 * PI/180, aspect, 0.1, 100000);


link = document.getElementById('FadeLink');
link2 = document.getElementById('FadeLink2');
link3 = document.getElementById('FadeLink3');
}
////////////////
////////////////
function windowResized() {
resizeCanvas(windowWidth, windowHeight);
left.position(15, 10);
right.position(windowWidth-90,10);
tads.position(windowWidth-90,windowHeight-40);
uni.position(15, windowHeight-40);
// yiyuan.position(windowWidth/8,windowHeight/2+windowHeight/7);
// alex.position(windowWidth/8,windowHeight/2+windowHeight/7);
// joe.position(windowWidth/8,windowHeight/2+windowHeight/7);
aspect = windowWidth/windowHeight;
}

function draw() {
  cursor(CROSS);
  camera(0,0,800,0,0,0, 0,1,0);
  background(255);
  cam.setPosition(vs.x,vs.y,vs.z);

  if (aspect <0.77){
    acks.size(windowWidth-windowWidth/4);
    yiyuan.position(windowWidth/8,windowHeight/2+windowHeight/11);
alex.position(windowWidth/8,windowHeight/2+windowHeight/11);
joe.position(windowWidth/8,windowHeight/2+windowHeight/11);
    alex.size(windowWidth-windowWidth/4);
    yiyuan.size(windowWidth-windowWidth/4);
    joe.size(windowWidth-windowWidth/4);

    acks.position(windowWidth/8,windowHeight-windowHeight/5);

    vs.set(0,200,1800);
  }

 if(deviceOrientation === LANDSCAPE){
   yiyuan.position(windowWidth/8,windowHeight/2-windowHeight/8);
   alex.position(windowWidth/8,windowHeight/2-windowHeight/8);
   joe.position(windowWidth/8,windowHeight/2-windowHeight/8);
     acks.position(windowWidth/8,windowHeight-windowHeight/5.5);
     acks.size(windowWidth-windowWidth/4);
   alex.size(windowWidth/2-windowWidth/12);
   yiyuan.size(windowWidth/2-windowWidth/12);
   joe.size(windowWidth/2-windowWidth/12);
      vs.set(-600,0,1200);
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
    // if (orientation == 90){
    //     // cam.tilt(radians(10*PI)+radians(gamma-PI/2));
    //     // cam.pan(radians(beta-PI/4));
    //     }
    // if (orientation == -90){
    //     // cam.tilt(radians(10*PI)+radians(-gamma-PI/2));
    //     // cam.pan(radians(-beta-PI/4));
    //     }
    }

    if ((deviceOrientation === LANDSCAPE) && (aspect < 1.5)){
      yiyuan.position(windowWidth/8,windowHeight/2+windowHeight/7);
alex.position(windowWidth/8,windowHeight/2+windowHeight/7);
joe.position(windowWidth/8,windowHeight/2+windowHeight/7);
      alex.size(windowWidth-windowWidth/4);
      yiyuan.size(windowWidth-windowWidth/4);
      joe.size(windowWidth-windowWidth/4);
      vs.set(0,150,1800);
    }


 if(deviceOrientation === PORTRAIT){
//    yiyuan.position(windowWidth/8,windowHeight/2+windowHeight/7);
// alex.position(windowWidth/8,windowHeight/2+windowHeight/7);
// joe.position(windowWidth/8,windowHeight/2+windowHeight/7);
   left.show();
   right.show();
   tads.show();
   uni.show();
 }
 else {
  if ((deviceOrientation !== LANDSCAPE) && (aspect >= 0.77)){
    alex.size(windowWidth/2-windowWidth/6);
    yiyuan.size(windowWidth/2-windowWidth/6);
    joe.size(windowWidth/2-windowWidth/6);
    acks.position(windowWidth/8,windowHeight-windowHeight/5.5);
    yiyuan.position(windowWidth/8,windowHeight/2-windowHeight/15);
    alex.position(windowWidth/8,windowHeight/2-windowHeight/15);
    joe.position(windowWidth/8,windowHeight/2-windowHeight/15);
     vs.set(-250,0,1200);
 }
 if (c2==1){
   fade();
   let col = color(0,0,0,counter);
 }
 }
fill(bg,stk,fll, transparency);

stroke(stk);
translate(0,50,0);
rotation = frameCount/200;
rotateY(-radians(offset));
rotateY(-rotation);
var degreerot = degrees(rotation);
if (degreerot >= 360){
  frameCount = 0;
}



beginShape(POINTS);
if ((degreerot >= 330) && (degreerot < 360)){
  alex.show();
strk = map(degreerot,330,360,1,2);
stk = map(degreerot,330,360,200,100);
textfade = color(stk+55);
  alex.style('color', textfade);
  link.style.color = textfade;
}
else{
  alex.hide();
  strk = 1;
  stk = 200;
  textfade = color(255);
}
if ((degreerot < 30) && (degreerot >= 0)){
  alex.show();
    strk = map(degreerot,0,30,2,4);
    stk = map(degreerot,0,30,100,0);
    textfade = color(stk+55);
      alex.style('color', textfade);
      link.style.color = textfade;
}
//
if ((degreerot >= 30) && (degreerot <90)){
  alex.show();
    strk = map(degreerot,30,90,4,1);
    stk = map(degreerot,30,90,0,200);
    textfade = color(stk+55);
      alex.style('color', textfade);
      link.style.color = textfade;
}

strokeWeight(strk);

for (var i = 0; i < arrayX.length; i++){
  var x = arrayX[i];
  var y = arrayY[i];
  var z = arrayZ[i];
  vertex(x,y,z);
}
endShape();

beginShape(POINTS);
if ((degreerot >= 90) && (degreerot < 210)){
  yiyuan.show();
  if (degreerot <= 210-60){
  strk = map(degreerot,90,210-60,1,4);
  stk = map(degreerot,90,210-60,200,0);
    textfade = color(stk+55);
      yiyuan.style('color', textfade);
      link2.style.color = textfade;
}
if (degreerot > 210-60){
    strk = map(degreerot,210-60,210,4,1);
    stk = map(degreerot,210-60,210,0,200);
    textfade = color(stk+55);
      yiyuan.style('color', textfade);
        link2.style.color = textfade;
}
}
else {
  yiyuan.hide();
  strk=1;
  textfade = color(255);
}
strokeWeight(strk);

for (var i = 0; i < arrayX2.length; i++){
  var x = arrayX2[i];
  var y = arrayY2[i];
  var z = arrayZ2[i];
  vertex(x,y,z);
}
endShape();

beginShape(POINTS);
if ((degreerot >= 210) && (degreerot <= 330)){
  joe.show();
  if (degreerot <= 330-60){
  strk = map(degreerot,210,330-60,1,4);
  stk = map(degreerot,210,330-60,200,0);
  textfade = color(stk+55);
    joe.style('color', textfade);
    link3.style.color = textfade;
  }
  if (degreerot > 330-60){
    strk = map(degreerot,330-60,330,4,1);
    stk = map(degreerot,330-60,330,0,200);
    textfade = color(stk+55);
      joe.style('color', textfade);
      link3.style.color = textfade;
  }
  }
  else {
  strk=1;
  joe.hide();
    textfade = color(255);
  }
    strokeWeight(strk);
for (var i = 0; i < arrayX3.length; i++){
  var x = arrayX3[i];
  var y = arrayY3[i];
  var z = arrayZ3[i];
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

//   if (deviceOrientation !== LANDSCAPE){
//   if (mouseX >=(0.6872268091306*windowWidth)+mapped+mapped2 && mouseX <=(0.8110733365711*windowWidth)+mapped+mapped2 && mouseY >= 0.4963574550752*windowHeight-15 && mouseY <=0.5050995628946*windowHeight+15){
//       c2 = 1;
//   }
//
//   if ((mouseX >= windowWidth-windowWidth/7.5) && (mouseX <=windowWidth-windowWidth/7.5+20) && (mouseY >= windowHeight/13) && (mouseY <= windowHeight/13+50)){
//     c2 = 0;
//       transparency = 255;
//       counter = 0;
//   }
// }
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
