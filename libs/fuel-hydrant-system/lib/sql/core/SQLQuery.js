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
    constructor(jsonQuery, dbEntity, dialect, queryResultType, airportDatabase, applicationUtils, entityStateManager, qMetadataUtils, sqlQueryAdapter, storeDriver, utils, context) {
        super(dbEntity, dialect, airportDatabase, applicationUtils, entityStateManager, qMetadataUtils, sqlQueryAdapter, storeDriver, utils, context);
        this.jsonQuery = jsonQuery;
        this.queryResultType = queryResultType;
        this.entityDefaults = new EntityDefaults();
    }
    getFieldMap() {
        return this.fieldMap;
    }
    getEntityApplicationRelationFromJoin(leftQEntity, rightQEntity, entityRelation, parentRelation, currentAlias, parentAlias, joinTypeString, errorPrefix, context) {
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
                if (dbRelation.oneRelationColumns && dbRelation.oneRelationColumns.length) {
                    relationColumns = dbRelation.oneRelationColumns;
                }
                else {
                    const matchingRelations = dbRelation.relationEntity.relations.filter(manySideRelation => manySideRelation.relationEntity.id == leftDbEntity.id
                        && manySideRelation.manyToOneElems
                        && manySideRelation.manyToOneElems !== true
                        && manySideRelation.manyToOneElems.mappedBy === dbRelation.property.name);
                    if (matchingRelations.length) {
                        relationColumns = matchingRelations[0].manyRelationColumns;
                    }
                }
                break;
            default:
                throw new Error(`Unknown relation type ${dbRelation.relationType} 
on '${leftDbEntity.applicationVersion.application.name}.${leftDbEntity.name}.${dbRelation.property.name}'.`);
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
on '${leftDbEntity.applicationVersion.application.name}.${leftDbEntity.name}.${dbRelation.property.name}'.`);
            }
            allJoinOnColumns.push({
                leftColumn: ownColumnName,
                rightColumn: referencedColumnName
            });
        }
        let onClause = allJoinOnColumns.map(joinOnColumn => ` ${parentAlias}.${joinOnColumn.leftColumn} = ${currentAlias}.${joinOnColumn.rightColumn}`)
            .join('\n\t\t\tAND');
        if (entityRelation.joinWhereClause) {
            const whereClause = this.getWHEREFragment(entityRelation.joinWhereClause, '\t\t', context);
            const joinWhereOperator = entityRelation.joinWhereClauseOperator === SqlOperator.AND ? 'AND' : 'OR';
            onClause = `${onClause}
			${joinWhereOperator} ${whereClause}`;
        }
        const tableName = this.storeDriver.getEntityTableName(rightDbEntity, context);
        const fromFragment = `\n\t${joinTypeString} ${tableName} ${currentAlias}\n\t\tON ${onClause}`;
        return fromFragment;
    }
}
//# sourceMappingURL=SQLQuery.js.map