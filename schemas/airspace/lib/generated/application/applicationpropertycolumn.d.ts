import { IVersionedApplicationObject } from './versionedapplicationobject';
import { IApplicationColumn } from './applicationcolumn';
import { IApplicationProperty } from './applicationproperty';
export interface IApplicationPropertyColumn extends IVersionedApplicationObject {
    column: IApplicationColumn;
    property: IApplicationProperty;
}
//# sourceMappingURL=applicationpropertycolumn.d.ts.map