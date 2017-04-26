"use strict";

//const { doSomething, getItDone: git } = require("./first-module");

//doSomething();
//git();

const firstMod1 = require("./first-module");
const firstMod2 = require("./first-module");

console.log(firstMod1 === firstMod2);

firstMod1.put("test data");
console.log(firstMod2.get());

/*
const configureableMod = require("./configureable-module");

const configuredA = configureableMod({logPrefix: "A> " });

configuredA.log("test");
*/
