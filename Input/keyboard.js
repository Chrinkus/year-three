function keyboardInput(parser) {
    "use strict";

    function downHandler(event) {
        event.preventDefault();
        event.stopPropagation();

        parser.keyDown(event.keyCode, event.shiftKey);
    }

    function upHandler(event) {
        event.stopPropagation();

        parser.keyUp(event.keyCode, event.shiftKey);
    }

    document.addEventListener("keydown", downHandler, false);
    document.addEventListener("keyup", upHandler, false);
}

if (typeof module !== "undefined" && module.exports) {
    module.exports = keyboardInput;
}
