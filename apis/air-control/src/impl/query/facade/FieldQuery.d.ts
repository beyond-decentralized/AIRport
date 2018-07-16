import { JsonFieldQuery, SQLDataType } from "@airport/ground-control";
import { IEntityAliases } from "../../../lingo/core/entity/Aliases";
import { IQOrderableField } from "../../../lingo/core/field/Field";
import { RawFieldQuery } from "../../../lingo/query/facade/FieldQuery";
import { IQuery } from "../../../lingo/query/facade/Query";
import { IUtils } from "../../../lingo/utils/Utils";
import { DistinguishableQuery } from "./NonEntityQuery";
/**
 * Created by Papa on 10/24/2016.
 */
export declare class FieldQuery<IQF extends IQOrderableField<IQF>> extends DistinguishableQuery implements IQuery {
    private rawQuery;
    private utils;
    constructor(rawQuery: RawFieldQuery<IQF>, utils: IUtils, entityAliases?: IEntityAliases);
    nonDistinctSelectClauseToJSON(rawSelect: any): any;
    toJSON(): JsonFieldQuery;
    getClauseDataType(): SQLDataType;
}
