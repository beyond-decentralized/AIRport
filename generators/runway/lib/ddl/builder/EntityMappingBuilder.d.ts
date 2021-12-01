import { IBuilder } from './Builder';
import { PathBuilder } from './PathBuilder';
export interface IEntityMapping {
    entityIndex: number;
    entityName: string;
    relativePath: string;
}
export interface IEntityMappingBuilder extends IBuilder {
}
export declare class EntityMappingBuilder {
    entityMappingsPath: string;
    private pathBuilder;
    entityMappings: IEntityMapping[];
    constructor(entityMappingsPath: string, pathBuilder: PathBuilder);
    addEntity(entityIndex: number, entityName: string, relativePath: string): void;
    build(applicationDomain: string, applicationName: string): string;
}
//# sourceMappingURL=EntityMappingBuilder.d.ts.map