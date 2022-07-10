import {
	IAirportDatabase,
	IQMetadataUtils,
	IUtils
} from '@airport/air-traffic-control'
import { IEntityStateManager, JsonDelete } from '@airport/ground-control'
import { IApplicationUtils, IRelationManager } from '@airport/tarmaq-query'
import { IStoreDriver } from '@airport/terminal-map'
import { ISQLQueryAdaptor } from '../../adaptor/SQLQueryAdaptor'
import { IFuelHydrantContext } from '../../FuelHydrantContext'
import { IValidator } from '../../validation/Validator'
import { SQLNoJoinQuery } from './SQLNoJoinQuery'
import { SQLDialect } from './SQLQuery'
import { ISubStatementSqlGenerator } from './SubStatementSqlGenerator'

/**
 * Created by Papa on 10/2/2016.
 */

export class SQLDelete
	extends SQLNoJoinQuery {

	constructor(
		public jsonDelete: JsonDelete,
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
		context: IFuelHydrantContext,
	) {
		super(airportDatabase.applications[jsonDelete.DF.si].currentVersion[0]
			.applicationVersion.entities[jsonDelete.DF.ti], dialect,
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
			// let tableAlias = this.relationManager.getAlias(this.jsonDelete.DF)
			// let tableName = this.storeDriver.getEntityTableName(this.qEntityMapByAlias[tableAlias].__driver__.dbEntity, context)
			// whereFragment = whereFragment.replace(new RegExp(`${tableAlias}`, 'g'), tableName)
		}

		return `DELETE
FROM
${fromFragment}${whereFragment}`
	}

}
