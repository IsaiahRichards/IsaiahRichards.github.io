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
  //player1L = createSprite(player1X - 15, 40, 20, 10);
  //player1M = createSprite(player1X, 40, 10, 10);
  //player1R = createSprite(player1X + 15, 40, 20, 10);
  
  player2 = createSprite(player2X, height - 40, 50, 10);
  //player2L = createSprite(player2X - 15, height - 40, 20, 10);
  //player2M = createSprite(player2X, height - 40, 10, 10);
  //player2R = createSprite(player2X + 15, height - 40, 20, 10);
  
  ball = createSprite(width / 2, height / 2, 10, 10);
  
  goal1 = createSprite(width / 2, 15, 100, 10);
  goal2 = createSprite(width / 2, height - 15, 100, 10);
  
  //Ball Initialization
  ballDirectionY = -3;
  ballDirectionX = 0;
  
  
  
}                                            

function draw() {  
  //Initialization
  background(0, 0, 100);
  drawSprites();
  
  ball.position.y -= ballDirectionY;
  ball.position.x -= ballDirectionX;
  
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
  if (ball.overlap(player2) && keyDown("d")){
    ballDirectionX -= 1;
  }
  if (ball.overlap(player2) && keyDown("a")){
    ballDirectionX += 1;
  }
    if (ball.overlap(player2)){
    if(ballDirectionY < ballSpeedLimit){
    ballDirectionY -= .5;
    }
    ballDirectionY *= -1;
  }
  
  //Player 1 Collision
  if (ball.overlap(player1) && keyDown(RIGHT_ARROW)){
    ballDirectionX -= -1;
    ballDirectionY *= -1;
  }
  if (ball.overlap(player1) && keyDown(LEFT_ARROW)){
    ballDirectionX += 1;
    ballDirectionY *= -1;
  }
  if (ball.overlap(player1)){
    if(ballDirectionY < -ballSpeedLimit){
    ballDirectionY += .5;
    }
    ballDirectionY *= -1;
  }
  
  //Border Collision
  if (ball.overlap(borderBottom)){
    ballDirectionY *= -1;
  }
  if (ball.overlap(borderTop)){
    ballDirectionY *= -1;
  }
  if (ball.overlap(borderLeft)){
    ballDirectionX *= -1;
  }
  if (ball.overlap(borderRight)){
    ballDirectionX *= -1;
  }
  
  //Goal Collision
  if(ball.overlap(goal1)){
    ball.remove();
    ballDirectionX = 0;
    ballDirectionY = 3;
    ball = createSprite(125, 175,10,10);
    player1X = 125;
    player2X = 125;
  }
  if(ball.overlap(goal2)){
    ball.remove();
    ballDirectionX = 0;
    ballDirectionY = -3;
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
    if (player1X < ball.position.x && player1X < (width-35)){
      player1X += aiSpeed;
    }
    if(player1X > ball.position.x && player1X > 35){
      player1X -= aiSpeed;
    }
  }
}