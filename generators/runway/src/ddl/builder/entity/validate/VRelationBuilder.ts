import { PropertyDocEntry } from '../../../parser/DocEntry'
import {
	IBuilder
} from '../../Builder'
import { IVCoreEntityBuilder } from './common'

/**
 * Created by Papa on 4/25/2016.
 */

export class VRelationBuilder
	implements IBuilder {

	constructor(
		private parentBuilder: IVCoreEntityBuilder,
		public entityProperty: PropertyDocEntry
	) {
	}

	build(): string {
		throw new Error(`Not Used`)
	}

	buildInterfaceDefinition(): string {
		let typeSuffix = 'VDescriptor'

		let type = this.entityProperty.type
		if (this.entityProperty.entity) {
			type = this.entityProperty.entity.type
		} else {
			type = this.entityProperty.otherApplicationDbEntity.name
		}

		type = type.replace('[]', '')

		const descriptorType = type + typeSuffix
		const definition = `${this.entityProperty.name}?: ${descriptorType}<${type}>`

		return definition
	}

}
