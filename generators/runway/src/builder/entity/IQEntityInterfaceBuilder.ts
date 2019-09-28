import {EntityCandidate}  from '../../parser/EntityCandidate'
import {
	entityExtendsRepositoryEntity,
	getManyToOneDecorator
}                         from '../schema/SSchemaBuilder'
import {IBuilder}         from '../Builder'
import {QColumnBuilder}   from './QColumnBuilder'
import {QEntityBuilder}   from './QEntityBuilder'
import {QPropertyBuilder} from './QPropertyBuilder'
import {QRelationBuilder} from './QRelationBuilder'

/**
 * Created by Papa on 5/20/2016.
 */
export class IQEntityInterfaceBuilder
	implements IBuilder {

	idPropertyBuilders: QPropertyBuilder[]
	idRelationBuilders: QRelationBuilder[]
	nonIdColumnBuilders: QColumnBuilder[]
	nonIdPropertyBuilders: QPropertyBuilder[]
	nonIdRelationBuilders: QRelationBuilder[]

	constructor(
		public entity: EntityCandidate,
		private qEntityBuilder: QEntityBuilder
	) {
		this.idPropertyBuilders    = qEntityBuilder.idPropertyBuilders
		this.idRelationBuilders    = qEntityBuilder.idRelationBuilders
		this.nonIdColumnBuilders   = qEntityBuilder.nonIdColumnBuilders
		this.nonIdPropertyBuilders = qEntityBuilder.nonIdPropertyBuilders
		this.nonIdRelationBuilders = qEntityBuilder.nonIdRelationBuilders
	}

	build(): string {
		let entityName = `${this.entity.docEntry.name}`

		let idEProperties = ``
		this.idPropertyBuilders.forEach((
			builder: QPropertyBuilder
		) => {
			idEProperties += `\t${builder.buildInterfaceDefinition(false)}\n`
		})

		let optionalIdEProperties = ``
		this.idPropertyBuilders.forEach((
			builder: QPropertyBuilder
		) => {
			optionalIdEProperties += `\t${builder.buildInterfaceDefinition()}\n`
		})

		let idRelationsEntityIdEProperties = ``
		this.idRelationBuilders.forEach((
			builder: QRelationBuilder
		) => {
			const idRelationsEntityIdProperty = builder.buildInterfaceDefinition(true, false)
			if (idRelationsEntityIdProperty) {
				idRelationsEntityIdEProperties += `\t${idRelationsEntityIdProperty}\n`
			}
		})

		let optionalIdRelationsEntityIdEProperties = ``
		this.idRelationBuilders.forEach((
			builder: QRelationBuilder
		) => {
			const idRelationsEntityIdProperty = builder.buildInterfaceDefinition(true)
			if (idRelationsEntityIdProperty) {
				optionalIdRelationsEntityIdEProperties += `\t${idRelationsEntityIdProperty}\n`
			}
		})

		let idRelationsForEntityEProperties = ``
		this.idRelationBuilders.forEach((
			builder: QRelationBuilder
		) => {
			idRelationsForEntityEProperties += `\t${builder.buildInterfaceDefinition(false)}\n`
		})

		let nonIdEProperties = ``
		this.nonIdPropertyBuilders.forEach((
			builder: QPropertyBuilder
		) => {
			nonIdEProperties += `\t${builder.buildInterfaceDefinition()}\n`
		})

		let nonIdEColumns = ``
		this.nonIdColumnBuilders.forEach((
			builder: QColumnBuilder
		) => {
			nonIdEColumns += `\t${builder.buildInterfaceDefinition()}\n`
		})

		let nonIdRelationsForUpdateEProperties = ``
		this.nonIdRelationBuilders.forEach((
			builder: QRelationBuilder
		) => {
			const nonIdRelationForUpdateProperties = builder.buildInterfaceDefinition(true)
			if (nonIdRelationForUpdateProperties) {
				nonIdRelationsForUpdateEProperties += `\t${nonIdRelationForUpdateProperties}\n`
			}
		})

		let nonIdRelationsForEntityEProperties = ``
		this.nonIdRelationBuilders.forEach((
			builder: QRelationBuilder
		) => {
			nonIdRelationsForEntityEProperties += `\t${builder.buildInterfaceDefinition(false)}\n`
		})

		const [isRepositoryEntity, isLocal]
			                           = entityExtendsRepositoryEntity(this.entity)
		let relationsForCascadeGraph = ``
		if (!isRepositoryEntity) {
			this.idRelationBuilders.forEach((
				builder: QRelationBuilder
			) => {
				if (getManyToOneDecorator(builder.entityProperty)) {
					// Do NOT cascade @ManyToOne's
					return
				}
				relationsForCascadeGraph += `\t${builder.buildInterfaceDefinition(
					false, true, true, true)}\n`
			})
		}

		this.nonIdRelationBuilders.forEach((
			builder: QRelationBuilder
		) => {
			if (getManyToOneDecorator(builder.entityProperty)) {
				// Do NOT cascade @ManyToOne's
				return
			}
			relationsForCascadeGraph += `\t${builder.buildInterfaceDefinition(
				false, true, true, true)}\n`
		})

		let extendedQInterface                 = `IEntitySelectProperties`
		let extendedQUpdatePropertiesInterface = `IEntityUpdateProperties`
		let extendedQCascadeGraphInterface     = `IEntityCascadeGraph`
		let extendedQUpdateColumnsInterface    = `IEntityUpdateColumns`
		let extendedQIdInterface               = 'IEntityIdProperties'
		if (this.entity.parentEntity) {
			const parentType                   = this.entity.parentEntity.type
			extendedQInterface                 = `${parentType}ESelect`
			extendedQUpdatePropertiesInterface = `${parentType}EUpdateProperties`
			extendedQCascadeGraphInterface     = `${parentType}ECascadeGraph`
			extendedQUpdateColumnsInterface    = `${parentType}EUpdateColumns`
			extendedQIdInterface               = `${parentType}EId`
		}

		let interfaceSource = `
//////////////////////////////
//  API SPECIFIC INTERFACES //
//////////////////////////////

/**
 * SELECT - All fields and relations (optional).
 */
export interface ${entityName}ESelect
    extends ${extendedQInterface}, ${entityName}EOptionalId {
	// Non-Id Properties
${nonIdEProperties}
	// Id Relations - full property interfaces
${idRelationsForEntityEProperties}
  // Non-Id relations (including OneToMany's)
${nonIdRelationsForEntityEProperties}
}

/**
 * DELETE - Ids fields and relations only (required).
 */
export interface ${entityName}EId
    extends ${extendedQIdInterface} {
	// Id Properties
${idEProperties}
	// Id Relations - Ids only
${idRelationsEntityIdEProperties}
}

/**
 * Ids fields and relations only (optional).
 */
export interface ${entityName}EOptionalId {
	// Id Properties
${optionalIdEProperties}
	// Id Relations - Ids only
${optionalIdRelationsEntityIdEProperties}
}

/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface ${entityName}EUpdateProperties
	extends ${extendedQUpdatePropertiesInterface} {
	// Non-Id Properties
${nonIdEProperties}
	// Non-Id Relations - ids only & no OneToMany's
${nonIdRelationsForUpdateEProperties}
}

/**
 * PERSIST CASCADE - non-id relations (optional).
 */
export interface ${entityName}ECascadeGraph
	extends ${extendedQCascadeGraphInterface} {
	// Cascading Relations
${relationsForCascadeGraph}
}

/**
 * UPDATE - non-id columns (optional).
 */
export interface ${entityName}EUpdateColumns
	extends ${extendedQUpdateColumnsInterface} {
	// Non-Id Columns
${nonIdEColumns}
}

/**
 * CREATE - id fields and relations (required) and non-id fields and relations (optional).
 */
export interface ${entityName}ECreateProperties
extends Partial<${entityName}EId>, ${entityName}EUpdateProperties {
}

/**
 * CREATE - id columns (required) and non-id columns (optional).
 */
export interface ${entityName}ECreateColumns
extends ${entityName}EId, ${entityName}EUpdateColumns {
}

`

		return interfaceSource
	}

}
