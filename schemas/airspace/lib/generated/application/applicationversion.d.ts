import { JsonApplicationWithLastIds } from '@airport/apron';
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
    jsonApplication?: JsonApplicationWithLastIds;
    application?: IApplication;
    entities?: IApplicationEntity[];
    references?: IApplicationReference[];
    referencedBy?: IApplicationReference[];
    entityMapByName?: {
        [entityName: string]: IApplicationEntity;
    };
    referencesMapByName?: {
        [fullApplicationName: string]: IApplicationReference;
    };
    referencedByMapByName?: {
        [fullApplicationName: string]: IApplicationReference;
    };
}
//# sourceMappingURL=applicationversion.d.ts.map