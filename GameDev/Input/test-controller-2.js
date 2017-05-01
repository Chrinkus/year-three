const controller = require("./controller2");

const testActor = {
    x: 5,
    y: 3,
    z: 0,

    incX () {
        this.x += 1;
    },

    decY () {
        this.y -= 1;
    },

    multiply () {
        this.z = this.x * this.y;
    },

    divide () {
        this.z = this.x / this.y;
    },

    report () {
        console.log(`  x = ${this.x}, y = ${this.y}, z = ${this.z}`);
    },

    controls: {
        "W": { action: "incX",      behaviour: "free" },
        "A": { action: "decY",      behaviour: "free" },
        "S": { action: "multiply",  behaviour: "queued" },
        "F": { action: "divide",    behaviour: "queued" },
        "D": { action: "report",    behaviour: "once" }
    }
}

const testCtrl = controller(testActor);

/*
// Basic tests to ensure report is working
testCtrl.keyDown(68);       // fires report()
testCtrl.keyDown(68);       // does not fire report, repeat prevented
testCtrl.keyUp(68);         // removes key from prevent repeat
testCtrl.keyDown(68);       // report is fireable again
testCtrl.keyUp(68);         // removes key from prevent repeat
*/

function fireReport(msg) {
    console.log(msg);
    testCtrl.keyDown(68);
    testCtrl.keyUp(68);
}

testCtrl.keyDown(87);       // adds W to activeKeys
testCtrl.keyDown(65);       // adds A to activeKeys
fireReport("default values");
testCtrl.fire();            // fire active controls
fireReport("incX, decY");
testCtrl.fire();            // fire active controls
fireReport("incX, decY");
testCtrl.keyUp(87);         // removes W from activeKeys
testCtrl.keyUp(65);         // removes A from activeKeys
testCtrl.fire();            // fire active controls
fireReport("same");

// Position x to 10, y to -2
testCtrl.keyDown(87);       // adds W to activeKeys
testCtrl.keyDown(65);       // adds A to activeKeys
testCtrl.fire();            // fire active controls
testCtrl.fire();            // fire active controls
testCtrl.fire();            // fire active controls
testCtrl.keyUp(87);         // removes W from activeKeys
testCtrl.keyUp(65);         // removes A from activeKeys
fireReport("Should be 10 and -2");

// Test queue
testCtrl.keyDown(83);       // adds S to queue(multiply)
testCtrl.fire();
fireReport("Multiply x by y, z should equal -20");
testCtrl.keyDown(70);       // adds F to queue(divide)
testCtrl.fire();
fireReport("Divide x by y, z should equal -5");
testCtrl.keyDown(87);
testCtrl.keyDown(65);
testCtrl.fire();
fireReport("Divide x by y, z should equal -3.67_");
testCtrl.keyUp(70);
testCtrl.fire();
fireReport("Multiply x by y, z should equal -48");

// Clear all remaining keys
testCtrl.keyUp(83);
testCtrl.keyUp(87);
testCtrl.keyUp(65);
testCtrl.fire();
fireReport("same");

