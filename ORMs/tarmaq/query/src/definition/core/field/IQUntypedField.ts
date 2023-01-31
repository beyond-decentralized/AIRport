import { IUntypedOperation, RawUntypedOperation } from "../operation/IUntypedOperation";
import { IQOperableField } from "./IQOperableField";

/**
 * Created by papa on 7/13/17.
 */

export interface IQUntypedField
	extends IQOperableField<any, RawUntypedOperation, IUntypedOperation, IQUntypedField> {

}