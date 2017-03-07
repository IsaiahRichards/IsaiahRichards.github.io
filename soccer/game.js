var player;
var player2;
var ball;
var ballX;
var ballY;
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
  ai = true;
  playerSpeed = 3;
  aiSpeed = 1;
  ballSpeedLimit = 10;
  
  
  //Border
  borderBottom = createSprite(width/2, 345, width, 10);
  borderTop = createSprite(width/2, 5, width, 10);
  borderLeft = createSprite(5, height/2, 10, height);
  borderRight = createSprite(width - 5, 175, 10, height);
  
  //Objects
  player1 = createSprite(player1X, 40, 50, 10);
  player1L = createSprite(player1X-17.5, 40, 15, 10);
  player1M = createSprite(player1X, 40, 20, 10);
  player1R = createSprite(player1X+17.5, 40, 15, 10);
  
  player2 = createSprite(player2X, height - 40, 50, 10);
  player2L = createSprite(player2X - 17.5, height - 40, 15, 10);
  player2M = createSprite(player2X, height - 40, 20, 10);
  player2R = createSprite(player2X + 17.5, height - 40, 15, 10);
  
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
  player1R.position.x = player1X + 17.5;
  player1L.position.x = player1X - 17.5;
  player1M.position.x = player1X;
  
  player2.position.x = player2X;
  player2R.position.x = player2X + 17.5;
  player2L.position.x = player2X - 17.5;
  player2M.position.x = player2X;
    
  //Player 2 Collision
  if (ball.overlap(player1R) && !ball.overlap(player1M)){
    ballX -= 1;
    ballY *= -1;
  }
  if (ball.overlap(player1L) && !ball.overlap(player1M)){
    ballX += 1;
    ballY *= -1;
  }
  if (ball.overlap(player1M)){
    if(ballY < ballSpeedLimit){
    ballY += .5;
    }
    ballY *= -1;
  }
  
  //Player 1 Collision
  if (ball.overlap(player2R) && !ball.overlap(player2M)){
    ballX += -1;
    ballY *= -1;
  }
  if (ball.overlap(player2L) && !ball.overlap(player2M)){
    //if(ballDirectionX < 25){
    ballX += 1;
    //}
    ballY *= -1;
  }
  if (ball.overlap(player2M)){
    if(ballY < -ballSpeedLimit){
    ballY -= .5;
    }
    ballY *= -1;
  }
  
  //Border Collision
  if (ball.bounce(borderBottom)){
    ballY *= -1;
  }
  if (ball.bounce(borderTop)){
    ballY *= -1;
  }
  if (ball.bounce(borderLeft)){
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
    if (player1X < ball.position.x && player1X <= (width-35)){
      player1X += aiSpeed;
    }
    if(player1X > ball.position.x && player1X > 35){
      player1X -= aiSpeed;
    }
  }
}