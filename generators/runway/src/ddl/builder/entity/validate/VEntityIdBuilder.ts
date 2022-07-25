import {MemberData} from "../../Builder";
import {EntityCandidate}                from "../../../parser/EntityCandidate";
import {VEntityFileBuilder}             from "./VEntityFileBuilder";
import {VRelationBuilder}               from "./VRelationBuilder";
import {VPropertyBuilder}               from "./VPropertyBuilder";
import { VCoreEntityBuilder } from "./VCoreEntityBuilder";

export class VEntityIdBuilder extends VCoreEntityBuilder {

	idPropertyBuilders: VPropertyBuilder[];
	idRelationBuilders: VRelationBuilder[];

	constructor(
		entity: EntityCandidate,
		fullGenerationPath: string,
		workingDirPath: string,
		fileBuilder: VEntityFileBuilder,
		entityMapByName: { [entityName: string]: EntityCandidate },
	) {
		super(entity, fullGenerationPath, workingDirPath, fileBuilder, entityMapByName);

		const idProperties = entity.getIdProperties();
		this.idPropertyBuilders = this.getVPropertyBuilders(idProperties);
		this.idRelationBuilders = this.getVRelationBuilders(idProperties, false);
	}

	build(): string {
		const idPropertyData: MemberData = this.buildPropertyData(this.idPropertyBuilders);
		const idRelationData: MemberData = this.buildRelationData(this.idRelationBuilders);

		let vName = `V${this.entity.docEntry.name}`;

		let extendsVType = '';
		if(this.entity.parentEntity) {
			extendsVType = ' extends V' + this.entity.parentEntity.type + 'VId';
		}

		const classSource = `// Entity Id Interface
export interface ${vName}VId${extendsVType}
{
	
	// Id Fields
${idPropertyData.definitions}
	// Id Relations
${idRelationData.definitions}

}`;

		return classSource;
	}

}