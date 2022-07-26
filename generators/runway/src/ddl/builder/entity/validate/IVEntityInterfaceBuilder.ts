import { EntityCandidate } from '../../../parser/EntityCandidate'
import { IBuilder } from '../../Builder'
import { VEntityBuilder } from './VEntityBuilder'
import { VPropertyBuilder } from './VPropertyBuilder'
import { VRelationBuilder } from './VRelationBuilder'
import { VTransientBuilder } from './VTransientBuilder'

/**
 * Created by Papa on 5/20/2016.
 */
export class IVEntityInterfaceBuilder
	implements IBuilder {

	idPropertyBuilders: VPropertyBuilder[]
	idRelationBuilders: VRelationBuilder[]
	nonIdPropertyBuilders: VPropertyBuilder[]
	nonIdRelationBuilders: VRelationBuilder[]
	transientPropertyBuilders: VTransientBuilder[]

	constructor(
		public entity: EntityCandidate,
		vEntityBuilder: VEntityBuilder
	) {
		this.idPropertyBuilders = vEntityBuilder.idPropertyBuilders
		this.idRelationBuilders = vEntityBuilder.idRelationBuilders
		this.nonIdPropertyBuilders = vEntityBuilder.nonIdPropertyBuilders
		this.nonIdRelationBuilders = vEntityBuilder.nonIdRelationBuilders
		this.transientPropertyBuilders = vEntityBuilder.transientPropertyBuilders
	}

	build(): string {
		let entityName = `${this.entity.docEntry.name}`

		let idEProperties = ``
		this.idPropertyBuilders.forEach((
			builder: VPropertyBuilder
		) => {
			idEProperties += `\t${builder.buildInterfaceDefinition()}\n`
		})

		let idRelationsForEntityEProperties = ``
		this.idRelationBuilders.forEach((
			builder: VRelationBuilder
		) => {
			idRelationsForEntityEProperties += `\t${builder.buildInterfaceDefinition()}\n`
		})

		let nonIdEProperties = ``
		this.nonIdPropertyBuilders.forEach((
			builder: VPropertyBuilder
		) => {
			nonIdEProperties += `\t${builder.buildInterfaceDefinition()}\n`
		})

		let nonIdRelationsForEntityEProperties = ``
		this.nonIdRelationBuilders.forEach((
			builder: VRelationBuilder
		) => {
			nonIdRelationsForEntityEProperties += `\t${builder.buildInterfaceDefinition()}\n`
		})

		// let transientProperties = ``
		// this.transientPropertyBuilders.forEach((
		// 	builder: VTransientBuilder
		// ) => {
		// 	transientProperties += `\t${builder.buildInterfaceDefinition()}\n`
		// })

		let extendedVInterface = `IEntityVDescriptor`
		if (this.entity.parentEntity) {
			const parentType = this.entity.parentEntity.type
			extendedVInterface = `${parentType}VDescriptor`
		}

		let interfaceSource = `
////////////////////
//  API INTERFACE //
////////////////////

export interface ${entityName}VDescriptor<T>
    extends ${extendedVInterface}<T> {
	// Id Properties
${idEProperties}	
	// Non-Id Properties
${nonIdEProperties}
	// Id Relations - full property interfaces
${idRelationsForEntityEProperties}
  // Non-Id relations (including OneToMany's)
${nonIdRelationsForEntityEProperties}
}

`

		return interfaceSource
	}

}
