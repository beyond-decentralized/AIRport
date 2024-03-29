import { IAirportDatabase, IQMetadataUtils, IUtils } from '@airport/air-traffic-control'
import {
	DbEntity,
	Dictionary,
	IApplicationUtils,
	IEntityStateManager,
	QueryInsertValues
} from '@airport/ground-control'
import {
	IQueryUtils,
	IQueryRelationManager
} from '@airport/tarmaq-query'
import { IStoreDriver } from '@airport/terminal-map'
import { ISQLQueryAdaptor } from '../../adaptor/SQLQueryAdaptor'
import { IFuelHydrantContext } from '../../FuelHydrantContext'
import { IValidator } from '../../validation/Validator'
import { SQLNoJoinQuery } from './SQLNoJoinQuery'
import { SQLDialect } from './SQLQuery'
import { ClauseType } from './SQLWhereBase'
import { ISubStatementSqlGenerator } from './SubStatementSqlGenerator'

/**
 * Created by Papa on 11/17/2016.
 */

export class SQLInsertValues
	extends SQLNoJoinQuery {

	constructor(
		public insertValuesQuery: QueryInsertValues,
		dialect: SQLDialect,
		dictionary: Dictionary,
		airportDatabase: IAirportDatabase,
		applicationUtils: IApplicationUtils,
		queryUtils: IQueryUtils,
		entityStateManager: IEntityStateManager,
		qMetadataUtils: IQMetadataUtils,
		qValidator: IValidator,
		queryRelationManager: IQueryRelationManager,
		sqlQueryAdapter: ISQLQueryAdaptor,
		storeDriver: IStoreDriver,
		subStatementSqlGenerator: ISubStatementSqlGenerator,
		utils: IUtils,
		context: IFuelHydrantContext
		// repository?: IRepository
	) {
		super(airportDatabase.applications[insertValuesQuery.INSERT_INTO.applicationIndex].currentVersion[0]
			.applicationVersion.entities[insertValuesQuery.INSERT_INTO.entityIndex], dialect,
			dictionary,
			airportDatabase,
			applicationUtils,
			queryUtils,
			entityStateManager,
			qMetadataUtils,
			qValidator,
			queryRelationManager,
			sqlQueryAdapter,
			storeDriver,
			subStatementSqlGenerator,
			utils,
			context)
	}

	toSQL(
		context: IFuelHydrantContext
	): string {
		if (!this.insertValuesQuery.INSERT_INTO) {
			throw new Error(`Expecting exactly one table in INSERT INTO clause`)
		}
		this.qValidator.validateInsertQEntity(this.dbEntity)
		let tableFragment = this.getFromFragment(
			this.insertValuesQuery.INSERT_INTO, context, false)
		let columnsFragment = this.getColumnsFragment(this.dbEntity, this.insertValuesQuery.COLUMNS)
		let valuesFragment = this.getValuesFragment(
			this.insertValuesQuery.VALUES, context)

		return `INSERT INTO
${tableFragment} ${columnsFragment}
VALUES
${valuesFragment}
`
	}

	protected getColumnsFragment(
		dbEntity: DbEntity,
		columns: number[]
	): string {
		if (!columns.length) {
			return ''
		}
		const columnNames = columns.map(columnIndex => {
			return dbEntity.columns[columnIndex].name
		})
		return `( ${columnNames.join(', \n')} )`
	}

	protected getValuesFragment(
		valuesClauseFragment: any[][],
		context: IFuelHydrantContext,
	): string {
		let allValuesFragment = valuesClauseFragment.map((valuesArray) => {
			let valuesFragment = valuesArray.map((value) => {
				if (value === null || ['number', 'string'].indexOf(typeof value) > -1) {
					this.parameterReferences.push(value)
					return this.sqlQueryAdapter.getParameterReference(
						this.parameterReferences, value)
				} else if (value === undefined) {
					throw new Error(`An 'undefined' value was provided when inserting into: ${this.dbEntity.applicationVersion.application.name}.${this.dbEntity.name}`)
				} else {
					const fieldValue = this.getFieldValue(
						value, ClauseType.WHERE_CLAUSE, null,
						false, context)
					return `\n${fieldValue}\n`
				}
			})
			return `(${valuesFragment.join(',')})`
		})
		return allValuesFragment.join(',\n')
	}

}
