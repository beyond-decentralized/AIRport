import {
	IAirportDatabase,
	IUtils,
	QRelation
}                       from '@airport/air-control'
import {JsonDelete}     from '@airport/ground-control'
import {SQLNoJoinQuery} from './SQLNoJoinQuery'
import {SQLDialect}     from './SQLQuery'

/**
 * Created by Papa on 10/2/2016.
 */

export class SQLDelete
	extends SQLNoJoinQuery {

	constructor(
		airportDb: IAirportDatabase,
		utils: IUtils,
		public jsonDelete: JsonDelete,
		dialect: SQLDialect,
	) {
		super(airportDb, utils, airportDb.schemas[jsonDelete.DF.si][jsonDelete.DF.ti], dialect)
	}

	toSQL(): string {
		let fromFragment  = this.getTableFragment(this.jsonDelete.DF)
		let whereFragment = ''
		let jsonQuery     = this.jsonDelete
		if (jsonQuery.W) {
			whereFragment  = `
WHERE
${this.getWHEREFragment(jsonQuery.W, '')}`
			// Always replace the root entity alias reference with the table name
			let tableAlias = QRelation.getAlias(this.jsonDelete.DF)
			let tableName  = this.qEntityMapByAlias[tableAlias].__driver__.dbEntity.name
			whereFragment  = whereFragment.replace(new RegExp(`${tableAlias}`, 'g'), tableName)
		}

		return `DELETE
FROM
${fromFragment}${whereFragment}`
	}

}