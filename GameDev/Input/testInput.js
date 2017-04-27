const Player = require("./player");
const Controller = require("./controller");
const keyboardInput = require("./keyboard");
const projectileManager = require("./projectile-manager");

(function() {
    "use strict";

    const canvas = document.getElementById("viewport");
    const ctx = canvas.getContext("2d");

    const chris = new Player("Chris", canvas.width / 2, canvas.height / 2,
                             projectileManager.projectiles);
    const ctrlr = new Controller(chris);
    keyboardInput(ctrlr);

    function main() {
        window.requestAnimationFrame(main);

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "grey";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        chris.draw(ctx);
        projectileManager.draw(ctx);

        ctrlr.update();
        projectileManager.update();
        projectileManager.clean();
    }

    main();
}());
