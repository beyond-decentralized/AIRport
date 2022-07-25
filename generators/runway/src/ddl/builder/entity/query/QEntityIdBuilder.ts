import {MemberData} from "../../Builder";
import {EntityCandidate}                from "../../../parser/EntityCandidate";
import {QEntityFileBuilder}             from "./QEntityFileBuilder";
import {QRelationBuilder}               from "./QRelationBuilder";
import {QPropertyBuilder}               from "./QPropertyBuilder";
import { QCoreEntityBuilder } from "./QCoreEntityBuilder";

export class QEntityIdBuilder extends QCoreEntityBuilder {

	idPropertyBuilders: QPropertyBuilder[];
	idRelationBuilders: QRelationBuilder[];

	constructor(
		entity: EntityCandidate,
		fullGenerationPath: string,
		workingDirPath: string,
		fileBuilder: QEntityFileBuilder,
		entityMapByName: { [entityName: string]: EntityCandidate },
	) {
		super(entity, fullGenerationPath, workingDirPath, fileBuilder, entityMapByName);

		const idProperties = entity.getIdProperties();
		this.idPropertyBuilders = this.getQPropertyBuilders(idProperties);
		this.idRelationBuilders = this.getQRelationBuilders(idProperties, false);
	}

	build(): string {
		const idPropertyData: MemberData = this.buildPropertyData(this.idPropertyBuilders);
		const idRelationData: MemberData = this.buildRelationData(this.idRelationBuilders);

		let qName = `Q${this.entity.docEntry.name}`;

		let extendsQType = '';
		if(this.entity.parentEntity) {
			extendsQType = ' extends Q' + this.entity.parentEntity.type + 'QId';
		}

		const classSource = `// Entity Id Interface
export interface ${qName}QId${extendsQType}
{
	
	// Id Fields
${idPropertyData.definitions}
	// Id Relations
${idRelationData.definitions}

}`;

		return classSource;
	}

}