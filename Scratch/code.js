/*
const control = ["break", "continue", "if", "else", "switch", "throw", "try",
                 "catch", "do", "while", "for", "in", "of", "return"];
const declarations = ["var", "const", "let"];
const fundamentals = ["Object", "Function", "Array", "Boolean", "Error"];
*/

function replaceKeyWords(word) {
    "use strict";

    switch (word) {
        case 'document':
        case 'window':
        case 'console':
            return `<span class="webAPI">${word}</span>`;
        case 'Object':
        case 'Function':
        case 'Array':
        case 'Boolean':
        case 'Error':
            return `<span class="fundamental">${word}</span>`;
        case 'var':
        case 'let':
        case 'const':
            return `<span class="declaration">${word}</span>`;
        case 'break':
        case 'continue':
        case 'if':
        case 'else':
        case 'switch':
        case 'throw':
        case 'try':
        case 'catch':
        case 'do':
        case 'while':
        case 'for':
        case 'in':
        case 'of':
        case 'return':
            return `<span class="controlFlow">${word}</span>`;
        default:
            return word;
    }
}

function stringFinder(line) {
    "use strict";
    // Receives a line of code and searches for highlighting opportunities
    
    // Strings first: test for any non-word char followed by an opening quote
    if (/\W["'`]/.test(line)) {
        console.log("Quotes found:", line);
    }
}

function numFinder(line) {
    "use strict";

    return line
        .replace(/(?:^|[^\w])(-?\d+(?:\.\d+)?(?:e-?\d+)?)/i, 
            "<span class=\"number\">$1</span>")
}
console.log(numFinder("5"));
console.log(numFinder("a918"));
console.log(numFinder("5.1"));
console.log(numFinder("five"));
console.log(numFinder("-15"));
console.log(numFinder("5.1e6"));
console.log(numFinder("5.1E6"));
console.log(numFinder("5.1a6"));
console.log("let y = 1 + 3;".split(" ")
    .map(x => numFinder(x))
    .join(" "));

function syntaxer(codeStr) {
    "use strict";

    return codeStr
        .split(" ")
        .map(str => highlighter(str))
        .join(" ")
        .replace(/\n/g, "<br/>");
}

function isoBrack(word) {
    "use strict";
    const front = ['{', '(', '['],
          back  = ['}', ')', ']'];
    let pre = "",
        post = "";

    front.forEach(f => {
        if (word.startsWith(f))
            pre = f;
    });

    if (pre) {
        inner = word.slice(1);
    } else {
        inner = word;
    }

    back.forEach(b => {
        if (inner.endsWith(b))
            post = b;
    });

    if (post) inner = inner.slice(-1);

    return [pre, inner, post];
}

//const testStr = "for (var i = 0; i < 10; ++i) {\nconsole.log(i);\n}";

//console.log(syntaxer(testStr));
