"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const air_control_1 = require("@airport/air-control");
const air_control_2 = require("@airport/air-control");
const ground_control_1 = require("@airport/ground-control");
const EntityOrderByParser_1 = require("../orderBy/EntityOrderByParser");
const IEntityResultParser_1 = require("../result/entity/IEntityResultParser");
const SQLQuery_1 = require("./core/SQLQuery");
/**
 * Created by Papa on 10/16/2016.
 */
/**
 * Represents SQL String query with Entity tree Select clause.
 */
class EntitySQLQuery extends SQLQuery_1.SQLQuery {
    constructor(jsonQuery, dbEntity, dialect, queryResultType, schemaUtils, graphQueryConfiguration) {
        super(jsonQuery, dbEntity, dialect, queryResultType);
        this.graphQueryConfiguration = graphQueryConfiguration;
        this.columnAliases = new air_control_1.AliasCache();
        if (graphQueryConfiguration && this.graphQueryConfiguration.strict !== undefined) {
            throw `"strict" configuration is not yet implemented for QueryResultType.ENTITY_GRAPH`;
        }
        this.finalSelectTree = this.setupSelectFields(this.jsonQuery.S, dbEntity, schemaUtils);
        this.orderByParser = new EntityOrderByParser_1.EntityOrderByParser(this.finalSelectTree, this.validator, jsonQuery.OB);
    }
    toSQL(airDb, schemaUtils, metadataUtils) {
        let joinNodeMap = {};
        this.joinTree = this.buildFromJoinTree(this.jsonQuery.F, joinNodeMap, airDb, schemaUtils);
        let selectFragment = this.getSELECTFragment(this.dbEntity, this.finalSelectTree, this.joinTree);
        let fromFragment = this.getFROMFragment(null, this.joinTree, airDb, schemaUtils, metadataUtils);
        let whereFragment = '';
        let jsonQuery = this.jsonQuery;
        if (jsonQuery.W) {
            whereFragment = `
WHERE
${this.getWHEREFragment(jsonQuery.W, '', airDb, schemaUtils, metadataUtils)}`;
        }
        let orderByFragment = '';
        if (jsonQuery.OB && jsonQuery.OB.length) {
            orderByFragment = `
ORDER BY
${this.orderByParser.getOrderByFragment(this.joinTree, this.qEntityMapByAlias, airDb)}`;
        }
        return `SELECT
	${selectFragment}
FROM
${fromFragment}${whereFragment}${orderByFragment}`;
    }
    /**
     * If bridging is not applied:
     *
     * Entities get merged if they are right next to each other in the result set.  If they
     * are not, they are treated as separate entities - hence, your sort order matters.
     *
     * If bridging is applied - all entities get merged - your sort order does not matter.
     * Might as well disallow sort order for bridged queries (or re-sort in memory)?
     *
     * @param results
     * @returns {any[]}
     */
    parseQueryResults(airDb, schemaUtils, results) {
        this.queryParser = IEntityResultParser_1.getObjectResultParser(this.queryResultType, this.graphQueryConfiguration, this.dbEntity);
        let parsedResults = [];
        if (!results || !results.length) {
            return parsedResults;
        }
        parsedResults = [];
        let lastResult;
        for (let i = 0; i < results.length; i++) {
            let result = results[i];
            let entityAlias = air_control_1.QRelation.getAlias(this.joinTree.jsonRelation);
            this.columnAliases.reset();
            let parsedResult = this.parseQueryResult(this.jsonQuery.S, entityAlias, this.joinTree, result, [0], airDb, schemaUtils);
            if (!lastResult) {
                parsedResults.push(parsedResult);
            }
            else if (lastResult !== parsedResult) {
                parsedResults.push(parsedResult);
            }
            lastResult = parsedResult;
            this.queryParser.flushRow();
        }
        return this.queryParser.bridge(parsedResults, this.jsonQuery.S, schemaUtils);
    }
    buildFromJoinTree(joinRelations, joinNodeMap, airDb, schemaUtils) {
        let jsonTree;
        // For entity queries it is possible to have a query with no from clause, in this case
        // make the query entity the root tree node
        if (joinRelations.length < 1) {
            let onlyJsonRelation = {
                cci: 0,
                ti: this.dbEntity.index,
                fcp: [],
                jt: null,
                ri: null,
                rt: ground_control_1.JSONRelationType.ENTITY_ROOT,
                rep: 'r_',
                si: this.dbEntity.index
            };
            joinRelations.push(onlyJsonRelation);
        }
        let firstRelation = joinRelations[0];
        switch (firstRelation.rt) {
            case ground_control_1.JSONRelationType.ENTITY_ROOT:
                break;
            case ground_control_1.JSONRelationType.SUB_QUERY_ROOT:
            case ground_control_1.JSONRelationType.SUB_QUERY_JOIN_ON:
                throw `Entity queries FROM clause cannot contain sub-queries`;
            case ground_control_1.JSONRelationType.ENTITY_JOIN_ON:
                throw `Entity queries cannot use JOIN ON`;
            default:
                throw `First table in FROM clause cannot be joined`;
        }
        if (firstRelation.rt !== ground_control_1.JSONRelationType.ENTITY_ROOT) {
            throw `First table in FROM clause cannot be joined`;
        }
        let alias = air_control_1.QRelation.getAlias(firstRelation);
        let firstEntity = air_control_1.QRelation.createRelatedQEntity(firstRelation, airDb, schemaUtils);
        this.qEntityMapByAlias[alias] = firstEntity;
        this.jsonRelationMapByAlias[alias] = firstRelation;
        // In entity queries the first entity must always be the same as the query entity
        const firstDbEntity = firstEntity.__driver__.dbEntity;
        // if (firstEntity.constructor != this.rootQEntity.constructor) {
        if (firstDbEntity.schemaVersion.schema.index !== this.dbEntity.schemaVersion.schema.index
            || firstDbEntity.index !== this.dbEntity.index) {
            throw `ERROR: Unexpected first table in FROM clause: 
			'${firstDbEntity.schemaVersion.schema.name}.${firstDbEntity.name}',
			expecting:
			'${this.dbEntity.schemaVersion.schema.name}.${this.dbEntity.name}'`;
        }
        jsonTree = new air_control_1.JoinTreeNode(firstRelation, [], null);
        joinNodeMap[alias] = jsonTree;
        for (let i = 1; i < joinRelations.length; i++) {
            let joinRelation = joinRelations[i];
            switch (joinRelation.rt) {
                case ground_control_1.JSONRelationType.ENTITY_ROOT:
                    throw `All Entity query tables after the first must be joined`;
                case ground_control_1.JSONRelationType.SUB_QUERY_ROOT:
                case ground_control_1.JSONRelationType.SUB_QUERY_JOIN_ON:
                    throw `Entity queries FROM clause cannot contain sub-queries`;
                case ground_control_1.JSONRelationType.ENTITY_JOIN_ON:
                    throw `Entity queries cannot use JOIN ON`;
                default:
                    break;
            }
            if (!joinRelation.ri) {
                throw `Table ${i + 1} in FROM clause is missing relationPropertyName`;
            }
            let parentAlias = air_control_1.QRelation.getParentAlias(joinRelation);
            if (!joinNodeMap[parentAlias]) {
                throw `Missing parent entity for alias ${parentAlias}, on table ${i + 1} in FROM clause`;
            }
            let leftNode = joinNodeMap[parentAlias];
            let rightNode = new air_control_1.JoinTreeNode(joinRelation, [], leftNode);
            leftNode.addChildNode(rightNode);
            alias = air_control_1.QRelation.getAlias(joinRelation);
            let rightEntity = air_control_1.QRelation.createRelatedQEntity(joinRelation, airDb, schemaUtils);
            this.qEntityMapByAlias[alias] = rightEntity;
            this.jsonRelationMapByAlias[alias] = firstRelation;
            if (!rightEntity) {
                throw `Could not find entity ${joinRelation.ti} for table ${i + 1} in FROM clause`;
            }
            if (joinNodeMap[alias]) {
                throw `Alias '${alias}' used more than once in the FROM clause.`;
            }
            joinNodeMap[alias] = rightNode;
        }
        return jsonTree;
    }
    getSELECTFragment(dbEntity, selectClauseFragment, joinTree, parentProperty) {
        const tableAlias = air_control_1.QRelation.getAlias(joinTree.jsonRelation);
        let selectSqlFragments = [];
        let isStubProperty = air_control_2.isStub(selectClauseFragment);
        const defaults = this.entityDefaults.getForAlias(tableAlias);
        for (let propertyName in selectClauseFragment) {
            if (propertyName === '__state__') {
                continue;
            }
            const value = selectClauseFragment[propertyName];
            if (!air_control_1.isY(value)) {
                defaults[propertyName] = value;
            }
            const dbProperty = dbEntity.propertyMap[propertyName];
            if (dbProperty.relation && dbProperty.relation.length) {
                const dbRelation = dbProperty.relation[0];
                if (air_control_2.isStub(selectClauseFragment[propertyName])) {
                    for (const relationColumn of dbRelation.manyRelationColumns) {
                        const dbColumn = relationColumn.manyColumn;
                        this.addFieldFromColumn(dbColumn);
                        const columnSelect = this.getSimpleColumnFragment(tableAlias, dbColumn.name);
                        selectSqlFragments.push(`${columnSelect} ${this.columnAliases.getFollowingAlias()}`);
                    }
                }
                else {
                    const subSelectFragments = this.getSELECTFragment(dbRelation.relationEntity, selectClauseFragment[propertyName], joinTree.getEntityRelationChildNode(dbRelation), dbProperty);
                    selectSqlFragments = selectSqlFragments.concat(subSelectFragments);
                }
            }
            else {
                const dbColumn = dbProperty.propertyColumns[0].column;
                this.addFieldFromColumn(dbColumn);
                const columnSelect = this.getSimpleColumnFragment(tableAlias, dbColumn.name);
                selectSqlFragments.push(`${columnSelect} ${this.columnAliases.getFollowingAlias()}`);
            }
        }
        return selectSqlFragments;
    }
    parseQueryResult(selectClauseFragment, entityAlias, currentJoinNode, resultRow, nextFieldIndex, airDb, schemaUtils) {
        // Return blanks, primitives and Dates directly
        if (!resultRow || !(resultRow instanceof Object) || resultRow instanceof Date) {
            return resultRow;
        }
        let numNonNullColumns = 0;
        let qEntity = this.qEntityMapByAlias[entityAlias];
        const dbEntity = qEntity.__driver__.dbEntity;
        let resultObject = this.queryParser.addEntity(entityAlias, qEntity.__driver__.dbEntity, airDb, schemaUtils);
        for (let propertyName in selectClauseFragment) {
            if (selectClauseFragment[propertyName] === undefined) {
                continue;
            }
            const dbProperty = dbEntity.propertyMap[propertyName];
            if (!dbProperty.relation || !dbProperty.relation.length) {
                const columnAlias = this.columnAliases.getFollowingAlias();
                const defaultValue = this.entityDefaults.getForAlias(entityAlias)[propertyName];
                const dbColumn = dbProperty.propertyColumns[0].column;
                const propertyValue = this.sqlAdaptor.getResultCellValue(resultRow, columnAlias, nextFieldIndex[0], dbColumn.type, defaultValue);
                if (this.queryParser.addProperty(entityAlias, resultObject, dbColumn.type, propertyName, propertyValue)) {
                    numNonNullColumns++;
                }
                nextFieldIndex[0]++;
            }
            else {
                const childSelectClauseFragment = selectClauseFragment[propertyName];
                const dbRelation = dbProperty.relation[0];
                const childDbEntity = dbRelation.relationEntity;
                if (childSelectClauseFragment === null) {
                    switch (dbRelation.relationType) {
                        case ground_control_1.EntityRelationType.MANY_TO_ONE:
                            let haveRelationValues = true;
                            let relationInfos;
                            schemaUtils.forEachColumnTypeOfRelation(dbRelation, (dbColumn, propertyNameChains) => {
                                const columnAlias = this.columnAliases.getFollowingAlias();
                                let value = this.sqlAdaptor.getResultCellValue(resultRow, columnAlias, nextFieldIndex[0], dbColumn.type, null);
                                const relationInfo = {
                                    propertyNameChains: propertyNameChains,
                                    sqlDataType: dbColumn.type,
                                    value
                                };
                                relationInfos.push({
                                    propertyNameChains: propertyNameChains,
                                    sqlDataType: dbColumn.type,
                                    value
                                });
                                if (air_control_1.objectExists(value)) {
                                    haveRelationValues = true;
                                    numNonNullColumns++;
                                }
                            });
                            if (haveRelationValues) {
                                this.queryParser.bufferManyToOneStub(entityAlias, dbEntity, resultObject, propertyName, childDbEntity, relationInfos, schemaUtils);
                            }
                            else {
                                this.queryParser.bufferBlankManyToOneStub(entityAlias, resultObject, propertyName, relationInfos);
                            }
                            break;
                        case ground_control_1.EntityRelationType.ONE_TO_MANY:
                            this.queryParser.bufferOneToManyStub(dbEntity, propertyName);
                            break;
                        default:
                            throw `Unknown relation type '${dbRelation.relationType}' for '${dbEntity.name}.${dbProperty.name}'`;
                    }
                    nextFieldIndex[0]++;
                }
                else {
                    const childJoinNode = currentJoinNode.getEntityRelationChildNode(dbRelation);
                    const childEntityAlias = air_control_1.QRelation.getAlias(childJoinNode.jsonRelation);
                    const relationQEntity = this.qEntityMapByAlias[childEntityAlias];
                    const relationDbEntity = relationQEntity.__driver__.dbEntity;
                    let childResultObject = this.parseQueryResult(childSelectClauseFragment, childEntityAlias, childJoinNode, resultRow, nextFieldIndex, airDb, schemaUtils);
                    switch (dbRelation.relationType) {
                        case ground_control_1.EntityRelationType.MANY_TO_ONE:
                            if (childResultObject) {
                                this.queryParser.bufferManyToOneObject(entityAlias, dbEntity, resultObject, propertyName, relationDbEntity, childResultObject, schemaUtils);
                            }
                            else {
                                this.queryParser.bufferBlankManyToOneObject(entityAlias, resultObject, propertyName);
                            }
                            break;
                        case ground_control_1.EntityRelationType.ONE_TO_MANY:
                            if (childResultObject) {
                                this.queryParser.bufferOneToManyCollection(entityAlias, resultObject, dbEntity, propertyName, relationDbEntity, childResultObject, schemaUtils);
                            }
                            else {
                                this.queryParser.bufferBlankOneToMany(entityAlias, resultObject, dbEntity.name, propertyName, relationDbEntity, schemaUtils);
                            }
                            break;
                        default:
                            throw `Unknown relation type '${dbRelation.relationType}' for '${dbEntity.name}.${dbProperty.name}'`;
                    }
                }
            }
        }
        if (numNonNullColumns === 0) {
            return null;
        }
        let idValue = schemaUtils.getIdKey(resultObject, dbEntity);
        return this.queryParser.flushEntity(entityAlias, dbEntity, selectClauseFragment, idValue, resultObject, schemaUtils);
    }
    /**
     * Verify that the entity select clause is valid (has ids) and fill in clauses
     * that are blank (defined as {}).
     *
     *
     * {
     *  id1: Y,
     *  id2: {
     *    subId1: Y
     *  },
     *  other1: Y
     * }
     *
     * If no properties are specified all properties are included.
     *
     * @param selectClauseFragment
     * @param {DbEntity} dbEntity
     * @returns {any}
     */
    setupSelectFields(selectClauseFragment, dbEntity, schemaUtils, parentDbProperty) {
        let selectFragment;
        if (selectClauseFragment instanceof Array) {
            let ofProperty = '';
            if (parentDbProperty) {
                ofProperty = `(of '${parentDbProperty.entity.name}.${parentDbProperty.name}') `;
            }
            throw `'${dbEntity.name}' Entity SELECT clause ${ofProperty}must be specified as an Object.`;
        }
        else {
            selectFragment = { ...selectClauseFragment };
        }
        const hasIds = !!dbEntity.idColumns.length;
        let retrieveAllOwnFields = true;
        for (const propertyName in selectFragment) {
            const value = selectFragment[propertyName];
            if (value === undefined || air_control_1.isN(value)) {
                if (dbEntity.propertyMap[propertyName].isId) {
                    throw `@Id properties cannot be excluded from entity queries.`;
                }
                if (!hasIds) {
                    throw `Cannot exclude property '${propertyName}' from select clause 
					for '${dbEntity.name}' Entity - entity has no @Id so all properties must be included.`;
                }
                delete selectFragment[propertyName];
            }
            const dbProperty = dbEntity.propertyMap[propertyName];
            if (!dbProperty) {
                throw `Entity property '${dbEntity.name}.${propertyName}' does not exist.`;
            }
            // Need to differentiate between properties that contain only
            // foreign key ids and properties
            if (dbProperty.relation && dbProperty.relation.length) {
                selectFragment[propertyName] = this.setupSelectFields(value, dbProperty.relation[0].relationEntity, schemaUtils, dbProperty);
                // } else {
                // 	//  At least one non-relational field is in the original select clause
                // 	retrieveAllOwnFields = false
            }
            retrieveAllOwnFields = false;
        }
        //  For {} select causes, entities with no @Id, retrieve the entire object.
        // Otherwise make sure all @Id columns are specified.
        for (const dbProperty of dbEntity.properties) {
            if (hasIds && !dbProperty.isId && !retrieveAllOwnFields) {
                continue;
            }
            const allowDefaults = hasIds && !dbProperty.isId;
            if (dbProperty.relation && dbProperty.relation.length) {
                const dbRelation = dbProperty.relation[0];
                switch (dbRelation.relationType) {
                    case ground_control_1.EntityRelationType.ONE_TO_MANY:
                        break;
                    case ground_control_1.EntityRelationType.MANY_TO_ONE:
                        const manyToOneRelation = {};
                        air_control_2.markAsStub(manyToOneRelation);
                        selectFragment[dbProperty.name] = manyToOneRelation;
                        // schemaUtils.addRelationToEntitySelectClause(dbRelation, selectFragment,
                        // allowDefaults)
                        break;
                    default:
                        throw `Unknown relation type: '${dbRelation.relationType}' on '${dbEntity.name}.${dbProperty.name}'.`;
                }
            }
            else {
                const value = selectFragment[dbProperty.name];
                if (value !== undefined) {
                    if (!allowDefaults && !air_control_1.isY(value)) {
                        throw `${hasIds ? '@Id properties' : 'Entities without @Id'} cannot have default SELECT values.`;
                    }
                }
                else {
                    selectFragment[dbProperty.name] = air_control_1.Y;
                }
            }
        }
        return selectFragment;
    }
    getFROMFragment(parentTree, currentTree, airDb, schemaUtils, metadataUtils) {
        let fromFragment = '\t';
        let currentRelation = currentTree.jsonRelation;
        let currentAlias = air_control_1.QRelation.getAlias(currentRelation);
        let qEntity = this.qEntityMapByAlias[currentAlias];
        let tableName = schemaUtils.getTableName(qEntity.__driver__.dbEntity);
        if (!parentTree) {
            fromFragment += `${tableName} ${currentAlias}`;
        }
        else {
            let parentRelation = parentTree.jsonRelation;
            let parentAlias = air_control_1.QRelation.getAlias(parentRelation);
            let leftEntity = this.qEntityMapByAlias[parentAlias];
            let rightEntity = this.qEntityMapByAlias[currentAlias];
            let joinTypeString;
            switch (currentRelation.jt) {
                case ground_control_1.JoinType.FULL_JOIN:
                    throw `Full Joins are not allowed in Entity queries.`;
                case ground_control_1.JoinType.INNER_JOIN:
                    joinTypeString = 'INNER JOIN';
                    break;
                case ground_control_1.JoinType.LEFT_JOIN:
                    joinTypeString = 'LEFT JOIN';
                    break;
                case ground_control_1.JoinType.RIGHT_JOIN:
                    throw `Right Joins are not allowed in Entity queries.`;
                default:
                    throw `Unsupported join type: ${currentRelation.jt}`;
            }
            let errorPrefix = 'Error building FROM: ';
            switch (currentRelation.rt) {
                case ground_control_1.JSONRelationType.ENTITY_SCHEMA_RELATION:
                    fromFragment += this.getEntitySchemaRelationFromJoin(leftEntity, rightEntity, currentRelation, parentRelation, currentAlias, parentAlias, joinTypeString, errorPrefix, airDb, schemaUtils, metadataUtils);
                    break;
                default:
                    throw `Only Entity schema relations are allowed in Entity query FROM clause.`;
            }
        }
        for (let i = 0; i < currentTree.childNodes.length; i++) {
            let childTreeNode = currentTree.childNodes[i];
            fromFragment += this.getFROMFragment(currentTree, childTreeNode, airDb, schemaUtils, metadataUtils);
        }
        return fromFragment;
    }
}
exports.EntitySQLQuery = EntitySQLQuery;
//# sourceMappingURL=EntitySQLQuery.js.map