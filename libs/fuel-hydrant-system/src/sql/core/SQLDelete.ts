import { JsonDelete } from '@airport/ground-control'
import { IFuelHydrantContext } from '../../FuelHydrantContext'
import { SQLNoJoinQuery } from './SQLNoJoinQuery'
import { SQLDialect } from './SQLQuery'

/**
 * Created by Papa on 10/2/2016.
 */

export class SQLDelete
	extends SQLNoJoinQuery {

	constructor(
		public jsonDelete: JsonDelete,
		dialect: SQLDialect,
		context: IFuelHydrantContext,
	) {
		super(context.ioc.airDb.schemas[jsonDelete.DF.si].currentVersion[0]
			.schemaVersion.entities[jsonDelete.DF.ti], dialect,
			context)
	}

	toSQL(
		context: IFuelHydrantContext,
	): string {
		let fromFragment = this.getTableFragment(this.jsonDelete.DF, context)
		let whereFragment = ''
		let jsonQuery = this.jsonDelete
		if (jsonQuery.W) {
			whereFragment = this.getWHEREFragment(jsonQuery.W, '', context)
			whereFragment = `
WHERE
${whereFragment}`
			// TODO: following might be needed for some RDBMS, does not work for SqLite
			// Replace the root entity alias reference with the table name
			// let tableAlias = context.ioc.relationManager.getAlias(this.jsonDelete.DF)
			// let tableName = context.ioc.storeDriver.getEntityTableName(this.qEntityMapByAlias[tableAlias].__driver__.dbEntity, context)
			// whereFragment = whereFragment.replace(new RegExp(`${tableAlias}`, 'g'), tableName)
		}

		return `DELETE
FROM
${fromFragment}${whereFragment}`
	}

}
