export const Y = {
    airportSelectField: true
};
export function convertToY(object) {
    object.airportSelectField = true;
}
export function isY(object) {
    return object && object.airportSelectField === true;
}
export const N = {
    airportSelectField: false
};
export function isN(object) {
    return object && object.airportSelectField === false;
}
//# sourceMappingURL=Query.js.map