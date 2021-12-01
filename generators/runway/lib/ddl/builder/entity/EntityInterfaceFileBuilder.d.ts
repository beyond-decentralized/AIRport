import { Configuration } from '../../options/Options';
import { EntityCandidate } from '../../parser/EntityCandidate';
import { PathBuilder } from '../PathBuilder';
import { IBuilder } from '../Builder';
import { SIndexedEntity } from '../application/SEntity';
import { FileBuilder } from './FileBuilder';
import { IEntityInterfaceBuilder } from './IEntityInterfaceBuilder';
import { QEntityBuilder } from './QEntityBuilder';
import { QRelationBuilder } from './QRelationBuilder';
/**
 * Created by Papa on 4/26/2016.
 */
export declare class EntityInterfaceFileBuilder extends FileBuilder implements IBuilder {
    qEntityBuilder: QEntityBuilder;
    entityInterfaceBuilder: IEntityInterfaceBuilder;
    constructor(entity: EntityCandidate, fullGenerationPath: string, pathBuilder: PathBuilder, entityMapByName: {
        [entityName: string]: EntityCandidate;
    }, configuration: Configuration, sIndexedEntity: SIndexedEntity);
    build(): string;
    addRelationImports(relationBuilders: QRelationBuilder[]): void;
    protected addImports(): void;
}
//# sourceMappingURL=EntityInterfaceFileBuilder.d.ts.map