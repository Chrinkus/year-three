/* Keyboard Input
 *
 * This is based on the chapter in Nicholas C. Zakas' book Maintainable JS and
 * conversations with David Wesst.
 */

function keyboard(decoder) {
    "use strict";

    function downHandler(event) {
        event.preventDefault();
        event.stopPropagation();

        decoder.keyDown(event.keyCode, event.shiftKey);
    }

    function upHandler(event) {
        event.stopPropagation();

        decoder.keyUp(event.keyCode, event.shiftKey);
    }

    document.addEventListener("keydown", downHandler, false);
    document.addEventListener("keyup", upHandler, false);
}

const decoder = {
    
    activeKeys: Object.create(null),

    codesToKeys: {
        87: "W",
        83: "S",
        65: "A",
        68: "D"
    },

    getProp: function(code, shiftMod) {
        let prop = "";

        if (shiftMod) {
            prop += "shift";
        }
        prop += this.codesToKeys[code];

        return prop;
    },

    keyDown: function(code, shiftMod) {
        this.activeKeys[this.getProp(code, shiftMod)] = true;
        console.log(this.activeKeys);
    },

    keyUp: function(code, shiftMod) {
        delete this.activeKeys[this.getProp(code, shiftMod)];
    }
};

keyboard(decoder);
