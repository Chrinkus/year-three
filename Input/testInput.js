const Player = require("./player");
const Controller = require("./controller");

const chris = new Player("Chris");
const ctrlr = new Controller(chris);

chris.report();
ctrlr.keyDown(87);
chris.report();
ctrlr.keyDown(68);
ctrlr.keyDown(68);
ctrlr.keyDown(68);
ctrlr.keyDown(68);
ctrlr.keyDown(68);
chris.report();
ctrlr.keyDown(87);
chris.report();
