/*var PLAY = 1;
var END = 0;
var gameState = PLAY;

var fish;

var cloudsGroup, cloudImage;


var score=0;

var gameOver, restart;

localStorage["HighestScore"] = 0;

function preload(){
  trex_running =   loadAnimation("trex3_-removebg-preview.png","trex_2-removebg-preview.png","trex1_.-removebg-preview.png");
  trex_collided = loadAnimation("trex_2-removebg-preview.png");
  
  groundImage = loadImage("ground2.png");
  
  cloudImage = loadImage("cloud.png");
  //cloudImage.scale = 0.0002;
  
  obstacle1 = loadImage("cactus-removebg-preview (3).png");
  obstacle2 = loadImage("rock-removebg-preview.png");
  obstacle3 = loadImage("dino-removebg-preview.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");
  bg = loadImage("t b.jpg");
  gameOverImg = loadImage("gameover-removebg-preview.png");
  restartImg = loadImage("restart_button-removebg-preview (1).png");
  restartImg.scale = 0.4;
}

function setup() {
  createCanvas(600, 200);
  
  trex = createSprite(50,180,20,50);
  
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided", trex_collided);
  trex.scale = 0.5;
  trex.velocityX = 6 + 3*score/100;
  
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.visible = false;
  //ground.x = ground.width /2;
  //ground.velocityX = -(6 + 3*score/100);
  
  gameOver = createSprite(trex.x +220,70);
  gameOver.addImage(gameOverImg);
  
  restart = createSprite(trex.x+220,120);
  
  restart.addImage(restartImg);
  
  
  gameOver.scale = 0.5;
  restart.scale = 0.25;

  gameOver.visible = false;
  restart.visible = false;
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
 // invisibleGround.velocityX = 7 + 3*score/100;
  invisibleGround.x = trex.x-20;
  
  cloudsGroup = new Group();
  obstaclesGroup = new Group();
  
  score = 0;
}

function draw() {

  camera.x = trex.x+220;
  //console.log(ground.x);
  //console.log(trex.x);
  gameOver.position.x = trex.position.x+220;
  restart.position.x = trex.position.x+220;
  //trex.debug = true;
  background(bg);
  textSize(15);
  stroke("black");
  fill("black");
  text("Score: "+ score, trex.x+420,50);
  
  
  if (gameState===PLAY){
    score = score + Math.round(getFrameRate()/60);
    //ground.velocityX = -(6 + 3*score/100);
    trex.velocityX = 6 + 3*score/100;
    invisibleGround.x = trex.x-20;
  
    if(keyDown("space") && trex.y >= 139) {
      trex.velocityY = -12.5;
    }
  
    trex.velocityY = trex.velocityY + 0.8
  
    if (ground.x < trex.x-150){
      ground.position.x = trex.position.x+650;
      
    }
  
    trex.collide(invisibleGround);
    spawnClouds();
    spawnObstacles();
  
    if(obstaclesGroup.isTouching(trex)){
        gameState = END;
    }
  }
  else if (gameState === END) {
    textSize(15);
    stroke("black");
    fill("black");
  text("HIGH SCORE : "+localStorage["HighestScore"],trex.x-40,50);

    gameOver.visible = true;
    restart.visible = true;
    
    //set velcity of each game object to 0
    ground.velocityX = 0;
    trex.velocityY = 0;
    trex.velocityX = 0;
    trex.y = 160;
    obstaclesGroup.setVelocityXEach(0);
    cloudsGroup.setVelocityXEach(0);
    
    //change the trex animation
    trex.changeAnimation("collided",trex_collided);
    
    //set lifetime of the game objects so that they are never destroyed
    obstaclesGroup.setLifetimeEach(-1);
    cloudsGroup.setLifetimeEach(-1);
    
    if(mousePressedOver(restart)) {
      reset();
    }
  }
  
  
  drawSprites();
}

function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var cloud = createSprite(trex.x+520,120,40,10);
    cloud.y = Math.round(random(80,120));
    cloud.addImage(cloudImage);
    cloud.scale = 0.5;
    cloud.visible = false;
    //cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 200;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    
    //add each cloud to the group
    cloudsGroup.add(cloud);
  }
  
}

function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(trex.x+520,170,10,40);
    var obstaclee = createSprite(trex.x+520,165,10,40);
    //obstacle.debug = true;
    //obstacle.velocityX = -(6 + 3*score/100);
    
    //generate random obstacles
    var rand = Math.round(random(1,3));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstaclee.addImage(obstacle3);
              break;
      case 4: obstacle.addImage(obstacle4);
              break;
      case 5: obstacle.addImage(obstacle5);
              break;
      case 6: obstacle.addImage(obstacle6);
              break;
      default: break;
    }
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.1;
    obstaclee.scale = 0.3;
    obstacle.lifetime = 300;
    obstaclee.lifetime = 300;
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
    obstaclesGroup.add(obstaclee);
  }
}

function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  
  obstaclesGroup.destroyEach();
  cloudsGroup.destroyEach();
  
  trex.changeAnimation("running",trex_running);
  
  if(localStorage["HighestScore"]<score){
    localStorage["HighestScore"] = score;
  }
  console.log(localStorage["HighestScore"]);
  
  score = 0;
  
}*/
const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth/500;
canvas.height = window.innerHeight/500;
let particleArray = [];
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var sea,c,wave,wave2,waveimg;
var cl1,cl2,cl3;
var bf,blf,gf,yf;
var bf2,blf2,gf2,yf2;
var st1,st2,st;
var bub,burst,bubs;
var fish,fishr,fishl,fishu,fishd;
var up,down,right,left,rimg,limg;
var FishGroup,BBGroup;
var sharkl,sharkb,sharklimg,sharkbimg,sharkrimg;
var score = 0;
var txt
var scr,s;
var  backgroundsnd,popsnd,clicksnd,diesnd;
var gameOver, restart;
let gameFrame = 0;
ctx.font = '50px Georgia';

