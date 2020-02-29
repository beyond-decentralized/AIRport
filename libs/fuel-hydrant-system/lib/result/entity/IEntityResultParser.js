import { isStub, markAsStub } from '@airport/air-control';
import { QueryResultType } from '@airport/ground-control';
export class GraphQueryConfiguration {
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
export function getObjectResultParser(queryResultType, config, rootDbEntity) {
    switch (queryResultType) {
        case QueryResultType.ENTITY_GRAPH:
        case QueryResultType.MAPPED_ENTITY_GRAPH:
            let EntityGraphResultParserClass = require('./EntityGraphResultParser').EntityGraphResultParser;
            return new EntityGraphResultParserClass(config, rootDbEntity);
        case QueryResultType.ENTITY_TREE:
        case QueryResultType.MAPPED_ENTITY_TREE:
            let EntityTreeResultParserClass = require('./EntityTreeResultParser').EntityTreeResultParser;
            return new EntityTreeResultParserClass();
        default:
            throw new Error(`ObjectQueryParser not supported for QueryResultType: ${queryResultType}`);
    }
}
export class AbstractObjectResultParser {
    addManyToOneStub(resultObject, propertyName, relationInfos, schemaUtils) {
        let manyToOneStub = {};
        isStub(manyToOneStub);
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
                    markAsStub(currentObject);
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
//# sourceMappingURL=IEntityResultParser.js.map