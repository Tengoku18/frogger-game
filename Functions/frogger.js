class Frogger {
  constructor() {
    this.spritewidth = 600;
    this.spriteheight = 600;

    this.width = this.spritewidth / 12; //50
    this.height = this.spriteheight / 12;

    this.x = canvas.width / 2 - this.width / 2;
    this.y = canvas.height - this.height - 50;
    console.log(this.y);

    this.moving = false;
    this.frameX = 0;
    this.frameY = 0;
  }
  update() {
    //Controls Up button Movement
    if (keys[38]) {
      if (this.moving == false) {
        frogPlaceX = 1;

        this.y -= grid; // this.y = this.y - grid
        console.log("from key", this.y);

        if (this.y < initialY && this.y > 0) {
          initialY = this.y;

          increaseScore();
        }
        this.moving = true;
      }
    }
    //controls Down button Movement
    //another condition is to prevent frog from leaving the screen
    if (keys[40]) {
      if (this.moving == false && this.y < canvas.height - this.height * 2) {
        frogPlaceX = 1;
        // frogPlaceY = 3;
        this.y += grid;
        this.moving = true;
      }
    }
    //Controls left button movements
    if (keys[37]) {
      if (this.moving == false && this.x > this.width) {
        frogPlaceX = 1;
        frogPlaceY = 1;
        this.x -= grid;
        this.moving = true;
      }
    }

    //Controls right button Movements
    if (keys[39]) {
      if (this.moving == false && this.x < canvas.width - this.width * 2) {
        frogPlaceY = 1;
        // frogPlaceY = 6;
        this.x += grid;
        this.moving = true;
      }
    }

    if (this.y < 100) {
      levelPassed();
    }
  }

  //Drawing Frog in Canvas 3
  draw() {
    ctx3.drawImage(
      frog,
      frogPlaceX * 50,
      frogPlaceY * 50,
      50,
      45,
      frogger.x,
      frogger.y,
      50,
      50
    );
  }
}

//Creating New constructor
const frogger = new Frogger();
