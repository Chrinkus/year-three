function Player(name, x, y) {
    "use strict";
    this.name = name;
    this.x = x || 0;
    this.y = y || 0;
    this.speed = 4;
    this.angle = 0;
    this.turnSpeed = 0.075;
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
    this.x += this.speed * 0.75 * Math.cos(this.angle - Math.PI / 2);
    this.y += this.speed * 0.75 * Math.sin(this.angle - Math.PI / 2);
};

Player.prototype.strafeRight = function() {
    this.x += this.speed * 0.75 * Math.cos(this.angle + Math.PI / 2);
    this.y += this.speed * 0.75 * Math.sin(this.angle + Math.PI / 2);
};

Object.defineProperties(Player.prototype, {
    "queuedControls": {
        value: {
            "W": "forward",
            "S": "backward",
            "Q": "strafeLeft",
            "E": "strafeRight"
        }
    },
    "freeControls": {
        value: {
            "A": "turnLeft",
            "D": "turnRight",
            "R": "report"
        }
    }
});

Player.prototype.draw = function(ctx) {
    ctx.save();

    ctx.translate(this.x, this.y);
    ctx.rotate(this.angle);
    ctx.fillStyle = "black";
    ctx.fillRect(-32, -32, 64, 64);
    ctx.fillStyle = "white";
    ctx.fillRect(8, -8, 16, 16);

    ctx.restore();
};

// TESTING PURPOSES
Player.prototype.report = function() {
    console.log(`x: ${this.x}, y: ${this.y}, a: ${this.angle}`);
};

if (typeof module !== "undefined" && module.exports) {
    module.exports = Player;
}
