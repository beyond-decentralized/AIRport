import {
	IAirportDatabase,
	IQEntityInternal,
	IUtils,
	JSONLogicalOperation,
	Parameter,
}                      from '@airport/air-control'
import {
	ColumnIndex,
	DbColumn,
	DbEntity,
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
}                      from '@airport/ground-control'
import {
	getSQLAdaptor,
	ISQLQueryAdaptor,
	ISqlValueProvider
}                      from '../../adaptor/SQLQueryAdaptor'
import {
	getValidator,
	IValidator
}                      from '../../validation/Validator'
import {FieldSQLQuery} from '../FieldSQLQuery'
import {TreeSQLQuery}  from '../TreeSQLQuery'
import {SQLDialect}    from './SQLQuery'

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
	protected sqlAdaptor: ISQLQueryAdaptor
	protected validator: IValidator
	protected parameterReferences: (string | number)[]                              = []

	constructor(
		protected airportDb: IAirportDatabase,
		protected utils: IUtils,
		protected dbEntity: DbEntity,
		protected dialect: SQLDialect,
	) {
		this.sqlAdaptor = getSQLAdaptor(this, dialect)
		this.validator  = getValidator(dbEntity)
	}

	getParameters(
		parameterMap: { [alias: string]: Parameter },
		valuesArray: (boolean | Date | number | string)[] = null
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
				const refTypeIndex = ['number', 'string'].indexOf(typeof parameterReference)
				if (refTypeIndex > -1) {
					if (!valuesArray) {
						return parameterReference
					} else if (refTypeIndex === 0) {
						return this.sqlAdaptor.getValue(valuesArray[parameterReference])
					}
				}
				let parameter = parameterMap[parameterReference]
				if (!parameter) {
					throw `No parameter found for alias '${parameterReference}'`
				}
				return this.sqlAdaptor.getParameterValue(parameter)
			})
	}

	protected getWHEREFragment(
		operation: JSONBaseOperation,
		nestingPrefix: string
	): string {
		let whereFragment = ''
		if (!operation) {
			throw `An operation is missing in WHERE or HAVING clause`
		}
		nestingPrefix = `${nestingPrefix}\t`

		switch (operation.c) {
			case OperationCategory.LOGICAL:
				return this.getLogicalWhereFragment(<JSONLogicalOperation>operation, nestingPrefix)
			case OperationCategory.BOOLEAN:
			case OperationCategory.DATE:
			case OperationCategory.NUMBER:
			case OperationCategory.STRING:
			case OperationCategory.UNTYPED:
				let valueOperation     = <JSONValueOperation>operation
				let lValueSql          = this.getFieldValue(valueOperation.l, ClauseType.WHERE_CLAUSE)
				let rValueSql          = this.getFieldValue(valueOperation.r, ClauseType.WHERE_CLAUSE)
				let rValueWithOperator = this.applyOperator(valueOperation.o, rValueSql)
				whereFragment += `${lValueSql}${rValueWithOperator}`
				break
			case OperationCategory.FUNCTION:
				let functionOperation = <JSONFunctionOperation><any>operation
				whereFragment         = this.getFieldValue(functionOperation.ob, ClauseType.WHERE_CLAUSE)
				// exists function and maybe others
				break
		}

		return whereFragment
	}

	private getLogicalWhereFragment(
		operation: JSONLogicalOperation,
		nestingPrefix: string
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
				operator = 'NOT'
				return ` ${operator} (${this.getWHEREFragment(<JSONBaseOperation>operation.v, nestingPrefix)})`
			default:
				throw `Unknown logical operator: ${operation.o}`
		}
		let childOperations = <JSONBaseOperation[]>operation.v
		if (!(childOperations instanceof Array)) {
			throw `Expecting an array of child operations as a value for operator ${operator}, in the WHERE Clause.`
		}
		let whereFragment = childOperations.map((childOperation) => {
			return this.getWHEREFragment(childOperation, nestingPrefix)
		}).join(`\n${nestingPrefix}${operator} `)

		return `( ${whereFragment} )`
	}

	protected getEntityPropertyColumnName(
		qEntity: IQEntityInternal,
		columnIndex: number
	): string {
		const dbEntity = this.utils.Metadata.getDbEntity(qEntity)

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

	getFunctionCallValue(rawValue: any): string {
		return this.getFieldValue(<JSONClauseField>rawValue, ClauseType.FUNCTION_CALL)
	}

	getFieldFunctionValue(
		aField: JSONClauseField,
		defaultCallback: () => string = null,
	): string {
		let aValue = aField.v
		if (this.isParameterReference(aValue)) {
			let stringValue = <string>aValue
			this.parameterReferences.push(stringValue)
			aValue = this.sqlAdaptor.getParameterReference(this.parameterReferences, stringValue)
		} else {
			aValue = this.getFieldValue(<any>aValue, ClauseType.FUNCTION_CALL, defaultCallback)
		}
		aValue = this.sqlAdaptor.getFunctionAdaptor().getFunctionCalls(aField, aValue, this.qEntityMapByAlias)
		this.validator.addFunctionAlias(aField.fa)

		return aValue
	}

	getFieldValue(
		clauseField: JSONClauseObject | JSONClauseField [] | JsonFieldQuery,
		clauseType: ClauseType,
		defaultCallback: () => string = null
	): string {
		let columnName
		if (!clauseField) {
			throw `Missing Clause Field definition`
		}
		if (clauseField instanceof Array) {
			return clauseField
				.map((clauseFieldMember) => this.getFieldValue(clauseFieldMember, clauseType, defaultCallback))
				.join(', ')
		}
		if (clauseType !== ClauseType.MAPPED_SELECT_CLAUSE && !clauseField.ot && clauseField.ot !== 0) {
			throw new Error(`Object Type is not defined in JSONClauseField`)
		}
		const aField = <JSONClauseField>clauseField
		let qEntity: IQEntityInternal
		switch (clauseField.ot) {
			case JSONClauseObjectType.FIELD_FUNCTION:
				return this.getFieldFunctionValue(aField, defaultCallback)
			case JSONClauseObjectType.DISTINCT_FUNCTION:
				throw `Distinct function cannot be nested.`
			case JSONClauseObjectType.EXISTS_FUNCTION:
				if (clauseType !== ClauseType.WHERE_CLAUSE) {
					throw `Exists can only be used as a top function in a WHERE clause.`
				}
				let TreeSQLQueryClass: typeof TreeSQLQuery = require('../TreeSQLQuery').TreeSQLQuery
				let mappedSqlQuery                         = new TreeSQLQueryClass(
					this.airportDb, this.utils, <JsonTreeQuery>aField.v, this.dialect)
				return `EXISTS(${mappedSqlQuery.toSQL()})`
			case <any>JSONClauseObjectType.FIELD:
				qEntity = this.qEntityMapByAlias[aField.ta]
				this.validator.validateReadQEntityProperty(
					aField.si, aField.ti, aField.ci)
				columnName = this.getEntityPropertyColumnName(qEntity, aField.ci)
				this.addField(aField.si, aField.ti, aField.ci)
				return this.getComplexColumnFragment(aField, columnName)
			case JSONClauseObjectType.FIELD_QUERY:
				let jsonFieldSqlSubQuery: JsonFieldQuery = aField.fsq
				if ((<JsonFieldQuery><any>aField).S) {
					jsonFieldSqlSubQuery = <any>aField
				}
				let FieldSQLQueryClass: typeof FieldSQLQuery = require('../FieldSQLQuery').FieldSQLQuery
				let fieldSqlQuery                            = new FieldSQLQueryClass(
					this.airportDb, this.utils, jsonFieldSqlSubQuery, this.dialect)
				fieldSqlQuery.addQEntityMapByAlias(this.qEntityMapByAlias)
				this.validator.addSubQueryAlias(aField.fa)
				return `(${fieldSqlQuery.toSQL()})`
			case JSONClauseObjectType.MANY_TO_ONE_RELATION:
				qEntity = this.qEntityMapByAlias[aField.ta]
				this.validator.validateReadQEntityManyToOneRelation(
					aField.si, aField.ti, aField.ci)
				columnName = this.getEntityManyToOneColumnName(qEntity, aField.ci)
				this.addField(aField.si, aField.ti, aField.ci)
				return this.getComplexColumnFragment(aField, columnName)
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
			throw `Invalid query value: ${value}`
		}
		switch (typeof value) {
			case 'boolean':
			case 'number':
				throw `Unexpected primitive instance, expecting parameter alias.`
			case 'string':
				return true
		}
		if (value instanceof Date) {
			throw `Unexpected date instance, expecting parameter alias.`
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
		columnName: string
	): string {
		let selectSqlFragment = `${value.ta}.${columnName}`
		selectSqlFragment     = this.sqlAdaptor.getFunctionAdaptor().getFunctionCalls(value, selectSqlFragment, this.qEntityMapByAlias)

		return selectSqlFragment
	}

	protected getEntityManyToOneColumnName(
		qEntity: IQEntityInternal,
		columnIndex: number
	): string {
		return this.getEntityPropertyColumnName(qEntity, columnIndex)
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
				throw `Unsupported operator ${operator}`
		}
	}

}
