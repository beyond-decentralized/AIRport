import { JSONBaseOperation, JsonQuery } from '@airport/ground-control';
import { IFieldUtils } from '../../utils/FieldUtils';
import { IQueryUtils } from '../../utils/QueryUtils';
import { IEntityRelationFrom, IFrom } from '../../core/entity/Entity';
import { IFieldInOrderBy } from '../../core/field/FieldInOrderBy';
import { IRelationManager } from '../../../impl/core/entity/RelationManager';
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
    limit?: number;
    offset?: number;
}
/**
 * Internal query format. All query implementations extend this.
 */
export interface IQuery {
    toJSON(queryUtils: IQueryUtils, fieldUtils: IFieldUtils, relationManager: IRelationManager): JsonQuery;
}
export declare const NEW_RECORD_FIELDS: {
    actor: any;
    actorRecordId: any;
    ageSuitability: number;
    id: any;
    originalActor: any;
    originalActorRecordId: any;
    originalRepository: any;
    systemWideOperationId: any;
};
export declare function ANOTHER(a: number, b?: number): any;
export declare const Y: any;
export declare const ALL_FIELDS: any;
export declare const YES: any;
export declare function convertToY(object: any): void;
export declare function isY(object: any): boolean;
export declare const N: any;
export declare const NO: any;
export declare function isN(object: any): boolean;
export declare const I: any;
export declare const INSERT: any;
export declare function isInsert(object: any): boolean;
export declare const IN: any;
export declare const INSERT_OR_NULL: any;
export declare function isInsertOrNull(object: any): boolean;
export declare const U: any;
export declare const UPDATE: any;
export declare function isUpdate(object: any): boolean;
export declare const IU: any;
export declare const INSERT_OR_UPDATE: any;
export declare function isInsertOrUpdate(object: any): boolean;
export declare const UN: any;
export declare const UPDATE_OR_NULL: any;
export declare function isUpdateOrNull(object: any): boolean;
export declare const IUN: any;
export declare const INSERT_OR_UPDATE_OR_NULL: any;
export declare function isInsertOrUpdateOrNull(object: any): boolean;
export declare const A: any;
export declare const ALL: any;
export declare const UPSERT: any;
export declare const isUpsert: typeof isInsertOrUpdateOrNull;
export declare const ID: any;
export declare function convertToID(object: any): void;
export declare function isID(object: any): boolean;
export declare function getErrorMessageSelectStatement(jsonSelectClause: any): any;
//# sourceMappingURL=Query.d.ts.map