import { QField } from '../../core/field/Field';
import { MappableQuery } from './TreeQuery';
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
            S: this.selectClauseToJSON(this.rawQuery.select, queryUtils, fieldUtils, relationManager),
            F: this.fromClauseToJSON(this.rawQuery.from, queryUtils, fieldUtils, relationManager),
            W: queryUtils.whereClauseToJSON(this.rawQuery.where, this.columnAliases),
            OB: this.orderByClauseToJSON(this.rawQuery.orderBy)
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
        limitedJsonEntity.L = this.rawQuery.limit;
        limitedJsonEntity.O = this.rawQuery.offset;
        return limitedJsonEntity;
    }
}
//# sourceMappingURL=EntityQuery.js.map