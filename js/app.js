// Enemies our player must avoid
var Enemy = function (i) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = -101;
    this.y = 78 * (i + 1);
    this.speed = 10 - i * 2;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function () {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed;
    if (this.x >= 505)
        this.x = -101;
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
class Player {
    constructor() {
        this.sprite = 'images/char-boy.png';
        this.x = 202;
        this.y = 78 * 4;
        this.xSpeed = 101;
        this.ySpeed = 78;
        this.xOnUpdate = 0;
        this.yOnUpdate = 0;
        this.winner = false;
    }
    update() {
        this.x += this.xOnUpdate;
        this.y += this.yOnUpdate;
        this.xOnUpdate = 0;
        this.yOnUpdate = 0;
        // detect win state
        if (this.y == 0)
            this.win();
    }
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
        if (this.winner) {
            ctx.fillStyle = 'yellow';
            ctx.font = '48px serif';
            ctx.fillText('You Won!!', 150, 520);
        }
    }
    handleInput(key) {
        // stop moving on lose
        if (stop)
            return;
        switch (key) {
            case 'left':
                if (this.x > 0)
                    this.xOnUpdate = -(this.xSpeed);
                break;

            case 'right':
                if (this.x < 404)
                    this.xOnUpdate = this.xSpeed;
                break;

            case 'down':
                if (this.y < 390)
                    this.yOnUpdate = this.ySpeed;
                break;

            case 'up':
                if (this.y > 0)
                    this.yOnUpdate = -(this.ySpeed);
                break;

            default:
                break;
        }
    }
    // show win message
    win() {
        this.winner = true;
        setTimeout(() => {
            this.winner = false;
            this.goBack();
        }, 3000)
    }
    // take player back to the start point
    goBack() {
        this.x = 101 * 2;
        this.y = 78 * 4;
    }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
let player = new Player();
let allEnemies = [];
for (let i = 0; i < 3; i++) {
    allEnemies.push(new Enemy(i));
}



// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
