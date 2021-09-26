import { EntityRelationType, SqlOperator } from '@airport/ground-control';
import { SQLWhereBase } from './SQLWhereBase';
/**
 * Created by Papa on 8/20/2016.
 */
export var SQLDialect;
(function (SQLDialect) {
    SQLDialect["MYSQL"] = "MYSQL";
    SQLDialect["POSTGRESQL"] = "POSTGRESQL";
    SQLDialect["SQLITE"] = "SQLITE";
})(SQLDialect || (SQLDialect = {}));
export class EntityDefaults {
    constructor() {
        this.map = {};
    }
    getForAlias(alias) {
        let defaultsForAlias = this.map[alias];
        if (!defaultsForAlias) {
            defaultsForAlias = {};
            this.map[alias] = defaultsForAlias;
        }
        return defaultsForAlias;
    }
}
/**
 * String based SQL query.
 */
export class SQLQuery extends SQLWhereBase {
    constructor(jsonQuery, dbEntity, dialect, queryResultType, context) {
        super(dbEntity, dialect, context);
        this.jsonQuery = jsonQuery;
        this.queryResultType = queryResultType;
        this.entityDefaults = new EntityDefaults();
    }
    getFieldMap() {
        return this.fieldMap;
    }
    getEntitySchemaRelationFromJoin(leftQEntity, rightQEntity, entityRelation, parentRelation, currentAlias, parentAlias, joinTypeString, errorPrefix, context) {
        const allJoinOnColumns = [];
        const leftDbEntity = leftQEntity.__driver__.dbEntity;
        const rightDbEntity = rightQEntity.__driver__.dbEntity;
        const dbRelation = leftDbEntity.relations[entityRelation.ri];
        let relationColumns;
        switch (dbRelation.relationType) {
            case EntityRelationType.MANY_TO_ONE:
                relationColumns = dbRelation.manyRelationColumns;
                break;
            case EntityRelationType.ONE_TO_MANY:
                relationColumns = dbRelation.oneRelationColumns;
                break;
            default:
                throw new Error(`Unknown relation type ${dbRelation.relationType} 
on '${leftDbEntity.schemaVersion.schema.name}.${leftDbEntity.name}.${dbRelation.property.name}'.`);
        }
        for (const relationColumn of relationColumns) {
            let ownColumnName;
            let referencedColumnName;
            switch (dbRelation.relationType) {
                case EntityRelationType.MANY_TO_ONE:
                    ownColumnName = relationColumn.manyColumn.name;
                    referencedColumnName = relationColumn.oneColumn.name;
                    break;
                case EntityRelationType.ONE_TO_MANY:
                    ownColumnName = relationColumn.oneColumn.name;
                    referencedColumnName = relationColumn.manyColumn.name;
                    break;
                default:
                    throw new Error(`Unknown relation type ${dbRelation.relationType} 
on '${leftDbEntity.schemaVersion.schema.name}.${leftDbEntity.name}.${dbRelation.property.name}'.`);
            }
            allJoinOnColumns.push({
                leftColumn: ownColumnName,
                rightColumn: referencedColumnName
            });
        }
        let onClause = allJoinOnColumns.map(joinOnColumn => ` ${parentAlias}.${joinOnColumn.leftColumn} = ${currentAlias}.${joinOnColumn.rightColumn}`)
            .join('\n\t\t\tAND');
        if (entityRelation.jwc) {
            const whereClause = this.getWHEREFragment(entityRelation.jwc, '\t\t', context);
            const joinWhereOperator = entityRelation.wjto === SqlOperator.AND ? 'AND' : 'OR';
            onClause = `${onClause}
			${joinWhereOperator} ${whereClause}`;
        }
        const tableName = context.ioc.storeDriver.getEntityTableName(rightDbEntity, context);
        const fromFragment = `\n\t${joinTypeString} ${tableName} ${currentAlias}\n\t\tON ${onClause}`;
        return fromFragment;
    }
}
//# sourceMappingURL=SQLQuery.js.map