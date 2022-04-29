import { SortOrder } from '@airport/ground-control';
export class AbstractEntityOrderByParser {
    constructor(rootSelectClauseFragment, airportDatabase, qValidator, relationManager, orderBy) {
        this.rootSelectClauseFragment = rootSelectClauseFragment;
        this.airportDatabase = airportDatabase;
        this.qValidator = qValidator;
        this.relationManager = relationManager;
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
        })
            .join(', ');
    }
}
//# sourceMappingURL=AbstractEntityOrderByParser.js.map