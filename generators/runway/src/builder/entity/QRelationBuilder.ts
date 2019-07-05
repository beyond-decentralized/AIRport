import {PropertyDocEntry} from '../../parser/DocEntry'
import {EntityCandidate}  from '../../parser/EntityCandidate'
import {
	IQBuilder,
	IQCoreEntityBuilder
}                         from '../QBuilder'

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

export class QRelationBuilder
	implements IQBuilder {

	constructor(
		private parentBuilder: IQCoreEntityBuilder,
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
			entityType = this.entityProperty.otherSchemaDbEntity.name
		}
		entityType = entityType.replace('[]', '')
		type       = `Q${entityType}`
			+ (this.buildRelationInstance ? 'QRelation' : 'QId')
		if (this.entityProperty.isArray) {
			type = `IQOneToManyRelation<Q${entityType}>`
		}
		return `${this.entityProperty.name}: ${type};`

	}

	build(): string {
		throw new Error(`Not implemented`)
	}

	buildInterfaceDefinition(
		idOnly: boolean,
		optional: boolean              = true,
		forInternalInterfaces: boolean = true,
	): string {
		if (idOnly && this.entityProperty.decorators.filter(
			decorator => decorator.name === 'OneToMany').length) {
			return null
		}
		let typeSuffix = ''
		if (forInternalInterfaces) {
			typeSuffix = idOnly ? (optional ? 'EOptionalId' : 'EId') : 'ESelect'
		}
		let type = this.entityProperty.type
		if (this.entityProperty.entity) {
			type = this.entityProperty.entity.type
		} else {
			type = this.entityProperty.otherSchemaDbEntity.name
		}
		if (forInternalInterfaces) {
			// typeSuffix += this.entityProperty.isArray ? '[]' : '';
			type = type.replace('[]', '')
		} else {
			type = 'I' + type
			if (this.entityProperty.entity && this.entityProperty.isArray) {
				type += '[]'
			}
		}
		const iType      = type + typeSuffix
		const definition = `${this.entityProperty.name}${optional ? '?' : ''}: ${iType};`

		return definition
	}

}
