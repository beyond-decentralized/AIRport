import {
	IAirportDatabase,
	IQEntityInternal,
	IQMetadataUtils,
	ISchemaUtils,
	JSONLogicalOperation,
	Parameter,
} from '@airport/air-control'
import {
	DI
} from '@airport/di'
import {
	ColumnIndex,
	DbColumn,
	DbEntity,
	IStoreDriver,
	JSONBaseOperation,
	JSONClauseField,
	JSONClauseObject,
	JSONClauseObjectType,
	JSONEntityRelation,
	JsonFieldQuery,
	JSONFunctionOperation,
	JsonTreeQuery,
	JSONValueOperation,
	OperationCategory,
	SchemaMap,
	SchemaVersionId,
	SqlOperator,
	TableIndex
}                          from '@airport/ground-control'
import {IOperationContext} from '@airport/tower'
import {
	Q_VALIDATOR,
	SQL_QUERY_ADAPTOR
}                          from '../../tokens'
import {
	ISqlValueProvider
}                          from '../../adaptor/SQLQueryAdaptor'
import {FieldSQLQuery}     from '../FieldSQLQuery'
import {TreeSQLQuery}      from '../TreeSQLQuery'
import {SQLDialect}        from './SQLQuery'

declare function require(moduleName: string): any;

/**
 * Created by Papa on 10/2/2016.
 */

export enum ClauseType {
	MAPPED_SELECT_CLAUSE,
	NON_MAPPED_SELECT_CLAUSE,
	WHERE_CLAUSE,
	FUNCTION_CALL
}

