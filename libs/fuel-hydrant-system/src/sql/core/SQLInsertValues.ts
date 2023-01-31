import { IAirportDatabase, IQMetadataUtils, IUtils } from '@airport/air-traffic-control'
import {
	DbEntity,
	IApplicationUtils,
	IEntityStateManager,
	QueryInsertValues,
	SyncApplicationMap,
	SyncColumnMap
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
		airportDatabase: IAirportDatabase,
		applicationUtils: IApplicationUtils,
		queryUtils: IQueryUtils,
		entityStateManager: IEntityStateManager,
		qMetadataUtils: IQMetadataUtils,
		qValidator: IValidator,
		relationManager: IQueryRelationManager,
		sqlQueryAdapter: ISQLQueryAdaptor,
		storeDriver: IStoreDriver,
		subStatementSqlGenerator: ISubStatementSqlGenerator,
		utils: IUtils,
		context: IFuelHydrantContext
		// repository?: IRepository
	) {
		super(airportDatabase.applications[insertValuesQuery.II.si].currentVersion[0]
			.applicationVersion.entities[insertValuesQuery.II.ti], dialect,
			airportDatabase,
			applicationUtils,
			queryUtils,
			entityStateManager,
			qMetadataUtils,
			qValidator,
			relationManager,
			sqlQueryAdapter,
			storeDriver,
			subStatementSqlGenerator,
			utils,
			context)
	}

	toSQL(
		fieldMap: SyncApplicationMap,
		context: IFuelHydrantContext
	): string {
		if (!this.insertValuesQuery.II) {
			throw new Error(`Expecting exactly one table in INSERT INTO clause`)
		}
		this.qValidator.validateInsertQEntity(this.dbEntity)
		let {
			columnMap,
			tableFragment
		} = this.getFromFragment(this.insertValuesQuery.II, fieldMap, false, context, false)
		let columnsFragment = this.getColumnsFragment(this.dbEntity, this.insertValuesQuery.C, columnMap)
		let valuesFragment = this.getValuesFragment(
			this.insertValuesQuery.V, context)

		return `INSERT INTO
${tableFragment} ${columnsFragment}
VALUES
${valuesFragment}
`
	}

	protected getColumnsFragment(
		dbEntity: DbEntity,
		columns: number[],
		columnMap: SyncColumnMap
	): string {
		if (!columns.length) {
			return ''
		}
		const columnNames = columns.map(columnIndex => {
			columnMap.ensure(columnIndex)

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
						value, ClauseType.WHERE_CLAUSE, null, context)
					return `\n${fieldValue}\n`
				}
			})
			return `(${valuesFragment.join(',')})`
		})
		return allValuesFragment.join(',\n')
	}

}
