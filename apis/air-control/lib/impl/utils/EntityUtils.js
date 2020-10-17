import { DI } from '@airport/di';
import { ENTITY_UTILS } from '../../tokens';
import { QOperableField } from '../core/field/OperableField';
import { EntityQuery } from '../query/facade/EntityQuery';
import { objectExists } from '../Utils';
/**
 * Created by Papa on 6/14/2016.
 */
export class EntityUtils {
    getObjectClassName(object) {
        if (typeof object != 'object' || object === null) {
            throw new Error(`Not an object instance`);
        }
        return this.getClassName(object.constructor);
    }
    getClassName(clazz) {
        if (typeof clazz != 'function') {
            throw new Error(`Not a constructor function`);
        }
        let className = clazz['name'];
        // let className = /(\w+)\(/.exec(clazz.toString())[1];
        return className;
    }
    exists(object) {
        return objectExists(object);
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
        return new EntityQuery(this.getRawQuery(rawGraphQuery));
    }
}
DI.set(ENTITY_UTILS, EntityUtils);
//# sourceMappingURL=EntityUtils.js.map