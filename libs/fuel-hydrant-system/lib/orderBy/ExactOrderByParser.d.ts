import { JSONFieldInOrderBy } from "@airport/ground-control";
import { IValidator } from '../validation/Validator';
import { INonEntityOrderByParser } from "./AbstractEntityOrderByParser";
/**
 * Created by Papa on 10/16/2016.
 */
/**
 * Will order the results exactly as specified in the Order By clause
 */
export declare class ExactOrderByParser implements INonEntityOrderByParser {
    private validator;
    constructor(validator: IValidator);
    getOrderByFragment(rootSelectClauseFragment: any, orderBy: JSONFieldInOrderBy[]): string;
}
//# sourceMappingURL=ExactOrderByParser.d.ts.map