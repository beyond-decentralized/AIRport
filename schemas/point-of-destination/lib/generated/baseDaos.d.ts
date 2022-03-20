import { IDailyArchive } from './dailyarchive';
import { DailyArchiveESelect, DailyArchiveECreateProperties, DailyArchiveEUpdateColumns, DailyArchiveEUpdateProperties, DailyArchiveEId, DailyArchiveGraph, QDailyArchive } from './qdailyarchive';
import { IDao, IEntityCascadeGraph, IEntityCreateProperties, IEntityIdProperties, IEntitySelectProperties, IEntityUpdateColumns, IEntityUpdateProperties, IQEntity } from '@airport/air-control';
import { Dao, DaoQueryDecorators } from '@airport/check-in';
import { EntityId as DbEntityId } from '@airport/ground-control';
export declare class SQDIDao<Entity, EntitySelect extends IEntitySelectProperties, EntityCreate extends IEntityCreateProperties, EntityUpdateColumns extends IEntityUpdateColumns, EntityUpdateProperties extends IEntityUpdateProperties, EntityId extends IEntityIdProperties, EntityCascadeGraph extends IEntityCascadeGraph, IQE extends IQEntity> extends Dao<Entity, EntitySelect, EntityCreate, EntityUpdateColumns, EntityUpdateProperties, EntityId, EntityCascadeGraph, IQE> {
    constructor(dbEntityId: DbEntityId);
}
export interface IBaseDailyArchiveDao extends IDao<IDailyArchive, DailyArchiveESelect, DailyArchiveECreateProperties, DailyArchiveEUpdateColumns, DailyArchiveEUpdateProperties, DailyArchiveEId, DailyArchiveGraph, QDailyArchive> {
}
export declare class BaseDailyArchiveDao extends SQDIDao<IDailyArchive, DailyArchiveESelect, DailyArchiveECreateProperties, DailyArchiveEUpdateColumns, DailyArchiveEUpdateProperties, DailyArchiveEId, DailyArchiveGraph, QDailyArchive> implements IBaseDailyArchiveDao {
    static Find: DaoQueryDecorators<DailyArchiveESelect>;
    static FindOne: DaoQueryDecorators<DailyArchiveESelect>;
    static Search: DaoQueryDecorators<DailyArchiveESelect>;
    static SearchOne: DaoQueryDecorators<DailyArchiveESelect>;
    static Save(config: DailyArchiveGraph): PropertyDecorator;
    static diSet(): boolean;
    constructor();
}
//# sourceMappingURL=baseDaos.d.ts.map