import { VersionedApplicationObjectVDescriptor } from './vversionedapplicationobject';
import { ApplicationColumnVDescriptor } from './vapplicationcolumn';
import { ApplicationPropertyVDescriptor } from './vapplicationproperty';
export interface ApplicationPropertyColumnVDescriptor extends VersionedApplicationObjectVDescriptor {
    column?: ApplicationColumnVDescriptor;
    property?: ApplicationPropertyVDescriptor;
}
//# sourceMappingURL=vapplicationpropertycolumn.d.ts.map