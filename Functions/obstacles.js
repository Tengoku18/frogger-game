class Obstacle {
  constructor(x, y, width, height, speed, type) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.speed = speed;
    this.type = type;
    this.frameX = 0;
    this.frameY = 0;
    this.randomise = Math.floor(Math.random() * 30 + 30);
    this.carFrame = 0;
  }

  //Drawing Obstacles in canvas 2
  drawObstacle() {
    if (this.type === "turtle") {
      if (frame % this.randomise === 0) {
        if (this.frameX >= 1) this.frameX = 0;
        else this.frameX++;
      }
      ctx1.drawImage(
        turtle,
        this.frameX * 70,
        this.frameY * 70,
        70,
        70,
        this.x,
        this.y,
        this.height,
        this.width
      );
    } else if (this.type === "log") {
      ctx1.drawImage(log, this.x, this.y, this.width, this.height);
    } else {
      // ctx1.fillRect(this.x, this.y, this.width, this.height);
      ctx1.drawImage(
        car,
        this.carFrame * 160,
        79,
        grid * 2.3,
        grid,
        this.x,
        this.y,
        this.width,
        this.height
      );
    }
  }

  //For Horizental Motion of Obstacle
  update() {
    this.x += this.speed * gamespeed;
    //For regenerating obstacle once it goes out of the screen

    if (this.speed > 0) {
      if (this.x > canvas.width + this.width) {
        this.x = 0 - this.width;
      }
    } else {
      this.carFrame = 1;
      if (this.x < 0 - this.width) {
        this.x = canvas.width + this.width;
      }
    }
  }
}

function createObstacle() {
  //lane 1 Obstacles
  for (let i = 0; i < 2; i++) {
    //for the spacing between two obstacles
    let x = i * 350;
    //creating new object of class
    carsArray.push(
      new Obstacle(x, canvas.height - grid * 2 - 30, grid * 2, grid, 2, "car")
    );
  }
  //lane 2  Obstacles (here we pass grid *3  because we are moving to next lane)
  for (let i = 0; i < 2; i++) {
    let x = i * 350;
    //creating new object of class
    carsArray.push(
      new Obstacle(x, canvas.height - grid * 3 - 30, grid * 2, grid, -2, "car")
    );
  }

  //Lane 3
  for (let i = 0; i < 2; i++) {
    let x = i * 400;
    //creating new object of class
    carsArray.push(
      new Obstacle(x, canvas.height - grid * 4 - 30, grid * 2, grid, 2, "car")
    );
  }

  //lane 4
  for (let i = 0; i < 2; i++) {
    let x = i * 400;
    //creating new object of class
    logsArray.push(
      new Obstacle(x, canvas.height - grid * 5 - 98, grid * 2, grid, -2, "log")
    );
  }
  //Lane 5
  for (let i = 0; i < 3; i++) {
    let x = i * 200;
    //creating new object of class
    logsArray.push(
      new Obstacle(x, canvas.height - grid * 6 - 98, grid, grid, 0.7, "turtle")
    );
  }
}
createObstacle();

function handleObstacle() {
  for (i = 0; i < carsArray.length; i++) {
    carsArray[i].update();
    carsArray[i].drawObstacle();
  }
  for (i = 0; i < logsArray.length; i++) {
    logsArray[i].update();
    logsArray[i].drawObstacle();
  }
  //Checking Collisons with cars
  for (i = 0; i < carsArray.length; i++) {
    if (detectCollision(frogger, carsArray[i])) {
      ctx3.drawImage(
        collisions,
        0,
        100,
        100,
        100,
        frogger.x,
        frogger.y,
        50,
        50
      );
      resetGame();
    }
  }

  //Checking Collison in River

  if (frogger.y < 200 && frogger.y > 50) {
    safeState = false;
    for (i = 0; i < logsArray.length; i++) {
      if (detectCollision(frogger, logsArray[i])) {
        frogger.x += logsArray[i].speed;
        safeState = true;
      }
    }
    if (!safeState) {
      ctx3.drawImage(collisions, 0, 0, 100, 100, frogger.x, frogger.y, 50, 50);
      resetGame();
    }
  }
}
