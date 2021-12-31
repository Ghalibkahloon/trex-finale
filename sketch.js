var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;




var score=0;
var PLAY=1
var END=0
var gameState=PLAY

function preload(){
  trex_running = loadAnimation("trex1.png","trex2.png","trex3.png");
  trex_collided = loadImage("trex_collided.png");
  
  groundImage = loadImage("ground2.png");
  
 cloudImage=loadImage("cloud.png")
  
 obstacle1=loadImage("obstacle1.png")
 obstacle2=loadImage("obstacle2.png")
 obstacle3=loadImage("obstacle3.png")
 obstacle4=loadImage("obstacle4.png")
 obstacle5=loadImage("obstacle5.png")
 obstacle6=loadImage("obstacle6.png")

 GameoverImage=loadImage("gameOver.png")

 RestartImage=loadImage("restart.png")
}

function setup() {

  createCanvas(600,200)
  
  //create a trex sprite
  trex = createSprite(50,160,20,50);
  trex.addAnimation("running", trex_running);
  trex.scale = 0.5;
  
  //create a ground sprite
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  
  
  //creating invisible ground
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  obstaclesgroup=new Group()
  cloudsgroup=new Group()
  //generate random numbers
  var rand =  Math.round(random(1,100))
  console.log(rand)

  gameover = createSprite(300,100);
  gameover.addImage("gameover",GameoverImage)
  gameover.scale = 1.5
  gameover.visible=false
  
  restart = createSprite(300,140)
  restart.addImage("restart",RestartImage)
  restart.scale = 0.5
  restart.visible=false

}

function draw() {
  //set background color
  background(180);
  text("score"+score,500,50)
  if(gameState===PLAY){
   ground.velocityX-3
   score=score+Math.round(frameCount/60)
   if(keyDown("space")&& trex.y >= 100) {
        trex.velocityY = -10;
      }
      
      trex.velocityY = trex.velocityY + 0.8
      
      if (ground.x < 0){
        ground.x = ground.width/2;
      }
      spawnClouds()
  spawnobstacles()
  if(obstaclesgroup.isTouching(trex)){
          gameState=END
  }
  }
  else if(gameState===END){
        ground.velocityX-0
        gameover.visible=true
        restart.visible=true
        obstaclesgroup.setLifetimeeach(-1)
        cloudsgroup.setLifetimeeach(-1)
        obstaclesgroup.setVelocityXEach(0)
        cloudsgroup.setVelocityXEach(0)
  }
  
  
  
  
  
  
  //stop trex from falling down
  trex.collide(invisibleGround);
  
  //Spawn Clouds
  
  drawSprites();
}

//function to spawn the clouds
function spawnClouds(){
 // write your code here 
 if(frameCount%60==0){
  cloud=createSprite(600,100,40,10);
  cloud.velocityX=-3;
  cloud.addImage(cloudImage)
  cloud.y=Math.round(random(10,60))
  cloud.lifetime=200,
  cloud.scale=0.5;
  cloudsgroup.add(cloud)
 }
}
function spawnobstacles(){
if(frameCount%60==0){
var obstacle=createSprite(600,165,10,40)
obstacle.velocityX=-3
obstacle.scale=0.5;
obstaclesgroup.add(obstacle)
var rand=Math.round(random(1,6));
switch(rand){
case 1: obstacle.addImage(obstacle1);
        break;
case 2: obstacle.addImage(obstacle2);
        break;
case 3: obstacle.addImage(obstacle3);
        break;
case 4: obstacle.addImage(obstacle4);
        break;
case 5: obstacle.addImage(obstacle5);        
        break;
case 6: obstacle.addImage(obstacle6);
        break;
default:break;       
}    
}
}