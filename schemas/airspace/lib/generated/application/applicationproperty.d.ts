import { IVersionedApplicationObject } from './versionedapplicationobject';
import { IApplicationEntity } from './applicationentity';
import { IApplicationPropertyColumn } from './applicationpropertycolumn';
import { IApplicationRelation } from './applicationrelation';
export interface IApplicationProperty extends IVersionedApplicationObject {
    _localId: number;
    index?: number;
    name?: string;
    isId?: boolean;
    entity?: IApplicationEntity;
    propertyColumns?: IApplicationPropertyColumn[];
    relation?: IApplicationRelation[];
}
//# sourceMappingURL=applicationproperty.d.ts.map