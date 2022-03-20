import {
	IQEntity,
	IQEntityInternal,
	QEntity
}                          from '@airport/air-control'
import {
	DbEntity,
	JSONEntityRelation
}                          from '@airport/ground-control'
import { IFuelHydrantContext } from '../../FuelHydrantContext'
import {SQLDialect}        from './SQLQuery'
import {SQLWhereBase}      from './SQLWhereBase'

/**
 * Created by Papa on 10/2/2016.
 */

export abstract class SQLNoJoinQuery
	extends SQLWhereBase {

	constructor(
		dbEntity: DbEntity,
		dialect: SQLDialect,
		context: IFuelHydrantContext,
	) {
		super(dbEntity, dialect, context)
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

		const firstDbEntity: DbEntity = context.ioc.airDb.applications[fromRelation.si]
			.currentVersion[0].applicationVersion.entities[fromRelation.ti]
		let tableName                 = context.ioc.storeDriver.getEntityTableName(firstDbEntity, context)
		if (fromRelation.si !== this.dbEntity.applicationVersion.application.index
			|| fromRelation.ti !== this.dbEntity.index) {
			throw new Error(`Unexpected table in UPDATE/DELETE clause: 
			'${tableName}',
			expecting: '${this.dbEntity.applicationVersion.application.name}.${this.dbEntity.name}'`)
		}

		const firstQEntity: IQEntity = new QEntity(firstDbEntity)

		const tableAlias                   = context.ioc.relationManager.getAlias(fromRelation)
		this.qEntityMapByAlias[tableAlias] = firstQEntity as IQEntityInternal
		let fromFragment                   = `\t${tableName}`
		if (addAs) {
			fromFragment += ` AS ${tableAlias}`
		}

		return fromFragment
	}

}
