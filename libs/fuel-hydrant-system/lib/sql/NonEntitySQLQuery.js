import { JoinTreeNode, QBooleanField, QDateField, QNumberField, QStringField, QTree, } from '@airport/tarmaq-query';
import { JoinType, JSONClauseObjectType, JSONRelationType, SortOrder, SQLDataType } from '@airport/ground-control';
import { SQLQuery } from './core/SQLQuery';
import { SqlFunctionField } from './SqlFunctionField';
/**
 * Created by Papa on 10/28/2016.
 */
export class NonEntitySQLQuery extends SQLQuery {
    constructor(jsonQuery, dialect, queryResultType, airportDatabase, applicationUtils, entityStateManager, qMetadataUtils, qValidator, relationManager, sqlQueryAdapter, storeDriver, subStatementQueryGenerator, utils, context) {
        super(jsonQuery, null, dialect, queryResultType, airportDatabase, applicationUtils, entityStateManager, qMetadataUtils, qValidator, relationManager, sqlQueryAdapter, storeDriver, subStatementQueryGenerator, utils, context);
    }
    addQEntityMapByAlias(sourceMap) {
        for (let alias in sourceMap) {
            this.qEntityMapByAlias[alias] = sourceMap[alias];
        }
    }
    toSQL(internalFragments, context) {
        let jsonQuery = this.jsonQuery;
        let joinNodeMap = {};
        this.joinTrees = this.buildFromJoinTree(jsonQuery.F, joinNodeMap, context);
        let selectFragment = this.getSELECTFragment(false, jsonQuery.S, internalFragments, context);
        let fromFragment = this.getFROMFragments(this.joinTrees, context);
        let whereFragment = '';
        if (jsonQuery.W) {
            whereFragment = `
WHERE
	${this.getWHEREFragment(jsonQuery.W, '', context)}`;
        }
        let groupByFragment = '';
        if (jsonQuery.GB && jsonQuery.GB.length) {
            groupByFragment = `
GROUP BY
	${this.getGroupByFragment(jsonQuery.GB)}`;
        }
        let havingFragment = '';
        if (jsonQuery.H) {
            havingFragment = `
HAVING
	${this.getWHEREFragment(jsonQuery.H, '', context)}`;
        }
        let orderByFragment = '';
        if (jsonQuery.OB && jsonQuery.OB.length) {
            orderByFragment = `
ORDER BY
	${this.orderByParser.getOrderByFragment(jsonQuery.S, jsonQuery.OB)}`;
        }
        let offsetFragment = '';
        if (jsonQuery.O) {
            offsetFragment = this.sqlQueryAdapter.getOffsetFragment(jsonQuery.O);
        }
        let limitFragment = '';
        if (jsonQuery.L) {
            offsetFragment = this.sqlQueryAdapter.getLimitFragment(jsonQuery.L);
        }
        return `SELECT
	${selectFragment}
FROM
${fromFragment}${whereFragment}${groupByFragment}${havingFragment}${orderByFragment}${offsetFragment}${limitFragment}
${this.storeDriver.getSelectQuerySuffix(this.jsonQuery, context)}`;
    }
    buildFromJoinTree(joinRelations, joinNodeMap, context) {
        let jsonTrees = [];
        let jsonTree;
        // For entity queries it is possible to have a query with no from clause, in this case
        // make the query entity the root tree node
        if (joinRelations.length < 1) {
            throw new Error(`FROM clause must have entries for non-Entity queries`);
        }
        let firstRelation = joinRelations[0];
        switch (firstRelation.rt) {
            case JSONRelationType.SUB_QUERY_ROOT:
            case JSONRelationType.ENTITY_ROOT:
                break;
            default:
                throw new Error(`First table in FROM clause cannot be joined`);
        }
        let alias = this.relationManager.getAlias(firstRelation);
        this.qValidator.validateReadFromEntity(firstRelation);
        let firstEntity = this.relationManager.createRelatedQEntity(firstRelation, context);
        this.qEntityMapByAlias[alias] = firstEntity;
        jsonTree = new JoinTreeNode(firstRelation, [], null);
        jsonTrees.push(jsonTree);
        joinNodeMap[alias] = jsonTree;
        for (let i = 1; i < joinRelations.length; i++) {
            let rightEntity;
            let joinRelation = joinRelations[i];
            if (!joinRelation.jt) {
                throw new Error(`Table ${i + 1} in FROM clause is missing joinType`);
            }
            this.qValidator.validateReadFromEntity(joinRelation);
            alias = this.relationManager.getAlias(joinRelation);
            switch (joinRelation.rt) {
                case JSONRelationType.SUB_QUERY_ROOT:
                    let view = this.addFieldsToView(joinRelation, alias, context);
                    this.qEntityMapByAlias[alias] = view;
                    continue;
                case JSONRelationType.ENTITY_ROOT:
                    // Non-Joined table
                    let nonJoinedEntity = this.relationManager.createRelatedQEntity(joinRelation, context);
                    this.qEntityMapByAlias[alias] = nonJoinedEntity;
                    let anotherTree = new JoinTreeNode(joinRelation, [], null);
                    if (joinNodeMap[alias]) {
                        throw new Error(`Alias '${alias}' used more than once in the FROM clause.`);
                    }
                    jsonTrees.push(anotherTree);
                    joinNodeMap[alias] = anotherTree;
                    continue;
                case JSONRelationType.ENTITY_APPLICATION_RELATION:
                    if (!joinRelation.ri) {
                        throw new Error(`Table ${i + 1} in FROM clause is missing relationPropertyName`);
                    }
                    rightEntity = this.relationManager.createRelatedQEntity(joinRelation, context);
                    break;
                case JSONRelationType.SUB_QUERY_JOIN_ON:
                    if (!joinRelation.joinWhereClause) {
                        this.warn(`View ${i + 1} in FROM clause is missing joinWhereClause`);
                    }
                    rightEntity = this.addFieldsToView(joinRelation, alias, context);
                    break;
                case JSONRelationType.ENTITY_JOIN_ON:
                    if (!joinRelation.joinWhereClause) {
                        this.warn(`Table ${i + 1} in FROM clause is missing joinWhereClause`);
                    }
                    rightEntity = this.relationManager.createRelatedQEntity(joinRelation, context);
                    break;
                default:
                    throw new Error(`Unknown JSONRelationType ${joinRelation.rt}`);
            }
            let parentAlias = this.relationManager.getParentAlias(joinRelation);
            if (!joinNodeMap[parentAlias]) {
                throw new Error(`Missing parent entity for alias ${parentAlias}, on table ${i + 1} in FROM clause. 
					NOTE: sub-queries in FROM clause cannot reference parent FROM tables.`);
            }
            let leftNode = joinNodeMap[parentAlias];
            let rightNode = new JoinTreeNode(joinRelation, [], leftNode);
            leftNode.addChildNode(rightNode);
            this.qValidator.validateReadFromEntity(joinRelation);
            this.qEntityMapByAlias[alias] = rightEntity;
            if (!rightEntity) {
                throw new Error(`Could not find entity ${joinRelation.ti} for table ${i + 1} in FROM clause`);
            }
            if (joinNodeMap[alias]) {
                throw new Error(`Alias '${alias}' used more than once in the FROM clause.`);
            }
            joinNodeMap[alias] = rightNode;
        }
        return jsonTrees;
    }
    addFieldsToView(viewJoinRelation, viewAlias, context) {
        let view = new QTree(viewJoinRelation.fromClausePosition, null);
        this.addFieldsToViewForSelect(view, viewAlias, viewJoinRelation.subQuery.S, 'f', null, context);
        return view;
    }
    /**
     * Just build the shell fields for the external API of the view, don't do anything else.
     * @param view
     * @param select
     * @param fieldPrefix
     */
    addFieldsToViewForSelect(view, viewAlias, select, fieldPrefix, forFieldQueryAlias, context) {
        let fieldIndex = 0;
        let hasDistinctClause = false;
        for (let fieldName in select) {
            let alias = `${fieldPrefix}${++fieldIndex}`;
            let fieldJson = select[fieldName];
            // If its a nested SELECT
            if (!fieldJson.ot) {
                this.addFieldsToViewForSelect(view, viewAlias, fieldJson, `${alias}_`, null, context);
            }
            else {
                let aliasToSet = forFieldQueryAlias ? forFieldQueryAlias : alias;
                hasDistinctClause = hasDistinctClause && this.addFieldToViewForSelect(view, viewAlias, fieldPrefix, fieldJson, aliasToSet, forFieldQueryAlias, context);
            }
        }
        if (fieldIndex > 1) {
            if (hasDistinctClause) {
                throw new Error(`DISTINCT clause must be the only property at its level`);
            }
            if (forFieldQueryAlias) {
                throw new Error(`Field queries can have only one field in SELECT clause`);
            }
        }
    }
    addFieldToViewForSelect(view, viewAlias, fieldPrefix, fieldJson, alias, forFieldQueryAlias = null, context) {
        let hasDistinctClause = false;
        let dbEntity;
        let dbProperty;
        let dbColumn;
        switch (fieldJson.ot) {
            case JSONClauseObjectType.FIELD_FUNCTION:
                view[alias] = new SqlFunctionField(fieldJson);
                throw new Error('Not implemented');
            case JSONClauseObjectType.EXISTS_FUNCTION:
                throw new Error(`Exists function cannot be used in SELECT clause.`);
            case JSONClauseObjectType.FIELD:
                dbEntity = this.airportDatabase.applications[fieldJson.si].currentVersion[0]
                    .applicationVersion.entities[fieldJson.ti];
                dbProperty = dbEntity.properties[fieldJson.pi];
                dbColumn = dbEntity.columns[fieldJson.ci];
                switch (fieldJson.dt) {
                    case SQLDataType.BOOLEAN:
                        view[alias] = new QBooleanField(dbColumn, dbProperty, view);
                        break;
                    case SQLDataType.DATE:
                        view[alias] = new QDateField(dbColumn, dbProperty, view);
                        break;
                    case SQLDataType.NUMBER:
                        view[alias] = new QNumberField(dbColumn, dbProperty, view);
                        break;
                    case SQLDataType.STRING:
                        view[alias] = new QStringField(dbColumn, dbProperty, view);
                        break;
                    // case SQLDataType.ANY:
                    // 	view[alias] = new QUntypedField(dbColumn, dbProperty,
                    // 		view as IQEntityInternal<any>)
                    // 	break
                    default:
                        throw new Error(`Unknown SQLDataType: ${fieldJson.dt}.`);
                }
                break;
            case JSONClauseObjectType.FIELD_QUERY:
                let fieldQuery = fieldJson;
                this.addFieldToViewForSelect(view, viewAlias, fieldPrefix, fieldQuery.S, alias, alias, context);
                break;
            case JSONClauseObjectType.DISTINCT_FUNCTION:
                this.addFieldsToViewForSelect(view, viewAlias, fieldJson.v, fieldPrefix, forFieldQueryAlias, context);
                hasDistinctClause = true;
                break;
            case JSONClauseObjectType.MANY_TO_ONE_RELATION:
                throw new Error(`@ManyToOne fields cannot be directly in a SELECT clause.
					Please select a non-relational field within the relation.`);
            // let relation =
            // <QField<any>><any>QMetadataUtils.getRelationByColumnIndex(this.dbFacade.getQEntityByIndex(fieldJson.ti),
            // fieldJson.ci); view[alias] = relation.getInstance(view); break;
            default:
                throw new Error(`Unexpected type property on JSONClauseField: ${fieldJson.ot}.`);
        }
        return hasDistinctClause;
    }
    getFieldSelectFragment(value, clauseType, nestedObjectCallBack, fieldIndex, context) {
        let columnSelectSqlFragment = this.getFieldValue(value, clauseType, 
        // Nested object processing
        nestedObjectCallBack, context);
        if (value.fa !== undefined) {
            columnSelectSqlFragment += ` as ${value.fa}`;
        }
        if (fieldIndex === 0) {
            return `\n\t${columnSelectSqlFragment}`;
        }
        else {
            return `,\n\t${columnSelectSqlFragment}`;
        }
    }
    getFROMFragments(joinTrees, context) {
        return joinTrees.map(joinTree => this.getFROMFragment(null, joinTree, context))
            .join('\n');
    }
    getFROMFragment(parentTree, currentTree, context) {
        let fromFragment = '\t';
        let currentRelation = currentTree.jsonRelation;
        let currentAlias = this.relationManager.getAlias(currentRelation);
        let qEntity = this.qEntityMapByAlias[currentAlias];
        if (!parentTree) {
            switch (currentRelation.rt) {
                case JSONRelationType.ENTITY_ROOT:
                    fromFragment += `${this.storeDriver.getEntityTableName(qEntity.__driver__.dbEntity, context)} ${currentAlias}`;
                    break;
                case JSONRelationType.SUB_QUERY_ROOT:
                    let viewRelation = currentRelation;
                    const { parameterReferences, subQuerySql } = this.subStatementSqlGenerator.getTreeQuerySql(viewRelation.subQuery, this.dialect, context);
                    if (parameterReferences.length) {
                        this.parameterReferences = this.parameterReferences.concat(parameterReferences);
                    }
                    fromFragment += `(${subQuerySql}) ${currentAlias}`;
                    break;
                default:
                    throw new Error(`Top level FROM entries must be Entity or Sub-Query root`);
            }
        }
        else {
            let parentRelation = parentTree.jsonRelation;
            let parentAlias = this.relationManager.getAlias(parentRelation);
            let leftEntity = this.qEntityMapByAlias[parentAlias];
            let rightEntity = this.qEntityMapByAlias[currentAlias];
            let joinTypeString;
            switch (currentRelation.jt) {
                case JoinType.FULL_JOIN:
                    joinTypeString = 'FULL JOIN';
                    break;
                case JoinType.INNER_JOIN:
                    joinTypeString = 'INNER JOIN';
                    break;
                case JoinType.LEFT_JOIN:
                    joinTypeString = 'LEFT JOIN';
                    break;
                case JoinType.RIGHT_JOIN:
                    joinTypeString = 'RIGHT JOIN';
                default:
                    throw new Error(`Unsupported join type: ${currentRelation.jt}`);
            }
            let errorPrefix = 'Error building FROM: ';
            let joinOnClause;
            switch (currentRelation.rt) {
                case JSONRelationType.ENTITY_JOIN_ON:
                    let joinRelation = currentRelation;
                    joinOnClause = this.getWHEREFragment(joinRelation.joinWhereClause, '\t', context);
                    fromFragment += `\t${joinTypeString} ${this.storeDriver.getEntityTableName(qEntity.__driver__.dbEntity, context)} ${currentAlias} ON\n${joinOnClause}`;
                    break;
                case JSONRelationType.ENTITY_APPLICATION_RELATION:
                    fromFragment += this.getEntityApplicationRelationFromJoin(leftEntity, rightEntity, currentRelation, parentRelation, currentAlias, parentAlias, joinTypeString, errorPrefix, context);
                    break;
                case JSONRelationType.SUB_QUERY_JOIN_ON:
                    let viewJoinRelation = currentRelation;
                    const { parameterReferences, subQuerySql } = this.subStatementSqlGenerator.getTreeQuerySql(viewJoinRelation.subQuery, this.dialect, context);
                    if (parameterReferences.length) {
                        this.parameterReferences = this.parameterReferences.concat(parameterReferences);
                    }
                    joinOnClause = this.getWHEREFragment(viewJoinRelation.joinWhereClause, '\t', context);
                    fromFragment += `${joinTypeString} (${subQuerySql}) ${currentAlias} ON\n${joinOnClause}`;
                    break;
                default:
                    throw new Error(`Nested FROM entries must be Entity JOIN ON
					or Application Relation, or Sub-Query JOIN ON`);
            }
        }
        for (let i = 0; i < currentTree.childNodes.length; i++) {
            let childTreeNode = currentTree.childNodes[i];
            fromFragment += this.getFROMFragment(currentTree, childTreeNode, context);
        }
        return fromFragment;
    }
    getGroupByFragment(groupBy) {
        return groupBy.map((groupByField) => {
            this.qValidator.validateAliasedFieldAccess(groupByField.fa);
            return `${groupByField.fa}`;
        })
            .join(', ');
    }
    getOrderByFragment(orderBy) {
        return orderBy.map((orderByField) => {
            this.qValidator.validateAliasedFieldAccess(orderByField.fa);
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
//# sourceMappingURL=NonEntitySQLQuery.js.map