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
  frame++;

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

function scored() {
  score++;
  gamespeed += 0.05;
  frogger.x = canvas.width / 2 - frogger.width / 2;
  frogger.y = canvas.height - frogger.height - 40;
}

//ScoreBoard
function handleScore() {
  ctx4.filStyle = "black";
  ctx4.font = "25px serif ";
  ctx4.fillText("Score: " + score, 240, 25);

  ctx4.font = "25px serif ";
  ctx4.fillText("Collisons: " + collisionsCount, 10, 25);
  ctx4.fillText("Game Speed: " + gamespeed.toFixed(1), 420, 25);
}

//Collision Detection Code
function detectCollision(first, second) {
  return !(
    first.x > second.x + second.width ||
    first.x + first.width < second.x ||
    first.y > second.y + second.height ||
    first.y + first.height < second.y
  );
}

function resetGame() {
  frogger.x = canvas.width / 2 - frogger.width / 2;
  frogger.y = canvas.height - frogger.height - 40;
  score = 0;
  collisionsCount++;
  gamespeed = 1;
}
