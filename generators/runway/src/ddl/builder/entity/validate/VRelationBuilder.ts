import { PropertyDocEntry } from '../../../parser/DocEntry'
import { EntityCandidate } from '../../../parser/EntityCandidate'
import { entityExtendsOrIsAirEntity } from '../../application/SApplicationBuilder';
import {
	IBuilder
} from '../../Builder'
import { IVCoreEntityBuilder } from './VCoreEntityBuilder';

/**
 * Created by Papa on 4/25/2016.
 */

export interface IRelationProperties {

	rootReferencedPropertyName: string;
	referencedPropertyName: string;
	rootReferencedEntityIndex: number;
	rootReferencedTableIndex: number;
	referencedEntityIndex: number;
	referencedTableIndex: number;
	relationProperties: IRelationProperty[];

	relationColumns: { [columnName: string]: string };

}

export interface IRelationProperty {
	referencedColumnName: string;
	columnName: string;
}

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
