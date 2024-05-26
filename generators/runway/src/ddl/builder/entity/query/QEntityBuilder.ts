import { EntityCandidate } from "../../../parser/EntityCandidate";
import {
	MemberData
} from "../../Builder";
import { SIndexedEntity } from "../../application/SEntity";
import { SColumn } from "../../application/SProperty";
import { FileBuilder } from '../FileBuilder'
import { QColumnBuilder } from "./QColumnBuilder";
import { QPropertyBuilder } from "./QPropertyBuilder";
import { QRelationBuilder } from "./QRelationBuilder";
import { QTransientBuilder } from "./QTransientBuilder";
import { QCoreEntityBuilder } from "./QCoreEntityBuilder";
import { SIndexedApplication } from "../../application/SApplication";

/**
 * Created by Papa on 4/25/2016.
 */
export class QEntityBuilder extends QCoreEntityBuilder {

	idColumnBuilders: QColumnBuilder[];
	idPropertyBuilders: QPropertyBuilder[];
	nonIdColumnBuilders: QColumnBuilder[];
	nonIdPropertyBuilders: QPropertyBuilder[];
	nonIdRelationBuilders: QRelationBuilder[];
	idRelationBuilders: QRelationBuilder[];
	transientPropertyBuilders: QTransientBuilder[];

	constructor(
		entity: EntityCandidate,
		fullGenerationPath: string,
		workingDirPath: string,
		fileBuilder: FileBuilder,
		entityMapByName: { [entityName: string]: EntityCandidate },
		sIndexedEntity: SIndexedEntity,
		sIndexedApplication: SIndexedApplication
	) {
		super(entity, fullGenerationPath, workingDirPath, fileBuilder, entityMapByName, sIndexedApplication);

		let idColumns = [];
		if (sIndexedEntity) {
			idColumns = sIndexedEntity.idColumns;
		}
		this.idColumnBuilders = this.getQColumnBuilders(idColumns);
		const idProperties = entity.getIdProperties();
		this.idPropertyBuilders = this.getQPropertyBuilders(idProperties);
		this.idRelationBuilders = this.getQRelationBuilders(idProperties, true);

		let nonIdColumns = [];
		if (sIndexedEntity) {
			nonIdColumns = sIndexedEntity.columns.filter((
				column: SColumn
			) => {
				if (idColumns.some(
					idColumn => column.name === idColumn.name)) {
					return false;
				}
				return true;
			});
		}
		this.nonIdColumnBuilders = this.getQColumnBuilders(nonIdColumns);

		const nonIdProperties = entity.getNonIdProperties();
		this.nonIdPropertyBuilders = this.getQPropertyBuilders(nonIdProperties);
		this.nonIdRelationBuilders = this.getQRelationBuilders(nonIdProperties, true);
		this.transientPropertyBuilders = this.getQTransientPropertyBuilders(entity.getTransientProperties());
	}

	build(): string {
		const idPropertyData: MemberData
			= this.buildPropertyData(this.idPropertyBuilders);
		const nonIdPropertyData: MemberData
			= this.buildPropertyData(this.nonIdPropertyBuilders);
		const nonIdRelationData
			= this.buildRelationData(this.nonIdRelationBuilders);
		const idRelationData
			= this.buildRelationData(this.idRelationBuilders);

		let parentEntityQType = 'IQEntity';
		if (this.entity.parentEntity) {
			parentEntityQType = 'Q' + this.entity.parentEntity.type;
		}

		let qName = `Q${this.entity.docEntry.name}`;

		let interfaceGenericAndExtends;
		// if (this.entity.docEntry.isMappedSuperclass) {
			interfaceGenericAndExtends = ` extends ${parentEntityQType}`
		// } else {
		// 	interfaceGenericAndExtends = ` extends ${parentEntityQType}`
		// }

		let classSource = `/**
 * Query Entity Query Definition (used for Q.DbEntity_Name).
 */
export interface ${qName}<IQE extends ${qName} = any>${interfaceGenericAndExtends}<IQE | ${qName}>
{
	// Id Fields
${idPropertyData.definitions}
	// Id Relations
${idRelationData.definitions}
	// Non-Id Fields
${nonIdPropertyData.definitions}
	// Non-Id Relations
${nonIdRelationData.definitions}
}
`;

		return idRelationData.customInterfaces
		+ nonIdRelationData.customInterfaces + classSource;
	}
}
