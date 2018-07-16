import { QOperableField } from "../core/field/OperableField";
import { EntityQuery } from "../query/facade/EntityQuery";
/**
 * Created by Papa on 6/14/2016.
 */
export class EntityUtils {
    constructor(utils) {
        this.utils = utils;
    }
    getObjectClassName(object) {
        if (typeof object != "object" || object === null) {
            throw `Not an object instance`;
        }
        return this.getClassName(object.constructor);
    }
    getClassName(clazz) {
        if (typeof clazz != "function") {
            throw `Not a constructor function`;
        }
        let className = clazz['name'];
        // let className = /(\w+)\(/.exec(clazz.toString())[1];
        return className;
    }
    exists(object) {
        return this.utils.objectExists(object);
    }
    /*
     static isBlank(
     object: any
     ) {
     for (let propertyName in object) {
     let property = object[propertyName];
     if (this.exists(property)) {
     if (property instanceof Array) {
     if (property.length > 0) {
     return false;
     }
     } else {
     return false;
     }
     }
     }
     return true;
     }
     */
    valuesEqual(value1, value2, checkChildObjects = false) {
        return this.utils.valuesEqual(value1, value2, checkChildObjects);
    }
    isAppliable(object) {
        return object instanceof QOperableField;
    }
    getQuery(query) {
        return this.getRawQuery(query);
    }
    getRawQuery(rawQuery) {
        if (rawQuery instanceof Function) {
            return rawQuery();
        }
        else {
            return rawQuery;
        }
    }
    getEntityQuery(rawGraphQuery) {
        return new EntityQuery(this.getRawQuery(rawGraphQuery), this.utils);
    }
}
//# sourceMappingURL=EntityUtils.js.map