import {
	IAirportDatabase,
	IQMetadataUtils,
	IUtils,
} from '@airport/air-traffic-control'
import {
	Injected
} from '@airport/direction-indicator'
import {
	DbColumn,
	DbEntity,
	QueryBaseOperation,
	QueryFieldClause,
	QueryBaseClause,
	QueryClauseObjectType,
	QueryEntityRelation,
	QueryField,
	QueryFunctionOperation,
	QueryTree,
	QueryValueOperation,
	OperationCategory,
	SqlOperator,
	IEntityStateManager,
	IApplicationUtils,
	Dictionary,
	DbProperty,
	Repository_LocalId,
	Repository_GUID,
	DbApplication_Index,
	DbEntity_TableIndex,
	DbColumn_Index
} from '@airport/ground-control'
import {
	IQEntityInternal,
	IQueryUtils,
	QueryLogicalOperation,
	Parameter
} from '@airport/tarmaq-query'
import { IStoreDriver } from '@airport/terminal-map'
import { ISQLQueryAdaptor, ISqlValueProvider } from '../../adaptor/SQLQueryAdaptor'
import { IFuelHydrantContext } from '../../FuelHydrantContext'
import { IValidator } from '../../validation/Validator'
import { SQLDialect } from './SQLQuery'
import { ISubStatementSqlGenerator } from './SubStatementSqlGenerator'

interface ISelectColumnInfo {

	dbEntity: DbEntity
	dbProperty: DbProperty
	dbColumn: DbColumn

}


/**
 * Created by Papa on 10/2/2016.
 */

export enum ClauseType {
	MAPPED_SELECT_CLAUSE = 'MAPPED_SELECT_CLAUSE',
	NON_MAPPED_SELECT_CLAUSE = 'NON_MAPPED_SELECT_CLAUSE',
	WHERE_CLAUSE = 'WHERE_CLAUSE',
	FUNCTION_CALL = 'FUNCTION_CALL'
}

