function Player(name, x, y) {
    "use strict";
    this.name = name;
    this.x = x || 0;
    this.y = y || 0;
    this.speed = 4;
    this.angle = 0;
    this.turnSpeed = 0.1;
}

Player.prototype.forward = function() {
    this.x += this.speed * Math.cos(this.angle);
    this.y += this.speed * Math.sin(this.angle);
};

Player.prototype.backward = function() {
    this.x -= this.speed / 2 * Math.cos(this.angle);
    this.y -= this.speed / 2 * Math.sin(this.angle);
}

Player.prototype.turnLeft = function() {
    this.angle -= this.turnSpeed;
};

Player.prototype.turnRight = function() {
    this.angle += this.turnSpeed;
};

Player.prototype.strafeLeft = function() {
    this.y -= this.speed;
};

Player.prototype.strafeRight = function() {
    this.y += this.speed;
};

// TESTING PURPOSES
Player.prototype.report = function() {
    console.log(`x: ${this.x}, y: ${this.y}, a: ${this.angle}`);
};

if (typeof module !== "undefined" && module.exports) {
    module.exports = Player;
}
