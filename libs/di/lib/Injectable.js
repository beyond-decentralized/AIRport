"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Container_1 = require("./Container");
function container(injectable) {
    const container = injectable.container;
    if (!container) {
        throw new Error('"container" is not set on injectable object.');
    }
    if (!(container instanceof Container_1.Container)) {
        throw new Error('"container" property of injectable is not an' +
            'instance of @airport/di Container');
    }
    return container;
}
exports.container = container;
//# sourceMappingURL=Injectable.js.map