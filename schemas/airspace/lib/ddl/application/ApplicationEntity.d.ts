import { TableConfiguration } from '@airport/air-traffic-control';
import { EntityId, EntityIsLocal, EntityIsAirEntity, EntityName, TableIndex } from '@airport/ground-control';
import { ApplicationColumn } from './ApplicationColumn';
import { ApplicationOperation } from './ApplicationOperation';
import { ApplicationProperty } from './ApplicationProperty';
import { ApplicationRelation } from './ApplicationRelation';
import { ApplicationVersion } from './ApplicationVersion';
import { VersionedApplicationObject } from './VersionedApplicationObject';
import { IApplicationColumn } from '../../generated/application/applicationcolumn';
import { IApplicationProperty } from '../../generated/application/applicationproperty';
export declare class ApplicationEntity extends VersionedApplicationObject {
    id: EntityId;
    index: TableIndex;
    isLocal: EntityIsLocal;
    isAirEntity: EntityIsAirEntity;
    name: EntityName;
    tableConfig: TableConfiguration;
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