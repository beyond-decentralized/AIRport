import { IQUntypedField } from "../../../definition/core/field/UntypedField";
import { IUntypedOperation, JSONRawUntypedOperation } from "../../../definition/core/operation/UntypedOperation";
import { RawFieldQuery } from "../../../definition/query/facade/FieldQuery";
import { ValueOperation } from "./Operation";
/**
 * Created by papa on 7/13/17.
 */
export declare class UntypedOperation extends ValueOperation<number | string, JSONRawUntypedOperation, IQUntypedField> implements IUntypedOperation {
    constructor();
    like(lValue: IQUntypedField, rValue: string | IQUntypedField | RawFieldQuery<IQUntypedField>): JSONRawUntypedOperation;
}
//# sourceMappingURL=UntypedOperation.d.ts.map