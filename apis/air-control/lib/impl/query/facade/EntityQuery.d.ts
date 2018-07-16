import { JSONEntityFieldInOrderBy, JsonEntityQuery, JsonLimitedEntityQuery } from "@airport/ground-control";
import { IEntitySelectProperties } from "../../../lingo/core/entity/Entity";
import { IFieldInOrderBy } from "../../../lingo/core/field/FieldInOrderBy";
import { RawEntityQuery, RawLimitedEntityQuery } from "../../../lingo/query/facade/EntityQuery";
import { IQuery } from "../../../lingo/query/facade/Query";
import { IUtils } from "../../../lingo/utils/Utils";
import { MappableQuery } from "./TreeQuery";
/**
 * Created by Papa on 10/24/2016.
 */
export declare class EntityQuery<IEP extends IEntitySelectProperties> extends MappableQuery implements IQuery {
    protected rawQuery: RawEntityQuery<IEP>;
    private utils;
    constructor(rawQuery: RawEntityQuery<IEP>, utils: IUtils);
    toJSON(): JsonEntityQuery<IEP>;
    protected nonDistinctSelectClauseToJSON(rawSelect: any): any;
    protected orderByClauseToJSON(orderBy: IFieldInOrderBy<any>[]): JSONEntityFieldInOrderBy[];
}
export declare class LimitedEntityQuery<IEP extends IEntitySelectProperties> extends EntityQuery<IEP> {
    rawQuery: RawLimitedEntityQuery<IEP>;
    constructor(rawQuery: RawLimitedEntityQuery<IEP>, utils: IUtils);
    toJSON(): JsonLimitedEntityQuery<IEP>;
}
