const charCodes = require("./charcodes");
const LinkedList = require("./linkedlist");

function controller(actor) {
    "use strict";
    const queue             = new LinkedList(),
          activeKeys        = Object.create(null),
          preventRepeat     = Object.create(null);

    function routeControl(charKey) {

        if (charKey in preventRepeat) {
            return;
        }

        switch (actor.controls[charKey].behaviour) {
            case "queued":
                queued.addItem(charKey);
                preventRepeat[charKey] = true;
                break;

            case "once":
                actor[controls[charKey].action]();
                preventRepeat[charKey] = true;
                break;

            case "free":
                activeKeys[charKey] = true;
                break;

            default:
                console.error("Unregistered control key");
        }
    }

    function cancelKey(charKey) {

        switch (actor.controls[charKey].behaviour) {
            case "queued":
                queue.removeItem(charKey);
                delete preventRepeat[charKey];
                break;

            case "once":
                delete preventRepeat[charKey];
                break;

            case "free":
                delete activeKeys[charKey];
                break;

            default:
                console.error("Sneaky key in keyUp");
        }
    }

    return {
        keyDown(code) {
            const charKey = charCodes[code];

            if (charKey in actor.controls) {
                routeControl(charKey);
            }
        },

        keyUp(code) {
            const charKey = charCodes[code];

            if (charKey in actor.controls) {
                cancelKey(charKey);
            }
        },

        fire() {
            const controls = actor.controls;
            let prop;

            // fire queued controls
            if (queue.val) {
                actor[controls[queue.val].action]();
            }

            // fire free controls
            for (prop in activeKeys) {
                actor[controls[prop].action]();
            }
        }
    };
}
