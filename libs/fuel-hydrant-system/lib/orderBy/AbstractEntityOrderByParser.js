import { SortOrder } from '@airport/ground-control';
export class AbstractEntityOrderByParser {
    constructor(rootSelectClauseFragment, validator, orderBy) {
        this.rootSelectClauseFragment = rootSelectClauseFragment;
        this.validator = validator;
        this.orderBy = orderBy;
    }
    getCommonOrderByFragment(orderByFields) {
        return orderByFields.map((orderByField) => {
            switch (orderByField.so) {
                case SortOrder.ASCENDING:
                    return `${orderByField.fa} ASC`;
                case SortOrder.DESCENDING:
                    return `${orderByField.fa} DESC`;
            }
        }).join(', ');
    }
}
//# sourceMappingURL=AbstractEntityOrderByParser.js.map