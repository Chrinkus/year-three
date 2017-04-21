/* The Controller
 *
 * Adapts an event handling module to a target entity that is controlled by
 * the user.
 */
const charCodes     = require("./charcodes");
const LinkedList    = require("./linkedlist");

function controller(singleFileActions, unlimitedActions) {
    "use strict";
    const charCodes         = charCodes,
          singleFileActions = singleFileActions,
          unlimitedActions  = unlimitedActions,
          singleFileQueue   = new LinkedList(),
          keysDown          = Object.create(null);

    return {
        keyDown (code) {
            const charCode = charCodes[code];

            if (charCode in singleFileActions) {
                singleFileQueue.addItem(singleFileActions[charCode]);
            } else if (charCode in unlimitedActions) {
                keysDown[charCode] = true;
            }
        },
        keyUp (code) {
            // Parses a keyup event
        }
    };
}
/* First draft
const controller = {

    // Bust this out to a module with all map-able keys
    codesToChars: {
        87: "W",
        83: "S",
        65: "A",
        68: "D",
        81: "Q",
        69: "E"
    },

    // Receive this as an argument from the target entity
    charsToActions: {
        "W": "forward",
        "S": "backward",
        "A": "turnLeft",
        "D": "turnRight",
        "Q": "strafeLeft",
        "E": "strafeRight"
    },

    keyDown (code, mod) {
        "use strict";
        // Parses a keydown event
    },

    keyUp (code, mod) {
        "use strict";
        // Parses a keyup event
    },

    remapKey (charKey, action) {
        "use strict";
        // Allows user to change control scheme
    }
};
*/
