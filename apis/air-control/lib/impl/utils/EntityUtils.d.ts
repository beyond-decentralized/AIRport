import { RawEntityQuery } from '../../lingo/query/facade/EntityQuery';
import { RawQuery } from '../../lingo/query/facade/Query';
import { IEntityUtils } from '../../lingo/utils/EntityUtils';
import { EntityQuery } from '../query/facade/EntityQuery';
/**
 * Created by Papa on 6/14/2016.
 */
export declare class EntityUtils implements IEntityUtils {
    getObjectClassName(object: any): string;
    getClassName(clazz: Function): string;
    exists(object: any): boolean;
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
