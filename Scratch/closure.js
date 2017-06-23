const parseLine = (function() {
    "use strict";
    let toggle = false;

    return function(line) {
        if (/\d+/.test(line)) {
            toggle = true;
        } else if (/!+/.test(line)){
            toggle = false;
        }

        console.log(toggle);
    }
}());

parseLine("it is 2017");
parseLine("it still is");
parseLine("is it?");
parseLine("it IS!");
parseLine("is it?");
parseLine("it still is");
parseLine("it is 2017");
