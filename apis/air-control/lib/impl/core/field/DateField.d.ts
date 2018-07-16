import { DbColumn, DbProperty, JSONClauseField, JSONClauseObjectType } from "@airport/ground-control";
import { IQEntityInternal } from "../../../lingo/core/entity/Entity";
import { IQDateField } from "../../../lingo/core/field/DateField";
import { IQFunction } from "../../../lingo/core/field/Functions";
import { IDateOperation, JSONRawDateOperation } from "../../../lingo/core/operation/DateOperation";
import { RawFieldQuery } from "../../../lingo/query/facade/FieldQuery";
import { IUtils } from "../../../lingo/utils/Utils";
import { FieldColumnAliases } from "../entity/Aliases";
import { QOperableField } from "./OperableField";
/**
 * Created by Papa on 8/11/2016.
 */
export interface IQDateEntityField extends IQDateField {
}
export declare class QDateField extends QOperableField<Date, JSONRawDateOperation, IDateOperation, IQDateField> implements IQDateField {
    constructor(dbColumn: DbColumn, dbProperty: DbProperty, q: IQEntityInternal, utils: IUtils, objectType?: JSONClauseObjectType);
    getInstance(qEntity?: IQEntityInternal): QDateField;
}
export declare class QDateFunction extends QDateField implements IQFunction<Date | RawFieldQuery<any>> {
    value: Date | RawFieldQuery<QDateField>;
    private isQueryParameter;
    parameterAlias: string;
    constructor(value: Date | RawFieldQuery<QDateField>, utils: IUtils, isQueryParameter?: boolean);
    getInstance(): QDateFunction;
    toJSON(columnAliases: FieldColumnAliases, forSelectClause: boolean): JSONClauseField;
}
