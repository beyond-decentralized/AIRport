import { IAirportDatabase, IApplicationUtils, IQMetadataUtils, IRelationManager, IUtils } from '@airport/air-traffic-control'
import {
	DbEntity,
	IEntityStateManager,
	JsonInsertValues
} from '@airport/ground-control'
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
		public jsonInsertValues: JsonInsertValues,
		dialect: SQLDialect,
		airportDatabase: IAirportDatabase,
		applicationUtils: IApplicationUtils,
		entityStateManager: IEntityStateManager,
		qMetadataUtils: IQMetadataUtils,
		qValidator: IValidator,
		relationManager: IRelationManager,
		sqlQueryAdapter: ISQLQueryAdaptor,
		storeDriver: IStoreDriver,
		subStatementSqlGenerator: ISubStatementSqlGenerator,
		utils: IUtils,
		context: IFuelHydrantContext
		// repository?: IRepository
	) {
		super(airportDatabase.applications[jsonInsertValues.II.si].currentVersion[0]
			.applicationVersion.entities[jsonInsertValues.II.ti], dialect,
			airportDatabase,
			applicationUtils,
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
		context: IFuelHydrantContext
	): string {
		if (!this.jsonInsertValues.II) {
			throw new Error(`Expecting exactly one table in INSERT INTO clause`)
		}
		this.qValidator.validateInsertQEntity(this.dbEntity)
		let tableFragment = this.getTableFragment(
			this.jsonInsertValues.II, context, false)
		let columnsFragment = this.getColumnsFragment(this.dbEntity, this.jsonInsertValues.C)
		let valuesFragment = this.getValuesFragment(
			this.jsonInsertValues.V, context)

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
		const columnNames = columns.map(
			columnIndex =>
				dbEntity.columns[columnIndex].name)
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
