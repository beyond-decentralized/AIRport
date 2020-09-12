import {EntityCandidate}    from '../../parser/EntityCandidate'
import {QCoreEntityBuilder} from '../Builder'
import {QEntityFileBuilder} from './QEntityFileBuilder'

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

		let genericType       = ''
		let parentEntityQType = `IQRelation<${qName}>`
		if (isMappedSuperclass) {
			genericType       = '<SubType extends IQEntity>'
			parentEntityQType = `IQRelation<SubType>`
		}

		if (this.entity.parentEntity) {
			let iqEntity = qName
			if (isMappedSuperclass) {
				iqEntity = 'SubType'
			}
			parentEntityQType = `Q${this.entity.parentEntity.type}QRelation<${iqEntity}>`
		}

		const classSource = `// Entity Relation Interface
export interface ${qName}QRelation${genericType}
	extends ${parentEntityQType}, ${qName}QId {
}`

		return classSource
	}

}
