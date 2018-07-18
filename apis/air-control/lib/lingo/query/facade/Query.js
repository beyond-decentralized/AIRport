"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Y = {
    airportSelectField: true
};
function convertToY(object) {
    object.airportSelectField = true;
}
exports.convertToY = convertToY;
function isY(object) {
    return object && object.airportSelectField === true;
}
exports.isY = isY;
exports.N = {
    airportSelectField: false
};
function isN(object) {
    return object && object.airportSelectField === false;
}
exports.isN = isN;
//# sourceMappingURL=Query.js.map