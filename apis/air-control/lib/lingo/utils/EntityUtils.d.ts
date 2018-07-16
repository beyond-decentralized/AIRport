import { EntityQuery } from "../../impl/query/facade/EntityQuery";
import { RawEntityQuery } from "../query/facade/EntityQuery";
import { RawQuery } from "../query/facade/Query";
export interface IEntityUtils {
    getObjectClassName(object: any): string;
    getClassName(clazz: Function): string;
    exists(object: any): any;
    valuesEqual(value1: any, value2: any, checkChildObjects?: boolean): boolean;
    isAppliable(object: any): boolean;
    getQuery<Q>(query: Q | {
        (...args: any[]): Q;
    }): Q;
    getRawQuery(rawQuery: RawQuery | {
        (...args: any[]): RawQuery;
    }): RawQuery;
    getEntityQuery(rawGraphQuery: RawEntityQuery<any> | {
        (...args: any[]): RawEntityQuery<any>;
    }): EntityQuery<any>;
}
