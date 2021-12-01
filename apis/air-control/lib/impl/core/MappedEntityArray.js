/**
 * Created by Papa on 10/14/2016.
 */
// FIXME: MappedEnityArray does not serialize, make it serializable before it can be used
export function newMappedEntityArray(applicationUtils, dbEntity) {
    let arr = Array.apply(null, []);
    arr.dataMap = {};
    arr.clear = function () {
        this.dataMap = {};
        this.splice(0, this.length);
    };
    arr.putAll = function (values) {
        values.forEach((value) => {
            this.put(value);
        });
    };
    arr.put = function (value) {
        let keyValue = applicationUtils.getIdKey(value, dbEntity);
        if (applicationUtils.isIdEmpty(keyValue)) {
            throw new Error(`Composite @Id(s) value for entity '${dbEntity.name}' is not defined`);
        }
        if (this.dataMap[keyValue]) {
            if (this.dataMap[keyValue] !== value) {
                throw new Error(`Found two different instances of an object with the same @Id: ${keyValue}`);
            }
            return value;
        }
        this.dataMap[keyValue] = value;
        this.push(value);
        return value;
    };
    function stringifyKey(key) {
        if (typeof key !== 'string') {
            key = JSON.stringify(key);
        }
        return key;
    }
    arr.get = function (key) {
        key = stringifyKey(key);
        return this.dataMap[key];
    };
    arr.delete = function (key) {
        key = stringifyKey(key);
        let value = this.dataMap[key];
        delete this.dataMap[key];
        for (let i = this.length - 1; i >= 0; i--) {
            let currentValue = this[i];
            if (currentValue === value) {
                this.splice(i, 1);
                break;
            }
        }
        return value;
    };
    arr.toArray = function () {
        return this.slice();
    };
    return arr;
}
/*
 export class MappedEntityArrayEs6<E> extends Array {

 dataMap: {[id: string]: E} = {};

 constructor( private keyField: string | number ) {
 super();
 }

 clear() {
 this.dataMap = {};
 this.splice(0, this.length);
 }

 putAll( values: E[] ): void {
 values.forEach(( value ) => {
 this.put(value);
 });
 }

 put( value: E ): E {
 let keyValue = value[this.keyField];
 if (MetadataUtils.isIdEmpty(keyValue)) {
 throw new Error(`Key field ${this.keyField} is not defined`);
 }
 if (this.dataMap[keyValue]) {
 if (this.dataMap[keyValue] !== value) {
 throw new Error(`Found two different instances of an object with the same @Id: ${keyValue}`);
 }
 return value;
 }
 this.dataMap[keyValue] = value;
 this.push(value);

 return null;
 }

 get( key: string | number ): E {
 return this.dataMap[key];
 }

 delete( key: string | number ): E {
 let value = this.dataMap[key];
 delete this.dataMap[key];

 for (let i = this.length - 1; i >= 0; i--) {
 let currentValue = this[i];
 if (currentValue === value) {
 this.splice(i, 1);
 break;
 }
 }

 return value;
 }

 toArray(): E[] {
 return this.slice();
 }

 }
 */
//# sourceMappingURL=MappedEntityArray.js.map