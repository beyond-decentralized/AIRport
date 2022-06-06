import { IOC } from '@airport/direction-indicator';
import { EntityAliases, } from '../../core/entity/Aliases';
import { ENTITY_UTILS } from '../../../core-tokens';
/**
 * Created by Papa on 10/27/2016.
 */
export class AbstractQuery {
    constructor(entityAliases = new EntityAliases(), columnAliases = entityAliases.getNewFieldColumnAliases()) {
        this.entityAliases = entityAliases;
        this.columnAliases = columnAliases;
        this.isEntityQuery = false;
    }
    getParameters( //
    ) {
        return this.entityAliases.getParams().getParameters();
    }
    getNonEntityQuery(rawQuery, jsonQuery, createSelectCallback, queryUtils, fieldUtils, relationManager) {
        let from = this.fromClauseToJSON(rawQuery.from, queryUtils, fieldUtils, relationManager);
        jsonQuery.F = from;
        if (createSelectCallback) {
            createSelectCallback(jsonQuery);
        }
        jsonQuery.W = queryUtils.whereClauseToJSON(rawQuery.where, this.columnAliases);
        jsonQuery.GB = this.groupByClauseToJSON(rawQuery.groupBy);
        jsonQuery.H = queryUtils.whereClauseToJSON(rawQuery.having, this.columnAliases);
        jsonQuery.OB = this.orderByClauseToJSON(rawQuery.orderBy);
        jsonQuery.L = rawQuery.limit;
        jsonQuery.O = rawQuery.offset;
        return jsonQuery;
    }
    fromClauseToJSON(fromClause, queryUtils, fieldUtils, relationManager) {
        if (!fromClause) {
            if (this.isEntityQuery) {
                return [];
            }
            else {
                throw new Error('From clause must be present in a non-Entity based query.');
            }
        }
        return fromClause.map((fromEntity) => {
            if (!(IOC.getSync(ENTITY_UTILS).isQEntity(fromEntity))) {
                throw new Error(`FROM clause can contain only Views or Entities.`);
            }
            if (this.isEntityQuery) {
                if (IOC.getSync(ENTITY_UTILS).isQTree(fromEntity)) {
                    throw new Error(`Entity FROM clauses can contain only Entities.`);
                }
            }
            return fromEntity.__driver__
                .getRelationJson(this.columnAliases, queryUtils, fieldUtils, relationManager);
        });
    }
    groupByClauseToJSON(groupBy) {
        if (!groupBy || !groupBy.length) {
            return null;
        }
        return groupBy.map((field) => {
            if (!this.columnAliases.hasAliasFor(field)) {
                throw new Error(`Field used in group by clause is not present in select clause`);
            }
            return {
                fa: this.columnAliases.getExistingAlias(field)
            };
        });
    }
    orderByClauseToJSON(orderBy) {
        if (!orderBy || !orderBy.length) {
            return null;
        }
        return orderBy.map((field) => {
            return field.toJSON(this.columnAliases);
        });
    }
}
//# sourceMappingURL=AbstractQuery.js.map