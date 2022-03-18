import { EntityCandidate } from '../../parser/EntityCandidate'
import { entityExtendsOrIsRepositoryEntity, entityExtendsRepositoryEntity } from '../application/SApplicationBuilder'
import { QCoreEntityBuilder } from '../Builder'
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
		const [isRepositoryEntity, _] = entityExtendsOrIsRepositoryEntity(this.entity)
		let parentInterfaceType = 'IQRelation'
		if (isRepositoryEntity) {
			parentInterfaceType = 'IQRepositoryEntityRelation'
		}
		let parentEntityQType = `${parentInterfaceType}<${entity}, ${qName}>`
		if (isMappedSuperclass) {
			genericType = '<SubType, SubQType extends IQEntity<SubType>>'
			parentEntityQType = `${parentInterfaceType}<SubType, SubQType>`
		}

		if (this.entity.parentEntity) {
			let iqEntity = qName
			if (isMappedSuperclass) {
				iqEntity = 'SubQType'
				entity = 'SubType'
			}
			parentEntityQType = `Q${this.entity.parentEntity.type}QRelation<${entity}, ${iqEntity}>`
		}

		const classSource = `// Entity Relation Interface
export interface ${qName}QRelation${genericType}
	extends ${parentEntityQType}, ${qName}QId {
}`

		return classSource
	}

}
