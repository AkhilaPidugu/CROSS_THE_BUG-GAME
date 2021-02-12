class Enemy {
  constructor(x, y, speed) {
    this.x = x;
    this.y = y;
    this.speed = Math.random() * 300 + 50;
    this.img = 'images/enemy-bug.png';
  }
};

// Update the enemy's position, required method for game
Enemy.prototype.update = function (dt) {
  this.x = this.x + (this.speed) * dt;
  if (this.x > 505) {
    this.x = -50;
  }
};


// Draw the enemy on the screen
Enemy.prototype.render = function () {
  ctx.drawImage(Resources.get(this.img), this.x, this.y);
};


// player class
class Player {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.img = 'images/char-pink-girl.png';
  }
}

//Player class update method
Player.prototype.update = function (dt) {

};

//Player class render method to display image on screen
Player.prototype.render = function () {
  ctx.drawImage(Resources.get(this.img), this.x, this.y);
};

//All enemy objects are placed in an array called allEnemies
var allEnemies = [];
// Place the player object in a variable called player
var player = new Player(200, 400);
var enemy = [60, 145, 230];
for (var i = 0; i < enemy.length; i++) {
  var enemies = new Enemy(0, enemy[i], 100);
  allEnemies.push(enemies);
}

//Player handleInput() to control the direction
Player.prototype.handleInput = function (key) {
  switch (key) {
    case 'up':
      if (this.y > 0) {
        this.y -= 81;
      }
      break;
    case 'down':
      if (this.y < 400) {
        this.y += 81;
      }
      break;
    case 'left':
      if (this.x > 0) {
        this.x -= 102;
      }
      break;
    case 'right':
      if (this.x < 400) {
        this.x += 102;
      }
      break;
    default:
  }
  if (this.y < 40) {
    setTimeout(() => {
      this.x = 200;
      this.y = 400;
      levelCount();
    }, 100);
  }
};

var levelinc = document.querySelector(".level");
var level_count = 1;
var score = document.querySelector(".score");
var scoreinc = 0;

//To increase the level count and score
function levelCount() {

  if (level_count == 2) {
    player.img = "images/char-cat-girl.png"


  } else if (level_count == 3) {
    player.img = "images/char-horn-girl.png";

  } else if (level_count == 4) {
    player.img = "images/char-princess-girl.png"

  }
  //  else if (level_count == 5) {
  //   player.sprite = "images/char-princess-girl.png";

  // } 
  else if (level_count == 5) {
    swal({
      icon: "success",
      title: 'Hurray! You won the game',
      text: "Your Score: " + scoreinc,
      button: 'Play Again',
    }).then(function () {
      location.reload();
    });
  }
  if (level_count != 5) {
    level_count++;
    levelinc.innerHTML = "Level:";
    scoreinc += 100;
    score.innerHTML = "Score:";
    levelinc.innerHTML += level_count;
    score.innerHTML += scoreinc;

  }
}

//To check the collision with bugs
Player.prototype.checkCollisions = function () {
  for (var i in enemy) {
    if (allEnemies[i].x < this.x + 60 && allEnemies[i].x + 70 > this.x &&
      allEnemies[i].y < this.y + 60 && 70 + allEnemies[i].y > this.y) {
      player.x = 200;
      player.y = 400;
      scoreinc -= 50;
      score.innerHTML = "Score: " + scoreinc;
    }
  }
};

document.addEventListener('keyup', function (e) {
  var allowedKeys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down'
  };

  player.handleInput(allowedKeys[e.keyCode]);
});