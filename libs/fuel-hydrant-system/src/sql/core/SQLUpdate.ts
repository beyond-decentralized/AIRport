import {
	IAirportDatabase,
	IQMetadataUtils,
	IUtils,
} from '@airport/air-traffic-control'
import {
	IApplicationUtils,
	IEntityStateManager,
	InternalFragments,
	QueryClauseObjectType,
	QueryUpdate,
	SyncApplicationMap,
	SyncColumnMap
} from '@airport/ground-control'
import {
	IEntityUpdateProperties,
	IQueryUtils,
	IQueryRelationManager,
	ManyToOneColumnMapping
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
 * Created by Papa on 10/2/2016.
 */

export class SQLUpdate
	extends SQLNoJoinQuery {

	constructor(
		public updateQuery: QueryUpdate<IEntityUpdateProperties>,
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
		context: IFuelHydrantContext,
	) {
		super(airportDatabase.applications[updateQuery.U.si].currentVersion[0]
			.applicationVersion.entities[updateQuery.U.ti], dialect,
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
		internalFragments: InternalFragments,
		fieldMap: SyncApplicationMap,
		context: IFuelHydrantContext,
	): string {
		if (!this.updateQuery.U) {
			throw new Error(`Expecting exactly one table in UPDATE clause`)
		}
		let {
			columnMap,
			tableFragment
		} = this.getFromFragment(this.updateQuery.U, fieldMap, false, context)
		let setFragment = this.getSetFragment(this.updateQuery.S, columnMap, context)
		if (internalFragments.SET && internalFragments.SET.length) {
			setFragment += ',' + internalFragments.SET.map(
				internalSetFragment => {
					columnMap.ensure(internalSetFragment.column.index)
					return `
	${internalSetFragment.column.name} = ${internalSetFragment.value}`
				})
				.join(',')
		}
		let whereFragment = ''
		let updateQuery = this.updateQuery
		if (updateQuery.W) {
			whereFragment = this.getWHEREFragment(updateQuery.W, '',
				context)
			whereFragment = `WHERE
${whereFragment}`
			// TODO: following might be needed for some RDBMS, does not work for SqLite
			// Replace the root entity alias reference with the table name
			// let tableAlias = this.relationManager.getAlias(this.updateQuery.U)
			// let tableName  = this.storeDriver.getEntityTableName(this.qEntityMapByAlias[tableAlias].__driver__.dbEntity, context)
			// whereFragment  = whereFragment.replace(new RegExp(`${tableAlias}`, 'g'), tableName)
		}

		return `UPDATE
${tableFragment}
SET
${setFragment}
${whereFragment}`
	}

	protected getSetFragment(
		setClauseFragment: IEntityUpdateProperties,
		columnMap: SyncColumnMap,
		context: IFuelHydrantContext,
	): string {
		let setFragments = []
		for (let columnName in setClauseFragment) {
			let value = setClauseFragment[columnName]
			// Skip undefined values
			if (value === undefined) {
				continue
			}
			const updatedDbColumn = this.dbEntity.columnMap[columnName]
			this.qValidator.validateUpdateColumn(updatedDbColumn)
			this.addSetFragment(columnName, value, setFragments, context)
			columnMap.ensure(updatedDbColumn.index)
		}

		return setFragments.join(', \n')
	}

	private addSetFragment(
		columnName: string,
		value: any,
		setFragments: any[],
		context: IFuelHydrantContext,
	) {
		let fieldValue
		if (typeof value === 'number') {
			this.parameterReferences.push(value)
			fieldValue = this.sqlQueryAdapter.getParameterReference(
				this.parameterReferences, value)
		} else {
			fieldValue = this.getFieldValue(value, ClauseType.WHERE_CLAUSE,
				null, context)
		}
		setFragments.push(`\t${columnName} = ${fieldValue}`)
	}

	private isManyToOneRelation(
		value: any
	): boolean {
		return typeof value === 'object'
			&& value.ot === QueryClauseObjectType.MANY_TO_ONE_RELATION
	}

	private addManyToOneMappings(
		parentMapping: ManyToOneColumnMapping
	): ManyToOneColumnMapping[] {
		let mappings: ManyToOneColumnMapping[] = []
		const value = parentMapping.value
		if (typeof value === 'object' &&
			(!value.ot
				|| value.ot === QueryClauseObjectType.MANY_TO_ONE_RELATION)) {
			for (const key in value) {
				if (key === 'ot'
					&& value[key] === QueryClauseObjectType.MANY_TO_ONE_RELATION) {
					continue
				}
				const mapping: ManyToOneColumnMapping = {
					tableIndex: parentMapping.tableIndex,
					propertyChain: parentMapping.propertyChain.concat([key]),
					value: value[key]
				}
				const childMappings = this.addManyToOneMappings(mapping)
				mappings = mappings.concat(childMappings)
			}
		} else {
			mappings.push(parentMapping)
		}

		return mappings
	}

}
