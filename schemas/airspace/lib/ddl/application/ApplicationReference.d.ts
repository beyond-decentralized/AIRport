import { ApplicationReferenceIndex } from '@airport/ground-control';
import { ApplicationVersion } from './ApplicationVersion';
import { VersionedApplicationObject } from './VersionedApplicationObject';
export declare class ApplicationReference extends VersionedApplicationObject {
    ownApplicationVersion: ApplicationVersion;
    referencedApplicationVersion: ApplicationVersion;
    index: ApplicationReferenceIndex;
}
//# sourceMappingURL=ApplicationReference.d.ts.map