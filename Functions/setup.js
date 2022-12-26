//For Obstacles
const canvas = document.getElementById("canvas1");
const ctx1 = canvas.getContext("2d");
canvas.width = 600;
canvas.height = 600;

//For Backgroung Image
const canvas2 = document.getElementById("canvas2");
const ctx2 = canvas2.getContext("2d");
canvas2.width = 600;
canvas2.height = 600;

//For Forg
const canvas3 = document.getElementById("canvas3");
const ctx3 = canvas3.getContext("2d");
canvas3.width = 600;
canvas3.height = 600;

const canvas4 = document.getElementById("canvas4");
const ctx4 = canvas4.getContext("2d");
canvas4.width = 600;
canvas4.height = 600;

const canvas5 = document.getElementById("canvas5");
const ctx5 = canvas5.getContext("2d");
canvas5.width = 600;
canvas5.height = 600;

// Declaring Global Varibles
const grid = 70;
let keys = [];
let score = 0;
let safeState = false;
let collisionsCount = 0;
let frame = 0;
let frogPlaceX = 0;
let frogPlaceY = 0;
let gamespeed = 1;
const carsArray = [];
const logsArray = [];

// Using  Images
const backgroungImg = new Image();
backgroungImg.src = "/Images/background.png";

const collisions = new Image();
collisions.src = "/Images/collisions.png";

const turtle = new Image();
turtle.src = "/Images/turtles.png";

const log = new Image();
log.src = "/Images/log.png";

const car = new Image();
car.src = "/Images/cars.png";

const frog = new Image();
frog.src = "/Images/frog.png";

let noOfCars = 3;
