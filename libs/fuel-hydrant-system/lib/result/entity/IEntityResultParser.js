/**
 * Created by Papa on 10/16/2016.
 */
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
export class AbstractObjectResultParser {
    addManyToOneStub(resultObject, propertyName, relationInfos, context) {
        let manyToOneStub = {};
        context.ioc.entityStateManager.isStub(manyToOneStub);
        resultObject[propertyName] = manyToOneStub;
        let haveAllIds = true;
        relationInfos.forEach((relationInfo) => {
            if (context.ioc.schemaUtils.isIdEmpty(relationInfo.value)) {
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
                    context.ioc.entityStateManager.markAsStub(currentObject);
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