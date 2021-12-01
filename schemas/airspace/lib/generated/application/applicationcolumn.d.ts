import { IVersionedApplicationObject } from './versionedapplicationobject';
import { IApplicationEntity } from './applicationentity';
import { IApplicationPropertyColumn } from './applicationpropertycolumn';
import { IApplicationRelationColumn } from './applicationrelationcolumn';
export interface IApplicationColumn extends IVersionedApplicationObject {
    id: number;
    index?: number;
    idIndex?: number;
    isGenerated?: boolean;
    allocationSize?: number;
    name?: string;
    notNull?: boolean;
    precision?: number;
    scale?: number;
    type?: string;
    entity?: IApplicationEntity;
    propertyColumns?: IApplicationPropertyColumn[];
    manyRelationColumns?: IApplicationRelationColumn[];
    oneRelationColumns?: IApplicationRelationColumn[];
}
//# sourceMappingURL=applicationcolumn.d.ts.map