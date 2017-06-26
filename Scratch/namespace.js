const namespace = function() {
    "use strict";
    const x = "foo",
          y = "bar",
          z = 2.718281828;

    return {
        together() {
            return x + y;
        },
        get z() {
            return z;
        }
    };
}();

//console.log(namespace.together());
//console.log(namespace.z);

const { together, z } = namespace;

console.log(together());
console.log(z);

