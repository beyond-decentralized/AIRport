import { Configuration } from '../../options/Options';
import { EntityCandidate } from '../../parser/EntityCandidate';
import { PathBuilder } from '../PathBuilder';
import { IQBuilder } from '../QBuilder';
import { SIndexedEntity } from '../schema/SEntity';
import { IQEntityInterfaceBuilder } from './IQEntityInterfaceBuilder';
import { QEntityBuilder } from './QEntityBuilder';
import { QEntityIdBuilder } from './QEntityIdBuilder';
import { QEntityRelationBuilder } from './QEntityRelationBuilder';
import { QRelationBuilder } from './QRelationBuilder';
/**
 * Created by Papa on 4/26/2016.
 */
export declare class QEntityFileBuilder implements IQBuilder {
    private entity;
    fullGenerationPath: string;
    private pathBuilder;
    configuration: Configuration;
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
    }, configuration: Configuration, sIndexedEntity: SIndexedEntity);
    build(): string;
    addRelationImports(relationBuilders: QRelationBuilder[]): void;
    addImport(classNames: (string | {
        asName: string;
        sourceName: string;
    })[], filePath: string, toLowerCase?: boolean): void;
    private buildImports;
}
