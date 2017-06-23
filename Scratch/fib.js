function fibonacciFinderN(n) {
    "use strict";

    let pre = 0,
        cur = 1,
        fib = 0;

    for (let i = 2; i < n; i++) {
        fib = pre + cur;
        pre = cur;
        cur = fib;
    }

    return fib;
}

console.log(fibonacciFinderN(300));
