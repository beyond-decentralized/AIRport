import { JSONClauseObjectType } from '@airport/ground-control';
import { SQLNoJoinQuery } from './SQLNoJoinQuery';
import { ClauseType } from './SQLWhereBase';
/**
 * Created by Papa on 10/2/2016.
 */
export class SQLUpdate extends SQLNoJoinQuery {
    constructor(jsonUpdate, dialect, airportDatabase, applicationUtils, entityStateManager, qMetadataUtils, qValidator, relationManager, sqlQueryAdapter, storeDriver, subStatementSqlGenerator, utils, context) {
        super(airportDatabase.applications[jsonUpdate.U.si].currentVersion[0]
            .applicationVersion.entities[jsonUpdate.U.ti], dialect, airportDatabase, applicationUtils, entityStateManager, qMetadataUtils, qValidator, relationManager, sqlQueryAdapter, storeDriver, subStatementSqlGenerator, utils, context);
        this.jsonUpdate = jsonUpdate;
    }
    toSQL(internalFragments, context) {
        if (!this.jsonUpdate.U) {
            throw new Error(`Expecting exactly one table in UPDATE clause`);
        }
        let updateFragment = this.getTableFragment(this.jsonUpdate.U, context);
        let setFragment = this.getSetFragment(this.jsonUpdate.S, context);
        if (internalFragments.SET && internalFragments.SET.length) {
            setFragment += ',' + internalFragments.SET.map(internalSetFragment => `
	${internalSetFragment.column.name} = ${internalSetFragment.value}`)
                .join(',');
        }
        let whereFragment = '';
        let jsonQuery = this.jsonUpdate;
        if (jsonQuery.W) {
            whereFragment = this.getWHEREFragment(jsonQuery.W, '', context);
            whereFragment = `WHERE
${whereFragment}`;
            // TODO: following might be needed for some RDBMS, does not work for SqLite
            // Replace the root entity alias reference with the table name
            // let tableAlias = this.relationManager.getAlias(this.jsonUpdate.U)
            // let tableName  = this.storeDriver.getEntityTableName(this.qEntityMapByAlias[tableAlias].__driver__.dbEntity, context)
            // whereFragment  = whereFragment.replace(new RegExp(`${tableAlias}`, 'g'), tableName)
        }
        return `UPDATE
${updateFragment}
SET
${setFragment}
${whereFragment}`;
    }
    getSetFragment(setClauseFragment, context) {
        let setFragments = [];
        for (let columnName in setClauseFragment) {
            let value = setClauseFragment[columnName];
            // Skip undefined values
            if (value === undefined) {
                continue;
            }
            this.qValidator.validateUpdateColumn(this.dbEntity.columnMap[columnName]);
            this.addSetFragment(columnName, value, setFragments, context);
        }
        return setFragments.join(', \n');
    }
    addSetFragment(columnName, value, setFragments, context) {
        let fieldValue;
        if (typeof value === 'number') {
            this.parameterReferences.push(value);
            fieldValue = this.sqlQueryAdapter.getParameterReference(this.parameterReferences, value);
        }
        else {
            fieldValue = this.getFieldValue(value, ClauseType.WHERE_CLAUSE, null, context);
        }
        setFragments.push(`\t${columnName} = ${fieldValue}`);
    }
    isManyToOneRelation(value) {
        return typeof value === 'object'
            && value.ot === JSONClauseObjectType.MANY_TO_ONE_RELATION;
    }
    addManyToOneMappings(parentMapping) {
        let mappings = [];
        const value = parentMapping.value;
        if (typeof value === 'object' &&
            (!value.ot
                || value.ot === JSONClauseObjectType.MANY_TO_ONE_RELATION)) {
            for (const key in value) {
                if (key === 'ot'
                    && value[key] === JSONClauseObjectType.MANY_TO_ONE_RELATION) {
                    continue;
                }
                const mapping = {
                    tableIndex: parentMapping.tableIndex,
                    propertyChain: parentMapping.propertyChain.concat([key]),
                    value: value[key]
                };
                const childMappings = this.addManyToOneMappings(mapping);
                mappings = mappings.concat(childMappings);
            }
        }
        else {
            mappings.push(parentMapping);
        }
        return mappings;
    }
}
//# sourceMappingURL=SQLUpdate.js.map