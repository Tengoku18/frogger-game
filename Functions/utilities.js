function animate() {
  ctx3.clearRect(0, 0, canvas.width, canvas.height);
  ctx1.clearRect(0, 0, canvas.width, canvas.height);
  ctx4.clearRect(0, 0, canvas.width, canvas.height);
  ctx2.clearRect(0, 0, canvas.width, canvas.height);

  ctx2.drawImage(backgroungImg, 0, 0, canvas.width, canvas.height);
  frogger.draw();

  frogger.update();
  //Upto here we created Frog and background Image now we create Obstacles
  handleObstacle();
  handleScore();

  requestAnimationFrame(animate);
}

animate();

//Event Listeners
window.addEventListener("keydown", function (e) {
  keys = [];
  keys[e.keyCode] = true;
});

//When the user releases the key this code will be executed.
window.addEventListener("keyup", function (e) {
  delete keys[e.keyCode];
  frogger.moving = false;
  frogPlaceX = 0;
  frogPlaceY = 0;
});

function increaseScore() {
  score += 10;
}

function levelPassed() {
  if (highScore < score) {
    highScore = score;
  }
  initialY = 700;
  gamespeed += 0.05;
  frogger.x = canvas.width / 2 - frogger.width / 2;
  frogger.y = canvas.height - frogger.height - 50;
}

//ScoreBoard
function handleScore() {
  ctx4.fillStyle = "white";
  ctx4.font = "25px serif ";
  ctx4.fillText("Score: " + score, 230, 25);
  ctx4.fillText("Lives: " + lives, 410, 25);

  ctx4.font = "25px serif ";
  ctx4.fillText("High Score: " + highScore, 10, 25);
  ctx4.fillText("Game Speed: " + gamespeed.toFixed(1), 600, 25);
}

//Collision Detection Code

function detectCollision(rect1, rect2) {
  // Check if the rectangles intersect on the x-axis
  if (rect1.x + rect1.width < rect2.x || rect2.x + rect2.width < rect1.x) {
    return false;
  }

  // Check if the rectangles intersect on the y-axis
  if (rect1.y + rect1.height < rect2.y || rect2.y + rect2.height < rect1.y) {
    return false;
  }

  // If the rectangles intersect on both the x-axis and y-axis, then they collide
  return true;
}

function resetGame() {
  lives--;

  if (lives <= 0) {
    alert("Out of Lives.You can always try again!!");
    highScore = 0;
    setTimeout(() => {
      document.location.reload();
    }, 1000);
  }

  frogger.x = canvas.width / 2 - frogger.width / 2;
  frogger.y = canvas.height - frogger.height - 50;
  score = 0;
  collisionsCount++;
  gamespeed = 1;
  initialY = 510;
}
