import { JsonApplicationWithLastIds } from '@airport/apron';
import { IApplication } from './application';
import { IApplicationEntity } from './applicationentity';
import { IApplicationReference } from './applicationreference';
export interface IApplicationVersion {
    _localId: number;
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
        [fullApplication_Name: string]: IApplicationReference;
    };
    referencedByMapByName?: {
        [fullApplication_Name: string]: IApplicationReference;
    };
}
//# sourceMappingURL=applicationversion.d.ts.map