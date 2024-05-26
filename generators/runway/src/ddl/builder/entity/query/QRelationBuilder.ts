import { PropertyDocEntry } from '../../../parser/DocEntry'
import { EntityCandidate } from '../../../parser/EntityCandidate'
import { entityExtendsOrIsAirEntity } from '../../application/SApplicationBuilder'
import {
	IBuilder
} from '../../Builder'
import { getQPrimitiveFieldInterface, IQCoreEntityBuilder } from './common'

/**
 * Created by Papa on 4/25/2016.
 */

export interface IRelationProperties {

	rootReferencedPropertyName: string
	referencedPropertyName: string
	rootReferencedEntityIndex: number
	rootReferencedTableIndex: number
	referencedEntityIndex: number
	referencedTableIndex: number
	relationProperties: IRelationProperty[]

	relationColumns: { [columnName: string]: string }

}

export interface IRelationProperty {
	referencedColumnName: string
	columnName: string
}

export class QRelationBuilder
	implements IBuilder {

	customInterfaceSource = ''

	constructor(
		private parentBuilder: IQCoreEntityBuilder,
		public entityProperty: PropertyDocEntry,
		private entityMapByName: { [entityName: string]: EntityCandidate },
		private buildRelationInstance: boolean
	) {
	}

	buildCustomInterface(): string {
		if (
			!this.buildRelationInstance
			// if its a @OneToMany
			|| this.entityProperty.isArray
		) {
			return ''
		}

		let joinColumnDecorators = this.entityProperty.decorators.filter(decorator => {
			return ['JoinColumn', 'JoinColumns'].indexOf(decorator.name) > -1
		})
		if (joinColumnDecorators.length !== 1) {
			return ''
		}

		const propertyDescritorMap = this.getPrimiteRelatedEntityPropertiesByColumnName();

		const fieldDefinitions: string[] = []
		let allJoinColumnsPointToIdColumns = true;
		let values = joinColumnDecorators[0].values
		if (values[0] instanceof Array) {
			values = values[0]
		}
		for (const joinColumnValue of values) {
			let propertyDescriptors = propertyDescritorMap[joinColumnValue.referencedColumnName]
			if (!propertyDescriptors) {
				propertyDescriptors = propertyDescritorMap[joinColumnValue.name]
			}
			if (!propertyDescriptors || !propertyDescriptors.length) {
				throw new Error(`Did not find any properties for referenced column:
In class:
	${this.parentBuilder.entity.docEntry.name}
For property:
	${this.entityProperty.name}
"referencedColumnName":
    ${joinColumnValue.referencedColumnName}
				`)

			}

			for (const propertyDescriptor of propertyDescriptors) {
				if (!propertyDescriptor.isId) {
					allJoinColumnsPointToIdColumns = false
				}
			}

			const columnType = propertyDescriptors[0].columnType
			let qFieldName
			if (propertyDescriptors.length > 1) {
				qFieldName = joinColumnValue.referencedColumnName
			} else {
				qFieldName = propertyDescriptors[0].propertyName
			}

			const returnType = getQPrimitiveFieldInterface(columnType)
			fieldDefinitions.push(`${qFieldName}: ${returnType}`)
		}

		if (allJoinColumnsPointToIdColumns) {
			return ''
		}

		let entityType
		if (this.entityProperty.entity) {
			entityType = this.entityProperty.entity.type
		} else {
			entityType = this.entityProperty.otherApplicationDbEntity.name
		}
		entityType = entityType.replace('[]', '')
		let type = `Q${entityType}`

		let ownClassName = this.parentBuilder.entity.type
		this.customInterfaceSource =
			`export interface IQ${ownClassName}_${this.entityProperty.name}QRelation extends IQManyToOneEntityRelation<${entityType}, ${type}> {

${fieldDefinitions.reduce((allDefinitions: any, fieldDefinition) => {
				allDefinitions += `    ${fieldDefinition}\n`

				return allDefinitions
			}, '')}
}

`
		return this.customInterfaceSource;
	}

	buildDefinition(): string {
		if (this.customInterfaceSource) {
			let ownClassName = this.parentBuilder.entity.type
			return `${this.entityProperty.name}: IQ${ownClassName}_${this.entityProperty.name}QRelation`
		}

		let type: string
		let entityType = this.entityProperty.type
		if (this.entityProperty.entity) {
			entityType = this.entityProperty.entity.type
		} else {
			entityType = this.entityProperty.otherApplicationDbEntity.name
		}
		entityType = entityType.replace('[]', '')
		type = `Q${entityType}`
			+ (this.buildRelationInstance ? 'QRelation' : 'QId')
		if (this.entityProperty.isArray) {
			let interfaceName = 'IQOneToManyRelation'
			if (entityExtendsOrIsAirEntity(this.parentBuilder.entity)[0]) {
				interfaceName = 'IQAirEntityOneToManyRelation'
				type = `${interfaceName}<${entityType}, Q${entityType}>`
			} else {
				type = `${interfaceName}<Q${entityType}>`
			}
		}

		return `${this.entityProperty.name}: ${type}`
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
			typeSuffix = idOnly ? (optional ? 'EOptionalId' : 'EId') :
				(forCascadeGraph ? 'Graph' : 'ESelect')
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
		const definition = `${this.entityProperty.name}${optional ? '?' : ''}: ${iType}`

		return definition
	}

	private getPrimiteRelatedEntityPropertiesByColumnName(): {
		[columnName: string]: {
			columnType: string,
			isId: boolean,
			propertyName: string
		}[]
	} {
		let propertiesByColumn: {
			[columnName: string]: {
				columnType: string,
				isId: boolean,
				propertyName: string
			}[]
		} = {}
		if (this.entityProperty.entity) {
			const sIndexedEntity = this.parentBuilder.sIndexedApplication.entityMapByName[this.entityProperty.entity.type]
			for (const sColumn of sIndexedEntity.columns) {
				if (sColumn.propertyRefs.length > 1) {
					continue
				}
				const sProperty = sIndexedEntity.entity.properties[sColumn.propertyRefs[0]]
				this.addPropertyDescriptor(
					sColumn,
					sProperty,
					propertiesByColumn
				)
			}
		} else {
			const dbEntity = this.entityProperty.otherApplicationDbEntity

			for (const dbColumn of dbEntity.columns) {
				for (const dbPropertyColumn of dbColumn.propertyColumns) {
					const dbProperty = dbPropertyColumn.property
					this.addPropertyDescriptor(
						dbColumn,
						dbProperty,
						propertiesByColumn
					)
				}
			}
		}

		return propertiesByColumn
	}

	private addPropertyDescriptor(
		column: {
			idIndex?: number,
			name: string,
			type: string
		},
		property: {
			name: string
		},
		propertiesByColumn: {
			[columnName: string]: {
				columnType: string,
				isId: boolean,
				propertyName: string,
			}[]
		} = {}
	): void {
		let propertyDescriptors = propertiesByColumn[column.name]
		if (!propertyDescriptors) {
			propertyDescriptors = []
			propertiesByColumn[column.name] = propertyDescriptors
		}
		propertyDescriptors.push({
			columnType: column.type,
			isId: typeof column.idIndex === 'number',
			propertyName: property.name
		})
	}

}
