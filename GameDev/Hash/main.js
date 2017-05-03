const player = require("./player2");
const controller = require("../Input/controller2");
const keyboardInput = require("../Input/keyboard");

(function() {
    "use strict";

    const canvas = document.getElementById("viewport");
    const ctx = canvas.getContext("2d");

    const chris = player(canvas.width / 2, canvas.height / 2);

    const ctrlr = controller(chris);
    keyboardInput(ctrlr);

    function main() {
        window.requestAnimationFrame(main);

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "grey";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        chris.draw(ctx);

        ctrlr.fire();
    }

    main();
}());
