// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;
    this.speed = Math.random() * speed;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
};
// when reached ens of game
    if (this.x > WIDTH) {
        allEnemies.splice(allEnemies.indexOf(this), 1);
    }
    this.collisionDetect(this);
    this.x += dt * this.speed;
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// for collisionDetection 
Enemy.prototype.collisionDetect = function(enemyObj) {
    if ((player.x <= enemyObj.x + 50 && player.x >= enemyObj.x - 50) && (player.y <= enemyObj.y + 50 && player.y >= enemyObj.y - 50)) {
        player = new Player(200, 425, mainChar);
        document.getElementById("score").innerHTML = 'Bug Attack! -20!';
        scoreDec(25);
    }
};

// Now write your own player class
var Player = function(x, y, mainChar) {

    this.x = x;
    this.y = y;

    this.sprite = mainChar;

};
// This class requires an update(), render() and
// a handleInput() method.
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//the update method for player, runs from engine.js checks for various occurences
Player.prototype.update = function() {

    this.checkWin();
    createEnemies();

};
//If less than 5 bugs on the board. Adds to the array
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
var allEnemies = [];
// Place the player object in a variable called player
var createEnemies = function() {
    if (allEnemies.length < 5) {
        var rand = Math.random();
        if (rand < 0.33) {
            rand = 50;
        } else if (rand > 0.66) {
            rand = 140;
        } else {
            rand = 230;
        }
        var enemy = new Enemy(0, rand, TILE_SIZE);

        allEnemies.push(enemy);
    }
};

Player.prototype.handleInput = function(keyPush) {

    document.getElementById("info").innerHTML = 'Hurry or Else';
    switch (keyPush) {
        case 'left':
            if (this.boundsDetect(this.x - TILE_SIZE, this.y)) {
                this.x -= TILE_SIZE;
            }
            break;
        case 'up':
            if (this.boundsDetect(this.x, this.y - TILE_SIZE)) {
                this.y -= TILE_SIZE;
            }
            break;
        case 'right':
            if (this.boundsDetect(this.x + TILE_SIZE, this.y)) {
                this.x += TILE_SIZE;
            }
            break;
        case 'down':
            if (this.boundsDetect(this.x, this.y + TILE_SIZE)) {
                this.y += TILE_SIZE;
            }
            break;
        default:
            break;
    }
};
// For score
var scoreInc = function(inc) {
    score += inc;
    document.getElementById("score").innerHTML = 'Score: ' + score;
};

var scoreDec = function(dec) {
    score -= dec;
    document.getElementById("score").innerHTML = 'Score: ' + score;
};
//Whether in boundary or out of boundary. Will subtracts points.
Player.prototype.boundsDetect = function(x, y) {
    if (x > 495 || x < 0 || y > 500 || y < -100) {
        return false;
    } else
        return true;
};
// Resets game after checking for a win
Player.prototype.checkWin = function() {
    if (this.y > -100 && this.y < 0) {
        scoreInc(50);
        document.getElementById("info").innerHTML = 'You WON! + 50!';
        player = new Player(200, 425, mainChar);
    }
};

// Possibe charcater change
function changeChar() {

    counter++;
    console.log(counter);
    switch (counter % 3) {
        case 0:
            mainChar = 'images/enemy-bug.png';
            break;
        case 1:
            mainChar = 'images/stone-block.png';
            break;
        case 2:
            mainChar = 'images/char-horn-girl.png';
            break;
    }
    player = new Player(200, 425, mainChar);
}
// Variables
var TILE_SIZE = 100;
var WIDTH = 450;
var score = 0;
var counter = 0;
var mainChar = 'images/char-boy.png';

var player = new Player(200, 425, mainChar);

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