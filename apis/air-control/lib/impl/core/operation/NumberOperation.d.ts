import { IQEntityInternal } from "../../../lingo/core/entity/Entity";
import { IQNumberField } from "../../../lingo/core/field/NumberField";
import { INumberOperation, JSONRawNumberOperation } from "../../../lingo/core/operation/NumberOperation";
import { ValueOperation } from "./Operation";
/**
 * Created by Papa on 6/20/2016.
 */
export declare class NumberOperation<IQ extends IQEntityInternal<any>> extends ValueOperation<number, JSONRawNumberOperation, IQNumberField> implements INumberOperation {
    constructor();
}
//# sourceMappingURL=NumberOperation.d.ts.map