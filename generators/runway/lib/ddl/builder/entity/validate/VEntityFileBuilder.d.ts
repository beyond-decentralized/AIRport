import { Configuration } from '../../../options/Options';
import { EntityCandidate } from '../../../parser/EntityCandidate';
import { PathBuilder } from '../../PathBuilder';
import { IBuilder } from '../../Builder';
import { SIndexedEntity } from '../../application/SEntity';
import { FileBuilder } from '../FileBuilder';
import { IVEntityInterfaceBuilder } from './IVEntityInterfaceBuilder';
import { VEntityBuilder } from './VEntityBuilder';
import { VEntityIdBuilder } from './VEntityIdBuilder';
import { VEntityRelationBuilder } from './VEntityRelationBuilder';
import { VRelationBuilder } from './VRelationBuilder';
/**
 * Created by Papa on 4/26/2016.
 */
export declare class VEntityFileBuilder extends FileBuilder implements IBuilder {
    private entityMapByName;
    private entityPath;
    vEntityBuilder: VEntityBuilder;
    vEntityIdBuilder: VEntityIdBuilder;
    vEntityRelationBuilder: VEntityRelationBuilder;
    vEntityInterfaceBuilder: IVEntityInterfaceBuilder;
    importMap: {
        [fileName: string]: {
            [asName: string]: string;
        };
    };
    constructor(entity: EntityCandidate, fullGenerationPath: string, pathBuilder: PathBuilder, entityMapByName: {
        [entityName: string]: EntityCandidate;
    }, configuration: Configuration, sIndexedEntity: SIndexedEntity, entityPath: string);
    build(): string;
    addRelationImports(relationBuilders: VRelationBuilder[]): void;
    protected addImports(): void;
}
//# sourceMappingURL=VEntityFileBuilder.d.ts.map