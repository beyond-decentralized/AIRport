import {
	DbColumn,
	DbEntity,
	DbProperty,
	IAirportDatabase,
	IQEntityInternal, IUtils,
	JoinTreeNode,
	QBooleanField,
	QDateField,
	QNumberField,
	QRelation,
	QStringField,
	QTree,
	QUntypedField,
	Utils,
} from "@airport/air-control";
import {
	JoinType,
	JSONClauseField,
	JSONClauseObjectType,
	JSONEntityRelation,
	JSONFieldInGroupBy,
	JSONFieldInOrderBy,
	JsonFieldQuery,
	JSONJoinRelation,
	JsonNonEntityQuery,
	JSONRelation,
	JSONRelationType,
	JSONViewJoinRelation,
	QueryResultType,
	SortOrder,
	SQLDataType
} from "@airport/ground-control";
import { INonEntityOrderByParser } from "../orderBy/AbstractEntityOrderByParser";
import { SQLDialect, SQLQuery } from "./core/SQLQuery";
import { ClauseType } from "./core/SQLWhereBase";
import { SqlFunctionField } from "./SqlFunctionField";
import { TreeSQLQuery } from "./TreeSQLQuery";

declare function require(moduleName: string): any;

/**
 * Created by Papa on 10/28/2016.
 */

export abstract class NonEntitySQLQuery<JNEQ extends JsonNonEntityQuery> extends SQLQuery<JNEQ> {

	protected joinTrees: JoinTreeNode[];
	protected orderByParser: INonEntityOrderByParser;


	constructor(
		airportDb: IAirportDatabase,
		utils: IUtils,
		jsonQuery: JNEQ,
		dialect: SQLDialect,
		queryResultType: QueryResultType
	) {
		super(airportDb, utils, jsonQuery, null, dialect, queryResultType);
	}

	addQEntityMapByAlias(
		sourceMap: { [entityAlias: string]: IQEntityInternal }
	) {
		for (let alias in sourceMap) {
			this.qEntityMapByAlias[alias] = sourceMap[alias];
		}
	}

