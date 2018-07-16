import { OperationCategory, SqlOperator } from "@airport/ground-control";
import { ValueOperation } from "./Operation";
/**
 * Created by Papa on 6/20/2016.
 */
export class StringOperation extends ValueOperation {
    constructor() {
        super(OperationCategory.STRING);
    }
    like(lValue, rValue
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
//# sourceMappingURL=StringOperation.js.map