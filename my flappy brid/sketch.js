var bird , birdImg;;
var bgImg;
var pipe1 , pipe2;
var score = 0;

var notTouching = 1; 
var touching = 0;
var gameState = notTouching;
var gameOverImg , gameOver;
var playImg , play;;


function preload(){
    bgImg = loadImage("bg.webp");
    pipe1 = loadImage("pipe1.jpeg");
    pipe2 = loadImage("pipe2.png");
    birdImg = loadImage("bird.jpeg");
    gameOverImg = loadImage("gameover.jpeg");
    playImg = loadImage("play.jpeg");

}


function setup(){
    createCanvas(windowWidth,windowHeight);

    bird = createSprite(200,100,20,20);
    bird.addImage(birdImg);
    bird.scale = 0.4;

    pipes1Group = new Group();
    pipes2Group = new Group();

    gameOver = createSprite(windowWidth/2,windowHeight/2,30,30);
    gameOver.addImage(gameOverImg);
    gameOver.scale = 0.7;
    gameOver.visible = false;

    play = createSprite(200,500,20,30);
    play.visible = false;
    play.addImage(playImg);
    play.scale = 0.5;

}

function draw(){
    background(bgImg);

    bird.debug = true;

    if (mousePressedOver(play)){
        reset();
    }

    if (gameState === notTouching){
        spawnPipes();
        spawnPipes1();
        
        score = score+Math.round(getFrameRate()/60) ;
        
        if (keyDown("space")){
            bird.velocityY = -10;
        }

        bird.velocityY = bird.velocityY+0.5;

        if (pipes2Group.isTouching(bird) || pipes1Group.isTouching(bird) || bird.y>windowHeight){
            gameState = touching
        }



    }

    else if (gameState === touching){
            bird.velocityY = 0;

            pipes2Group.setVelocityXEach(0);
            pipes1Group.setVelocityXEach(0);
            gameOver.visible = true;   
            play.visible = true;
        }

    drawSprites();

    textSize(20);
    fill("black");
    text("Score : "+score ,70 ,80 );
}


function reset(){
    gameOver.visible = false;
    play.visible = false;
    gameState = notTouching;
    pipes1Group.destroyEach();
    pipes2Group.destroyEach();
    bird.x = 200;
    bird.y = 100;
    score = 0;
}



function spawnPipes(){
    if (frameCount % 60=== 0){
        var pipe = createSprite(windowWidth,random(-100 , 100) , 20 , random(100,600));
        pipe.velocityX = -8;
        image(pipe1 , pipe.x , pipe.y , pipe1.width , random(100,500));
        pipe.addImage(pipe1);
        pipe.scale = 0.7
        pipe.debug = true;
        pipes1Group.add(pipe);
        pipe.setCollider("rectangle" , 0 , 0 ,100 , pipe.height);
    }
}

function spawnPipes1(){
    if (frameCount % 60=== 0){
        var pipe = createSprite(windowWidth,random(700 ,550) , 20 , random(100,600));
        pipe.velocityX = -8;
        image(pipe1 , pipe.x , pipe.y , pipe2.width , random(100,500));
        pipe.addImage(pipe2);
        pipe.scale = 0.7;
        pipe.debug = false;
        pipes2Group.add(pipe);
        pipe.setCollider("rectangle" , 0 , 0 ,100 , pipe.height);
    }
}