import { SortOrder } from '@airport/ground-control';
/**
 * Created by Papa on 10/16/2016.
 */
/**
 * Will order the results exactly as specified in the Order By clause
 */
export class ExactOrderByParser {
    constructor(validator) {
        this.validator = validator;
    }
    getOrderByFragment(rootSelectClauseFragment, orderBy) {
        return orderBy.map((orderByField) => {
            this.validator.validateAliasedFieldAccess(orderByField.fa);
            switch (orderByField.so) {
                case SortOrder.ASCENDING:
                    return `${orderByField.fa} ASC`;
                case SortOrder.DESCENDING:
                    return `${orderByField.fa} DESC`;
            }
        })
            .join(', ');
    }
}
//# sourceMappingURL=ExactOrderByParser.js.map