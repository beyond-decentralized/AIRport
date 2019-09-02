import {
	IAirportDatabase,
	IEntityUpdateProperties,
	IQMetadataUtils,
	ISchemaUtils,
	ManyToOneColumnMapping,
	QRelation
}                       from '@airport/air-control'
import {
	InternalFragments,
	IStoreDriver,
	JSONClauseObjectType,
	JsonUpdate
}                       from '@airport/ground-control'
import {SQLNoJoinQuery} from './SQLNoJoinQuery'
import {SQLDialect}     from './SQLQuery'
import {ClauseType}     from './SQLWhereBase'

/**
 * Created by Papa on 10/2/2016.
 */

export class SQLUpdate
	extends SQLNoJoinQuery {

	constructor(
		airportDb: IAirportDatabase,
		public jsonUpdate: JsonUpdate<IEntityUpdateProperties>,
		dialect: SQLDialect,
		storeDriver: IStoreDriver
	) {
		super(airportDb.schemas[jsonUpdate.U.si]
			.currentVersion.entities[jsonUpdate.U.ti], dialect, storeDriver)
	}

	toSQL(
		internalFragments: InternalFragments,
		airDb: IAirportDatabase,
		schemaUtils: ISchemaUtils,
		metadataUtils: IQMetadataUtils
	): string {
		if (!this.jsonUpdate.U) {
			throw new Error(`Expecting exactly one table in UPDATE clause`)
		}
		let updateFragment = this.getTableFragment(
			this.jsonUpdate.U, airDb, schemaUtils)
		let setFragment    = this.getSetFragment(this.jsonUpdate.S,
			airDb, schemaUtils, metadataUtils)
		if (internalFragments.SET.length) {
			setFragment += internalFragments.SET.map(
				internalSetFragment => `
	${internalSetFragment.column} = ${internalSetFragment.value}`).join('')
		}
		let whereFragment = ''
		let jsonQuery     = this.jsonUpdate
		if (jsonQuery.W) {
			whereFragment  = this.getWHEREFragment(jsonQuery.W, '',
				airDb, schemaUtils, metadataUtils)
			whereFragment  = `WHERE
${whereFragment}`
			// Always replace the root entity alias reference with the table name
			let tableAlias = QRelation.getAlias(this.jsonUpdate.U)
			let tableName  = schemaUtils.getTableName(this.qEntityMapByAlias[tableAlias].__driver__.dbEntity)
			whereFragment  = whereFragment.replace(new RegExp(`${tableAlias}`, 'g'), tableName)
		}

		return `UPDATE
${updateFragment}
SET
${setFragment}
${whereFragment}`
	}

	protected getSetFragment(
		setClauseFragment: IEntityUpdateProperties,
		airDb: IAirportDatabase,
		schemaUtils: ISchemaUtils,
		metadataUtils: IQMetadataUtils
	): string {
		let setFragments = []
		for (let columnName in setClauseFragment) {
			let value = setClauseFragment[columnName]
			// Skip undefined values
			if (value === undefined) {
				continue
			}
			this.validator.validateUpdateColumn(this.dbEntity.columnMap[columnName])
			this.addSetFragment(columnName, value, setFragments,
				airDb, schemaUtils, metadataUtils)
		}

		return setFragments.join(', \n')
	}

	private addSetFragment(
		columnName: string,
		value: any,
		setFragments: any[],
		airDb: IAirportDatabase,
		schemaUtils: ISchemaUtils,
		metadataUtils: IQMetadataUtils
	) {
		let fieldValue
		if (typeof value === 'number') {
			this.parameterReferences.push(value)
			fieldValue = this.sqlAdaptor.getParameterReference(this.parameterReferences, value)
		} else {
			fieldValue = this.getFieldValue(value, ClauseType.WHERE_CLAUSE,
				null, airDb, schemaUtils, metadataUtils)
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
		const value                            = parentMapping.value
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
				const childMappings                   = this.addManyToOneMappings(mapping)
				mappings                              = mappings.concat(childMappings)
			}
		} else {
			mappings.push(parentMapping)
		}

		return mappings
	}

}
