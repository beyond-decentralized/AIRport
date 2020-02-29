import { valuesEqual } from '@airport/air-control';
import { TreeResultParser } from '../TreeResultParser';
/**
 * Created by Papa on 10/16/2016.
 */
/**
 * The goal of this Parser is to determine which objects in the current row are the same
 * as they were in the previous row.  If the objects are the same this parser will merge
 * them.
 */
export class EntityTreeResultParser extends TreeResultParser {
    constructor() {
        super(...arguments);
        this.currentRowObjectMap = {};
        this.objectEqualityMap = {};
        this.lastRowObjectMap = {};
        this.currentObjectOneToManys = {};
    }
    addEntity(entityAlias, dbEntity, airDb, schemaUtils) {
        let resultObject = schemaUtils.getNewEntity(dbEntity, airDb);
        this.currentRowObjectMap[entityAlias] = resultObject;
        if (this.objectEqualityMap[entityAlias] !== undefined) {
            this.objectEqualityMap[entityAlias] = true;
        }
        return resultObject;
    }
    bufferManyToOneStub(entityAlias, dbEntity, resultObject, propertyName, relationDbEntity, relationInfos, schemaUtils) {
        this.addManyToOneStub(resultObject, propertyName, relationInfos, schemaUtils);
        this.addManyToOneReference(entityAlias, resultObject, propertyName);
    }
    addManyToOneReference(entityAlias, resultObject, propertyName) {
        if (this.isDifferentOrDoesntExist(entityAlias, resultObject, propertyName)) {
            return;
        }
        // Both last and current objects must exist here
        let lastMtoStub = this.lastRowObjectMap[entityAlias][propertyName];
        let currentMtoStub = resultObject[propertyName];
        this.objectEqualityMap[entityAlias] = valuesEqual(lastMtoStub, currentMtoStub, true);
    }
    bufferBlankManyToOneStub(entityAlias, resultObject, propertyName) {
        resultObject[propertyName] = null;
        this.addManyToOneReference(entityAlias, resultObject, propertyName);
    }
    bufferManyToOneObject(entityAlias, dbEntity, resultObject, propertyName, relationDbEntity, childResultObject) {
        resultObject[propertyName] = childResultObject;
        if (this.isDifferentOrDoesntExist(entityAlias, resultObject, propertyName)) {
            return;
        }
        // Both last and current objects must exist here
        let lastObject = this.lastRowObjectMap[entityAlias];
        // @ManyToOne objects will have been merged by now, just check if its the same facade
        this.objectEqualityMap[entityAlias] = lastObject[propertyName] === resultObject[propertyName];
    }
    bufferBlankManyToOneObject(entityAlias, resultObject, propertyName) {
        resultObject[propertyName] = null;
        this.addManyToOneReference(entityAlias, null, propertyName);
    }
    bufferOneToManyStub(otmDbEntity, otmPropertyName) {
        throw new Error(`@OneToMany stubs not allowed in QueryResultType.HIERARCHICAL`);
    }
    bufferOneToManyCollection(entityAlias, resultObject, otmDbEntity, propertyName, relationDbEntity, childResultObject) {
        resultObject[propertyName] = [childResultObject];
        this.addOneToManyCollection(entityAlias, resultObject, propertyName);
    }
    bufferBlankOneToMany(entityAlias, resultObject, otmEntityName, propertyName, relationDbEntity) {
        resultObject[propertyName] = [];
        this.addOneToManyCollection(entityAlias, resultObject, propertyName);
    }
    flushEntity(entityAlias, dbEntity, selectClauseFragment, entityId, resultObject) {
        return this.mergeEntity(entityAlias, resultObject);
    }
    bridge(parsedResults, selectClauseFragment) {
        // Nothing to be done, hierarchical queries are not bridged
        return parsedResults;
    }
}
//# sourceMappingURL=EntityTreeResultParser.js.map