	toSQL(): string {
		let jsonQuery = <JsonNonEntityQuery>this.jsonQuery;
		let joinNodeMap: { [alias: string]: JoinTreeNode } = {};
		this.joinTrees = this.buildFromJoinTree(jsonQuery.F, joinNodeMap);
		let selectFragment = this.getSELECTFragment(false, jsonQuery.S);
		let fromFragment = this.getFROMFragments(this.joinTrees);
		let whereFragment = '';
		if (jsonQuery.W) {
			whereFragment = `
WHERE
${this.getWHEREFragment(jsonQuery.W, '')}`;
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
${this.getWHEREFragment(jsonQuery.H, '')}`;
		}
		let orderByFragment = '';
		if (jsonQuery.OB && jsonQuery.OB.length) {
			orderByFragment = `
ORDER BY
	${this.orderByParser.getOrderByFragment(jsonQuery.S, jsonQuery.OB)}`;
		}
		let offsetFragment = '';
		if (jsonQuery.O) {
			offsetFragment = this.sqlAdaptor.getOffsetFragment(jsonQuery.O);
		}
		let limitFragment = '';
		if (jsonQuery.L) {
			offsetFragment = this.sqlAdaptor.getLimitFragment(jsonQuery.L);
		}

		return `SELECT${selectFragment}
FROM
${fromFragment}${whereFragment}${groupByFragment}${havingFragment}${orderByFragment}${offsetFragment}${limitFragment}`;
	}

	protected abstract getSELECTFragment(
		nested: boolean,
		selectClauseFragment: any
	): string;

	protected getFieldSelectFragment(
		value: JSONClauseField,
		clauseType: ClauseType,
		nestedObjectCallBack: { (): string },
		fieldIndex: number
	) {
		let columnSelectSqlFragment = this.getFieldValue(value, clauseType,
			// Nested object processing
			nestedObjectCallBack);
		if (value.fa !== undefined) {
			columnSelectSqlFragment += ` as ${value.fa}`;
		}
		if (fieldIndex === 0) {
			return `\n\t${columnSelectSqlFragment}`;
		} else {
			return `\n\t, ${columnSelectSqlFragment}`;
		}
	}

	buildFromJoinTree(
		joinRelations: JSONRelation[],
		joinNodeMap: { [alias: string]: JoinTreeNode }
	): JoinTreeNode[] {
		let jsonTrees: JoinTreeNode[] = [];
		let jsonTree: JoinTreeNode;

		// For entity queries it is possible to have a query with no from clause, in this case
		// make the query entity the root tree node
		if (joinRelations.length < 1) {
			throw `FROM clause must have entries for non-Entity queries`;
		}

		let firstRelation = joinRelations[0];
		switch (firstRelation.rt) {
			case JSONRelationType.SUB_QUERY_ROOT:
			case JSONRelationType.ENTITY_ROOT:
				break;
			default:
				throw `First table in FROM clause cannot be joined`;
		}

		let alias = QRelation.getAlias(firstRelation);
		this.validator.validateReadFromEntity(firstRelation);
		let firstEntity = QRelation.createRelatedQEntity(this.utils, firstRelation);
		this.qEntityMapByAlias[alias] = firstEntity;
		jsonTree = new JoinTreeNode(firstRelation, [], null);
		jsonTrees.push(jsonTree);
		joinNodeMap[alias] = jsonTree;

		for (let i = 1; i < joinRelations.length; i++) {
			let rightEntity;
			let joinRelation = joinRelations[i];
			if (!joinRelation.jt) {
				throw `Table ${i + 1} in FROM clause is missing joinType`;
			}
			this.validator.validateReadFromEntity(joinRelation);
			alias = QRelation.getAlias(joinRelation);
			switch (joinRelation.rt) {
				case JSONRelationType.SUB_QUERY_ROOT:
					let view = this.addFieldsToView(<JSONViewJoinRelation>joinRelation, alias);
					this.qEntityMapByAlias[alias] = view;
					continue;
				case JSONRelationType.ENTITY_ROOT:
					// Non-Joined table
					let nonJoinedEntity = QRelation.createRelatedQEntity(this.utils, joinRelation);
					this.qEntityMapByAlias[alias] = nonJoinedEntity;
					let anotherTree = new JoinTreeNode(joinRelation, [], null);
					if (joinNodeMap[alias]) {
						throw `Alias '${alias}' used more than once in the FROM clause.`;
					}
					jsonTrees.push(anotherTree);
					joinNodeMap[alias] = anotherTree;
					continue;
				case JSONRelationType.ENTITY_SCHEMA_RELATION:
					if (!(<JSONEntityRelation>joinRelation).ri) {
						throw `Table ${i + 1} in FROM clause is missing relationPropertyName`;
					}
					rightEntity = QRelation.createRelatedQEntity(this.utils, joinRelation);
					break;
				case JSONRelationType.SUB_QUERY_JOIN_ON:
					if (!(<JSONJoinRelation>joinRelation).jwc) {
						this.warn(`View ${i + 1} in FROM clause is missing joinWhereClause`);
					}
					rightEntity = this.addFieldsToView(<JSONViewJoinRelation>joinRelation, alias);
					break;
				case JSONRelationType.ENTITY_JOIN_ON:
					if (!(<JSONJoinRelation>joinRelation).jwc) {
						this.warn(`Table ${i + 1} in FROM clause is missing joinWhereClause`);
					}
					rightEntity = QRelation.createRelatedQEntity(this.utils, joinRelation);
					break;
				default:
					throw `Unknown JSONRelationType ${joinRelation.rt}`;
			}
			let parentAlias = QRelation.getParentAlias(joinRelation);
			if (!joinNodeMap[parentAlias]) {
				throw `Missing parent entity for alias ${parentAlias}, on table ${i + 1} in FROM clause. NOTE: sub-queries in FROM clause cannot reference parent FROM tables.`;
			}
			let leftNode = joinNodeMap[parentAlias];
			let rightNode = new JoinTreeNode(joinRelation, [], leftNode);
			leftNode.addChildNode(rightNode);

			this.validator.validateReadFromEntity(joinRelation);
			this.qEntityMapByAlias[alias] = rightEntity;
			if (!rightEntity) {
				throw `Could not find entity ${joinRelation.ti} for table ${i + 1} in FROM clause`;
			}
			if (joinNodeMap[alias]) {
				throw `Alias '${alias}' used more than once in the FROM clause.`;
			}
			joinNodeMap[alias] = rightNode;
		}

		return jsonTrees;
	}

	addFieldsToView(
		viewJoinRelation: JSONViewJoinRelation,
		viewAlias: string
	): QTree {
		let view = new QTree(viewJoinRelation.fcp, null);
		this.addFieldsToViewForSelect(view, viewAlias, viewJoinRelation.sq.S, 'f');

		return view;
	}

	/**
	 * Just build the shell fields for the external API of the view, don't do anything else.
	 * @param view
	 * @param select
	 * @param fieldPrefix
	 */
	addFieldsToViewForSelect(
		view: QTree,
		viewAlias: string,
		select: any,
		fieldPrefix: string,
		forFieldQueryAlias: string = null
	) {
		let fieldIndex = 0;
		let hasDistinctClause = false;
		for (let fieldName in select) {
			let alias = `${fieldPrefix}${++fieldIndex}`;
			let fieldJson: JSONClauseField = select[fieldName];
			// If its a nested select
			if (!fieldJson.ot) {
				this.addFieldsToViewForSelect(view, viewAlias, fieldJson, `${alias}_`);
			} else {
				let aliasToSet = forFieldQueryAlias ? forFieldQueryAlias : alias;
				hasDistinctClause = hasDistinctClause && this.addFieldToViewForSelect(view, viewAlias, fieldPrefix, fieldJson, aliasToSet, forFieldQueryAlias);
			}
		}
		if (fieldIndex > 1) {
			if (hasDistinctClause) {
				throw `DISTINCT clause must be the only property at its level`;
			}
			if (forFieldQueryAlias) {
				throw `Field queries can have only one field in SELECT clause`;
			}
		}
	}

	addFieldToViewForSelect(
		view: QTree,
		viewAlias: string,
		fieldPrefix: string,
		fieldJson: JSONClauseField,
		alias: string,
		forFieldQueryAlias: string = null
	): boolean {
		let hasDistinctClause = false;
		let dbEntity: DbEntity;
		let dbProperty: DbProperty;
		let dbColumn: DbColumn;
		switch (fieldJson.ot) {
			case JSONClauseObjectType.FIELD_FUNCTION:
				view[alias] = new SqlFunctionField(fieldJson);
				throw 'Not implemented';
			case JSONClauseObjectType.EXISTS_FUNCTION:
				throw `Exists function cannot be used in SELECT clause.`;
			case JSONClauseObjectType.FIELD:
				dbEntity = this.airportDb.schemas[fieldJson.si].entities[fieldJson.ti];
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
					case SQLDataType.ANY:
						view[alias] = new QUntypedField(dbColumn, dbProperty, view);
						break;
					default:
						throw `Unknown SQLDataType: ${fieldJson.dt}.`;
				}
				break;
			case JSONClauseObjectType.FIELD_QUERY:
				let fieldQuery = <JsonFieldQuery><any>fieldJson;
				this.addFieldToViewForSelect(view, viewAlias, fieldPrefix, fieldQuery.S, alias, alias);
				break;
			case JSONClauseObjectType.DISTINCT_FUNCTION:
				this.addFieldsToViewForSelect(view, viewAlias, fieldJson.v, fieldPrefix, forFieldQueryAlias);
				hasDistinctClause = true;
				break;
			case JSONClauseObjectType.MANY_TO_ONE_RELATION:
				throw `@ManyToOne fields cannot be directly in a select clause. Please select a non-relational field within the relation.`;
			// let relation = <QField<any>><any>QMetadataUtils.getRelationByColumnIndex(this.dbFacade.getQEntityByIndex(fieldJson.ti), fieldJson.ci);
			// view[alias] = relation.getInstance(view);
			// break;
			default:
				throw `Unexpected type property on JSONClauseField: ${fieldJson.ot}.`;
		}

		return hasDistinctClause;
	}


	private getFROMFragments(
		joinTrees: JoinTreeNode[]
	): string {
		return joinTrees.map(
			joinTree => this.getFROMFragment(null, joinTree)).join('\n');
	}

	private getFROMFragment(
		parentTree: JoinTreeNode,
		currentTree: JoinTreeNode
	): string {
		let fromFragment = '\t';
		let currentRelation = currentTree.jsonRelation;
		let currentAlias = QRelation.getAlias(currentRelation);
		let qEntity = this.qEntityMapByAlias[currentAlias];

		if (!parentTree) {
			switch (currentRelation.rt) {
				case JSONRelationType.ENTITY_ROOT:
					fromFragment += `${qEntity.__driver__.dbEntity.name} ${currentAlias}`;
					break;
				case JSONRelationType.SUB_QUERY_ROOT:
					let viewRelation = <JSONViewJoinRelation>currentRelation;
					let TreeSQLQueryClass: typeof TreeSQLQuery = require("./TreeSQLQuery").TreeSQLQuery;
					let subQuery = new TreeSQLQueryClass(this.airportDb, this.utils, viewRelation.sq, this.dialect);
					fromFragment += `(${subQuery.toSQL()}) ${currentAlias}`;
					break;
				default:
					throw `Top level FROM entries must be Entity or Sub-Query root`;
			}
		} else {
			let parentRelation = parentTree.jsonRelation;
			let parentAlias = QRelation.getAlias(parentRelation);
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
					throw `Unsupported join type: ${currentRelation.jt}`;
			}

			let errorPrefix = 'Error building FROM: ';

			let joinOnClause;
			switch (currentRelation.rt) {
				case JSONRelationType.ENTITY_JOIN_ON:
					let joinRelation = <JSONJoinRelation>currentRelation;
					joinOnClause = this.getWHEREFragment(joinRelation.jwc, '\t');
					fromFragment += `\t${joinTypeString} ${qEntity.__driver__.dbEntity.name} ${currentAlias} ON\n${joinOnClause}`;
					break;
				case JSONRelationType.ENTITY_SCHEMA_RELATION:
					fromFragment += this.getEntitySchemaRelationFromJoin(leftEntity, rightEntity,
						<JSONEntityRelation>currentRelation, parentRelation, currentAlias, parentAlias,
						joinTypeString, errorPrefix);
					break;
				case JSONRelationType.SUB_QUERY_JOIN_ON:
					let viewJoinRelation = <JSONViewJoinRelation>currentRelation;
					let TreeSQLQueryClass: typeof TreeSQLQuery = require("./TreeSQLQuery").TreeSQLQuery;
					let mappedSqlQuery = new TreeSQLQueryClass(this.airportDb, this.utils, viewJoinRelation.sq, this.dialect);
					joinOnClause = this.getWHEREFragment(viewJoinRelation.jwc, '\t');
					fromFragment += `${joinTypeString} (${mappedSqlQuery.toSQL()}) ${currentAlias} ON\n${joinOnClause}`;
					break;
				default:
					throw `Nested FROM entries must be Entity JOIN ON or Schema Relation, or Sub-Query JOIN ON`;

			}
		}
		for (let i = 0; i < currentTree.childNodes.length; i++) {
			let childTreeNode = currentTree.childNodes[i];
			fromFragment += this.getFROMFragment(currentTree, childTreeNode);
		}

		return fromFragment;
	}

	protected getGroupByFragment(
		groupBy?: JSONFieldInGroupBy[]
	): string {
		return groupBy.map(
			(groupByField) => {
				this.validator.validateAliasedFieldAccess(groupByField.fa);
				return `${groupByField.fa}`;
			}).join(', ');
	}

	protected getOrderByFragment(orderBy: JSONFieldInOrderBy[]): string {
		return orderBy.map(
			(orderByField) => {
				this.validator.validateAliasedFieldAccess(orderByField.fa);
				switch (orderByField.so) {
					case SortOrder.ASCENDING:
						return `${orderByField.fa} ASC`;
					case SortOrder.DESCENDING:
						return `${orderByField.fa} DESC`;
				}
			}).join(', ');
	}

}