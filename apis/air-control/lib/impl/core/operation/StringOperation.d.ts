import { IQStringField } from "../../../lingo/core/field/StringField";
import { IStringOperation, JSONRawStringOperation } from "../../../lingo/core/operation/StringOperation";
import { RawFieldQuery } from "../../../lingo/query/facade/FieldQuery";
import { ValueOperation } from "./Operation";
/**
 * Created by Papa on 6/20/2016.
 */
export declare class StringOperation extends ValueOperation<string, JSONRawStringOperation, IQStringField> implements IStringOperation {
    constructor();
    like(lValue: IQStringField, rValue: string | IQStringField | RawFieldQuery<IQStringField>): JSONRawStringOperation;
}
//# sourceMappingURL=StringOperation.d.ts.map