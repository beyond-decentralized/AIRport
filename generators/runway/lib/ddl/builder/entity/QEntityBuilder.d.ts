import { EntityCandidate } from "../../parser/EntityCandidate";
import { QCoreEntityBuilder } from "../Builder";
import { SIndexedEntity } from "../application/SEntity";
import { FileBuilder } from './FileBuilder';
import { QColumnBuilder } from "./QColumnBuilder";
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
    constructor(entity: EntityCandidate, fullGenerationPath: string, workingDirPath: string, fileBuilder: FileBuilder, entityMapByName: {
        [entityName: string]: EntityCandidate;
    }, sIndexedEntity: SIndexedEntity);
    build(): string;
}
//# sourceMappingURL=QEntityBuilder.d.ts.map