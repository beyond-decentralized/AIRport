import { DbSchema } from '@airport/ground-control';
import { ISchemaLoader } from '@airport/taxiway/lib/SchemaLoader';
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
    schemaMap: {
        [projectName: string]: DbSchema;
    };
    mappedSuperClassMap: {
        [projectName: string]: {
            [mappedSuperClassName: string]: EntityCandidate;
        };
    };
    schemaLoader: ISchemaLoader;
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
    getProjectReferenceFromPath(path: string): string;
    matchToExistingEntity(entityCandidate: EntityCandidate): boolean;
    private getMappedSuperclassFromProject;
    private deserializeEntityCandidate;
    private getOtherSchemaEntity;
    private registerInterface;
}
//# sourceMappingURL=EntityCandidateRegistry.d.ts.map