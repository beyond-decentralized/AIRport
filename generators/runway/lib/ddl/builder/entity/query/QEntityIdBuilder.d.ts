import { EntityCandidate } from "../../../parser/EntityCandidate";
import { QEntityFileBuilder } from "./QEntityFileBuilder";
import { QRelationBuilder } from "./QRelationBuilder";
import { QPropertyBuilder } from "./QPropertyBuilder";
import { QCoreEntityBuilder } from "./QCoreEntityBuilder";
export declare class QEntityIdBuilder extends QCoreEntityBuilder {
    idPropertyBuilders: QPropertyBuilder[];
    idRelationBuilders: QRelationBuilder[];
    constructor(entity: EntityCandidate, fullGenerationPath: string, workingDirPath: string, fileBuilder: QEntityFileBuilder, entityMapByName: {
        [entityName: string]: EntityCandidate;
    });
    build(): string;
}
//# sourceMappingURL=QEntityIdBuilder.d.ts.map