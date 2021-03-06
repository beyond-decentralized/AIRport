import { Configuration } from '../../options/Options';
import { EntityCandidate } from '../../parser/EntityCandidate';
import { PathBuilder } from '../PathBuilder';
import { IBuilder } from '../Builder';
import { SIndexedEntity } from '../application/SEntity';
import { FileBuilder } from './FileBuilder';
import { IQEntityInterfaceBuilder } from './IQEntityInterfaceBuilder';
import { QEntityBuilder } from './QEntityBuilder';
import { QEntityIdBuilder } from './QEntityIdBuilder';
import { QEntityRelationBuilder } from './QEntityRelationBuilder';
import { QRelationBuilder } from './QRelationBuilder';
/**
 * Created by Papa on 4/26/2016.
 */
export declare class QEntityFileBuilder extends FileBuilder implements IBuilder {
    private entityMapByName;
    private entityPath;
    qEntityBuilder: QEntityBuilder;
    qEntityIdBuilder: QEntityIdBuilder;
    qEntityRelationBuilder: QEntityRelationBuilder;
    qEntityInterfaceBuilder: IQEntityInterfaceBuilder;
    importMap: {
        [fileName: string]: {
            [asName: string]: string;
        };
    };
    constructor(entity: EntityCandidate, fullGenerationPath: string, pathBuilder: PathBuilder, entityMapByName: {
        [entityName: string]: EntityCandidate;
    }, configuration: Configuration, sIndexedEntity: SIndexedEntity, entityPath: string);
    build(): string;
    addRelationImports(relationBuilders: QRelationBuilder[]): void;
    protected addImports(): void;
}
//# sourceMappingURL=QEntityFileBuilder.d.ts.map