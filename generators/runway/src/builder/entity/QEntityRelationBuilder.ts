import { EntityCandidate } from "../../parser/EntityCandidate";
import { QCoreEntityBuilder } from "../QBuilder";
import { QEntityFileBuilder } from "./QEntityFileBuilder";

export class QEntityRelationBuilder extends QCoreEntityBuilder {

	constructor(
		entity: EntityCandidate,
		fullGenerationPath: string,
		workingDirPath: string,
		fileBuilder: QEntityFileBuilder,
		entityMapByName: { [entityName: string]: EntityCandidate }
	) {
		super(entity, fullGenerationPath, workingDirPath, fileBuilder, entityMapByName);
	}

	build(): string {
		let qName = `Q${this.entity.docEntry.name}`;

		const isMappedSuperclass = this.entity.docEntry.decorators.some(decorator => {
			return decorator.name === 'MappedSuperclass'
		});

		let genericType = '';
		let parentEntityQType = `IQRelation<${qName}>`;
		if (isMappedSuperclass) {
			genericType = '<SubType extends IQEntity>';
			parentEntityQType = `IQRelation<SubType>`;
		}

		if (this.entity.parentEntity) {
			parentEntityQType = `Q${this.entity.parentEntity.type}QRelation<${qName}>`;
		}

		const classSource = `// Entity Relation Interface
export interface ${qName}QRelation${genericType}
	extends ${parentEntityQType}, ${qName}QId {
}`;

		return classSource;
	}

}
