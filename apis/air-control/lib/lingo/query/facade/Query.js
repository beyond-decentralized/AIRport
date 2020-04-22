"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function ANOTHER(a, b) {
}
exports.ANOTHER = ANOTHER;
;
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
exports.ID = {
    airportSelectField: 'ID'
};
function convertToID(object) {
    object.airportSelectField = 'ID';
}
exports.convertToID = convertToID;
function isID(object) {
    return object && object.airportSelectField === 'ID';
}
exports.isID = isID;
//# sourceMappingURL=Query.js.map