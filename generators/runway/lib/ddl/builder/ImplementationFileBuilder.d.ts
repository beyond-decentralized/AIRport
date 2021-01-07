import { EntityId } from '@airport/ground-control';
import { IBuilder } from './Builder';
import { FileBuilder } from './entity/FileBuilder';
import { PathBuilder } from './PathBuilder';
export declare abstract class ImplementationFileBuilder extends FileBuilder implements IBuilder {
    daoListingFilePath: any;
    protected entityIdMapByName: {
        [entityName: string]: EntityId;
    };
    protected entityNames: string[];
    protected ddlPathMapByEntityName: {
        [entityName: string]: string;
    };
    protected generatedPathMapByEntityName: {
        [entityName: string]: string;
    };
    constructor(fileName: string, pathBuilder: PathBuilder);
    addFileNameAndPaths(entityId: EntityId, entityName: string, fullDdlPath: string, fullGenerationPath: string): void;
    abstract build(): string;
}
//# sourceMappingURL=ImplementationFileBuilder.d.ts.map