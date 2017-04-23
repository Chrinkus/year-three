(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
charCodes = {
    // Mods
    16: "shft",
    17: "ctrl",
    18: "alt",

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
/* The Controller
 *
 * Adapts an event handling module to a target entity that is controlled by
 * the user.
 */

const charCodes     = require("./charcodes");
const LinkedList    = require("./linkedlist");

function Controller(actor) {
    "use strict";
    this.actor          = actor;
    this.charCodes      = charCodes;

    this.queue          = new LinkedList();
    this.activeKeys     = Object.create(null);
    this.preventRepeat  = Object.create(null);
}

Controller.prototype.keyDown = function(code) {
    const charCode = this.charCodes[code];

    if (charCode in this.actor.queuedControls) {

        if (this.preventRepeat[charCode]) {
            return;
        } else {
            this.preventRepeat[charCode] = true;
        }

        this.queue.addItem(charCode);

    } else if (charCode in this.actor.freeControls) {

        this.activeKeys[charCode] = true;
    }
};

Controller.prototype.keyUp = function(code) {
    const charCode = this.charCodes[code];

    if (charCode in this.actor.queuedControls) {

        this.queue.removeItem(charCode);

        delete this.preventRepeat[charCode];

    } else if (charCode in this.actor.freeControls) {

        delete this.activeKeys[charCode];
    }
};

Controller.prototype.update = function() {
    let prop;

    if (this.queue.val) {
        this.actor[this.actor.queuedControls[this.queue.val]]();
    }

    for (prop in this.activeKeys) {
        this.actor[this.actor.freeControls[prop]]();
    }
};

if (typeof module !== "undefined" && module.exports) {
    module.exports = Controller;
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

},{}],6:[function(require,module,exports){
const Player = require("./player");
const Controller = require("./controller");
const keyboardInput = require("./keyboard");

(function() {
    "use strict";

    const canvas = document.getElementById("viewport");
    const ctx = canvas.getContext("2d");

    const chris = new Player("Chris", canvas.width / 2, canvas.height / 2);
    const ctrlr = new Controller(chris);
    keyboardInput(ctrlr);

    function main() {
        window.requestAnimationFrame(main);

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "grey";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        chris.draw(ctx);

        ctrlr.update();
    }

    main();
}());

},{"./controller":2,"./keyboard":3,"./player":5}]},{},[6]);