@Injected()
export abstract class SQLWhereBase
	implements ISqlValueProvider {

	public parameterReferences: (string | number)[] = []
	protected qEntityMapByAlias: { [entityAlias: string]: IQEntityInternal } = {}
	protected queryRelationMapByAlias: { [entityAlias: string]: QueryEntityRelation } = {}

	protected selectColumnInfos: ISelectColumnInfo[] = []
	resultsRepositories_LocalIdSet: Set<Repository_LocalId> = new Set()
	resultsRepositories_GUIDSet: Set<Repository_GUID> = new Set()

	constructor(
		protected dbEntity: DbEntity,
		protected dialect: SQLDialect,
		protected dictionary: Dictionary,
		protected airportDatabase: IAirportDatabase,
		protected applicationUtils: IApplicationUtils,
		protected queryUtils: IQueryUtils,
		protected entityStateManager: IEntityStateManager,
		protected qMetadataUtils: IQMetadataUtils,
		protected qValidator: IValidator,
		protected sqlQueryAdapter: ISQLQueryAdaptor,
		protected storeDriver: IStoreDriver,
		protected subStatementSqlGenerator: ISubStatementSqlGenerator,
		protected utils: IUtils,
		protected context: IFuelHydrantContext,
	) {
	}

	getParameters(
		parameterMap: { [alias: string]: Parameter }, //,
		context: IFuelHydrantContext,
		// valuesArray: (boolean | Date | number | string)[] = null
	): any[] {
		// let populatedParameterMap: {[parameterAlias: string]: boolean} = {};
		return this.parameterReferences
			/*
			 .parameterReferences.filter(( parameterReference ) => {
			 if (!populatedParameterMap[parameterReference]) {
			 populatedParameterMap[parameterReference] = true;
			 return true;
			 }
			 return false;
			 })
			 */
			.map((parameterReference) => {
				let parameter = parameterMap[parameterReference]
				if (!parameter) {
					const isReference = parameterReference === null || ['number', 'string'].indexOf(typeof parameterReference) > -1
					if (isReference) {
						// if (!valuesArray) {
						return parameterReference
						// } else if (typeof parameterReference === 'number') {
						// 	return sqlAdaptor.getValue(valuesArray[parameterReference])
						// }
					}
					throw new Error(`No parameter found for alias '${parameterReference}'`)
				}
				return this.sqlQueryAdapter.getParameterValue(parameter)
			})
	}

	getFunctionCallValue(
		rawValue: any,
		recordSelectColumnInfo: boolean,
		context: IFuelHydrantContext,
	): string {
		return this.getFieldValue(
			<QueryFieldClause>rawValue, ClauseType.FUNCTION_CALL,
			null, recordSelectColumnInfo, context
		)
	}

	getFieldFunctionValue(
		aField: QueryFieldClause,
		defaultCallback: () => string,
		recordSelectColumnInfo: boolean,
		context: IFuelHydrantContext,
	): string {
		if (recordSelectColumnInfo) {
			this.selectColumnInfos.push(null)
		}
		let aValue = aField.value
		if (this.isParameterReference(aValue)) {
			let stringValue = <string>aValue
			this.parameterReferences.push(stringValue)
			aValue = this.sqlQueryAdapter.getParameterReference(this.parameterReferences, stringValue)
		} else {
			aValue = this.getFieldValue(
				<any>aValue, ClauseType.FUNCTION_CALL,
				defaultCallback, recordSelectColumnInfo, context)
		}
		aValue = this.sqlQueryAdapter.getFunctionAdaptor()
			.getFunctionCalls(
				aField, aValue, this.qEntityMapByAlias, this, context)
		this.qValidator.addFunctionAlias(aField.fieldAlias)

		return aValue
	}

	getFieldValue(
		clauseField: QueryBaseClause | QueryFieldClause[] | QueryField,
		clauseType: ClauseType,
		defaultCallback: () => string,
		recordSelectColumnInfo: boolean,
		context: IFuelHydrantContext,
	): string {
		if (recordSelectColumnInfo) {
			this.selectColumnInfos.push(null)
		}
		let columnName
		if (!clauseField) {
			throw new Error(`Missing Clause Field definition`)
		}
		if (clauseField instanceof Array) {
			return clauseField
				.map((clauseFieldMember) => this.getFieldValue(
					clauseFieldMember, clauseType, defaultCallback,
					recordSelectColumnInfo, context))
				.join(', ')
		}
		if (clauseType !== ClauseType.MAPPED_SELECT_CLAUSE && !clauseField.objectType) {
			throw new Error(`Object Type is not defined in QueryFieldClause`)
		}

		const aField = <QueryFieldClause>clauseField
		let qEntity: IQEntityInternal
		switch (clauseField.objectType) {
			case QueryClauseObjectType.FIELD_FUNCTION:
				return this.getFieldFunctionValue(aField, defaultCallback,
					recordSelectColumnInfo, context)
			case QueryClauseObjectType.DISTINCT_FUNCTION:
				throw new Error(`Distinct function cannot be nested.`)
			case QueryClauseObjectType.EXISTS_FUNCTION: {
				if (clauseType !== ClauseType.WHERE_CLAUSE) {
					throw new Error(
						`Exists can only be used as a top function in a WHERE clause.`)
				}
				const {
					parameterReferences,
					subQuerySql
				} = this.subStatementSqlGenerator.getTreeQuerySql(<QueryTree>aField.value, this.dialect, context)
				if (parameterReferences.length) {
					this.parameterReferences = this.parameterReferences.concat(parameterReferences)
				}
				return `EXISTS(${subQuerySql})`
			}
			// It is possible that Repository GUID or LID may be returned here
			case <any>QueryClauseObjectType.FIELD: {
				qEntity = this.qEntityMapByAlias[aField.tableAlias]
				this.qValidator.validateReadQEntityProperty(
					aField.applicationIndex, aField.entityIndex, aField.columnIndex)
				columnName = this.getEntityPropertyColumnName(
					qEntity, aField.columnIndex, context)

				if (recordSelectColumnInfo) {
					this.addSelectColumnInfoFromField(aField)
				}

				this.addField(aField.applicationIndex, aField.entityIndex, aField.columnIndex)
				return this.getComplexColumnFragment(aField, columnName,
					context)
			}
			case QueryClauseObjectType.FIELD_QUERY: {
				let fieldSubQuery: QueryField = aField.fieldSubQuery
				if ((<QueryField><any>aField).SELECT) {
					fieldSubQuery = <any>aField
				}
				const {
					parameterReferences,
					subQuerySql
				} = this.subStatementSqlGenerator.getFieldQuerySql(
					fieldSubQuery, this.dialect, this.qEntityMapByAlias, context)
				if (parameterReferences.length) {
					this.parameterReferences = this.parameterReferences.concat(parameterReferences)
				}
				this.qValidator.addSubQueryAlias(aField.fieldAlias)
				return `(${subQuerySql})`
			}
			// It is possible that Repository GUID or LID may be returned here
			case QueryClauseObjectType.MANY_TO_ONE_RELATION: {
				qEntity = this.qEntityMapByAlias[aField.tableAlias]
				this.qValidator.validateReadQEntityManyToOneRelation(
					aField.applicationIndex, aField.entityIndex, aField.columnIndex)
				columnName = this.getEntityManyToOneColumnName(qEntity, aField.columnIndex, context)
				this.addField(aField.applicationIndex, aField.entityIndex, aField.columnIndex)

				if (recordSelectColumnInfo) {
					this.addSelectColumnInfoFromField(aField)
				}

				return this.getComplexColumnFragment(aField, columnName, context)
			}
			// must be a nested object
			default: {
				if (clauseType !== ClauseType.MAPPED_SELECT_CLAUSE) {
					`Nested objects only allowed in the mapped SELECT clause.`
				}
				return defaultCallback()
			}
		}
	}

	private addSelectColumnInfoFromField(
		aField: QueryFieldClause
	): void {
		const dbEntity = this.airportDatabase.applications[aField.applicationIndex]
			.currentVersion[0].applicationVersion.entities[aField.entityIndex];
		const dbProperty = dbEntity.properties[aField.propertyIndex]
		const dbColumn = dbEntity.columns[aField.columnIndex]

		this.selectColumnInfos[this.selectColumnInfos.length - 1]
			= {
			dbColumn,
			dbEntity,
			dbProperty
		}
	}

	protected addSelectColumnInfo(
		dbEntity: DbEntity,
		dbProperty: DbProperty,
		dbColumn: DbColumn
	): void {
		this.selectColumnInfos.push({
			dbColumn,
			dbEntity,
			dbProperty
		})
	}

	protected trackRepositoryIds(
		resultsFromSelect: any[]
	): void {
		if (resultsFromSelect.length !== this.selectColumnInfos.length) {
			throw new Error(`Unexpected number of columns in the result set.
Expecting: ${this.selectColumnInfos.length}
Returned:  ${resultsFromSelect.length}
`)
		}

		for (let i = 0; i < resultsFromSelect.length; i++) {
			const selectColumnInfo = this.selectColumnInfos[i]
			if (!selectColumnInfo) {
				continue
			}
			const columnValue = resultsFromSelect[i]

			if (this.dictionary.isRepositoryGUIDProperty(
				selectColumnInfo.dbProperty)) {
				this.resultsRepositories_GUIDSet.add(columnValue)
			} else if (this.dictionary.isRepositoryLIDColumn(
				selectColumnInfo.dbProperty, selectColumnInfo.dbColumn)) {
				this.resultsRepositories_LocalIdSet.add(columnValue)
			}
		}
	}

	applyOperator(
		operator: SqlOperator,
		rValue: string
	): string {
		switch (operator) {
			case SqlOperator.EQUALS:
				return ` = ${rValue}`
			case SqlOperator.GREATER_THAN:
				return ` > ${rValue}`
			case SqlOperator.GREATER_THAN_OR_EQUALS:
				return ` >= ${rValue}`
			case SqlOperator.IS_NOT_NULL:
				return ` IS NOT NULL`
			case SqlOperator.IS_NULL:
				return ` IS NULL`
			case SqlOperator.IN:
				return ` IN (${rValue})`
			case SqlOperator.LESS_THAN:
				return ` < ${rValue}`
			case SqlOperator.LESS_THAN_OR_EQUALS:
				return ` <= ${rValue}`
			case SqlOperator.NOT_EQUALS:
				return ` != ${rValue}`
			case SqlOperator.NOT_IN:
				return ` NOT IN (${rValue})`
			case SqlOperator.LIKE:
				return ` LIKE ${rValue}`
			default:
				throw new Error(`Unsupported operator ${operator}`)
		}
	}

	protected getWHEREFragment(
		operation: QueryBaseOperation,
		nestingPrefix: string,
		context: IFuelHydrantContext,
	): string {
		let whereFragment = ''
		if (!operation) {
			throw new Error(`An operation is missing in WHERE or HAVING clause`)
		}
		nestingPrefix = `${nestingPrefix}\t`

		switch (operation.operationCategory) {
			case OperationCategory.LOGICAL:
				return this.getLogicalWhereFragment(
					<QueryLogicalOperation>operation, nestingPrefix, context)
			case OperationCategory.BOOLEAN:
			case OperationCategory.DATE:
			case OperationCategory.NUMBER:
			case OperationCategory.STRING:
			case OperationCategory.UNTYPED:
				let valueOperation = <QueryValueOperation>operation
				let lValueSql = this.getFieldValue(
					valueOperation.leftSideValue, ClauseType.WHERE_CLAUSE,
					null, false, context)
				if (valueOperation.operator === SqlOperator.IS_NOT_NULL
					|| valueOperation.operator === SqlOperator.IS_NULL) {
					let operator = this.applyOperator(valueOperation.operator, null)
					whereFragment += `${lValueSql}${operator}`
				} else {
					let rValueSql = this.getFieldValue(
						valueOperation.rightSideValue, ClauseType.WHERE_CLAUSE,
						null, false, context)
					let rValueWithOperator = this.applyOperator(valueOperation.operator, rValueSql)
					whereFragment += `${lValueSql}${rValueWithOperator}`
				}
				break
			case OperationCategory.FUNCTION:
				let functionOperation = <QueryFunctionOperation><any>operation
				whereFragment = this.getFieldValue(
					functionOperation.object, ClauseType.WHERE_CLAUSE,
					null, false, context)
				// exists function and maybe others
				break
		}

		return whereFragment
	}

	protected getEntityPropertyColumnName(
		qEntity: IQEntityInternal,
		columnIndex: number,
		context: IFuelHydrantContext,
	): string {
		const dbEntity = this.qMetadataUtils.getDbEntity(qEntity)

		return dbEntity.columns[columnIndex].name
	}

	protected addFieldFromColumn(
		dbColumn: DbColumn,
	): void {
	}

	protected addField(
		applicationIndex: DbApplication_Index,
		entityIndex: DbEntity_TableIndex,
		columnIndex: DbColumn_Index,
	): void {
	}

	protected warn(warning: string): void {
		console.log(warning)
	}

	protected getSimpleColumnFragment(
		tableAlias: string,
		columnName: string
	): string {
		return `${tableAlias}.${columnName}`
	}

	protected getComplexColumnFragment(
		value: QueryFieldClause,
		columnName: string,
		context: IFuelHydrantContext,
	): string {
		let selectSqlFragment = `${value.tableAlias}.${columnName}`
		selectSqlFragment = this.sqlQueryAdapter.getFunctionAdaptor()
			.getFunctionCalls(value, selectSqlFragment, this.qEntityMapByAlias,
				this, context)

		return selectSqlFragment
	}

	protected getEntityManyToOneColumnName(
		qEntity: IQEntityInternal,
		columnIndex: number,
		context: IFuelHydrantContext,
	): string {
		return this.getEntityPropertyColumnName(
			qEntity, columnIndex, context)
	}

	protected getLogicalWhereFragment(
		operation: QueryLogicalOperation,
		nestingPrefix: string,
		context: IFuelHydrantContext,
	) {
		let operator
		switch (operation.operator) {
			case SqlOperator.AND:
				operator = 'AND'
				break
			case SqlOperator.OR:
				operator = 'OR'
				break
			case SqlOperator.NOT:
				const whereFragment = this.getWHEREFragment(
					<QueryBaseOperation>operation.value, nestingPrefix, context)
				return ` NOT (${whereFragment})`
			default:
				throw new Error(`Unknown logical operator: ${operation.operator}`)
		}
		let childOperations = <QueryBaseOperation[]>operation.value
		if (!(childOperations instanceof Array)) {
			throw new Error(
				`Expecting an array of child operations as a value for operator ${operator}, 
				in the WHERE Clause.`)
		}
		let whereFragment = childOperations.map((childOperation) => {
			return this.getWHEREFragment(
				childOperation, nestingPrefix, context)
		})
			.join(`\n${nestingPrefix}${operator} `)

		return `( ${whereFragment} )`
	}

	protected isParameterReference(
		value: any
	) {
		if (value === null) {
			return false
		}
		if (value === undefined || value === '' || Number.isNaN(value)) {
			throw new Error(`Invalid query value: ${value}`)
		}
		switch (typeof value) {
			case 'boolean':
			case 'number':
				throw new Error(`Unexpected primitive instance, expecting parameter alias.`)
			case 'string':
				return true
		}
		if (value instanceof Date) {
			throw new Error(`Unexpected date instance, expecting parameter alias.`)
		}
		return false
	}

}
