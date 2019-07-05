"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by Papa on 8/26/2017.
 */
/**
 * Data Manipulation object.
 */
class Duo {
    constructor(dbEntityId, qSchema) {
        if (typeof dbEntityId === 'number') {
            this.dbEntity = qSchema.__dbSchema__.currentVersion.entities[dbEntityId];
        }
        else {
            this.dbEntity = dbEntityId;
        }
    }
    getIdStub(ids) {
        throw new Error(`Not Implemented.`);
    }
    getIdStubs(ids) {
        throw new Error(`Not Implemented.`);
    }
    getAllFieldsSelect() {
        throw new Error(`Not Implemented.`);
    }
    getIdFieldsSelect() {
        throw new Error(`Not Implemented.`);
    }
    getNonIdFieldsSelect() {
        throw new Error(`Not Implemented.`);
    }
    getMaxIdsSelectPerRepository() {
        throw new Error(`Not implemented`);
    }
    getMaxIdSelect() {
        throw new Error(`Not implemented`);
    }
    getAllManyToOnesSelect() {
        throw new Error(`Not implemented`);
    }
    getAllManyToOneIdStubsSelect() {
        throw new Error(`Not implemented`);
    }
    getAllOneToManysSelect() {
        throw new Error(`Not implemented`);
    }
}
exports.Duo = Duo;
function getAllFieldsSelect(dbEntity) {
    throw new Error(`Not implemented`);
}
exports.getAllFieldsSelect = getAllFieldsSelect;
exports.DUO = {
    getAllFieldsSelect: getAllFieldsSelect
};
//# sourceMappingURL=Duo.js.map