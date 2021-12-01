import { IApplicationEntity } from './applicationentity';
import { IApplicationReference } from './applicationreference';
import { IApplication } from './application';
export interface IApplicationVersion {
    id: number;
    integerVersion?: number;
    versionString?: string;
    majorVersion?: number;
    minorVersion?: number;
    patchVersion?: number;
    application?: IApplication;
    entities?: IApplicationEntity[];
    references?: IApplicationReference[];
    referencedBy?: IApplicationReference[];
    entityMapByName?: {
        [entityName: string]: IApplicationEntity;
    };
    referencesMapByName?: {
        [applicationName: string]: IApplicationReference;
    };
    referencedByMapByName?: {
        [applicationName: string]: IApplicationReference;
    };
}
//# sourceMappingURL=applicationversion.d.ts.map