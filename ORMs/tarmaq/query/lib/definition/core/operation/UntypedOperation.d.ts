import { SqlOperator } from "@airport/ground-control";
import { RawFieldQuery } from "../../query/facade/FieldQuery";
import { IQUntypedField } from "../field/UntypedField";
import { IValueOperation, JSONRawValueOperation } from "./Operation";
/**
 * Created by papa on 7/13/17.
 */
/**
 * Interface for all operation implementations with a boolean value.
 */
export interface IUntypedOperation extends IValueOperation<any, JSONRawUntypedOperation, IQUntypedField> {
    like(lValue: IQUntypedField, rValue: string | IQUntypedField | RawFieldQuery<IQUntypedField>): JSONRawUntypedOperation;
}
/**
 * JSON representation of a boolean operation as it exists immediately after
 * defining a query (to which the operation belongs).
 */
export interface JSONRawUntypedOperation extends JSONRawValueOperation<IQUntypedField> {
    o: SqlOperator.EQUALS | SqlOperator.IS_NOT_NULL | SqlOperator.IS_NULL | SqlOperator.IN | SqlOperator.LIKE | SqlOperator.NOT_EQUALS | SqlOperator.NOT_IN | SqlOperator.GREATER_THAN | SqlOperator.GREATER_THAN_OR_EQUALS | SqlOperator.LESS_THAN | SqlOperator.LESS_THAN_OR_EQUALS;
    l: IQUntypedField;
    r: any | IQUntypedField | IQUntypedField[] | RawFieldQuery<IQUntypedField> | RawFieldQuery<IQUntypedField>[];
}
//# sourceMappingURL=UntypedOperation.d.ts.map