import {
	IEntityUpdateProperties,
	ManyToOneColumnMapping
} from '@airport/air-control'
import { DI } from '@airport/di'
import {
	InternalFragments,
	JSONClauseObjectType,
	JsonUpdate
} from '@airport/ground-control'
import { IFuelHydrantContext } from '../../FuelHydrantContext'
import {
	Q_VALIDATOR,
	SQL_QUERY_ADAPTOR
} from '../../tokens'
import { SQLNoJoinQuery } from './SQLNoJoinQuery'
import { SQLDialect } from './SQLQuery'
import { ClauseType } from './SQLWhereBase'

/**
 * Created by Papa on 10/2/2016.
 */

export class SQLUpdate
	extends SQLNoJoinQuery {

	constructor(
		public jsonUpdate: JsonUpdate<IEntityUpdateProperties>,
		dialect: SQLDialect,
		context: IFuelHydrantContext,
	) {
		super(context.ioc.airDb.applications[jsonUpdate.U.si].currentVersion[0]
			.applicationVersion.entities[jsonUpdate.U.ti], dialect, context)
	}

	toSQL(
		internalFragments: InternalFragments,
		context: IFuelHydrantContext,
	): string {
		if (!this.jsonUpdate.U) {
			throw new Error(`Expecting exactly one table in UPDATE clause`)
		}
		let updateFragment = this.getTableFragment(this.jsonUpdate.U, context)
		let setFragment = this.getSetFragment(this.jsonUpdate.S, context)
		if (internalFragments.SET && internalFragments.SET.length) {
			setFragment += ',' + internalFragments.SET.map(
				internalSetFragment => `
	${internalSetFragment.column.name} = ${internalSetFragment.value}`)
				.join(',')
		}
		let whereFragment = ''
		let jsonQuery = this.jsonUpdate
		if (jsonQuery.W) {
			whereFragment = this.getWHEREFragment(jsonQuery.W, '',
				context)
			whereFragment = `WHERE
${whereFragment}`
			// TODO: following might be needed for some RDBMS, does not work for SqLite
			// Replace the root entity alias reference with the table name
			// let tableAlias = context.ioc.relationManager.getAlias(this.jsonUpdate.U)
			// let tableName  = context.ioc.storeDriver.getEntityTableName(this.qEntityMapByAlias[tableAlias].__driver__.dbEntity, context)
			// whereFragment  = whereFragment.replace(new RegExp(`${tableAlias}`, 'g'), tableName)
		}

		return `UPDATE
${updateFragment}
SET
${setFragment}
${whereFragment}`
	}

	protected getSetFragment(
		setClauseFragment: IEntityUpdateProperties,
		context: IFuelHydrantContext,
	): string {
		const validator = DI.db()
			.getSync(Q_VALIDATOR)

		let setFragments = []
		for (let columnName in setClauseFragment) {
			let value = setClauseFragment[columnName]
			// Skip undefined values
			if (value === undefined) {
				continue
			}
			validator.validateUpdateColumn(this.dbEntity.columnMap[columnName])
			this.addSetFragment(columnName, value, setFragments,
				context)
		}

		return setFragments.join(', \n')
	}

	private addSetFragment(
		columnName: string,
		value: any,
		setFragments: any[],
		context: IFuelHydrantContext,
	) {
		const sqlAdaptor = DI.db()
			.getSync(SQL_QUERY_ADAPTOR)

		let fieldValue
		if (typeof value === 'number') {
			this.parameterReferences.push(value)
			fieldValue = sqlAdaptor.getParameterReference(this.parameterReferences, value)
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
			&& value.ot === JSONClauseObjectType.MANY_TO_ONE_RELATION
	}

	private addManyToOneMappings(
		parentMapping: ManyToOneColumnMapping
	): ManyToOneColumnMapping[] {
		let mappings: ManyToOneColumnMapping[] = []
		const value = parentMapping.value
		if (typeof value === 'object' &&
			(!value.ot
				|| value.ot === JSONClauseObjectType.MANY_TO_ONE_RELATION)) {
			for (const key in value) {
				if (key === 'ot'
					&& value[key] === JSONClauseObjectType.MANY_TO_ONE_RELATION) {
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
