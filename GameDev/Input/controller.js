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
