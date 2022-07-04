import { ApplicationEntity_TableConfiguration } from '@airport/air-traffic-control';
import { ApplicationEntity_LocalId, ApplicationEntity_IsLocal, ApplicationEntity_IsAirEntity, ApplicationEntity_Name, ApplicationEntity_TableIndex } from '@airport/ground-control';
import { ApplicationColumn } from './ApplicationColumn';
import { ApplicationOperation } from './ApplicationOperation';
import { ApplicationProperty } from './ApplicationProperty';
import { ApplicationRelation } from './ApplicationRelation';
import { ApplicationVersion } from './ApplicationVersion';
import { VersionedApplicationObject } from './VersionedApplicationObject';
import { IApplicationColumn } from '../../generated/application/applicationcolumn';
import { IApplicationProperty } from '../../generated/application/applicationproperty';
export declare class ApplicationEntity extends VersionedApplicationObject {
    _localId: ApplicationEntity_LocalId;
    index: ApplicationEntity_TableIndex;
    isLocal: ApplicationEntity_IsLocal;
    isAirEntity: ApplicationEntity_IsAirEntity;
    name: ApplicationEntity_Name;
    tableConfig: ApplicationEntity_TableConfiguration;
    applicationVersion: ApplicationVersion;
    columns: ApplicationColumn[];
    operations?: ApplicationOperation[];
    properties: ApplicationProperty[];
    relations: ApplicationRelation[];
    relationReferences: ApplicationRelation[];
    columnMap?: {
        [name: string]: IApplicationColumn;
    };
    idColumns: IApplicationColumn[];
    idColumnMap?: {
        [name: string]: IApplicationColumn;
    };
    propertyMap: {
        [name: string]: IApplicationProperty;
    };
}
//# sourceMappingURL=ApplicationEntity.d.ts.map