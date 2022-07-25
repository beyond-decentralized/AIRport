import { EntityCandidate } from '../../../parser/EntityCandidate'
import { entityExtendsOrIsAirEntity } from '../../application/SApplicationBuilder'
import { QCoreEntityBuilder } from './QCoreEntityBuilder'
import { QEntityFileBuilder } from './QEntityFileBuilder'

export class QEntityRelationBuilder
	extends QCoreEntityBuilder {

	constructor(
		entity: EntityCandidate,
		fullGenerationPath: string,
		workingDirPath: string,
		fileBuilder: QEntityFileBuilder,
		entityMapByName: { [entityName: string]: EntityCandidate }
	) {
		super(entity, fullGenerationPath, workingDirPath, fileBuilder, entityMapByName)
	}

	build(): string {
		let qName = `Q${this.entity.docEntry.name}`

		const isMappedSuperclass = this.entity.docEntry.decorators.some(decorator => {
			return decorator.name === 'MappedSuperclass'
		})

		let genericType = ''
		let entity = this.entity.docEntry.name
		const [isAirEntity, _] = entityExtendsOrIsAirEntity(this.entity)
		let parentInterfaceType = 'IQRelation'
		if (isAirEntity) {
			parentInterfaceType = 'IQAirEntityRelation'
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
				if(!isMappedSuperclass) {
					entityType = 'I' + entityType
				}
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
