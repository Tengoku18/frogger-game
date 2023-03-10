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
    this.carFrame = 0;
  }

  //Drawing Obstacles in canvas 2
  drawObstacle() {
    if (this.type === "turtle") {
      ctx1.drawImage(
        turtle,
        0,
        0,
        100,
        50,
        this.x,
        this.y,

        this.width,
        this.height
      );
    } else if (this.type === "log") {
      ctx1.drawImage(log, this.x, this.y, this.width, this.height);
    } else {
      // ctx1.fillRect(this.x, this.y, this.width, this.height);
      // console.log(this.height - 5);
      ctx1.drawImage(
        car,
        this.carFrame * 50,
        0,
        grid,
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
      new Obstacle(x, canvas.height - grid * 2 - 49, grid, grid - 5, 2, "car")
    );
  }
  //lane 2  Obstacles (here we pass grid *3  because we are moving to next lane)
  for (let i = 0; i < 3; i++) {
    let x = i * 275;
    //creating new object of class
    carsArray.push(
      new Obstacle(x, canvas.height - grid * 3 - 49, grid, grid - 5, -2, "car")
    );
  }

  // //Lane 3
  for (let i = 0; i < 2; i++) {
    let x = i * 400;
    //creating new object of class
    carsArray.push(
      new Obstacle(x, canvas.height - grid * 4 - 49, grid, grid - 5, 2, "car")
    );
  }
  for (let i = 0; i < 2; i++) {
    let x = i * 350;
    //creating new object of class
    carsArray.push(
      new Obstacle(x, canvas.height - grid * 5 - 49, grid, grid - 5, -2, "car")
    );
  }
  for (let i = 0; i < 3; i++) {
    let x = i * 300;
    //creating new object of class
    carsArray.push(
      new Obstacle(x, canvas.height - grid * 6 - 49, grid, grid - 5, 2, "car")
    );
  }

  //River Obstacles
  for (let i = 0; i < 4; i++) {
    let x = i * 250;
    console.log(" Obstacle starts from", canvas.height - grid * 8 - 49);
    logsArray.push(
      new Obstacle(
        x,
        canvas.height - grid * 8 - 49,
        grid * 2,
        grid - 5,
        2,
        "log"
      )
    );
  }
  for (let i = 0; i < 3; i++) {
    let x = i * 200;

    logsArray.push(
      new Obstacle(
        x,
        canvas.height - grid * 9 - 49,
        grid * 2,
        grid - 5,
        -0.7,
        "turtle"
      )
    );
  }
  for (let i = 0; i < 2; i++) {
    let x = i * 400;
    //creating new object of class
    logsArray.push(
      new Obstacle(
        x,
        canvas.height - grid * 10 - 49,
        grid * 2,
        grid - 5,
        2.5,
        "log"
      )
    );
  }

  for (let i = 0; i < 2; i++) {
    let x = i * 300;
    //creating new object of class
    logsArray.push(
      new Obstacle(
        x,
        canvas.height - grid * 11 - 49,
        grid * 2,
        grid - 5,
        -1,
        "turtle"
      )
    );
  }

  for (let i = 0; i < 2; i++) {
    let x = i * 450;
    //creating new object of class
    logsArray.push(
      new Obstacle(
        x,
        canvas.height - grid * 12 - 49,
        grid * 2,
        grid - 5,
        2,
        "log"
      )
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

  if (frogger.y < 351 && frogger.y > 100) {
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
