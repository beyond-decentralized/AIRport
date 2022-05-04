import { IQUntypedField } from "../../../lingo/core/field/UntypedField";
import { IUntypedOperation, JSONRawUntypedOperation } from "../../../lingo/core/operation/UntypedOperation";
import { RawFieldQuery } from "../../../lingo/query/facade/FieldQuery";
import { ValueOperation } from "./Operation";
/**
 * Created by papa on 7/13/17.
 */
export declare class UntypedOperation extends ValueOperation<number | string, JSONRawUntypedOperation, IQUntypedField> implements IUntypedOperation {
    constructor();
    like(lValue: IQUntypedField, rValue: string | IQUntypedField | RawFieldQuery<IQUntypedField>): JSONRawUntypedOperation;
}
//# sourceMappingURL=UntypedOperation.d.ts.map