/**
 * Created by Papa on 8/26/2017.
 */
/**
 * Data Manipulation object.
 */
export class Dmo {
    constructor(dbEntity) {
        this.dbEntity = dbEntity;
    }
    getIdStub(ids) {
        throw `Not Implemented.`;
    }
    getIdStubs(ids) {
        throw `Not Implemented.`;
    }
    getAllFieldsSelect() {
        throw `Not Implemented.`;
    }
    getIdFieldsSelect() {
        throw `Not Implemented.`;
    }
    getNonIdFieldsSelect() {
        throw `Not Implemented.`;
    }
    getMaxIdsSelectPerRepository() {
        throw `Not implemented`;
    }
    getMaxIdSelect() {
        throw `Not implemented`;
    }
    getAllManyToOnesSelect() {
        throw `Not implemented`;
    }
    getAllManyToOneIdStubsSelect() {
        throw `Not implemented`;
    }
    getAllOneToManysSelect() {
        throw `Not implemented`;
    }
}
export function getAllFieldsSelect(dbEntity) {
    throw `Not implemented`;
}
export const DMO = {
    getAllFieldsSelect: getAllFieldsSelect
};
//# sourceMappingURL=Dmo.js.map