import { DbApplication } from '@airport/ground-control';
import { IApplicationLoader } from '../loader/ApplicationLoader';
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
    applicationMap: {
        [projectName: string]: DbApplication;
    };
    mappedSuperClassMap: {
        [projectName: string]: {
            [mappedSuperClassName: string]: EntityCandidate;
        };
    };
    applicationLoader: IApplicationLoader;
    constructor(enumMap?: Map<string, string>);
    addCandidate(candidate: EntityCandidate): void;
    matchVerifiedEntities(//
    targetCandidateRegistry?: EntityCandidateRegistry): Promise<{
        [entityName: string]: EntityCandidate;
    }>;
    classifyEntityProperties(entityInterfaceMap: {
        [interfaceName: string]: Interface;
    }): Set<EntityCandidate>;
    getReferencedApplication(projectName: string, property: EntityReference): DbApplication;
    getProjectReferenceFromPath(path: string): string;
    matchToExistingEntity(entityCandidate: EntityCandidate): boolean;
    private getMappedSuperclassFromProject;
    private deserializeEntityCandidate;
    private getOtherApplicationEntity;
    private registerInterface;
}
//# sourceMappingURL=EntityCandidateRegistry.d.ts.map