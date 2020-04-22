import { JSONBaseOperation, JsonQuery } from "@airport/ground-control";
import { IFieldUtils, IQueryUtils } from '../../..';
import { IEntityRelationFrom, IFrom } from '../../core/entity/Entity';
import { IFieldInOrderBy } from '../../core/field/FieldInOrderBy';
/**
 * Query input format, as specified by the user. All queries extend this format.
 */
export interface RawQuery {
    from?: (IFrom | IEntityRelationFrom)[];
    orderBy?: IFieldInOrderBy<any>[];
    select: any;
    where?: JSONBaseOperation;
}
export interface RawLimitedQuery {
    limit: number;
    offset: number;
}
/**
 * Internal query format. All query implementations extend this.
 */
export interface IQuery {
    toJSON(queryUtils: IQueryUtils, fieldUtils: IFieldUtils): JsonQuery;
}
export declare const SAME: any;
export declare const Y: any;
export declare function convertToY(object: any): void;
export declare function isY(object: any): boolean;
export declare const N: any;
export declare function isN(object: any): boolean;
export declare const ID: any;
export declare function convertToID(object: any): void;
export declare function isID(object: any): boolean;
