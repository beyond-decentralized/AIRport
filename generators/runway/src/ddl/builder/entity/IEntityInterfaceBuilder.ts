import {TypeOrParamDocEntry} from '../../parser/DocEntry'
import {EntityCandidate}     from '../../parser/EntityCandidate'
import {addImportForType}    from '../../../resolve/pathResolver'
import {
	entityExtendsRepositoryEntity,
	getManyToOneDecorator
}                            from '../schema/SSchemaBuilder'
import {IBuilder}            from '../Builder'
import {QColumnBuilder}      from './QColumnBuilder'
import {QEntityBuilder}      from './QEntityBuilder'
import {QPropertyBuilder}    from './QPropertyBuilder'
import {QRelationBuilder}    from './QRelationBuilder'
import {QTransientBuilder}   from './QTransientBuilder'

/**
 * Created by Papa on 5/20/2016.
 */
export class IEntityInterfaceBuilder
	implements IBuilder {

	idPropertyBuilders: QPropertyBuilder[]
	idRelationBuilders: QRelationBuilder[]
	nonIdPropertyBuilders: QPropertyBuilder[]
	nonIdRelationBuilders: QRelationBuilder[]
	transientPropertyBuilders: QTransientBuilder[]

	constructor(
		public entity: EntityCandidate,
		private qEntityBuilder: QEntityBuilder
	) {
		this.idPropertyBuilders        = qEntityBuilder.idPropertyBuilders
		this.idRelationBuilders        = qEntityBuilder.idRelationBuilders
		this.nonIdPropertyBuilders     = qEntityBuilder.nonIdPropertyBuilders
		this.nonIdRelationBuilders     = qEntityBuilder.nonIdRelationBuilders
		this.transientPropertyBuilders = qEntityBuilder.transientPropertyBuilders
	}

	build(): string {
		let entityName = `${this.entity.docEntry.name}`

		let idProperties = ``
		this.idPropertyBuilders.forEach((
			builder: QPropertyBuilder
		) => {
			idProperties += `\t${builder.buildInterfaceDefinition(false, false)}\n`
		})

		let idRelations = ``
		this.idRelationBuilders.forEach((
			builder: QRelationBuilder
		) => {
			const idRelation = builder.buildInterfaceDefinition(true, false, false)
			if (idRelation) {
				idRelations += `\t${idRelation}\n`
			}
		})

		let nonIdProperties = ``
		this.nonIdPropertyBuilders.forEach((
			builder: QPropertyBuilder
		) => {
			nonIdProperties += `\t${builder.buildInterfaceDefinition(true, false)}\n`
		})

		let nonIdRelations = ``
		this.nonIdRelationBuilders.forEach((
			builder: QRelationBuilder
		) => {
			const nonIdRelation = builder.buildInterfaceDefinition(false, true, false)
			if (nonIdRelation) {
				nonIdRelations += `\t${nonIdRelation}\n`
			}
		})

		const [isRepositoryEntity, isLocal]
			                           = entityExtendsRepositoryEntity(this.entity)

		let transientProperties = ``
		this.transientPropertyBuilders.forEach((
			builder: QTransientBuilder
		) => {
			transientProperties += `\t${builder.buildInterfaceDefinition()}\n`
		})

		let entityExtendsClause                = ''
		if (this.entity.parentEntity) {
			const parentType                   = this.entity.parentEntity.type
			entityExtendsClause                = ` extends I${parentType}`
		}

		const publicMethodSignatures = this.entity.docEntry.methodSignatures
			.map(
				method => {
					let methodParams = method.parameters.map(
						paramDocEntry => {
							const optional = paramDocEntry.optional ? '?' : ''
							return `\t\t${paramDocEntry.name}${optional}: ${this.getTypeString(paramDocEntry)}`
						}).join(',\n')
					methodParams     = methodParams ? `\n${methodParams}\n\t` : ''

					return `\t${method.name}?(${methodParams}): ${this.getTypeString(method.returnType)};`
				}).join('\n')

		let interfaceSource = `
//////////////////////////////
//     ENTITY INTERFACE     //
//////////////////////////////

export interface I${entityName}${entityExtendsClause} {
	
	// Id Properties
${idProperties}
	// Id Relations
${idRelations}
	// Non-Id Properties
${nonIdProperties}
	// Non-Id Relations
${nonIdRelations}
	// Transient Properties
${transientProperties}
	// Public Methods
${publicMethodSignatures}	
}

`

		return interfaceSource
	}

	getTypeString(
		docEntry: TypeOrParamDocEntry
	): string {
		let type = docEntry.type

		let suffix = ''
		if (docEntry.arrayDepth) {
			for (let i = 0; i < docEntry.arrayDepth; i++) {
				suffix += '[]'
			}
		}

		if (docEntry.primitive) {
			return type + suffix
		}
		if (type === 'void') {
			return type
		}
		if (type === 'Date' || type === 'any') {
			return type + suffix
		}

		if (type !== 'Promise') {
			addImportForType(this.entity, type, this.qEntityBuilder.fileBuilder)
		}

		if (docEntry.genericParams.length) {
			suffix = '<' + docEntry.genericParams.map(
				genericParam =>
					this.getTypeString(genericParam)
			).join(', ') + '>' + suffix
		}

		return type + suffix
	}

}