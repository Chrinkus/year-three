const Player = require("./player");
const Controller = require("./controller");
const keyboardInput = require("./keyboard");

const chris = new Player("Chris");
const ctrlr = new Controller(chris);
keyboardInput(ctrlr);
