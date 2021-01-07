export class MappedSuperclassBuilder {
    constructor(config, entityMapByName) {
        this.config = config;
        this.entityMapByName = entityMapByName;
        this.mappedSuperclassVarName = 'MAPPED_SUPERCLASS';
    }
    build() {
        const mappedSuperclasses = [];
        for (const entityName in this.entityMapByName) {
            const entityCandidate = this.entityMapByName[entityName];
            const entity = this.buildEntity(entityCandidate);
            if (entity) {
                mappedSuperclasses.push(entity);
            }
        }
        return `/* eslint-disable */
export const ${this.mappedSuperclassVarName} = `
            + JSON.stringify(mappedSuperclasses, null, '\t') + ';';
    }
    buildEntity(entityCandidate) {
        if (!entityCandidate.docEntry.isMappedSuperclass) {
            return null;
        }
        const objectSet = new Set();
        objectSet.add(entityCandidate);
        this.dropCircularDependencies(entityCandidate, new Set(), entityCandidate);
        entityCandidate.project = this.config.name;
        return entityCandidate;
    }
    dropCircularDependencies(rootObject, objectSet, currentObject) {
        if (currentObject instanceof Array) {
            currentObject.forEach(childObject => {
                this.dropCircularDependencies(rootObject, objectSet, childObject);
            });
        }
        else if (currentObject instanceof Object) {
            objectSet.add(currentObject);
            for (const key in currentObject) {
                let childObject = currentObject[key];
                if (
                // rootObject === childObject
                // ||
                objectSet.has(childObject)) {
                    currentObject[key] = null;
                }
                else {
                    this.dropCircularDependencies(rootObject, objectSet, childObject);
                }
            }
        }
    }
}
//# sourceMappingURL=MappedSuperclassBuilder.js.map