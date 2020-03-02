"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const air_control_1 = require("@airport/air-control");
const ground_control_1 = require("@airport/ground-control");
/**
 * Created by Papa on 8/26/2017.
 */
class FieldsSelect {
    constructor(dbEntity) {
        this.dbEntity = dbEntity;
    }
    get ids() {
        const propertyNames = this.dbEntity.properties
            .filter(property => property.isId)
            .map(property => property.name);
        return this.getSelect(propertyNames, false);
    }
    get fields() {
        const propertyNames = this.dbEntity.properties
            .filter(property => !property.relation || !property.relation.length)
            .map(property => property.name);
        return this.getSelect(propertyNames, false);
    }
    get manyToOnes() {
        return this.getRelationSelect(ground_control_1.EntityRelationType.MANY_TO_ONE);
    }
    get oneToManys() {
        return this.getRelationSelect(ground_control_1.EntityRelationType.ONE_TO_MANY);
    }
    getRelationSelect(relationType) {
        const propertyNames = this.dbEntity.properties
            .filter(property => property.relation
            && property.relation.length
            && property.relation[0].relationType === relationType)
            .map(property => property.name);
        return this.getSelect(propertyNames, true);
    }
    getSelect(propertyNames, forRelations) {
        const selectFragment = {};
        for (const propertyName of propertyNames) {
            selectFragment[propertyName] = forRelations ? {} : air_control_1.Y;
        }
        return selectFragment;
    }
}
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
        this.select = new FieldsSelect(this.dbEntity);
    }
    getIdStub(ids) {
        throw new Error(`Not Implemented.`);
    }
    getIdStubs(ids) {
        throw new Error(`Not Implemented.`);
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