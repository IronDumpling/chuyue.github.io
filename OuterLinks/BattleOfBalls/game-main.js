// 设置画布
const canvas = document.querySelector('canvas'); // canvas is an object referring to the tag <canvas>
const ctx = canvas.getContext('2d'); // ctx is an object referring to the 2d area used to draw balls

const width = canvas.width = window.innerWidth; // canvas width = window width, width = canvas width
const height = canvas.height = window.innerHeight; // canvas height = window height, height = canvas height

const para = document.querySelector('p');
let count = 0;

// 生成处于 [min, max] 的随机数的函数
function random(min,max) {
  const num = Math.floor(Math.random() * (max - min)) + min; //
  return num;
}

// 生成随机颜色的函数
function randomColor() {
  return 'rgb(' +
      random(0, 255) + ', ' +
      random(0, 255) + ', ' +
      random(0, 255) + ')';
}

// Shape Object Constructor
function Shape(x, y, velX, velY) {
  // Coordination
  this.x = x;
  this.y = y;

  // Velocity
  this.velX = velX;
  this.velY = velY;

  // Bool
  this.exists = true;
}

// Ball Object Constructor
function Ball(x, y, velX, velY, color, size) {
  // Inherits from Shape()
  Shape.call(this, x, y, velX, velY);

  // Color and Size
  this.color = color;
  this.size = size;
}

// Ball Prototype Method 1: Draw
Ball.prototype.draw = function () {
  ctx.beginPath(); // Step 1. 声明我们要在Canvas上画图形了
  ctx.fillStyle = this.color; // Step 2. 定义图形的颜色
  ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI); // Step 3. 定义圆弧，(中心坐标，半径，弧度角度)
  ctx.fill(); // Step 4. 填满圆弧，并结束beginPath()的声明
}

// Ball Prototype Method 2: Update
Ball.prototype.update = function () {
  // Corner Cases: Hit Border
  if ((this.x + this.size) >= width) {
    this.velX = -(this.velX);
  }

  if ((this.x - this.size) <= 0) {
    this.velX = -(this.velX);
  }

  if ((this.y + this.size) >= height) {
    this.velY = -(this.velY);
  }

  if ((this.y - this.size) <= 0) {
    this.velY = -(this.velY);
  }

  // Common Case
  this.x += this.velX;
  this.y += this.velY;
}

// Ball Prototype Method 3: Collide
Ball.prototype.collide = function () {
  // Step 1. Traverse all other balls
  for (let j = 0; j < balls.length; j++) {
    if (this !== balls[j]) {
      // Step 2. Compute distances
      const dx = this.x - balls[j].x;
      const dy = this.y - balls[j].y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      // Step 3. Detect Collision
      if (distance < this.size + balls[j].size) {
        balls[j].color = this.color = randomColor();
      }
    }
  }
}

// Evil Circle Object Constructor
function EvilCircle(x, y){
  // Inherit from Shape()
  Shape.call(this, x, y, 20, 20);

  // Color and Size
  this.color = 'white';
  this.size = 10;
}

// Evil Circle Prototype Method 1: Draw
EvilCircle.prototype.draw = function () {
  ctx.beginPath(); // Step 1. 声明我们要在Canvas上画图形了
  ctx.strokeStyle = this.color; // Step 2. 定义线的颜色，
  ctx.lineWidth = 3; // Step 3. 定义线的厚度
  ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI); // Step 3. 定义圆弧，(中心坐标，半径，弧度角度)
  ctx.stroke(); // Step 4. 保留圆弧线，并结束beginPath()的声明
}

// Evil Circle Prototype Method 2: Check Bounds
EvilCircle.prototype.checkBounds = function () {
  if ((this.x + this.size) >= width) {
    this.x = width - this.size;
  }

  if ((this.x - this.size) <= 0) {
    this.x = this.size;
  }

  if ((this.y + this.size) >= height) {
    this.y = height - this.size;
  }

  if ((this.y - this.size) <= 0) {
    this.y = this.size;
  }
}

// Evil Circle Prototype Method 3: Set Controls
EvilCircle.prototype.setControls = function () {
  // Use keyboard to control Evil Circle
  window.onkeydown = e => { // 用 箭头函数 代替了匿名函数，从而无需 var _this = this
    switch(e.key) {
      case 'a':
        this.x -= this.velX;
        break;
      case 'd':
        this.x += this.velX;
        break;
      case 'w':
        this.y -= this.velY;
        break;
      case 's':
        this.y += this.velY;
        break;
    }
  };
}

// Evil Circle Prototype Method 4: Collide
EvilCircle.prototype.collide = function () {
  for (let j = 0; j < balls.length; j++) {
    // Step 1. Traverse all exist balls
    if (balls[j].exists) {
      // Step 2. Compute distances
      const dx = this.x - balls[j].x;
      const dy = this.y - balls[j].y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      // Step 3. Detect Collision
      if (distance < this.size + balls[j].size) {
        // Balls Update
        balls[j].exists = false;
        // Size Update
        this.size += balls[j].size / 4;
        // Score Update
        count--;
        para.textContent = 'Number of Balls Left: ' + count;
      }
    }
  }
}

// Create and Store Balls
let balls = [];
let ballLength = random(20, 40);
while (balls.length < ballLength) {
  let size = random(10, 20);
  let ball = new Ball(
      // 为避免绘制错误，球至少离画布边缘球本身一倍宽度的距离
      random(0 + size, width - size),
      random(0 + size, height - size),
      random(-7, 7),
      random(-7, 7),
      randomColor(),
      size
  );
  balls.push(ball);
  // Score Update
  count++;
  para.textContent = 'Number of Balls Left: ' + count;
}

// Create Evil Circle
let evilCircle = new EvilCircle(width/2, height/2);

// Set Control of Evil Circle
evilCircle.setControls();

// The Loop of the Anime
function loop() {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.5)'; // Step 1. Fill canvas with half transparent black（为1时看不到轨迹）
  ctx.fillRect(0, 0, width, height); // Step 2. Start Canvas Drawing

  for (let i = 0; i < balls.length; i++) {
    // Step 3. Traverse Exists Balls
    if(balls[i].exists){
      balls[i].draw();
      balls[i].update();
      balls[i].collide();
    }

    // Step 4. Update Evil Circle
    evilCircle.draw();
    evilCircle.checkBounds();
    evilCircle.collide();
  }

  requestAnimationFrame(loop); // Step 4. 使用 requestAnimationFrame() 方法再运行一次函数
                               // 当一个函数正在运行时传递相同的函数名，从而每隔一小段时间都会运行一次这个函数，
                               // 这样我们可以得到一个平滑的动画效果。这主要是通过递归完成的
                               // 也就是说函数每次运行的时候都会调用自己，从而可以一遍又一遍得运行。
}

// Call Loop Function as the Main Function
loop();