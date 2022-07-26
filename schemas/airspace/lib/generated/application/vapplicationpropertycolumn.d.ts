import { VersionedApplicationObjectVDescriptor } from './vversionedapplicationobject';
import { ApplicationColumnVDescriptor } from './vapplicationcolumn';
import { ApplicationColumn } from '../../ddl/application/applicationcolumn';
import { ApplicationPropertyVDescriptor } from './vapplicationproperty';
import { ApplicationProperty } from '../../ddl/application/applicationproperty';
export interface ApplicationPropertyColumnVDescriptor<T> extends VersionedApplicationObjectVDescriptor<T> {
    column?: ApplicationColumnVDescriptor<ApplicationColumn>;
    property?: ApplicationPropertyVDescriptor<ApplicationProperty>;
}
//# sourceMappingURL=vapplicationpropertycolumn.d.ts.map