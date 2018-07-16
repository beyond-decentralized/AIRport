import { EntityCandidate } from "../../parser/EntityCandidate";
import { QCoreEntityBuilder } from "../QBuilder";
import { SIndexedEntity } from "../schema/SEntity";
import { QColumnBuilder } from "./QColumnBuilder";
import { QEntityFileBuilder } from "./QEntityFileBuilder";
import { QPropertyBuilder } from "./QPropertyBuilder";
import { QRelationBuilder } from "./QRelationBuilder";
import { QTransientBuilder } from "./QTransientBuilder";
/**
 * Created by Papa on 4/25/2016.
 */
export declare class QEntityBuilder extends QCoreEntityBuilder {
    sIndexedEntity: SIndexedEntity;
    idColumnBuilders: QColumnBuilder[];
    idPropertyBuilders: QPropertyBuilder[];
    nonIdColumnBuilders: QColumnBuilder[];
    nonIdPropertyBuilders: QPropertyBuilder[];
    nonIdRelationBuilders: QRelationBuilder[];
    idRelationBuilders: QRelationBuilder[];
    transientPropertyBuilders: QTransientBuilder[];
    constructor(entity: EntityCandidate, fullGenerationPath: string, workingDirPath: string, fileBuilder: QEntityFileBuilder, entityMapByName: {
        [entityName: string]: EntityCandidate;
    }, sIndexedEntity: SIndexedEntity);
    build(): string;
}
