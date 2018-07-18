"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by Papa on 8/26/2017.
 */
/**
 * Data Manipulation object.
 */
class Dmo {
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
exports.Dmo = Dmo;
function getAllFieldsSelect(dbEntity) {
    throw `Not implemented`;
}
exports.getAllFieldsSelect = getAllFieldsSelect;
exports.DMO = {
    getAllFieldsSelect: getAllFieldsSelect
};
//# sourceMappingURL=Dmo.js.map