import { objectExists } from '@airport/air-traffic-control';
import { AbstractObjectResultParser } from './entity/IEntityResultParser';
/**
 * Created by Papa on 10/16/2016.
 */
/**
 * The goal of this parser is to split a flat row of result set cells into an facade
 * graph (just for that row).
 */
export class PlainResultParser extends AbstractObjectResultParser {
    addEntity(entityAlias, dbEntity, context) {
        return this.applicationUtils.getNewEntity(dbEntity);
    }
    addProperty(entityAlias, resultObject, dataType, propertyName, propertyValue) {
        resultObject[propertyName] = propertyValue;
        return objectExists(propertyValue);
    }
    bufferManyToOneStub(entityAlias, dbEntity, resultObject, propertyName, relationDbEntity, relationInfos, context) {
        this.addManyToOneStub(resultObject, propertyName, relationInfos, context);
    }
    bufferManyToOneObject(entityAlias, dbEntity, resultObject, propertyName, relationDbEntity, childResultObject, context) {
        resultObject[propertyName] = childResultObject;
    }
    bufferBlankManyToOneStub(entityAlias, resultObject, propertyName, relationInfos) {
        resultObject[propertyName] = null;
        // Nothing to do the facade simply doesn't have anything in it
    }
    bufferBlankManyToOneObject(entityAlias, resultObject, propertyName) {
        resultObject[propertyName] = null;
        // Nothing to do the facade simply doesn't have anything in it
    }
    bufferOneToManyStub(otmDbEntity, otmPropertyName) {
        throw new Error(`@OneToMany stubs not allowed in QueryResultType.PLAIN`);
    }
    bufferOneToManyCollection(entityAlias, resultObject, otmDbEntity, propertyName, relationDbEntity, childResultObject, context) {
        resultObject[propertyName] = [childResultObject];
    }
    bufferBlankOneToMany(entityAlias, resultObject, otmEntityName, propertyName, relationDbEntity, context) {
        resultObject[propertyName] = [];
    }
    flushEntity(entityAlias, dbEntity, selectClauseFragment, entityId, resultObject, context) {
        // Nothing to be done, plain objects don't need to be flushed since they don't relate
        // do any other rows
        return resultObject;
    }
    flushRow() {
        // Nothing to be done, plain rows don't need to be flushed since they don't relate do
        // any other rows
    }
    bridge(parsedResults, selectClauseFragment, context) {
        // Nothing to be done, plain queries are not bridged
        return parsedResults;
    }
}
//# sourceMappingURL=PlainResultParser.js.map