localStorage["HighestScore"] = 0;
function preload(){
 backgroundsnd = loadSound("bckgrnd.mp3");
 popsnd=loadSound("pop.mp3");
 clicksnd=loadSound("click.mp3");
 diesnd=loadSound("die.mp3");
bub = loadImage("bubble/b1.png");
scr = loadImage("scr.png");
burst = loadAnimation("bubble/b2.png","bubble/b3.png","bubble/b4.png","bubble/b5.png","bubble/b6.png","bubble/b7.png");
sea = loadImage("sea.jpg");
waveimg = loadImage("w.jpg");
cl1 = loadImage("clouds/c1.png");
cl2 = loadImage("clouds/c2.png");
cl3 = loadImage("clouds/c3.png");
bf = loadAnimation("bf/bf1.png","bf/bf2.png","bf/bf3.png","bf/bf4.png");
blf = loadAnimation("blf/blf1.png","blf/blf2.png","blf/blf3.png","blf/blf4.png");
gf = loadAnimation("gf/gf1.png","gf/gf2.png","gf/gf3.png","gf/gf4.png");
yf = loadAnimation("yf/yf1.png","yf/yf2.png","yf/yf3.png","yf/yf4.png");
bf2 = loadAnimation("bf2/bf21.png","bf2/bf22.png","bf2/bf23.png","bf2/bf24.png");
blf2 = loadAnimation("blf2/blf21.png","blf2/blf22.png","blf2/blf23.png","blf2/blf24.png");
gf2 = loadAnimation("gf2/gf21.png","gf2/gf22.png","gf2/gf23.png","gf2/gf24.png");
yf2 = loadAnimation("yf2/yf21.png","yf2/yf22.png","yf2/yf23.png","yf2/yf24.png");
st = loadImage("rock-removebg-preview.png");
fishl = loadAnimation("fl/f1.png","fl/f2.png","fl/f3.png","fl/f4.png");
fishr = loadAnimation("fr/fr1.png","fr/fr2.png","fr/fr3.png","fr/fr4.png");
fishu = loadAnimation("fu/fu1.png","fu/fu2.png","fu/fu3.png","fu/fu4.png");
fishd = loadAnimation("fd/fd1.png","fd/fd2.png","fd/fd3.png","fd/fd4.png");
sharklimg = loadAnimation("shl/shl1.png","shl/shl2.png","shl/shl3.png","shl/shl2.png");
sharkrimg = loadAnimation("shr/shr1.png","shr/shr2.png","shr/shr3.png","shr/shr2.png");
sharkbimg = loadAnimation("shb/shb1.png","shb/shb2.png","shb/shb3.png","shb/shb4.png");
rimg = loadAnimation("fr/fr1.png");
limg = loadAnimation("fl/f1.png");
gameOverImg = loadImage("gameover-removebg-preview.png");
restartImg = loadImage("restart_button-removebg-preview (1).png");
restartImg.scale = 0.4;
}
function setup(){
  createCanvas(675, 360);
  background("blue");
  backgroundsnd.play();
  c = createSprite(335,220,1450,10);
  c.scale = 0.9;
  c.addAnimation("sea", sea);
  //c.visible = false;

  sharkl = createSprite(670,100,50,7);
  sharkl.addAnimation("sharkleft",sharklimg);
  sharkl.addAnimation("sharkright",sharkrimg);
  sharkl.addAnimation("bite",sharkbimg);
  sharkl.scale = 0.3;
  sharkl.setCollider("rectangle",0,10,sharkl.width/2,sharkl.height/2);
  //sharkl.debug = true;

  s = createSprite(220,130,20,20);
  s.addImage("score",scr);
  s.scale =0.3;

  FishGroup = new Group();
  BBGroup = new Group();
  cloudGroup = new Group();


  
  fish = createSprite(338,250,20,20);
  fish.addAnimation("fishl",fishl);
  fish.addAnimation("fishr",fishr);
  fish.addAnimation("fishu",fishu);
  fish.addAnimation("fishd",fishd);
  fish.addAnimation("fishrimg",rimg);
  fish.addAnimation("fishlimg",limg);
  fish.scale=0.2;
  fish.setCollider("circle",0,0,fish.width/4+40);
  //fish.debug = true;
  
  up = createSprite(338,110,675,3);
  up.visible = false;
  down = createSprite(338,335,675,3);
  down.visible = false;
  left = createSprite(70,225,5,225);
  left.visible = false;
  right = createSprite(610,225,5,225);
  right.visible = false;

  wave = createSprite(335,40,150,30);
  wave.scale = 0.682;
  wave.addImage("wave",waveimg);
  wave.velocityX = 0.4;
  
  wave2 = createSprite(-1,40,150,30);
  wave2.scale = 0.682;
  wave2.addImage("wave2",waveimg);
  wave2.velocityX = 0.4;

  st1 = createSprite(260,300,40,50);
  st1.addImage("1",st);
  st1.scale = 0.1;
  st2 = createSprite(400,300,40,50);
  st2.addImage("2",st);
  st2.scale = 0.2;
  
  gameOver = createSprite(345,180);
  gameOver.addImage(gameOverImg);
  gameOver.scale = 0.5;
  //gameOver.visible = false;
  
  restart = createSprite(345,260);
  restart.addImage(restartImg);
  restart.scale = 0.5;
  //restart.visible = false;

  r1 = createSprite(35,250,70,500);
  r1.shapeColor = "blue";
  r2 = createSprite(645,250,70,500);
  r2.shapeColor = "blue";
  
 
}
function draw(){

  
 
   
  
  fish.depth = gameOver.depth;
  fish.depth = gameOver.depth+1;
  fish.depth = gameOver.depth;
  fish.depth = gameOver.depth+1;
  fish.depth = restart.depth;
  fish.depth = restart.depth+1;
  fish.depth = restart.depth;
  fish.depth = restart.depth+1;
  sharkl.depth = gameOver.depth;
  sharkl.depth = gameOver.depth+1;
  sharkl.depth = gameOver.depth;
  sharkl.depth = gameOver.depth+1;
  sharkl.depth = restart.depth;
  sharkl.depth = restart.depth+1;
  sharkl.depth = restart.depth;
  sharkl.depth = restart.depth+1;
  fish.depth = FishGroup.depth;
  fish.depth = FishGroup.depth+1;
  FishGroup.depth = sharkl.depth;
  sharkl.depth = FishGroup.depth+1;
   r1.depth = sharkl.depth;
   r1.depth = sharkl.depth+1;
   r2.depth = sharkl.depth;
   r2.depth = sharkl.depth+1;
  sharkl.depth = fish.depth;
  sharkl.depth = fish.depth+1;
  
  if (gameState===PLAY){
    gameOver.visible = false;
    restart.visible = false;
   r1.depth = sharkl.depth;
   r1.depth = sharkl.depth+1;
   r2.depth = sharkl.depth;
   r2.depth = sharkl.depth+1;
   fish.depth = gameOver.depth;
   fish.depth = gameOver.depth+1;
   fish.depth = gameOver.depth;
   fish.depth = gameOver.depth+1;
   fish.depth = restart.depth;
   fish.depth = restart.depth+1;
   fish.depth = restart.depth;
   fish.depth = restart.depth+1;
   sharkl.depth = gameOver.depth;
   sharkl.depth = gameOver.depth+1;
   sharkl.depth = gameOver.depth;
   sharkl.depth = gameOver.depth+1;
   sharkl.depth = restart.depth;
   sharkl.depth = restart.depth+1;
   sharkl.depth = restart.depth;
   sharkl.depth = restart.depth+1;
   sharkl.depth = fish.depth;
   sharkl.depth = fish.depth+1;
   fish.depth = FishGroup.depth;
   fish.depth = FishGroup.depth+1;

   //window.addEventListener()
   ctx.fillStyle = 'persian blue';
   ctx.font = '90px Georgia';
   ctx.fillText('OCEAN',339,230);
   ctx.strokeStyle = 'white';
   ctx.strokeRect(0,0,1000,1000);
   const data = ctx.getImageData(0,0,1000,1000)

    if(keyDown(DOWN_ARROW) || fish.isTouching(up)){
      fish.velocityX = 0;
      fish.velocityY =3;
      fish.changeAnimation("fishd",fishd);
    }
    if(keyDown(UP_ARROW)|| fish.isTouching(down)){
      fish.velocityX = 0;
      fish.velocityY =-3;
      fish.changeAnimation("fishu",fishu);
    }
    if(keyDown(LEFT_ARROW)|| fish.isTouching(right)){
      fish.velocityX = -3;
      fish.velocityY =0;
      fish.changeAnimation("fishl",fishl);
    }
    if(keyDown(RIGHT_ARROW)|| fish.isTouching(left)){
      fish.velocityX = 3;
      fish.velocityY =0;
      fish.changeAnimation("fishr",fishr);
    }
    if(frameCount % 400 === 0) {
      sharkl.x = 670;
      sharkl.y = fish.y;
      sharkl.addAnimation("sharkleft",sharklimg);
      sharkl.scale = 0.3;
      sharkl.velocityX = -(5 + 0.5*score/100);
    }
    FishGroup.setDepthEach(fish.depth-1);
    
    /*if(fish.isTouching(BBGroup)){
      //BBGroup.changeAnimation("burst",burst);
      score+=1;
    }*/
    if(wave.x > 671){
      wave.x = -1;
    }
    if(wave2.x > 671){
      wave2.x = -1;
    }
    if (frameCount % 40 === 0) {
      bubs = createSprite(Math.round(random(150,550)),350,15,15);
      bubs.velocityY= -2; 
      bubs.addImage("bb",bub);
      bubs.addAnimation("burst",burst);
      bubs.scale = 0.1;
      bubs.setCollider("circle",0,0,bubs.width/3);
      //bubs.debug = true;
      BBGroup.add(bubs);
      
      
    }
    if(fish.isTouching(BBGroup)){
     // bubs.addAnimation("burst",burst);
      //BBGroup/bubs.changeAnimation("burst",burst);
      //BBGroup/bubs.destroy();
      //popsnd.play();
      BBGroup.scale = 0.1;
      score+=1;
    }
    //console.log(txt.depth);
    //console.log(c.depth);
    
  
   //spawnBubbles();
   spawnClouds();
   spawnFishes();
   spawnFishes2();
   drawSprites();

    if(fish.isTouching(sharkl)){
      fish.x = sharkl.x-50;
      fish.y = sharkl.y+8;
      fish.changeAnimation("fishrimg",rimg);
      fish.velocityX = sharkl.velocityX;
      sharkl.changeAnimation("bite",sharkbimg);
      diesnd.play();
      gameState = END;
    }
  }
  else if (gameState === END) {
    gameOver.visible = true;
    restart.visible = true;
    sharkl.depth = fish.depth;
    sharkl.depth = fish.depth+1;
 /*fish.depth = gameOver.depth;
  fish.depth = gameOver.depth+1;
  fish.depth = gameOver.depth;
  fish.depth = gameOver.depth+1;
  fish.depth = restart.depth;
  fish.depth = restart.depth+1;
  fish.depth = restart.depth;
  fish.depth = restart.depth+1;
  sharkl.depth = gameOver.depth;
  sharkl.depth = gameOver.depth+1;
  sharkl.depth = gameOver.depth;
  sharkl.depth = gameOver.depth+1;
  sharkl.depth = restart.depth;
  sharkl.depth = restart.depth+1;
  sharkl.depth = restart.depth;
  sharkl.depth = restart.depth+1;*/
    //fish.velocityX =0;
    fish.velocityY =0;
    //sharkl.velocityX =0;
    FishGroup.setVelocityXEach =0;
    cloudGroup.setVelocityXEach = 0;
   
   /* if(fish.visible = true){
      
    }*/
   

    if(sharkl.x <145){
      sharkl.changeAnimation("sharkright",sharkrimg);
      sharkl.velocityX = 2.5;
      fish.changeAnimation("fishlimg",limg);
      fish.x = sharkl.x+50;
      fish.y = sharkl.y+8;
      fish.velocityX = sharkl.velocityX;
      fish.visible = false;
    }
    else if(sharkl.x >545){
      sharkl.changeAnimation("sharkleft",sharklimg);
      sharkl.velocityX = -2.5;
      fish.changeAnimation("fishrimg",rimg);
      fish.x = sharkl.x-50;
      fish.y = sharkl.y+8;
      fish.velocityX = sharkl.velocityX;
      fish.visible = false;
    }
   if(wave.x > 671){
    wave.x = -1;
  }
  if(wave2.x > 671){
    wave2.x = -1;
  }
  if(sharkl.velocityX>0){
    gameOver.depth = sharkl.depth;
    gameOver.depth = sharkl.depth+1;
    restart.depth = sharkl.depth;
    restart.depth = sharkl.depth+1;
    sharkl.depth = fish.depth;
    sharkl.depth = fish.depth+1;
    
  }
  else if(sharkl.velocityX<0){
    sharkl.depth = gameOver.depth;
      sharkl.depth = gameOver.depth + 1;
      sharkl.depth = restart.depth;
      sharkl.depth = restart.depth + 1;
      sharkl.depth = fish.depth;
      sharkl.depth = fish.depth+1;
  }
  if(localStorage["HighestScore"]<score){
    localStorage["HighestScore"] = score;
  }
  console.log(localStorage["HighestScore"]);
  
    drawSprites();
    textSize(15);
    stroke("black");
    fill("black");
    text("HIGH SCORE : "+localStorage["HighestScore"],455,132);
    if(mousePressedOver(restart)) {
      clicksnd.play();
      reset();
    }
  }
  if(score<1000){
   textSize(15);
   stroke("white");
   fill("blue");
   text(" : "+score,235,132);
  }
  else if(score>1000){
    textSize(17.5);
    stroke("yellow");
    fill("yellow");
    text(" : "+score,235,132);
   }
}
function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 180 === 0) {
    var cloud = createSprite(600,10,40,10);
    //cloud.y = Math.round(random(-20,40));
    var rand = Math.round(random(1,3));
    switch(rand) {
      case 1: cloud.addImage(cl1);
              break;
      case 2: cloud.addImage(cl2);
              break;
      case 3: cloud.addImage(cl3);
              break;
      default: break;
    }
    cloud.scale = 0.1;
    //cloud.visible = false;
    cloud.velocityX = -0.5;
    
     //assign lifetime to the variable
    cloud.lifetime = 1400;
    cloud.depth = r1.depth;
    r1.depth = cloud.depth+1;
    cloud.depth = r2.depth;
    r2.depth = cloud.depth+1;
    cloudGroup.add(cloud);
  }
}
function spawnFishes() {
  //write code here to spawn the clouds
  if (frameCount % 190 === 0) {
    var fis = createSprite(600,100,40,10);
    fis.y = Math.round(random(130,300));
    var rand = Math.round(random(1,5));
    switch(rand) {
      case 1: fis.addAnimation("black",bf);
              break;
      case 2: fis.addAnimation("blue",blf);
              break;
      case 3: fis.addAnimation("green",gf);
              break;
      case 4: fis.addAnimation("yellow",yf);
              break;
              
      default: break;
    }
    fis.scale = 0.07;
    //cloud.visible = false;
    fis.velocityX = -3;
    
     //assign lifetime to the variable
    fis.lifetime = 175;
    fis.depth = r1.depth;
    r1.depth = fis.depth+1;
    fis.depth = r2.depth;
    r2.depth = fis.depth+1;
    FishGroup.add(fis);
  }
}

