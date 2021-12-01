import { ApplicationVersionId, ApplicationVersionInteger, ApplicationVersionMajor, ApplicationVersionMinor, ApplicationVersionPatch, ApplicationVersionString } from '@airport/ground-control';
import { Application } from './Application';
import { ApplicationEntity } from './ApplicationEntity';
import { ApplicationReference } from './ApplicationReference';
import { IApplicationEntity } from '../../generated/application/applicationentity';
import { IApplicationReference } from '../../generated/application/applicationreference';
export declare class ApplicationVersion {
    id: ApplicationVersionId;
    integerVersion: ApplicationVersionInteger;
    versionString: ApplicationVersionString;
    majorVersion: ApplicationVersionMajor;
    minorVersion: ApplicationVersionMinor;
    patchVersion: ApplicationVersionPatch;
    application: Application;
    entities: ApplicationEntity[];
    references: ApplicationReference[];
    referencedBy: ApplicationReference[];
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
//# sourceMappingURL=ApplicationVersion.d.ts.map