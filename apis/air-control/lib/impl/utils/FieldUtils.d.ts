import { JsonFieldQuery } from "@airport/ground-control";
import { IEntityAliases } from "../../lingo/core/entity/Aliases";
import { IQOrderableField } from "../../lingo/core/field/Field";
import { RawFieldQuery } from "../../lingo/query/facade/FieldQuery";
import { IFieldUtils } from "../../lingo/utils/FieldUtils";
import { IUtils } from "../../lingo/utils/Utils";
import { FieldQuery } from "../query/facade/FieldQuery";
export declare class FieldUtils implements IFieldUtils {
    private utils;
    FieldQuery: typeof FieldQuery;
    constructor(utils: IUtils);
    getFieldQueryJson<IQF extends IQOrderableField<IQF>>(fieldSubQuery: RawFieldQuery<IQF>, entityAliases: IEntityAliases): JsonFieldQuery;
}
