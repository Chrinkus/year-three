function addStringInts(a, b) {
    "use strict";
    let output  = "",
        digit   = 0,
        carry   = 0;

    if (a.length < b.length) a = numStringPadder(a, b.length, "0");
    if (a.length > b.length) b = numStringPadder(b, a.length, "0");

    for (let i = a.length - 1; i >= 0; i--) {
        digit = carry + +a.charAt(i) + +b.charAt(i);

        if (digit > 9 && i > 0) {
            carry = 1;
            digit %= 10;
        } else {
            carry = 0;
        }

        output = digit.toString() + output;
    }

    return output;
}

function numStringPadder(numString, l, padder = " ") {

    while (numString.length < l) {
        numString = padder + numString;
    }

    return numString;
}

function fibonacciFinderN(n) {
    "use strict";
    let pre = "0",
        cur = "1",
        fib = "0";

    for (let i = 2; i < n; i++) {
        fib = addStringInts(pre, cur);
        pre = cur;
        cur = fib;
    }

    return fib;
}

console.log(fibonacciFinderN(300));
