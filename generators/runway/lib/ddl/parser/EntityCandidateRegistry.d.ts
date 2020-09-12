import { DbSchema, IDbSchemaBuilder } from '@airport/ground-control';
import { Configuration } from '../options/Options';
import { EntityReference } from './DocEntry';
import { EntityCandidate, Interface } from './EntityCandidate';
/**
 * Created by Papa on 3/27/2016.
 */
export declare class EntityCandidateRegistry {
    private enumMap?;
    entityCandidateMap: Map<string, EntityCandidate>;
    allInterfacesMap: Map<string, Interface[]>;
    configuration: Configuration;
    dbSchemaBuilder: IDbSchemaBuilder;
    allSchemas: DbSchema[];
    schemaMap: {
        [projectName: string]: DbSchema;
    };
    mappedSuperClassMap: {
        [projectName: string]: {
            [mappedSuperClassName: string]: EntityCandidate;
        };
    };
    dictionary: {
        dbColumnRelationMapByManySide: {};
        dbColumnRelationMapByOneSide: {};
    };
    constructor(enumMap?: Map<string, string>);
    addCandidate(candidate: EntityCandidate): void;
    matchVerifiedEntities(//
    targetCandidateRegistry?: EntityCandidateRegistry): {
        [entityName: string]: EntityCandidate;
    };
    classifyEntityProperties(entityInterfaceMap: {
        [interfaceName: string]: Interface;
    }): Set<EntityCandidate>;
    getReferencedSchema(projectName: string, property: EntityReference): DbSchema;
    private getMappedSuperclassFromProject;
    private deserializeEntityCandidate;
    private getOtherSchemaEntity;
    private registerInterface;
    getProjectReferenceFromPath(path: string): string;
    matchToExistingEntity(entityCandidate: EntityCandidate): boolean;
}
//# sourceMappingURL=EntityCandidateRegistry.d.ts.map