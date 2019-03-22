import {
	DbEntity,
	IAirportDatabase,
	IUtils
}                         from '@airport/air-control'
import {JsonInsertValues} from '@airport/ground-control'
import {SQLNoJoinQuery}   from './SQLNoJoinQuery'
import {SQLDialect}       from './SQLQuery'
import {ClauseType}       from './SQLWhereBase'

/**
 * Created by Papa on 11/17/2016.
 */

export class SQLInsertValues
	extends SQLNoJoinQuery {

	constructor(
		airportDb: IAirportDatabase,
		utils: IUtils,
		public jsonInsertValues: JsonInsertValues,
		dialect: SQLDialect,
		// repository?: IRepository
	) {
		super(airportDb, utils, airportDb.schemas[jsonInsertValues.II.si][jsonInsertValues.II.ti], dialect)
	}

	toSQL(): string {
		if (!this.jsonInsertValues.II) {
			throw `Expecting exactly one table in INSERT INTO clause`
		}
		this.validator.validateInsertQEntity(this.dbEntity)
		let tableFragment   = this.getTableFragment(this.jsonInsertValues.II)
		let columnsFragment = this.getColumnsFragment(this.dbEntity, this.jsonInsertValues.C)
		let valuesFragment  = this.getValuesFragment(this.jsonInsertValues.V)

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
		valuesClauseFragment: any[][]
	): string {
		let allValuesFragment = valuesClauseFragment.map((valuesArray) => {
			let valuesFragment = valuesArray.map((value) => {
				if (typeof value === 'number') {
					this.parameterReferences.push(value)
					return this.sqlAdaptor.getParameterReference(this.parameterReferences, value)
				} else {
					return `\n${this.getFieldValue(value, ClauseType.WHERE_CLAUSE)}\n`
				}
			})
			return `(${valuesFragment.join(',')})`
		})

		return allValuesFragment.join(',\n')
	}

}