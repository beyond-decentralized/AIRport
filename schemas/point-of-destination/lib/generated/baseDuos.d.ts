import { IDuo, IEntityCascadeGraph, IEntityCreateProperties, IEntityIdProperties, IEntitySelectProperties, IEntityUpdateColumns, IEntityUpdateProperties, IQEntity } from '@airport/air-control';
import { Duo } from '@airport/check-in';
import { EntityId as DbEntityId } from '@airport/ground-control';
import { IDailyArchive } from './dailyarchive';
import { DailyArchiveESelect, DailyArchiveECreateProperties, DailyArchiveEUpdateColumns, DailyArchiveEUpdateProperties, DailyArchiveEId, DailyArchiveECascadeGraph, QDailyArchive } from './qdailyarchive';
export declare class SQDIDuo<Entity, EntitySelect extends IEntitySelectProperties, EntityCreate extends IEntityCreateProperties, EntityUpdateColumns extends IEntityUpdateColumns, EntityUpdateProperties extends IEntityUpdateProperties, EntityId extends IEntityIdProperties, EntityCascadeGraph extends IEntityCascadeGraph, IQE extends IQEntity> extends Duo<Entity, EntitySelect, EntityCreate, EntityUpdateColumns, EntityUpdateProperties, EntityId, EntityCascadeGraph, IQE> {
    constructor(dbEntityId: DbEntityId);
}
export interface IBaseDailyArchiveDuo extends IDuo<IDailyArchive, DailyArchiveESelect, DailyArchiveECreateProperties, DailyArchiveEUpdateColumns, DailyArchiveEUpdateProperties, DailyArchiveEId, DailyArchiveECascadeGraph, QDailyArchive> {
}
export declare class BaseDailyArchiveDuo extends SQDIDuo<IDailyArchive, DailyArchiveESelect, DailyArchiveECreateProperties, DailyArchiveEUpdateColumns, DailyArchiveEUpdateProperties, DailyArchiveEId, DailyArchiveECascadeGraph, QDailyArchive> implements IBaseDailyArchiveDuo {
    static diSet(): boolean;
    constructor();
}
