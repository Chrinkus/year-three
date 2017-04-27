/*
const obj = {
    x: 5,

    incX () {
        this.x += 1;
        console.log(this.x);
    },

    callInc () {
        this.incX();
    },

    deepCall () {
        this.callInc();         // no probs, this.x = obj.x
    },

    closed: function() {
        const y = 2;
        const z = this.x;       // probs, this.x = undefined

        return {
            out () {
                console.log(y); // good!
                console.log(z); // no good..
            }
        };
    }()
};

console.log(obj.x);

obj.callInc();
obj.deepCall();
*/
function paramTest(word) {
    "use strict";
    const msg = word + " up!";

    return {
        log() {
            console.log(word);
            console.log(msg);
        }
    };
}

const tester = paramTest("Get");
tester.log();
