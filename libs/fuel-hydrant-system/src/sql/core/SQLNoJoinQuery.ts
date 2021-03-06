import {
	IAirportDatabase,
	IQMetadataUtils,
	IUtils,
} from '@airport/air-traffic-control'
import {
	DbEntity,
	IEntityStateManager,
	JSONEntityRelation
} from '@airport/ground-control'
import {
	IApplicationUtils,
	IQEntity,
	IQEntityInternal,
	IRelationManager,
	QEntity
} from '@airport/tarmaq-query'
import { IStoreDriver } from '@airport/terminal-map'
import { ISQLQueryAdaptor } from '../../adaptor/SQLQueryAdaptor'
import { IFuelHydrantContext } from '../../FuelHydrantContext'
import { IValidator } from '../../validation/Validator'
import { SQLDialect } from './SQLQuery'
import { SQLWhereBase } from './SQLWhereBase'
import { ISubStatementSqlGenerator } from './SubStatementSqlGenerator'

/**
 * Created by Papa on 10/2/2016.
 */

export abstract class SQLNoJoinQuery
	extends SQLWhereBase {

	constructor(
		dbEntity: DbEntity,
		dialect: SQLDialect,
		airportDatabase: IAirportDatabase,
		applicationUtils: IApplicationUtils,
		entityStateManager: IEntityStateManager,
		qMetadataUtils: IQMetadataUtils,
		qValidator: IValidator,
		protected relationManager: IRelationManager,
		sqlQueryAdapter: ISQLQueryAdaptor,
		storeDriver: IStoreDriver,
		subStatementSqlGenerator: ISubStatementSqlGenerator,
		utils: IUtils,
		context: IFuelHydrantContext,
	) {
		super(dbEntity, dialect,
			airportDatabase,
			applicationUtils,
			entityStateManager,
			qMetadataUtils,
			qValidator,
			sqlQueryAdapter,
			storeDriver,
			subStatementSqlGenerator,
			utils,
			context)
	}

	protected getTableFragment(
		fromRelation: JSONEntityRelation,
		context: IFuelHydrantContext,
		addAs: boolean = true
	): string {
		if (!fromRelation) {
			throw new Error(`Expecting exactly one table in UPDATE/DELETE clause`)
		}
		if (fromRelation.ri || fromRelation.jt) {
			throw new Error(`Table in UPDATE/DELETE clause cannot be joined`)
		}

		const firstDbEntity: DbEntity = this.airportDatabase.applications[fromRelation.si]
			.currentVersion[0].applicationVersion.entities[fromRelation.ti]
		let tableName = this.storeDriver.getEntityTableName(firstDbEntity, context)
		if (fromRelation.si !== this.dbEntity.applicationVersion.application.index
			|| fromRelation.ti !== this.dbEntity.index) {
			throw new Error(`Unexpected table in UPDATE/DELETE clause: 
			'${tableName}',
			expecting: '${this.dbEntity.applicationVersion.application.name}.${this.dbEntity.name}'`)
		}

		const firstQEntity: IQEntity = new QEntity(firstDbEntity, this.applicationUtils, this.relationManager)

		const tableAlias = this.relationManager.getAlias(fromRelation)
		this.qEntityMapByAlias[tableAlias] = firstQEntity as IQEntityInternal
		let fromFragment = `\t${tableName}`
		if (addAs) {
			fromFragment += ` AS ${tableAlias}`
		}

		return fromFragment
	}

}
