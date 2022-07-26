import { EntityCandidate } from "../../../parser/EntityCandidate";
import {
	MemberData
} from "../../Builder";
import { SIndexedEntity } from "../../application/SEntity";
import { FileBuilder } from '../FileBuilder'
import { VPropertyBuilder } from "./VPropertyBuilder";
import { VRelationBuilder } from "./VRelationBuilder";
import { VTransientBuilder } from "./VTransientBuilder";
import { VCoreEntityBuilder } from "./VCoreEntityBuilder";

/**
 * Created by Papa on 4/25/2016.
 */
export class VEntityBuilder extends VCoreEntityBuilder {

	idPropertyBuilders: VPropertyBuilder[];
	nonIdPropertyBuilders: VPropertyBuilder[];
	nonIdRelationBuilders: VRelationBuilder[];
	idRelationBuilders: VRelationBuilder[];
	transientPropertyBuilders: VTransientBuilder[];

	constructor(
		entity: EntityCandidate,
		fullGenerationPath: string,
		workingDirPath: string,
		fileBuilder: FileBuilder,
		entityMapByName: { [entityName: string]: EntityCandidate },
		public sIndexedEntity: SIndexedEntity
	) {
		super(entity, fullGenerationPath, workingDirPath, fileBuilder, entityMapByName);

		const idProperties = entity.getIdProperties();
		this.idPropertyBuilders = this.getVPropertyBuilders(idProperties);
		this.idRelationBuilders = this.getVRelationBuilders(idProperties);

		const nonIdProperties = entity.getNonIdProperties();
		this.nonIdPropertyBuilders = this.getVPropertyBuilders(nonIdProperties);
		this.nonIdRelationBuilders = this.getVRelationBuilders(nonIdProperties);
		this.transientPropertyBuilders = this.getVTransientPropertyBuilders(entity.getTransientProperties());
	}

	build(): string {
		throw new Error(`Not Used`)
	}
}