export abstract class SQLWhereBase
	implements ISqlValueProvider {

	protected fieldMap: SchemaMap                                                   = new SchemaMap()
	protected qEntityMapByAlias: { [entityAlias: string]: IQEntityInternal }        = {}
	protected jsonRelationMapByAlias: { [entityAlias: string]: JSONEntityRelation } = {}
	protected parameterReferences: (string | number)[]                              = []

	constructor(
		protected dbEntity: DbEntity,
		protected dialect: SQLDialect,
		protected storeDriver: IStoreDriver
	) {
	}

	getParameters(
		parameterMap: { [alias: string]: Parameter } //,
		// valuesArray: (boolean | Date | number | string)[] = null
	): any[] {
		const sqlAdaptor = DI.db().getSync(SQL_QUERY_ADAPTOR)

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
				return sqlAdaptor.getParameterValue(parameter)
			})
	}

	protected getWHEREFragment(
		operation: JSONBaseOperation,
		nestingPrefix: string,
		context: IOperationContext<any, any>,
	): string {
		let whereFragment = ''
		if (!operation) {
			throw new Error(`An operation is missing in WHERE or HAVING clause`)
		}
		nestingPrefix = `${nestingPrefix}\t`

		switch (operation.c) {
			case OperationCategory.LOGICAL:
				return this.getLogicalWhereFragment(
					<JSONLogicalOperation>operation, nestingPrefix, context)
			case OperationCategory.BOOLEAN:
			case OperationCategory.DATE:
			case OperationCategory.NUMBER:
			case OperationCategory.STRING:
			case OperationCategory.UNTYPED:
				let valueOperation     = <JSONValueOperation>operation
				let lValueSql          = this.getFieldValue(
					valueOperation.l, ClauseType.WHERE_CLAUSE, null, context)
				let rValueSql          = this.getFieldValue(
					valueOperation.r, ClauseType.WHERE_CLAUSE, null, context)
				let rValueWithOperator = this.applyOperator(valueOperation.o, rValueSql)
				whereFragment += `${lValueSql}${rValueWithOperator}`
				break
			case OperationCategory.FUNCTION:
				let functionOperation = <JSONFunctionOperation><any>operation
				whereFragment         = this.getFieldValue(
					functionOperation.ob, ClauseType.WHERE_CLAUSE, null, context)
				// exists function and maybe others
				break
		}

		return whereFragment
	}

	private getLogicalWhereFragment(
		operation: JSONLogicalOperation,
		nestingPrefix: string,
		context: IOperationContext<any, any>,
	) {
		let operator
		switch (operation.o) {
			case SqlOperator.AND:
				operator = 'AND'
				break
			case SqlOperator.OR:
				operator = 'OR'
				break
			case SqlOperator.NOT:
				const whereFragment = this.getWHEREFragment(
					<JSONBaseOperation>operation.v, nestingPrefix, context)
				return ` NOT (${whereFragment})`
			default:
				throw new Error(`Unknown logical operator: ${operation.o}`)
		}
		let childOperations = <JSONBaseOperation[]>operation.v
		if (!(childOperations instanceof Array)) {
			throw new Error(
				`Expecting an array of child operations as a value for operator ${operator}, 
				in the WHERE Clause.`)
		}
		let whereFragment = childOperations.map((childOperation) => {
			return this.getWHEREFragment(
				childOperation, nestingPrefix, context)
		}).join(`\n${nestingPrefix}${operator} `)

		return `( ${whereFragment} )`
	}

	protected getEntityPropertyColumnName(
		qEntity: IQEntityInternal,
		columnIndex: number,
		metadataUtils: IQMetadataUtils
	): string {
		const dbEntity = metadataUtils.getDbEntity(qEntity)

		return dbEntity.columns[columnIndex].name
	}

	protected addFieldFromColumn(
		dbColumn: DbColumn,
	): void {
		const dbEntity = dbColumn.propertyColumns[0].property.entity
		this.addField(dbEntity.schemaVersion.id, dbEntity.index, dbColumn.index)
	}

	protected addField(
		schemaVersionId: SchemaVersionId,
		tableIndex: TableIndex,
		columnIndex: ColumnIndex,
	): void {
		this.fieldMap.ensure(schemaVersionId, tableIndex).ensure(columnIndex)
	}

	protected warn(warning: string): void {
		console.log(warning)
	}

	getFunctionCallValue(
		rawValue: any,
		context: IOperationContext<any, any>,
	): string {
		return this.getFieldValue(
			<JSONClauseField>rawValue, ClauseType.FUNCTION_CALL, null, context
		)
	}

	getFieldFunctionValue(
		aField: JSONClauseField,
		defaultCallback: () => string,
		context: IOperationContext<any, any>,
	): string {
		const [sqlAdaptor, validator] = DI.db().getSync(SQL_QUERY_ADAPTOR, Q_VALIDATOR)

		let aValue = aField.v
		if (this.isParameterReference(aValue)) {
			let stringValue = <string>aValue
			this.parameterReferences.push(stringValue)
			aValue = sqlAdaptor.getParameterReference(this.parameterReferences, stringValue)
		} else {
			aValue = this.getFieldValue(
				<any>aValue, ClauseType.FUNCTION_CALL, defaultCallback, context)
		}
		aValue = sqlAdaptor.getFunctionAdaptor().getFunctionCalls(
			aField, aValue, this.qEntityMapByAlias, this, context)
		validator.addFunctionAlias(aField.fa)

		return aValue
	}

	getFieldValue(
		clauseField: JSONClauseObject | JSONClauseField [] | JsonFieldQuery,
		clauseType: ClauseType,
		defaultCallback: () => string,
		context: IOperationContext<any, any>,
	): string {
		const validator = DI.db().getSync(Q_VALIDATOR)

		let columnName
		if (!clauseField) {
			throw new Error(`Missing Clause Field definition`)
		}
		if (clauseField instanceof Array) {
			return clauseField
				.map((clauseFieldMember) => this.getFieldValue(
					clauseFieldMember, clauseType, defaultCallback, context))
				.join(', ')
		}
		if (clauseType !== ClauseType.MAPPED_SELECT_CLAUSE && !clauseField.ot && clauseField.ot !== 0) {
			throw new Error(`Object Type is not defined in JSONClauseField`)
		}

		const aField = <JSONClauseField>clauseField
		let qEntity: IQEntityInternal
		switch (clauseField.ot) {
			case JSONClauseObjectType.FIELD_FUNCTION:
				return this.getFieldFunctionValue(
					aField, defaultCallback, context)
			case JSONClauseObjectType.DISTINCT_FUNCTION:
				throw new Error(`Distinct function cannot be nested.`)
			case JSONClauseObjectType.EXISTS_FUNCTION:
				if (clauseType !== ClauseType.WHERE_CLAUSE) {
					throw new Error(
						`Exists can only be used as a top function in a WHERE clause.`)
				}
				let TreeSQLQueryClass: typeof TreeSQLQuery = require('../TreeSQLQuery').TreeSQLQuery
				let mappedSqlQuery                         = new TreeSQLQueryClass(
					<JsonTreeQuery>aField.v, this.dialect, this.storeDriver)
				return `EXISTS(${mappedSqlQuery.toSQL({}, context)})`
			case <any>JSONClauseObjectType.FIELD:
				qEntity = this.qEntityMapByAlias[aField.ta]
				validator.validateReadQEntityProperty(
					aField.si, aField.ti, aField.ci)
				columnName = this.getEntityPropertyColumnName(
					qEntity, aField.ci, metadataUtils)
				this.addField(aField.si, aField.ti, aField.ci)
				return this.getComplexColumnFragment(aField, columnName,
					airDb, schemaUtils, metadataUtils)
			case JSONClauseObjectType.FIELD_QUERY:
				let jsonFieldSqlSubQuery: JsonFieldQuery = aField.fsq
				if ((<JsonFieldQuery><any>aField).S) {
					jsonFieldSqlSubQuery = <any>aField
				}
				let FieldSQLQueryClass: typeof FieldSQLQuery = require('../FieldSQLQuery').FieldSQLQuery
				let fieldSqlQuery                            = new FieldSQLQueryClass(
					jsonFieldSqlSubQuery, this.dialect, this.storeDriver)
				fieldSqlQuery.addQEntityMapByAlias(this.qEntityMapByAlias)
				validator.addSubQueryAlias(aField.fa)
				return `(${fieldSqlQuery.toSQL({}, airDb, schemaUtils, metadataUtils)})`
			case JSONClauseObjectType.MANY_TO_ONE_RELATION:
				qEntity = this.qEntityMapByAlias[aField.ta]
				validator.validateReadQEntityManyToOneRelation(
					aField.si, aField.ti, aField.ci)
				columnName = this.getEntityManyToOneColumnName(
					qEntity, aField.ci, metadataUtils)
				this.addField(aField.si, aField.ti, aField.ci)
				return this.getComplexColumnFragment(aField, columnName,
					airDb, schemaUtils, metadataUtils)
			// must be a nested object
			default:
				if (clauseType !== ClauseType.MAPPED_SELECT_CLAUSE) {
					`Nested objects only allowed in the mapped SELECT clause.`
				}
				return defaultCallback()
		}
	}

	private isParameterReference(
		value: any
	) {
		if (value === null) {
			return false
		}
		if (value === undefined || value === '' || value === NaN) {
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

	protected getSimpleColumnFragment(
		tableAlias: string,
		columnName: string
	): string {
		return `${tableAlias}.${columnName}`
	}

	protected getComplexColumnFragment(
		value: JSONClauseField,
		columnName: string,
		airDb: IAirportDatabase,
		schemaUtils: ISchemaUtils,
		metadataUtils: IQMetadataUtils
	): string {
		const sqlAdaptor = DI.db().getSync(SQL_QUERY_ADAPTOR)

		let selectSqlFragment = `${value.ta}.${columnName}`
		selectSqlFragment     = sqlAdaptor.getFunctionAdaptor()
			.getFunctionCalls(value, selectSqlFragment, this.qEntityMapByAlias,
				airDb, schemaUtils, metadataUtils, this)

		return selectSqlFragment
	}

	protected getEntityManyToOneColumnName(
		qEntity: IQEntityInternal,
		columnIndex: number,
		metadataUtils: IQMetadataUtils
	): string {
		return this.getEntityPropertyColumnName(
			qEntity, columnIndex, metadataUtils)
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

}
