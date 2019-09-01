"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const air_control_1 = require("@airport/air-control");
const ground_control_1 = require("@airport/ground-control");
class GraphQueryConfiguration {
    constructor() {
        // This is for conflicts on OneToMany references
        this.strict = true;
        this.mapped = true;
        // Always fail on no ID - bridged entities must have IDs
        // failOnNoId: boolean = true;
        // Assume there are no conflicts on ManyToOneReferences
        //failOnManyToOneConflicts: boolean = true;
    }
}
exports.GraphQueryConfiguration = GraphQueryConfiguration;
function getObjectResultParser(queryResultType, config, rootDbEntity) {
    switch (queryResultType) {
        case ground_control_1.QueryResultType.ENTITY_GRAPH:
        case ground_control_1.QueryResultType.MAPPED_ENTITY_GRAPH:
            let EntityGraphResultParserClass = require('./EntityGraphResultParser').EntityGraphResultParser;
            return new EntityGraphResultParserClass(config, rootDbEntity);
        case ground_control_1.QueryResultType.ENTITY_TREE:
        case ground_control_1.QueryResultType.MAPPED_ENTITY_TREE:
            let EntityTreeResultParserClass = require('./EntityTreeResultParser').EntityTreeResultParser;
            return new EntityTreeResultParserClass();
        default:
            throw new Error(`ObjectQueryParser not supported for QueryResultType: ${queryResultType}`);
    }
}
exports.getObjectResultParser = getObjectResultParser;
class AbstractObjectResultParser {
    addManyToOneStub(resultObject, propertyName, relationInfos, schemaUtils) {
        let manyToOneStub = {};
        air_control_1.isStub(manyToOneStub);
        resultObject[propertyName] = manyToOneStub;
        let haveAllIds = true;
        relationInfos.forEach((relationInfo) => {
            if (schemaUtils.isIdEmpty(relationInfo.value)) {
                haveAllIds = false;
                return;
            }
            let lastObject;
            let currentObject = manyToOneStub;
            let currentIndex = 1;
            const propertyNameChain = relationInfo.propertyNameChains[0];
            while (currentIndex < propertyNameChain.length) {
                // If there is no object in context, create one
                if (!currentObject) {
                    currentObject = {};
                    air_control_1.markAsStub(currentObject);
                    lastObject[propertyNameChain[currentIndex - 1]] = currentObject;
                }
                // If it's not a leaf (more objects in the chain exist)
                if (currentIndex < propertyNameChain.length - 1) {
                    lastObject = currentObject;
                    currentObject = lastObject[propertyNameChain[currentIndex]];
                }
                else {
                    // Otherwise, just assign the value
                    currentObject[propertyNameChain[currentIndex]] = relationInfo.value;
                }
                currentIndex++;
            }
        });
        return haveAllIds;
    }
}
exports.AbstractObjectResultParser = AbstractObjectResultParser;
//# sourceMappingURL=IEntityResultParser.js.map