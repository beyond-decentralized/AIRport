import { EntityCandidate } from '../../parser/EntityCandidate';
import { QCoreEntityBuilder } from '../Builder';
import { QEntityFileBuilder } from './QEntityFileBuilder';
export declare class QEntityRelationBuilder extends QCoreEntityBuilder {
    constructor(entity: EntityCandidate, fullGenerationPath: string, workingDirPath: string, fileBuilder: QEntityFileBuilder, entityMapByName: {
        [entityName: string]: EntityCandidate;
    });
    build(): string;
}
//# sourceMappingURL=QEntityRelationBuilder.d.ts.map