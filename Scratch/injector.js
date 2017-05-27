/* HTML testing
 *
 * Here is my first attempt at altering HTML through javascript.
 */
const loadFile = require("./load-file");
const writeFile = require("./write-file");
const fs = require("fs");

function createNode(tag, content) {
    "use strict";

    return `<${tag}>${content}</${tag}>`;
}

function writeHTML(destination) {
    "use strict";

    Promise.all([
        loadFile("../config.json").then(file => JSON.parse(file)),
        loadFile("../templates/injected.html")
    ]).then(files => {
        const [config, htmlTemp] = files;

        const header = createNode("h1", config.title) +
                       createNode("p", config.author) +
                       createNode("p", "Mas?"),
              newHTML = htmlTemp.replace("<!-- -->", header);

        writeFile(destination, newHTML); 

    }).catch(err => {
        console.log(err);
    });
}

writeHTML("../templates/test.html"); // WORKS!!
