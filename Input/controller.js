/* The Controller
 *
 * Adapts an event handling module to a target entity that is controlled by
 * the user.
 */

const charCodes     = require("./charcodes");
// const LinkedList    = require("./linkedlist");

function Controller(actor) {
    "use strict";
    this.actor = actor;
    this.controls = actor.defaultControls;
    this.charCodes = charCodes;
}

Controller.prototype.keyDown = function(code) {
    const charCode = this.charCodes[code];

    if (charCode in this.controls) {
        this.actor[this.controls[charCode]]();
    }
};

Controller.prototype.keyUp = function(code) {
    // nothing  yet...
};
if (typeof module !== "undefined" && module.exports) {
    module.exports = Controller;
}
