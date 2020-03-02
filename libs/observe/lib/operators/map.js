"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const operator_1 = require("./operator");
function map(project) {
    if (typeof project !== 'function') {
        throw new TypeError('map operator accepts a projection Function');
    }
    return new MapOperator(project);
}
exports.map = map;
class MapOperator extends operator_1.Operator {
    constructor(project) {
        super();
        this.project = project;
    }
    exec(source) {
        return this.project(source.currentValue);
    }
}
exports.MapOperator = MapOperator;
//# sourceMappingURL=map.js.map