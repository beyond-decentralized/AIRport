import { DbColumn, DbProperty, JSONClauseField, JSONClauseObjectType } from "@airport/ground-control";
import { IQEntityInternal } from "../../../lingo/core/entity/Entity";
import { IQBooleanField } from "../../../lingo/core/field/BooleanField";
import { IQFunction } from "../../../lingo/core/field/Functions";
import { IBooleanOperation, JSONRawBooleanOperation } from "../../../lingo/core/operation/BooleanOperation";
import { RawFieldQuery } from "../../../lingo/query/facade/FieldQuery";
import { IUtils } from "../../../lingo/utils/Utils";
import { FieldColumnAliases } from "../entity/Aliases";
import { QOperableField } from "./OperableField";
/**
 * Created by Papa on 8/10/2016.
 */
export interface IQBooleanEntityField extends IQBooleanField {
}
export declare class QBooleanField extends QOperableField<boolean, JSONRawBooleanOperation, IBooleanOperation, IQBooleanField> implements IQBooleanField {
    constructor(dbColumn: DbColumn, dbProperty: DbProperty, q: IQEntityInternal, utils: IUtils, objectType?: JSONClauseObjectType);
    getInstance(qEntity?: IQEntityInternal): QBooleanField;
}
export declare class QBooleanFunction extends QBooleanField implements IQFunction<boolean | RawFieldQuery<any>> {
    value: boolean | RawFieldQuery<QBooleanField>;
    private isQueryParameter;
    parameterAlias: string;
    constructor(value: boolean | RawFieldQuery<QBooleanField>, utils: IUtils, isQueryParameter?: boolean);
    getInstance(): QBooleanFunction;
    toJSON(columnAliases: FieldColumnAliases, forSelectClause: boolean): JSONClauseField;
}
