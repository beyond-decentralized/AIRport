import {
	DbEntity,
	DbProperty,
	DbRelation,
	EntityRelationType,
	QueryBaseOperation,
	QueryEntityRelation,
	QueryUpdateColumns,
	QueryUpdate,
	Repository_GUID
} from '@airport/ground-control'
import {
	IEntityUpdateProperties,
	IQEntity
} from '../../../definition/core/entity/IQEntity'
import { IQEntityInternal } from '../../../definition/core/entity/IQEntityDriver'
import { IQueryRelationManager } from '../../../definition/core/entity/IQueryRelationManager'
import { RawUpdate } from '../../../definition/query/facade/RawUpdate'
import { IFieldUtils } from '../../../definition/utils/IFieldUtils'
import { IQueryUtils } from '../../../definition/utils/IQueryUtils'
import { wrapPrimitive } from '../../core/field/WrapperFunctions'
import { AbstractUpdate } from './AbstractUpdate'

/**
 * Created by Papa on 10/2/2016.
 */

// FIXME: add support for a full blown UPDATE, with expression support for SET
export class UpdateProperties<IEUP extends IEntityUpdateProperties, IQE extends IQEntity>
	extends AbstractUpdate<IQE, RawUpdate<IEUP, IQE>> {

	constructor(
		rawUpdate: RawUpdate<IEUP, IQE>,
		trackedRepoGUIDSet?: Set<Repository_GUID>,
	) {
		super(rawUpdate)
	}

	toQuery(
		queryUtils: IQueryUtils,
		fieldUtils: IFieldUtils,
		relationManager: IQueryRelationManager
	): QueryUpdate<QueryUpdateColumns> {
		return {
			UPDATE: <QueryEntityRelation>(<IQEntityInternal><any>this.rawUpdate.UPDATE)
				.__driver__.getQueryRelation(
					this.columnAliases,
					this.trackedRepoGUIDSet, this.trackedRepoLocalIdSet,
					queryUtils, fieldUtils, relationManager),
			SELECT: this.rawToQuerySetClause(this.rawUpdate.SET, queryUtils, fieldUtils, relationManager),
			WHERE: queryUtils.whereClauseToQueryOperation(
				this.rawUpdate.WHERE, this.columnAliases,
				this.trackedRepoGUIDSet, this.trackedRepoLocalIdSet)
		}
	}

	protected rawToQuerySetClause(
		rawSet: IEUP,
		queryUtils: IQueryUtils,
		fieldUtils: IFieldUtils,
		relationManager: IQueryRelationManager
	): QueryUpdateColumns {
		const querySetClause: { [columnName: string]: QueryBaseOperation } = {}
		const dbEntity = (<IQEntityInternal><any>this.rawUpdate.UPDATE).__driver__.dbEntity
		const dbPropertyMap = dbEntity.propertyMap

		this.rawToQuerySetEntityFragments(rawSet, querySetClause, [],
			dbPropertyMap, [], queryUtils, fieldUtils, relationManager)

		return querySetClause
	}

	private rawToQuerySetEntityFragments(
		rawSetFragment: IEUP,
		querySetClause: { [columnName: string]: QueryBaseOperation },
		dbPropertyChain: DbProperty[],
		dbPropertyMap: { [name: string]: DbProperty },
		childDbRelationChain: DbRelation[],
		queryUtils: IQueryUtils,
		fieldUtils: IFieldUtils,
		relationManager: IQueryRelationManager
	): void {
		const isTopLevelFragment = !dbPropertyMap.length
		for (const propertyName in rawSetFragment) {
			const dbProperty = dbPropertyMap[propertyName]
			const dbEntity = dbProperty.entity
			if (!dbProperty) {
				throw new Error(`
${this.getPropertyChainDesription(dbPropertyChain)}

	Unknown property: '${propertyName}' for entity: '${dbEntity.name}'
			(table: '${dbEntity.tableConfig.name}').
				`)
			}

			if (isTopLevelFragment && dbProperty.isId) {
				throw new Error(`
${this.getPropertyChainDesription(dbPropertyChain)}

	Cannot update @Id properties:
	Property: '${propertyName}' for entity: '${dbEntity.name}'
			(table: '${dbEntity.tableConfig.name}').
				`)
			} else if (!isTopLevelFragment && !dbProperty.isId) {
				throw new Error(`
${this.getPropertyChainDesription(dbPropertyChain)}

	Updated properties of nested entities must be @Id properties:
	Property: '${propertyName}' for entity: '${dbEntity.name}'
			(table: '${dbEntity.tableConfig.name}').
				`)
			}

			const childDbPropertyChain = [...dbPropertyChain]
			childDbPropertyChain.push(dbProperty)

			this.rawToQuerySetFragment(rawSetFragment, querySetClause,
				childDbPropertyChain, propertyName, childDbRelationChain,
				queryUtils, fieldUtils, relationManager)
		}

	}

	private rawToQuerySetFragment(
		rawSetFragment: IEUP,
		querySetClause: { [columnName: string]: QueryBaseOperation },
		dbPropertyChain: DbProperty[],
		propertyName: string,
		dbRelationChain: DbRelation[],
		queryUtils: IQueryUtils,
		fieldUtils: IFieldUtils,
		relationManager: IQueryRelationManager
	): void {
		const dbProperty: DbProperty = dbPropertyChain[dbPropertyChain.length - 1]
		const dbEntity = dbProperty.entity

		let value = rawSetFragment[propertyName]
		if (value === undefined) {
			delete rawSetFragment[propertyName]
			return
		}
		value = wrapPrimitive(value)
		// If this is not a nested object definition
		if (value.toQueryFragment) {

			if (dbProperty.propertyColumns.length !== 1) {
				throw new Error(`
${this.getPropertyChainDesription(dbPropertyChain)}

	Cannot update multi-column property to a single value:
	Property: '${propertyName}' for entity: '${dbEntity.name}'
			(table: '${dbEntity.tableConfig.name}')
			has ${dbProperty.propertyColumns.length + 1} columns 
			but is being updates to a single value.
				`)

			} else {

				let dbColumn = dbProperty.propertyColumns[0].column
				if (dbRelationChain.length) {
					for (let i = dbRelationChain.length - 1; i >= 0; i--) {
						const currentDbRelation = dbRelationChain[i]
						const matchingManyRelationColumn = currentDbRelation.manyRelationColumns.filter((
							manyRelationColumn
						) => {
							return manyRelationColumn.manyColumn.index ===
								dbColumn.index
						})[0]
						dbColumn = matchingManyRelationColumn.oneColumn
					}
				}

				if (querySetClause[dbColumn.name]) {
					const firstProperty = dbPropertyChain[0]
					throw new Error(`
${this.getPropertyChainDesription(dbPropertyChain)}

	Cannot update the same column multiple times in the same statement:
	Property: '${propertyName}' for entity: '${dbEntity.name}'
			(table: '${dbEntity.tableConfig.name}')
	maps to table: ${firstProperty.entity.tableConfig.name}, column: ${dbColumn.name}
		which has already been set in this update statement (above).
				`)
				}
				querySetClause[dbColumn.name] = value.toQueryFragment(
					this.columnAliases, false, queryUtils, fieldUtils, relationManager)
				return
			}
		}
		// This should be a nested property definition
		else {
			if (typeof value === 'object') {

				const dbRelation = dbProperty.relation[0]
				const childDbRelationChain = [...dbRelationChain]
				childDbRelationChain.push(dbRelation)

				switch (dbRelation.relationType) {
					case EntityRelationType.MANY_TO_ONE: {
						this.rawToQuerySetEntityFragments(
							value,
							querySetClause,
							dbPropertyChain,
							dbRelation.relationEntity.propertyMap,
							childDbRelationChain,
							queryUtils,
							fieldUtils,
							relationManager
						)
						break
					}
					case EntityRelationType.ONE_TO_MANY:
						// Not  nested property definition
						throw new Error(`
${this.getPropertyChainDesription(dbPropertyChain)}

				Cannot update @OneToMany properties:
					Property: '${propertyName}' of entity: '${(<IQEntityInternal><any>
								this.rawUpdate.UPDATE).__driver__.dbEntity.name}
					is a @OneToMany relation and cannot be updated since it is
					assumed to be based on @Id columns (which cannot be updated).'
				`)
					default:
						// Not  nested property definition
						throw new Error(`
${this.getPropertyChainDesription(dbPropertyChain)}

				Undefined relation type: 
					Property: '${propertyName}' of entity: '${(<IQEntityInternal><any>
								this.rawUpdate.UPDATE).__driver__.dbEntity.name}'
					is defined with an unknown type of a relation.  Expecting either
					@ManyToOne(...)
					or
					@OneToMany(...)
				`)
				}
				return
			} else {
				// Not  nested property definition
				throw new Error(`
${this.getPropertyChainDesription(dbPropertyChain)}

				Unexpected value ${JSON.stringify(value)} 
					for property: '${propertyName}' of entity: '${(<IQEntityInternal><any>
						this.rawUpdate.UPDATE).__driver__.dbEntity.name}'
				Expecting a nested property definition.
				`)
			}
		}
	}

	private getPropertyChainDesription(
		dbPropertyChain: DbProperty[]
	): string {
		const rootDbEntity: DbEntity = dbPropertyChain[0].entity
		let prefix = '    '
		let lastPrefix = ''
		let ending = `...
}`
		let message = `
Updated Entity: ${rootDbEntity.name}, property chain:
{`
		const maxChainDepth = dbPropertyChain.length
		for (let i = 0; i < maxChainDepth; i++) {
			let dbProperty = dbPropertyChain[i]
			message += `${prefix}${dbProperty.name}: `
			if (i + 1 < maxChainDepth) {
				message += `: {\n`
			} else {
				message += 'VALUE'
			}
			ending = prefix + `...
${lastPrefix}}`
			lastPrefix = prefix
			prefix += '    '
		}

		return `${message}
${ending}`
	}

}
