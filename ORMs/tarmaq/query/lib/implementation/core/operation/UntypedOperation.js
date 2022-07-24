import { OperationCategory, SqlOperator } from "@airport/ground-control";
import { ValueOperation } from "./Operation";
/**
 * Created by papa on 7/13/17.
 */
export class UntypedOperation extends ValueOperation {
    constructor() {
        super(OperationCategory.UNTYPED);
    }
    LIKE(lValue, rValue
    // TODO: implement ReqExp
    //| RegExp
    ) {
        return {
            c: this.category,
            l: lValue,
            o: SqlOperator.LIKE,
            r: rValue
        };
    }
}
//# sourceMappingURL=UntypedOperation.js.map