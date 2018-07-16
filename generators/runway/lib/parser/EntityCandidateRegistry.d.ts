import { DbSchema, IDbSchemaBuilder } from "@airport/ground-control";
import { Configuration } from "../options/Options";
import { EntityCandidate, Interface } from "./EntityCandidate";
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
    constructor(enumMap?: Map<string, string>);
    addCandidate(candidate: EntityCandidate): void;
    matchVerifiedEntities(//
    targetCandidateRegistry?: EntityCandidateRegistry): {
        [entityName: string]: EntityCandidate;
    };
    classifyEntityProperties(entityInterfaceMap: {
        [interfaceName: string]: Interface;
    }): Set<EntityCandidate>;
    private getOtherSchemaEntity;
    private registerInterface;
    getProjectReferenceFromPath(path: string): string;
    matchToExistingEntity(entityCandidate: EntityCandidate): boolean;
}
