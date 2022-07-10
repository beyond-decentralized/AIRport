import { IVersionedApplicationObject } from './versionedapplicationobject';
import { ApplicationEntity_TableConfiguration } from '@airport/tarmaq-entity';
import { IApplicationColumn } from './applicationcolumn';
import { IApplicationVersion } from './applicationversion';
import { IApplicationOperation } from './applicationoperation';
import { IApplicationProperty } from './applicationproperty';
import { IApplicationRelation } from './applicationrelation';
export interface IApplicationEntity extends IVersionedApplicationObject {
    _localId: number;
    index?: number;
    isLocal?: boolean;
    isAirEntity?: boolean;
    name?: string;
    tableConfig?: ApplicationEntity_TableConfiguration;
    applicationVersion?: IApplicationVersion;
    columns?: IApplicationColumn[];
    operations?: IApplicationOperation[];
    properties?: IApplicationProperty[];
    relations?: IApplicationRelation[];
    relationReferences?: IApplicationRelation[];
    columnMap?: {
        [name: string]: IApplicationColumn;
    };
    idColumns?: IApplicationColumn[];
    idColumnMap?: {
        [name: string]: IApplicationColumn;
    };
    propertyMap?: {
        [name: string]: IApplicationProperty;
    };
}
//# sourceMappingURL=applicationentity.d.ts.map