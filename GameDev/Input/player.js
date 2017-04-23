function Player(name, x, y) {
    "use strict";
    this.name = name;
    this.centerX    = x || 0;
    this.centerY    = y || 0;

    this.boxX       = -32;
    this.boxY       = -32;
    this.boxW       = 64;
    this.boxColor   = "black";
    this.emitX      = 8;
    this.emitY      = -8;
    this.emitW      = 16;
    this.emitColor  = "white";

    this.speed      = 4;
    this.angle      = 0;
    this.turnSpeed  = 0.075;

    this.projectiles = [];
}

Player.prototype.forward = function() {
    this.centerX += this.speed * Math.cos(this.angle);
    this.centerY += this.speed * Math.sin(this.angle);
};

Player.prototype.backward = function() {
    this.centerX -= this.speed / 2 * Math.cos(this.angle);
    this.centerY -= this.speed / 2 * Math.sin(this.angle);
}

Player.prototype.turnLeft = function() {
    this.angle -= this.turnSpeed;
};

Player.prototype.turnRight = function() {
    this.angle += this.turnSpeed;
};

Player.prototype.strafeLeft = function() {
    this.centerX += this.speed * 0.75 * Math.cos(this.angle - Math.PI / 2);
    this.centerY += this.speed * 0.75 * Math.sin(this.angle - Math.PI / 2);
};

Player.prototype.strafeRight = function() {
    this.centerX += this.speed * 0.75 * Math.cos(this.angle + Math.PI / 2);
    this.centerY += this.speed * 0.75 * Math.sin(this.angle + Math.PI / 2);
};

Player.prototype.shoot = function() {
    const x = this.centerX + this.emitX * Math.cos(this.angle),
          y = this.centerY + this.emitY * Math.sin(this.angle);

    this.projectiles.push(new Projectile(x, y, this.emitW, this.angle,
                                         this.boxColor, this.emitColor));
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

    "timedControls" : {
        value: {
            "space": "shoot"
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

    ctx.translate(this.centerX, this.centerY);
    ctx.rotate(this.angle);
    ctx.fillStyle = this.boxColor;
    ctx.fillRect(this.boxX, this.boxY, this.boxW, this.boxW);
    ctx.fillStyle = this.emitColor;
    ctx.fillRect(this.emitX, this.emitY, this.emitW, this.emitW);

    ctx.restore();
};

// TESTING PURPOSES
Player.prototype.report = function() {
    console.log(`x: ${this.centerX}, y: ${this.centerY}, a: ${this.angle}`);
};

if (typeof module !== "undefined" && module.exports) {
    module.exports = Player;
}
