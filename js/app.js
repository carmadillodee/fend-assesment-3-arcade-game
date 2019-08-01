//score variables
let score = 0;
let lives = 3;

// makes scoreboard
function drawScore() {
  ctx.font = "16px Arial";
  ctx.fillStyle = "#0095DD";
  ctx.fillText("Score: " + score + "  Lives: " + lives, 20, 30);
}


// Enemies our player must avoid
class Enemy {
  constructor(x, y, s) {
    this.x = x;
    this.y = y;
    this.speed = s;
    this.enemyWidth = 96;
    this.bugHeight = 65;
    this.maxDist = 505 + this.enemyWidth;
    this.sprite = 'images/enemy-bug.png';
    this.enemyHitMaxLeft = this.x - 70;
    this.enemyHitMaxRight = this.x + 70;
    this.enemyHitMaxTop = this.y - 60;
    this.enemyHitMaxBottom = this.y + 60;
  }


//draw functions for enemy and Player
//note: // Parameter: dt, a time delta between ticks
  update(dt) {
    this.x += this.speed * dt;

    if (this.x >= this.maxDist) {
      this.x = 0 - this.enemyWidth;
    }

//player-enemy collision logic
    if (player.x > this.x - 70 && player.x < this.x + 70 && player.y > this.y - 60 && player.y < this.y + 60) {
      console.log("Hit!", player.x, player.y);
      player.resetPos();
      lives--;
      if (lives <= 0) {
        alert("GAVE OVER");
        player.resetPos;
        score = 0;
        lives = 3;
      }
    }
  }
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Player class
class MainPlayer {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.xStep = 100;
    this.yStep = 83;
    this.charWidth = 67;
    this.charHeight = 75;
    this.sprite = 'images/char-boy.png';
  }

//render player avatar
  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }

//handles key input for player avatar
  handleInput(direction) {
    if (direction === "up" && this.y <= 68) {
      this.waterWin();
    } else if (direction === 'up') {
      this.y = this.y - this.yStep;
    } else if (direction === "down" && this.y + this.charHeight <= 401) {
      this.y = this.y + this.yStep;
    } else if (direction === "left" && this.x >= 1) {
      this.x = this.x - this.xStep;
    } else if (direction === "right" && this.x + this.charWidth <= 400) {
      this.x = this.x + this.xStep;
    }
  }

  update() {

    //for (let enemy of allEnemies) {
      //console.log(this.y, enemy.y);
    //}
  }

// avatar hits water
  waterWin() {
    if (score === 2) {
      alert("YOU WIN!");
      this.resetPos();
      score = 0;
    } else {
      this.resetPos();
      score++;
      console.log(score);
    }
  }
  resetPos() {
    this.x = 200;
    this.y = 400;
  }
}

// Instantiating player and enemies
var player = new MainPlayer(200, 400);
var enemy1 = new Enemy(5, 220, 200);
var enemy2 = new Enemy(5, 140, 100);
var enemy3 = new Enemy(5, 60, 300);

var allEnemies = [enemy1, enemy2, enemy3];

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
  var allowedKeys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down'
  };

  player.handleInput(allowedKeys[e.keyCode]);
});
