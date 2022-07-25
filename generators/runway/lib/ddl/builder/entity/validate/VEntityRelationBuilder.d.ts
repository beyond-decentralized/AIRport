import { EntityCandidate } from '../../../parser/EntityCandidate';
import { VCoreEntityBuilder } from './VCoreEntityBuilder';
import { VEntityFileBuilder } from './VEntityFileBuilder';
export declare class VEntityRelationBuilder extends VCoreEntityBuilder {
    constructor(entity: EntityCandidate, fullGenerationPath: string, workingDirPath: string, fileBuilder: VEntityFileBuilder, entityMapByName: {
        [entityName: string]: EntityCandidate;
    });
    build(): string;
}
//# sourceMappingURL=VEntityRelationBuilder.d.ts.map