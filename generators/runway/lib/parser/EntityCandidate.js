/**
 * Created by Papa on 3/27/2016.
 */
export class Interface {
    constructor(path, name) {
        this.name = name;
        this.implementedBySet = new Set();
    }
}
export class EntityCandidate {
    constructor(type, path, parentClassName, location, verified, isSuperclass) {
        this.type = type;
        this.path = path;
        this.parentClassName = parentClassName;
        this.location = location;
        this.verified = verified;
        this.isSuperclass = isSuperclass;
        this.ids = [];
        if (!type) {
            return;
        }
        console.log(`\tcreating entity: ${type}, parent: ${parentClassName}, isSuperclass: ${isSuperclass}`);
    }
    static create(type, path, parentClass, parentImport, isSuperClass) {
        return new EntityCandidate(type, path, parentClass, parentImport, undefined, isSuperClass);
    }
    getIdProperties() {
        return this.getPropertiesOfType(true);
    }
    getNonIdProperties() {
        return this.getPropertiesOfType(false);
    }
    getPropertiesOfType(isId) {
        return this.docEntry.properties.filter((property, index) => {
            if (property.isTransient) {
                return false;
            }
            property.index = index;
            const idDecorators = property.decorators.filter(decorator => {
                return decorator.name === 'Id';
            });
            if (isId) {
                return !!idDecorators.length;
            }
            else {
                return !idDecorators.length;
            }
        });
    }
    getTransientProperties() {
        return this.docEntry.properties.filter((property, index) => {
            return property.isTransient;
        });
    }
    matches(type, location) {
        return this.type === type;
    }
}
//# sourceMappingURL=EntityCandidate.js.map