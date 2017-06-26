/* Typical use:
 * ============
 *
 * const graphics = require("./graphics");
 *
 * function someDraw() {
 *     const { ctx, w, h } = graphics;
 *
 *     // code that freely accesses canvas tools and values
 * }
 */

const graphics = function() {
    "use strict";
    const canvas    = document.getElementById("viewport"),
          ctx       = canvas.getContext("2d");

    return {
        get ctx () {
            return ctx;
        },
        get w () {
            return canvas.width;
        },
        get h () {
            return canvas.height;
        }
    };
}();

module.exports = graphics;
