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
    this.x += this.speed * Math.cos(this.angle - Math.PI / 2);
    this.y += this.speed * Math.sin(this.angle - Math.PI / 2);
};

Player.prototype.strafeRight = function() {
    this.x += this.speed * Math.cos(this.angle + Math.PI / 2);
    this.y += this.speed * Math.sin(this.angle + Math.PI / 2);
};

Object.defineProperty(Player.prototype, "defaultControls", {
    value: {
        "W": "forward",
        "S": "backward",
        "Q": "turnLeft",
        "E": "turnRight",
        "D": "strafeRight",
        "A": "strafeLeft",
        "R": "report"           // delete when report is removed
    }
});

Player.prototype.draw = function(ctx) {
    ctx.save();

    ctx.translate(this.x, this.y);
    ctx.rotate(this.angle);
    ctx.fillStyle = "black";
    ctx.fillRect(-32, -32, 64, 64);

    ctx.restore();
};

// TESTING PURPOSES
Player.prototype.report = function() {
    console.log(`x: ${this.x}, y: ${this.y}, a: ${this.angle}`);
};

if (typeof module !== "undefined" && module.exports) {
    module.exports = Player;
}
