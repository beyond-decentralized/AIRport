"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ground_control_1 = require("@airport/ground-control");
const SQLWhereBase_1 = require("./SQLWhereBase");
/**
 * Created by Papa on 8/20/2016.
 */
var SQLDialect;
(function (SQLDialect) {
    SQLDialect[SQLDialect["SQLITE_SQLJS"] = 0] = "SQLITE_SQLJS";
    SQLDialect[SQLDialect["SQLITE_WEBSQL"] = 1] = "SQLITE_WEBSQL";
    SQLDialect[SQLDialect["ORACLE"] = 2] = "ORACLE";
})(SQLDialect = exports.SQLDialect || (exports.SQLDialect = {}));
class EntityDefaults {
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
exports.EntityDefaults = EntityDefaults;
/**
 * String based SQL query.
 */
class SQLQuery extends SQLWhereBase_1.SQLWhereBase {
    constructor(airportDb, utils, jsonQuery, dbEntity, dialect, queryResultType) {
        super(airportDb, utils, dbEntity, dialect);
        this.jsonQuery = jsonQuery;
        this.queryResultType = queryResultType;
        this.entityDefaults = new EntityDefaults();
    }
    getFieldMap() {
        return this.fieldMap;
    }
    getEntitySchemaRelationFromJoin(leftQEntity, rightQEntity, entityRelation, parentRelation, currentAlias, parentAlias, joinTypeString, errorPrefix) {
        const allJoinOnColumns = [];
        const leftDbEntity = leftQEntity.__driver__.dbEntity;
        const rightDbEntity = rightQEntity.__driver__.dbEntity;
        const dbRelation = leftDbEntity.relations[entityRelation.ri];
        let relationColumns;
        switch (dbRelation.relationType) {
            case ground_control_1.EntityRelationType.MANY_TO_ONE:
                relationColumns = dbRelation.manyRelationColumns;
                break;
            case ground_control_1.EntityRelationType.ONE_TO_MANY:
                relationColumns = dbRelation.oneRelationColumns;
                break;
            default:
                throw `Unknown relation type ${dbRelation.relationType} 
on '${leftDbEntity.schemaVersion.schema.name}.${leftDbEntity.name}.${dbRelation.property.name}'.`;
        }
        for (const relationColumn of relationColumns) {
            let ownColumnName;
            let referencedColumnName;
            switch (dbRelation.relationType) {
                case ground_control_1.EntityRelationType.MANY_TO_ONE:
                    ownColumnName = relationColumn.manyColumn.name;
                    referencedColumnName = relationColumn.oneColumn.name;
                    break;
                case ground_control_1.EntityRelationType.ONE_TO_MANY:
                    ownColumnName = relationColumn.oneColumn.name;
                    referencedColumnName = relationColumn.manyColumn.name;
                    break;
                default:
                    throw `Unknown relation type ${dbRelation.relationType} 
on '${leftDbEntity.schemaVersion.schema.name}.${leftDbEntity.name}.${dbRelation.property.name}'.`;
            }
            allJoinOnColumns.push({
                leftColumn: ownColumnName,
                rightColumn: referencedColumnName
            });
        }
        let onClause = allJoinOnColumns.map(joinOnColumn => ` ${parentAlias}.${joinOnColumn.leftColumn} = ${currentAlias}.${joinOnColumn.rightColumn}`).join('\n\t\t\tAND');
        if (entityRelation.jwc) {
            const whereClause = this.getWHEREFragment(entityRelation.jwc, '\t\t');
            const joinWhereOperator = entityRelation.wjto === ground_control_1.SqlOperator.AND ? 'AND' : 'OR';
            onClause = `${onClause}
			${joinWhereOperator} ${whereClause}`;
        }
        const tableName = this.utils.Schema.getTableName(rightDbEntity);
        const fromFragment = `\n\t${joinTypeString} ${tableName} ${currentAlias}\n\t\tON ${onClause}`;
        return fromFragment;
    }
}
exports.SQLQuery = SQLQuery;
//# sourceMappingURL=SQLQuery.js.map