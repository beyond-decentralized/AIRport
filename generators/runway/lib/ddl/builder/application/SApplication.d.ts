import { DbApplication } from '@airport/ground-control';
import { SEntity, SIndexedEntity } from './SEntity';
/**
 * A application.
 */
export interface SApplication {
    domain: 'private' | string;
    entities: SEntity[];
    /**
     * Name of the application.
     */
    name: string;
    packageName: string;
    referencedApplications: SApplicationReference[];
}
export interface SApplicationReference {
    index: number;
    dbApplication: DbApplication;
}
/**
 * A application with additional indexes (maps).
 */
export interface SIndexedApplication {
    /**
     * Entities by their repository table indexes.
     */
    entities: SIndexedEntity[];
    /**
     * Map of all entities by name.
     */
    entityMapByName: {
        [entityName: string]: SIndexedEntity;
    };
    /**
     * Application definition.
     */
    application: SApplication;
    referencedApplicationsByName: {
        [projectName: string]: SApplicationReference;
    };
}
export declare function buildIndexedSApplication(application: SApplication, referencedApplicationsByName: {
    [projectName: string]: SApplicationReference;
}): SIndexedApplication;
//# sourceMappingURL=SApplication.d.ts.map