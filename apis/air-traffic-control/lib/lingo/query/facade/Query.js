export const NEW_RECORD_FIELDS = {
    actor: null,
    actorRecordId: null,
    ageSuitability: 0,
    id: null,
    originalActor: null,
    originalActorRecordId: null,
    originalRepository: null,
    systemWideOperationId: null,
};
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
    insert: true,
    null: false
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
function cleanErrorMessageSelectStatement(errorMessageSelectStatement) {
    for (let propertyName in errorMessageSelectStatement) {
        let property = errorMessageSelectStatement[propertyName];
        if (!(property instanceof Object)) {
            continue;
        }
        if (property.hasOwnProperty("airportSelectField")) {
            switch (property.airportSelectField) {
                case "ID":
                    errorMessageSelectStatement[propertyName] = "ID";
                    break;
                case true:
                    errorMessageSelectStatement[propertyName] = "Y";
                    break;
                case false:
                    errorMessageSelectStatement[propertyName] = "N";
                    break;
            }
        }
        else {
            cleanErrorMessageSelectStatement(property);
        }
    }
}
export function getErrorMessageSelectStatement(jsonSelectClause) {
    const errorMessageSelectStatement = JSON.parse(JSON.stringify(jsonSelectClause));
    cleanErrorMessageSelectStatement(errorMessageSelectStatement);
    return JSON.stringify(errorMessageSelectStatement, null, 4);
}
//# sourceMappingURL=Query.js.map