function spawnFishes2() {
  //write code here to spawn the clouds
  if (frameCount % 140 === 0) {
    var fish2 = createSprite(85,100,40,10);
    fish2.y = Math.round(random(130,300));
    var rand = Math.round(random(1,5));
    switch(rand) {
      case 1: fish2.addAnimation("black",bf2);
              break;
      case 2: fish2.addAnimation("blue",blf2);
              break;
      case 3: fish2.addAnimation("green",gf2);
              break;
      case 4: fish2.addAnimation("yellow",yf2);
              break;
              
      default: break;
    }
    fish2.scale = 0.07;
    //cloud.visible = false;
    fish2.velocityX = 3;
    
     //assign lifetime to the variable
    fish2.lifetime = 175;
    fish2.depth = r1.depth;
    r1.depth = fish2.depth+1;
    fish2.depth = r2.depth;
    r2.depth = fish2.depth+1;
    FishGroup.add(fish2);
  }
}
//function spawnBubbles() {}
function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  fish.visible = true;
  fish.x = 338;
  fish.y = 250;
  fish.velocityX = 0;
  sharkl.x = 670;
  sharkl.changeAnimation("sharkleft",sharklimg);
  if(localStorage["HighestScore"]<score){
    localStorage["HighestScore"] = score;
  }
  console.log(localStorage["HighestScore"]);
  
  score = 0;
  
}

