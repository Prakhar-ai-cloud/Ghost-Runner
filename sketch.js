var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var PLAY=1;
var END=0;
var gameState=PLAY;

function preload(){
  towerImg = loadImage("tower.png")
  doorImg = loadImage("door.png")
  climberImg = loadImage("climber.png")
  ghostImg = loadImage("ghost-jumping.png")
  spookyS=loadSound("spooky.wav")
  
}

function setup(){
  createCanvas(600,600);
  
  tower=createSprite(300,300,10,10)
  tower.addImage(towerImg);
  tower.velocityY=5;
  
  climbersGroup=createGroup();
  invisibleBlockGroup=createGroup();
  doorsGroup=createGroup();
  
  ghost = createSprite(300,300)
  ghost.addImage(ghostImg)
  ghost.scale=0.4;
  
}

function draw(){
  background(0);
  
 // spookyS.loop();
  
  if(gameState===PLAY){
  if(tower.y>600){
    tower.y=300
  }
  
  doors();
    
    if(climbersGroup.isTouching(ghost)){
      ghost.velocityY=0;
      //ghost.x=climbersGroupEach.x
      //ghost.y=climbersGroupEach.y
    }
  
  if(keyDown("space")){
    ghost.velocityY=-3;
  }
   if(frameCount> 20) {
  ghost.velocityY=ghost.velocityY+0.5;
   }
  if(keyDown('a')){
    ghost.x=ghost.x-3;
  }
  
  if(keyDown('d')){
    ghost.x=ghost.x+3;
  }
    if(invisibleBlockGroup.isTouching(ghost)){
       ghost.destroy();
       gameState=END;
       }
    
  }
  
  if(gameState===END){
    textSize(30);
    fill('yellow');
    text('Game Over',200,300)
    tower.destroy();
    doorsGroup.destroyEach();
    climbersGroup.destroyEach();
    invisibleBlockGroup.destroyEach();
  }
  
  
   drawSprites();
}

function doors(){
  if(frameCount%200===0){
  var door = createSprite(Math.round(random(150,450)),0,10,10)
  door.addImage(doorImg)
  door.velocityY=3;
  var climber= createSprite(door.x,door.y+60,20,20)
  climber.velocityY=3;
    climber.addImage(climberImg)
    var invisibleBlock=createSprite(climber.x,climber.y+10,climber.width,2)
    invisibleBlock.velocityY=3;
    invisibleBlock.debug=true;
    invisibleBlock.visible=false;
    
    doorsGroup.add(door)
    climbersGroup.add(climber)
      invisibleBlockGroup.add(invisibleBlock)
    
  climber.depth=door.depth;
  
  ghost.depth=door.depth;
    ghost.depth+=1  
    }
  
  
}