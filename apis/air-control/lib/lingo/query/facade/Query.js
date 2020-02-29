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
export const ID = {
    airportSelectField: 'ID'
};
export function convertToID(object) {
    object.airportSelectField = 'ID';
}
export function isID(object) {
    return object && object.airportSelectField === 'ID';
}
//# sourceMappingURL=Query.js.map