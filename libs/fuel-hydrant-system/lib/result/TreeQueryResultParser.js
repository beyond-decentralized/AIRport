"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const TreeResultParser_1 = require("./TreeResultParser");
/**
 * Created by Papa on 11/8/2016.
 */
class TreeQueryResultParser extends TreeResultParser_1.TreeResultParser {
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
exports.TreeQueryResultParser = TreeQueryResultParser;
//# sourceMappingURL=TreeQueryResultParser.js.map