import { TreeResultParser } from './TreeResultParser';
/**
 * Created by Papa on 11/8/2016.
 */
export class TreeQueryResultParser extends TreeResultParser {
    addEntity(entityAlias) {
        let resultObject = {};
        this.currentRowObjectMap[entityAlias] = resultObject;
        return resultObject;
    }
    bufferOneToManyCollection(entityAlias, resultObject, propertyName, childResultObject) {
        resultObject[propertyName] = [childResultObject];
        this.addOneToManyCollection(entityAlias, resultObject, propertyName);
    }
    flushEntity(entityAlias, resultObject) {
        return this.mergeEntity(entityAlias, resultObject);
    }
}
//# sourceMappingURL=TreeQueryResultParser.js.map