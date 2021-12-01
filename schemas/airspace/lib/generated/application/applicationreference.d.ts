import { IVersionedApplicationObject } from './versionedapplicationobject';
import { IApplicationVersion } from './applicationversion';
export interface IApplicationReference extends IVersionedApplicationObject {
    ownApplicationVersion: IApplicationVersion;
    referencedApplicationVersion: IApplicationVersion;
    index?: number;
}
//# sourceMappingURL=applicationreference.d.ts.map