import { IDuo, IEntityCascadeGraph, IEntityCreateProperties, IEntityIdProperties, IEntitySelectProperties, IEntityUpdateProperties, IQEntity } from '@airport/air-control';
import { Duo } from "@airport/check-in";
import { EntityId as DbEntityId } from '@airport/ground-control';
import { IDailyArchive, DailyArchiveESelect, DailyArchiveECreateProperties, DailyArchiveEUpdateProperties, DailyArchiveEId, DailyArchiveECascadeGraph, QDailyArchive } from './qdailyarchive';
export declare class SQDIDuo<Entity, EntitySelect extends IEntitySelectProperties, EntityCreate extends IEntityCreateProperties, EntityUpdateProperties extends IEntityUpdateProperties, EntityId extends IEntityIdProperties, EntityCascadeGraph extends IEntityCascadeGraph, IQE extends IQEntity> extends Duo<Entity, EntitySelect, EntityCreate, EntityUpdateProperties, EntityId, EntityCascadeGraph, IQE> {
    constructor(dbEntityId: DbEntityId);
}
export interface IBaseDailyArchiveDuo extends IDuo<IDailyArchive, DailyArchiveESelect, DailyArchiveECreateProperties, DailyArchiveEUpdateProperties, DailyArchiveEId, DailyArchiveECascadeGraph, QDailyArchive> {
}
export declare class BaseDailyArchiveDuo extends SQDIDuo<IDailyArchive, DailyArchiveESelect, DailyArchiveECreateProperties, DailyArchiveEUpdateProperties, DailyArchiveEId, DailyArchiveECascadeGraph, QDailyArchive> implements IBaseDailyArchiveDuo {
    static diSet(): boolean;
    constructor();
}
