import {
	IAirportDatabase,
	IQMetadataUtils,
	IUtils,
} from '@airport/air-traffic-control'
import {
	DbEntity,
	Dictionary,
	IApplicationUtils,
	IEntityStateManager,
	QueryEntityRelation,
	SyncApplicationMap,
	SyncColumnMap
} from '@airport/ground-control'
import {
	IQEntity,
	IQEntityInternal,
	IQueryUtils,
	IQueryRelationManager,
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
		dictionary: Dictionary,
		airportDatabase: IAirportDatabase,
		applicationUtils: IApplicationUtils,
		queryUtils: IQueryUtils,
		entityStateManager: IEntityStateManager,
		qMetadataUtils: IQMetadataUtils,
		qValidator: IValidator,
		protected queryRelationManager: IQueryRelationManager,
		sqlQueryAdapter: ISQLQueryAdaptor,
		storeDriver: IStoreDriver,
		subStatementSqlGenerator: ISubStatementSqlGenerator,
		utils: IUtils,
		context: IFuelHydrantContext,
	) {
		super(dbEntity, dialect,
			dictionary,
			airportDatabase,
			applicationUtils,
			queryUtils,
			entityStateManager,
			qMetadataUtils,
			qValidator,
			sqlQueryAdapter,
			storeDriver,
			subStatementSqlGenerator,
			utils,
			context)
	}

	protected getFromFragment(
		fromRelation: QueryEntityRelation,
		fieldMap: SyncApplicationMap,
		syncAllFields: boolean,
		context: IFuelHydrantContext,
		addAs: boolean = true
	): {
		columnMap: SyncColumnMap,
		tableFragment: string
	} {
		if (!fromRelation) {
			throw new Error(`Expecting exactly one table in UPDATE/DELETE clause`)
		}
		if (fromRelation.relationIndex || fromRelation.joinType) {
			throw new Error(`Table in UPDATE/DELETE clause cannot be joined`)
		}

		const firstDbEntity: DbEntity = this.airportDatabase.applications[fromRelation.applicationIndex]
			.currentVersion[0].applicationVersion.entities[fromRelation.entityIndex]
		const columnMap = fieldMap.ensureEntity(firstDbEntity, syncAllFields)
		let tableName = this.storeDriver.getEntityTableName(firstDbEntity, context)
		if (fromRelation.applicationIndex !== this.dbEntity.applicationVersion.application.index
			|| fromRelation.entityIndex !== this.dbEntity.index) {
			throw new Error(`Unexpected table in UPDATE/DELETE clause: 
			'${tableName}',
			expecting: '${this.dbEntity.applicationVersion.application.name}.${this.dbEntity.name}'`)
		}

		const firstQEntity: IQEntity = new QEntity(firstDbEntity, this.queryUtils, this.queryRelationManager)

		const tableAlias = this.queryRelationManager.getAlias(fromRelation)
		this.qEntityMapByAlias[tableAlias] = firstQEntity as IQEntityInternal
		let fromFragment = `\t${tableName}`
		if (addAs) {
			fromFragment += ` AS ${tableAlias}`
		}

		return {
			columnMap,
			tableFragment: fromFragment
		}
	}

}
