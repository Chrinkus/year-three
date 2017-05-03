(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
charCodes = {
    // Mods
    16: "shft",
    17: "ctrl",
    18: "alt",

    // Misc
    32: "space",

    // Digits
    48: "0",
    49: "1",
    50: "2",
    51: "3",
    52: "4",
    53: "5",
    54: "6",
    55: "7",
    56: "8",
    57: "9",

    // Alpha
    65: "A",
    66: "B",
    67: "C",
    68: "D",
    69: "E",
    70: "F",
    71: "G",
    72: "H",
    73: "I",
    74: "J",
    75: "K",
    76: "L",
    77: "M",
    78: "N",
    79: "O",
    80: "P",
    81: "Q",
    82: "R",
    83: "S",
    84: "T",
    85: "U",
    86: "V",
    87: "W",
    88: "X",
    89: "Y",
    90: "Z"
};

if (typeof module !== "undefined" && module.exports) {
    module.exports = charCodes;
}

},{}],2:[function(require,module,exports){
const charCodes     = require("./charcodes");
const LinkedList    = require("./linkedlist");

function controller(actor) {
    "use strict";
    const controls          = actor.controls,
          queue             = new LinkedList(),
          activeKeys        = Object.create(null),
          preventRepeat     = Object.create(null);

    function routeControl(charKey) {

        if (charKey in preventRepeat) {
            return;
        }

        switch (controls[charKey].behaviour) {
            case "queued":
                queue.addItem(charKey);
                preventRepeat[charKey] = true;
                break;

            case "once":
                actor[controls[charKey].action]();
                preventRepeat[charKey] = true;
                break;

            case "free":
                activeKeys[charKey] = true;
                break;

            default:
                console.error("Unregistered control key");
        }
    }

    function cancelKey(charKey) {

        switch (controls[charKey].behaviour) {
            case "queued":
                queue.removeItem(charKey);
                delete preventRepeat[charKey];
                break;

            case "once":
                delete preventRepeat[charKey];
                break;

            case "free":
                delete activeKeys[charKey];
                break;

            default:
                console.error("Sneaky key in keyUp");
        }
    }

    return {
        keyDown(code) {
            const charKey = charCodes[code];

            if (charKey in controls) {
                routeControl(charKey);
            }
        },

        keyUp(code) {
            const charKey = charCodes[code];

            if (charKey in controls) {
                cancelKey(charKey);
            }
        },

        fire() {
            let prop;

            // fire free controls
            for (prop in activeKeys) {
                actor[controls[prop].action]();
            }

            // fire queued controls
            if (queue.val) {
                actor[controls[queue.val].action]();
            }
        }
    };
}

if (typeof module !== "undefined" && module.exports) {
    module.exports = controller;
}

},{"./charcodes":1,"./linkedlist":4}],3:[function(require,module,exports){
function keyboardInput(controller) {
    "use strict";

    function downHandler(event) {
        event.preventDefault();
        event.stopPropagation();

        controller.keyDown(event.keyCode, event.shiftKey);
    }

    function upHandler(event) {
        event.stopPropagation();

        controller.keyUp(event.keyCode, event.shiftKey);
    }

    document.addEventListener("keydown", downHandler, false);
    document.addEventListener("keyup", upHandler, false);
}

if (typeof module !== "undefined" && module.exports) {
    module.exports = keyboardInput;
}

},{}],4:[function(require,module,exports){
/* Linked List
 *
 * This implementation is not a fully-featured linked list, it only has the
 * parts that I need for queuing game actions
 */

function LinkedList(val, next) {
    "use strict";
    this.val = val;
    this.next = next || null;
}

LinkedList.prototype.addItem = function(val) {
    if (this.val) {
        this.next = new LinkedList(this.val, this.next);
    }
    this.val = val;
};

LinkedList.prototype.removeItem = function(val, prev) {
    if (this.val === val) {
        if (this.next) {
            this.val = this.next.val;
            this.next = this.next.next;
        } else {
            this.val = null;
            if (prev) {
                prev.next = null;
            }
        }
    } else {
        this.next.removeItem(val, this);
    }
};

if (typeof module !== "undefined" && module.exports) {
    module.exports = LinkedList;
}

},{}],5:[function(require,module,exports){
//const Projectile = require("./projectile");

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
    this.emitColor  = "aqua";

    this.speed      = 4;
    this.angle      = 0;
    this.turnSpeed  = 0.075;

    //this.projectiles = projectiles;
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

/*
Player.prototype.shoot = function() {
    // Use the emitter center
    const x = this.centerX + this.emitW * Math.cos(this.angle),
          y = this.centerY;

    this.projectiles.push(new Projectile(x, y, this.emitW, this.angle,
                                         this.boxColor, this.emitColor));
};
*/

Object.defineProperty(Player.prototype, "controls", {
    value: {
        "W": { action: "forward",       behaviour: "queued" },
        "S": { action: "backward",      behaviour: "queued" },
        "Q": { action: "strafeLeft",    behaviour: "queued" },
        "E": { action: "strafeRight",   behaviour: "queued" },

        "A": { action: "turnLeft",      behaviour: "free" },
        "D": { action: "turnRight",     behaviour: "free" }

        //"space": { action: "shoot",     behaviour: "once" }
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

if (typeof module !== "undefined" && module.exports) {
    module.exports = Player;
}

},{}],6:[function(require,module,exports){
const Player = require("./player");
const controller = require("./controller2");
const keyboardInput = require("./keyboard");
//const projectileManager = require("./projectile-manager");

(function() {
    "use strict";

    const canvas = document.getElementById("viewport");
    const ctx = canvas.getContext("2d");

    const chris = new Player("Chris", canvas.width / 2, canvas.height / 2);
    const ctrlr = controller(chris);
    keyboardInput(ctrlr);

    function main() {
        window.requestAnimationFrame(main);

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "grey";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        chris.draw(ctx);
        //projectileManager.draw(ctx);

        ctrlr.fire();
        //projectileManager.update();
        //projectileManager.clean();
    }

    main();
}());

},{"./controller2":2,"./keyboard":3,"./player":5}]},{},[6]);
