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
		public entityProperty: PropertyDocEntry,
		entityMapByName: { [entityName: string]: EntityCandidate },
		private buildRelationInstance: boolean
	) {
	}

	buildDefinition(): string {
		let type: string
		let entityType = this.entityProperty.type
		if (this.entityProperty.entity) {
			entityType = this.entityProperty.entity.type
		} else {
			entityType = this.entityProperty.otherApplicationDbEntity.name
		}
		entityType = entityType.replace('[]', '')
		type = `V${entityType}`
			+ (this.buildRelationInstance ? 'VRelation' : 'VId')
		if (this.entityProperty.isArray) {
			let interfaceName = 'IVOneToManyRelation';
			if (entityExtendsOrIsAirEntity(this.parentBuilder.entity)[0]) {
				interfaceName = 'IVAirEntityOneToManyRelation'
				type = `${interfaceName}<I${entityType}, V${entityType}>`
			} else {
				type = `${interfaceName}<V${entityType}>`
			}
		}
		return `${this.entityProperty.name}: ${type};`

	}

	build(): string {
		throw new Error(`Not implemented`)
	}

	buildInterfaceDefinition(
		idOnly: boolean,
		optional: boolean = true,
		forInternalInterfaces: boolean = true,
		forCascadeGraph: boolean = false
	): string {
		if (idOnly && this.entityProperty.decorators.filter(
			decorator => decorator.name === 'OneToMany').length) {
			return null
		}
		let typeSuffix = ''
		if (forInternalInterfaces) {
			// typeSuffix = idOnly ? (optional ? 'EOptionalId' : 'EId') :
			// 	(forCascadeGraph ? 'Graph' : 'ESelect')
			typeSuffix = 'VDescriptor'
		}
		let type = this.entityProperty.type
		if (this.entityProperty.entity) {
			type = this.entityProperty.entity.type
		} else {
			type = this.entityProperty.otherApplicationDbEntity.name
		}
		if (forInternalInterfaces) {
			if (!forCascadeGraph) {
				type = type.replace('[]', '')
			} else {
				typeSuffix += this.entityProperty.isArray ? '[]' : ''
			}
		} else {
			type = 'I' + type
			if (this.entityProperty.entity && this.entityProperty.isArray) {
				type += '[]'
			}
		}
		const iType = type + typeSuffix
		const definition = `${this.entityProperty.name}${optional ? '?' : ''}: ${iType};`

		return definition
	}

}
