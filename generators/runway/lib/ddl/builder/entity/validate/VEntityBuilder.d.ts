import { EntityCandidate } from "../../../parser/EntityCandidate";
import { SIndexedEntity } from "../../application/SEntity";
import { FileBuilder } from '../FileBuilder';
import { VPropertyBuilder } from "./VPropertyBuilder";
import { VRelationBuilder } from "./VRelationBuilder";
import { VTransientBuilder } from "./VTransientBuilder";
import { VCoreEntityBuilder } from "./VCoreEntityBuilder";
/**
 * Created by Papa on 4/25/2016.
 */
export declare class VEntityBuilder extends VCoreEntityBuilder {
    sIndexedEntity: SIndexedEntity;
    idPropertyBuilders: VPropertyBuilder[];
    nonIdPropertyBuilders: VPropertyBuilder[];
    nonIdRelationBuilders: VRelationBuilder[];
    idRelationBuilders: VRelationBuilder[];
    transientPropertyBuilders: VTransientBuilder[];
    constructor(entity: EntityCandidate, fullGenerationPath: string, workingDirPath: string, fileBuilder: FileBuilder, entityMapByName: {
        [entityName: string]: EntityCandidate;
    }, sIndexedEntity: SIndexedEntity);
    build(): string;
}
//# sourceMappingURL=VEntityBuilder.d.ts.map