import {IdRelationData, MemberData} from "../../Builder"
import {EntityCandidate}                from "../../../parser/EntityCandidate"
import {QEntityFileBuilder}             from "./QEntityFileBuilder"
import {QRelationBuilder}               from "./QRelationBuilder"
import {QPropertyBuilder}               from "./QPropertyBuilder"
import { QCoreEntityBuilder } from "./QCoreEntityBuilder"
import { SIndexedApplication } from "../../application/SApplication"

export class QEntityIdBuilder extends QCoreEntityBuilder {

	idPropertyBuilders: QPropertyBuilder[]
	idRelationBuilders: QRelationBuilder[]

	constructor(
		entity: EntityCandidate,
		fullGenerationPath: string,
		workingDirPath: string,
		fileBuilder: QEntityFileBuilder,
		entityMapByName: { [entityName: string]: EntityCandidate },
		sIndexedApplication: SIndexedApplication
	) {
		super(entity, fullGenerationPath, workingDirPath, fileBuilder, entityMapByName, sIndexedApplication)

		const idProperties = entity.getIdProperties()
		this.idPropertyBuilders = this.getQPropertyBuilders(idProperties)
		this.idRelationBuilders = this.getQRelationBuilders(idProperties, false)
	}

	build(): string {
		const idPropertyData: MemberData = this.buildPropertyData(this.idPropertyBuilders)
		const idRelationData: IdRelationData = this.buildRelationData(this.idRelationBuilders)

		let qName = `Q${this.entity.docEntry.name}`

		let extendsQType = ''
		if(this.entity.parentEntity) {
			extendsQType = ' extends Q' + this.entity.parentEntity.type + 'QId'
		}

		const classSource = `// Entity Id Interface
export interface ${qName}QId${extendsQType}
{
	
	// Id Fields
${idPropertyData.definitions}
	// Id Relations
${idRelationData.definitions}

}`

		return `${idRelationData.customInterfaces}${classSource}`
	}

}