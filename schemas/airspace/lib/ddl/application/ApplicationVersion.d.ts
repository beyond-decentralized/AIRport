import { ApplicationVersion_LocalId, ApplicationVersion_IntegerVersion, ApplicationVersion_MajorVersion, ApplicationVersion_MinorVersion, ApplicationVersion_PatchVersion, ApplicationVersion_VersionString } from '@airport/ground-control';
import { Application } from './Application';
import { ApplicationEntity } from './ApplicationEntity';
import { ApplicationReference } from './ApplicationReference';
import { IApplicationEntity } from '../../generated/application/applicationentity';
import { IApplicationReference } from '../../generated/application/applicationreference';
import { JsonApplicationWithLastIds } from '@airport/apron';
export declare class ApplicationVersion {
    _localId: ApplicationVersion_LocalId;
    integerVersion: ApplicationVersion_IntegerVersion;
    versionString: ApplicationVersion_VersionString;
    majorVersion: ApplicationVersion_MajorVersion;
    minorVersion: ApplicationVersion_MinorVersion;
    patchVersion: ApplicationVersion_PatchVersion;
    jsonApplication: JsonApplicationWithLastIds;
    application: Application;
    entities: ApplicationEntity[];
    references: ApplicationReference[];
    referencedBy: ApplicationReference[];
    entityMapByName?: {
        [entityName: string]: IApplicationEntity;
    };
    referencesMapByName?: {
        [fullApplication_Name: string]: IApplicationReference;
    };
    referencedByMapByName?: {
        [fullApplication_Name: string]: IApplicationReference;
    };
}
//# sourceMappingURL=ApplicationVersion.d.ts.map