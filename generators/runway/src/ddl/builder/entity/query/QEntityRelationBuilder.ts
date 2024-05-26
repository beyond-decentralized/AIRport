import { EntityCandidate } from '../../../parser/EntityCandidate'
import { SIndexedApplication } from '../../application/SApplication'
import { entityExtendsOrIsAirEntity, entityExtendsOrIsAirEntityFieldsOrId } from '../../application/SApplicationBuilder'

import { QCoreEntityBuilder } from './QCoreEntityBuilder'
import { QEntityFileBuilder } from './QEntityFileBuilder'

export class QEntityRelationBuilder
	extends QCoreEntityBuilder {

	constructor(
		entity: EntityCandidate,
		fullGenerationPath: string,
		workingDirPath: string,
		fileBuilder: QEntityFileBuilder,
		entityMapByName: { [entityName: string]: EntityCandidate },
		sIndexedApplication: SIndexedApplication
	) {
		super(entity, fullGenerationPath, workingDirPath, fileBuilder, entityMapByName, sIndexedApplication)
	}

	build(): string {
		let qName = `Q${this.entity.docEntry.name}`

		const isMappedSuperclass = this.entity.docEntry.decorators.some(decorator => {
			return decorator.name === 'MappedSuperclass'
		})

		let genericType = ''
		let entity = this.entity.docEntry.name
		let [isAirEntity, _] = entityExtendsOrIsAirEntity(this.entity)
		let isAirEntityIdOrFields = false
		if (!isAirEntity) {
			isAirEntityIdOrFields = entityExtendsOrIsAirEntityFieldsOrId(this.entity)[0]
			isAirEntity = isAirEntityIdOrFields
		}
		let parentInterfaceType = 'IQManyToOneInternalRelation'
		if (isAirEntity) {
			if (isAirEntityIdOrFields) {
				parentInterfaceType = 'IQManyToOneEntityRelation'
			} else {
				parentInterfaceType = 'IQManyToOneAirEntityRelation'
			}
		}
		let parentEntityQType = `${parentInterfaceType}<${qName}>`
		if (isMappedSuperclass) {
			if (isAirEntity) {
				genericType = '<SubType, SubQType extends IQEntity>'
				parentEntityQType = `${parentInterfaceType}<SubType, SubQType>`
			} else {
				genericType = '<SubQType extends IQEntity>'
				parentEntityQType = `${parentInterfaceType}<SubQType>`
			}
		}

		if (this.entity.parentEntity) {
			let iqEntity = qName
			if (isMappedSuperclass) {
				iqEntity = 'SubQType'
				entity = 'SubType'
			}
			if (isAirEntity) {
				let entityType = entity
				parentEntityQType = `Q${this.entity.parentEntity.type}QRelation<${entityType}, ${iqEntity}>`
			} else {
				parentEntityQType = `Q${this.entity.parentEntity.type}QRelation<${iqEntity}>`
			}
		}

		const classSource = `// Entity Relation Interface
export interface ${qName}QRelation${genericType}
	extends ${parentEntityQType}, ${qName}QId {
}`

		return classSource
	}

}
