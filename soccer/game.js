var player;
var player2;
var ball;
var ballDirection;
var goal;
var player1X;
var player2X;
var ai;
var playerSpeed;
var aiSpeed;
var ballSpeedLimit;

function setup() {                     
  createCanvas(250,350);
  
  //Initialize Variables
  player1X = 125;
  player2X = 125;
  ai = false;
  playerSpeed = 3;
  aiSpeed = 1;
  ballSpeedLimit = 3;
  
  
  //Border
  borderBottom = createSprite(width/2, 345, width, 10);
  borderTop = createSprite(width/2, 5, width, 10);
  borderLeft = createSprite(5, height/2, 10, height);
  borderRight = createSprite(width - 5, 175, 10, height);
  
  //Objects
  player2 = createSprite(player1X, 40, 50, 10);
  //player1L = createSprite(player1X - 15, 40, 20, 10);
  //player1M = createSprite(player1X, 40, 10, 10);
  //player1R = createSprite(player1X + 15, 40, 20, 10);
  
  player1 = createSprite(player2X, height - 40, 50, 10);
  //player2L = createSprite(player2X - 15, height - 40, 20, 10);
  //player2M = createSprite(player2X, height - 40, 10, 10);
  //player2R = createSprite(player2X + 15, height - 40, 20, 10);
  
  ball = createSprite(width / 2, height / 2, 10, 10);
  
  goal1 = createSprite(width / 2, 15, 100, 10);
  goal2 = createSprite(width / 2, height - 15, 100, 10);
  
  //Ball Initialization
  ballY = -3;
  ballX = 0;
  
  
  
}                                            

function draw() {  
  //Initialization
  background(0, 0, 100);
  drawSprites();
  
  ball.position.y -= ballY;
  ball.position.x -= ballX;
  
  //Player Initialization
  player1.position.x = player1X;
  //player1R.position.x = player1X + 17.5;
  //player1L.position.x = player1X - 17.5;
  //player1M.position.x = player1X;
  
  player2.position.x = player2X;
  //player2R.position.x = player2X + 17.5;
  //player2L.position.x = player2X - 17.5;
  //player2M.position.x = player2X;
    
  //Player 2 Collision
   if (ball.bounce(player2)){
    if(ballY < ballSpeedLimit){
    ballY += .5;
    }
    ballY *= -1;
  }
  if (ball.overlap(player2) && keyDown("d")){
    ballX -= 1;
  }
  if (ball.overlap(player2) && keyDown("a")){
    ballX += 1;
  }
   
  
  //Player 1 Collision
  if (ball.overlap(player1)){
    if(-ballY < -ballSpeedLimit){
    ballY -= .5;
    }
    ballY *= -1;
  }
  if (ball.overlap(player1) && keyDown(RIGHT_ARROW)){
    ballX -= 1;
  }
  if (ball.overlap(player1) && keyDown(LEFT_ARROW)){
    ballX += 1;
  }
  
  
  //Border Collision
  if (ball.overlap(borderBottom)){
    ballY *= -1;
  }
  if (ball.overlap(borderTop)){
    ballY *= -1;
  }
  if (ball.overlap(borderLeft)){
    ballX *= -1;
  }
  if (ball.bounce(borderRight)){
    ballX *= -1;
  }
  
  //Goal Collision
  if(ball.overlap(goal1)){
    ball.remove();
    ballX = 0;
    ballY = 3;
    ball = createSprite(125, 175,10,10);
    player1X = 125;
    player2X = 125;
  }
  if(ball.overlap(goal2)){
    ball.remove();
    ballX = 0;
    ballY = -3;
    ball = createSprite(125, 175,10,10);
    player1X = 125;
    player2X = 125;
  }
  
  //Player Control
  if (keyDown(RIGHT_ARROW)&& player1.position.x < (width-35)) {
    player1X += playerSpeed;
  }
  if (keyDown(LEFT_ARROW)&& player1.position.x > 35) {
    player1X -= playerSpeed;
  }
  if (keyDown("d")&& player2.position.x < (width-35)) {
    player2X += playerSpeed;
  }
  if (keyDown("a")&& player2.position.x > 35) {
    player2X -= playerSpeed;
  }
  //Player AI
  if(ai == true){
    if (player2X < ball.position.x && player2X < (width-35)){
      player2X += aiSpeed;
    }
    if(player2X > ball.position.x && player2X > 35){
      player2X -= aiSpeed;
    }
  }
}