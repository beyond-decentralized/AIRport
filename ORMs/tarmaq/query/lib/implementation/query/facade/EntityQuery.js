import { QField } from '../../core/field/Field';
import { MappableQuery } from './MappableQuery';
/**
 * Created by Papa on 10/24/2016.
 */
export class EntityQuery extends MappableQuery {
    constructor(rawQuery) {
        super();
        this.rawQuery = rawQuery;
        this.isEntityQuery = true;
        this.isHierarchicalEntityQuery = true;
    }
    toJSON(queryUtils, fieldUtils, relationManager) {
        return {
            S: this.selectClauseToJSON(this.rawQuery.SELECT, queryUtils, fieldUtils, relationManager),
            F: this.fromClauseToJSON(this.rawQuery.FROM, queryUtils, fieldUtils, relationManager),
            forUpdate: this.rawQuery.FOR_UPDATE,
            W: queryUtils.whereClauseToJSON(this.rawQuery.WHERE, this.columnAliases),
            OB: this.orderByClauseToJSON(this.rawQuery.ORDER_BY)
        };
    }
    nonDistinctSelectClauseToJSON(rawSelect) {
        for (let field in rawSelect) {
            let value = rawSelect[field];
            if (value instanceof QField) {
                throw new Error(`Field References cannot be used in Entity Queries`);
            }
            else if (value instanceof Object && !(value instanceof Date)) {
                this.nonDistinctSelectClauseToJSON(value);
            }
        }
        return rawSelect;
    }
    orderByClauseToJSON(orderBy) {
        if (!orderBy || !orderBy.length) {
            return null;
        }
        return orderBy.map((field) => {
            return field.toEntityJSON();
        });
    }
}
export class LimitedEntityQuery extends EntityQuery {
    constructor(rawQuery) {
        super(rawQuery);
        this.rawQuery = rawQuery;
        this.isHierarchicalEntityQuery = false;
    }
    toJSON(queryUtils, fieldUtils, relationManager) {
        let limitedJsonEntity = super.toJSON(queryUtils, fieldUtils, relationManager);
        limitedJsonEntity.L = this.rawQuery.LIMIT;
        limitedJsonEntity.O = this.rawQuery.OFFSET;
        return limitedJsonEntity;
    }
}
//# sourceMappingURL=EntityQuery.js.map