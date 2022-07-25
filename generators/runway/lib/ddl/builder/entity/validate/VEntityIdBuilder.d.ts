import { EntityCandidate } from "../../../parser/EntityCandidate";
import { VEntityFileBuilder } from "./VEntityFileBuilder";
import { VRelationBuilder } from "./VRelationBuilder";
import { VPropertyBuilder } from "./VPropertyBuilder";
import { VCoreEntityBuilder } from "./VCoreEntityBuilder";
export declare class VEntityIdBuilder extends VCoreEntityBuilder {
    idPropertyBuilders: VPropertyBuilder[];
    idRelationBuilders: VRelationBuilder[];
    constructor(entity: EntityCandidate, fullGenerationPath: string, workingDirPath: string, fileBuilder: VEntityFileBuilder, entityMapByName: {
        [entityName: string]: EntityCandidate;
    });
    build(): string;
}
//# sourceMappingURL=VEntityIdBuilder.d.ts.map