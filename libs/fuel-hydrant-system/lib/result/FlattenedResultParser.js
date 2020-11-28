import { objectExists } from '@airport/air-control';
import { AbstractObjectResultParser } from './entity/IEntityResultParser';
/**
 * Created by Papa on 10/16/2016.
 */
export class FlattenedResultParser extends AbstractObjectResultParser {
    constructor() {
        super(...arguments);
        this.currentResultRow = [];
    }
    addEntity(entityAlias, dbEntity, context) {
        return this.currentResultRow;
    }
    addProperty(entityAlias, resultObject, dataType, propertyName, propertyValue) {
        resultObject.push(propertyValue);
        return objectExists(propertyValue);
    }
    bufferManyToOneStub(entityAlias, dbEntity, resultObject, propertyName, relationDbEntity, relationInfos, context) {
        this.addManyToOneStub(resultObject, propertyName, relationInfos, context);
    }
    bufferBlankManyToOneStub(entityAlias, resultObject, propertyName, relationInfos) {
        relationInfos.forEach((relationInfo) => {
            resultObject.push(null);
        });
    }
    bufferManyToOneObject(entityAlias, dbEntity, resultObject, propertyName, relationDbEntity, childResultObject, context) {
        // Nothing to do, we are working with a flat result array
    }
    bufferBlankManyToOneObject(entityAlias, resultObject, propertyName) {
        // Nothing to do, we are working with a flat result array
    }
    bufferOneToManyStub(otmDbEntity, otmPropertyName) {
        throw new Error(`@OneToMany stubs not allowed in QueryResultType.PLAIN`);
    }
    bufferOneToManyCollection(entityAlias, resultObject, otmDbEntity, propertyName, relationDbEntity, childResultObject, context) {
        // Nothing to do, we are working with a flat result array
    }
    bufferBlankOneToMany(entityAlias, resultObject, otmEntityName, propertyName, relationDbEntity, context) {
        // Nothing to do, we are working with a flat result array
    }
    flushEntity(entityAlias, dbEntity, selectClauseFragment, entityId, resultObject, context) {
        // Nothing to do, we are working with a flat result array
        return resultObject;
    }
    flushRow() {
        this.currentResultRow = [];
    }
    bridge(parsedResults, selectClauseFragment, context) {
        // No bridging needed for ENTITY_FLATTENED Object queries
        return parsedResults;
    }
}
//# sourceMappingURL=FlattenedResultParser.js.map