import { IQEntityInternal } from "../../../lingo/core/entity/Entity";
import { IQBooleanField } from "../../../lingo/core/field/BooleanField";
import { IBooleanOperation, JSONRawBooleanOperation } from "../../../lingo/core/operation/BooleanOperation";
import { ValueOperation } from "./Operation";
/**
 * Created by Papa on 6/20/2016.
 */
export declare class BooleanOperation<IQ extends IQEntityInternal> extends ValueOperation<boolean, JSONRawBooleanOperation, IQBooleanField> implements IBooleanOperation {
    constructor();
}
