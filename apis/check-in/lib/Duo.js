import { Y, } from '@airport/air-traffic-control';
import { EntityRelationType } from '@airport/ground-control';
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
        return this.getRelationSelect(EntityRelationType.MANY_TO_ONE);
    }
    get oneToManys() {
        return this.getRelationSelect(EntityRelationType.ONE_TO_MANY);
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
            selectFragment[propertyName] = forRelations ? {} : Y;
        }
        return selectFragment;
    }
}
/**
 * Data Manipulation object.
 */
export class Duo {
    constructor(dbEntityId, qApplication) {
        if (typeof dbEntityId === 'number') {
            this.dbEntity = qApplication.__dbApplication__.currentVersion[0]
                .applicationVersion.entities[dbEntityId];
        }
        else {
            this.dbEntity = dbEntityId;
        }
        this.select = new FieldsSelect(this.dbEntity);
    }
    getLocalIdStub(_localIds) {
        throw new Error(`Not Implemented.`);
    }
    getLocalIdStubs(_localIds) {
        throw new Error(`Not Implemented.`);
    }
}
//# sourceMappingURL=Duo.js.map