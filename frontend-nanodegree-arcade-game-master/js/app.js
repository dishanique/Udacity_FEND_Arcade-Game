// Enemies our player must avoid
var Enemy = function(x, y) {
    
// Variables 
    this.x = x;
    this.y = y;
    this.counter = 0;
   
//Used for Collision Detection
    this.left = this.x;
    this.right = this.x + 50;
    this.top = this.y;
    this.bottom = this.y + 50;

// Speed of enemies are random
    this.speed = Math.floor(Math.random() * (300)) + 100;
    
  
    this.sprite = 'images/enemy-bug.png';
};

// For score
// Player.prototype.scoreInc = function(inc) {
//     this.score += inc;
//     document.getElementById('score').innerHTML = 'Score: ' + this.score;
// };

// Player.prototype.scoreDec = function(dec) {
//     this.score -= dec;
//     document.getElementById('score').innerHTML = 'Score: ' + this.score;
// };
// Resets enemy to start for left of canvas
Enemy.prototype.reset = function() {
    this.x = -200; 
};

// Update the enemies position here
Enemy.prototype.update = function(dt) {

    this.x = this.x + (this.speed * dt);
    // Resets enemy to start for right side of canvas
      if(this.x > 505) {
        this.reset();
    }
};

// Draws the enemy on the screen
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Player class
var Player = function(x, y, mainChar) {
    this.x = 200;
    this.y = 400;

    this.sprite = mainChar;


    //Used for Collision Detection
    this.left = this.x;
    this.right = this.x + 50;
    this.top = this.y;
    this.bottom = this.y +50;
    this.sprite= 'images/char-horn-girl.png';
};

// Possibe charcater change
Player.prototype.changeChar = function() {

    this.counter++;
    // console.log(counter);
    switch (this.counter % 3) {
        case 0:
            mainChar = 'images/char-pink-girl.png';
            break;
        case 1:
            mainChar = 'images/char-boy.png';
            break;
        case 2:
            mainChar = 'images/char-horn-girl.png';
            break;
    }
    player = new Player(200, 400, mainChar);
};
// Resets player for collision with the enemies
Player.prototype.reset = function() {
    this.x = 200;
    this.y = 400;
};

// Enemy.prototype.collisionDetect = function(enemyObj) {
//     if ((player.x <= this.x + 60 && player.x >= this.x - 60) && (player.y <= this.y + 60 && player.y >= this.y - 60)) {

//         player.reset();
        
//         player = new Player(200, 425, mainChar);
//         document.getElementById("score").innerHTML = 'Bug Attack! -20!';
//         player.scoreDec(20);
//     }
// };
//Prevents player from going out of bounds on canvas
Player.prototype.update = function() {
    if (this.x < 5) {
        this.x = 5;
    } else if (this.x > 400) {
        this.x = 400;
    } else if (this.y < 2) {
        this.y = 5;
        // document.getElementById("info").innerHTML = 'You WON! + 60!';
        // player.scoreInc(60);
        player.reset();
    } else if (this.y > 410) {
        this.y = 410;
    }
};


Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Use arrow keys to control the player
Player.prototype.handleInput = function(key){
    switch (key){
        case 'left':
            this.x = this.x - 100;
            break;
        case 'right':
            this.x = this.x + 100;
            break;
        case 'up':
            this.y = this.y - 90;
            break;
        case 'down':
            this.y = this.y + 90;
            break;
    }
};


var enemy1 = new Enemy(-400, 225);
var enemy2 = new Enemy(-200, 140);
var enemy3 = new Enemy(-100, 60);
var enemy4 = new Enemy(-500, 310);
var enemy5 = new Enemy(-300, 225);
var enemy6 = new Enemy(-600, 60);

// Player as an onject
var player = new Player();
var mainChar = 'images/char-horn-girl.png';

// This listens for key presses and sends the keys to your
// Player.handleInput() method. 
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

// Enemies player must avoid!
var allEnemies = [enemy1, enemy2, enemy3, enemy4, enemy5, enemy6];
    
// Collisions between enemies and player
function checkCollisions () {
allEnemies.forEach(function(enemy) {
         if(enemy.x < player.x + 50 &&
            enemy.x + 50 > player.x &&
            enemy.y < player.y + 50 &&
            enemy.y + 50 > player.y) {
                
                player.reset();
            }
        });
}
