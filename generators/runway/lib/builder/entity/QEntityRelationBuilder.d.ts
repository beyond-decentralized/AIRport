import { EntityCandidate } from "../../parser/EntityCandidate";
import { QCoreEntityBuilder } from "../QBuilder";
import { QEntityFileBuilder } from "./QEntityFileBuilder";
export declare class QEntityRelationBuilder extends QCoreEntityBuilder {
    constructor(entity: EntityCandidate, fullGenerationPath: string, workingDirPath: string, fileBuilder: QEntityFileBuilder, entityMapByName: {
        [entityName: string]: EntityCandidate;
    });
    build(): string;
}
