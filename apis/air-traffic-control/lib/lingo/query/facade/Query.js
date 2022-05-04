export function ANOTHER(a, b) {
}
;
export const Y = {
    airportSelectField: true,
    insert: true,
    update: false
};
export const ALL_FIELDS = {
    __allFields__: true
};
export const YES = Y;
export function convertToY(object) {
    object.airportSelectField = true;
}
export function isY(object) {
    return object && object.airportSelectField === true;
}
export const N = {
    airportSelectField: false,
};
export const NO = N;
export function isN(object) {
    return object && object.airportSelectField === false;
}
export const I = {
    insert: true
};
export const INSERT = I;
export function isInsert(object) {
    return object && object.insert === true;
}
export const IN = {
    insert: true,
    null: true
};
export const INSERT_OR_NULL = IN;
export function isInsertOrNull(object) {
    return object && object.insert === true && object.null === true;
}
export const U = {
    update: true
};
export const UPDATE = U;
export function isUpdate(object) {
    return object && object.update === true;
}
export const IU = {
    insert: true,
    update: true,
};
export const INSERT_OR_UPDATE = IU;
export function isInsertOrUpdate(object) {
    return object && object.insert === true && object.update === true;
}
export const UN = {
    update: true,
    null: true
};
export const UPDATE_OR_NULL = UN;
export function isUpdateOrNull(object) {
    return object && object.update === true && object.null === true;
}
export const IUN = {
    insertOrOther: true,
};
export const INSERT_OR_UPDATE_OR_NULL = UN;
export function isInsertOrUpdateOrNull(object) {
    return object && object.insertOrOther === true;
}
export const A = IUN;
export const ALL = IUN;
export const UPSERT = IUN;
export const isUpsert = isInsertOrUpdateOrNull;
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