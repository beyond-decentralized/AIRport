/* eslint-disable */
import {
	IDailyArchive,
} from './dailyarchive';
import {
	DailyArchiveESelect,
	DailyArchiveECreateColumns,
	DailyArchiveECreateProperties,
	DailyArchiveEUpdateColumns,
	DailyArchiveEUpdateProperties,
	DailyArchiveEId,
	DailyArchiveGraph,
	QDailyArchive,
} from './qdailyarchive';
import {
	IDao,
	IEntityCascadeGraph,
	IEntityCreateProperties,
	IEntityIdProperties,
	IEntitySelectProperties,
	IEntityUpdateColumns,
	IEntityUpdateProperties,
	IQEntity,
} from '@airport/air-control';
import {
	Dao,
	DaoQueryDecorators,
} from '@airport/check-in';
import {
	EntityId as DbEntityId,
} from '@airport/ground-control';
import {
	Q,
	duoDiSet,
} from './qSchema';


// Schema Q object Dependency Injection readiness detection Dao
export class SQDIDao<Entity,
	EntitySelect extends IEntitySelectProperties,
	EntityCreate extends IEntityCreateProperties,
  EntityUpdateColumns extends IEntityUpdateColumns,
	EntityUpdateProperties extends IEntityUpdateProperties,
	EntityId extends IEntityIdProperties,
	EntityCascadeGraph extends IEntityCascadeGraph,
	IQE extends IQEntity<Entity>>
	extends Dao<Entity,
		EntitySelect,
		EntityCreate,
		EntityUpdateColumns,
		EntityUpdateProperties,
		EntityId,
		EntityCascadeGraph,
		IQE> {

	constructor(
		dbEntityId: DbEntityId
	) {
		super(dbEntityId, Q)
	}
}


export interface IBaseDailyArchiveDao
  extends IDao<IDailyArchive, DailyArchiveESelect, DailyArchiveECreateProperties, DailyArchiveEUpdateColumns, DailyArchiveEUpdateProperties, DailyArchiveEId, DailyArchiveGraph, QDailyArchive> {
}

export class BaseDailyArchiveDao
  extends SQDIDao<IDailyArchive, DailyArchiveESelect, DailyArchiveECreateProperties, DailyArchiveEUpdateColumns, DailyArchiveEUpdateProperties, DailyArchiveEId, DailyArchiveGraph, QDailyArchive>
	implements IBaseDailyArchiveDao {
	
	static Find      = new DaoQueryDecorators<DailyArchiveESelect>();
	static FindOne   = new DaoQueryDecorators<DailyArchiveESelect>();
	static Search    = new DaoQueryDecorators<DailyArchiveESelect>();
	static SearchOne = new DaoQueryDecorators<DailyArchiveESelect>();
	static Save(
		config: DailyArchiveGraph
	): PropertyDecorator {
		return Dao.BaseSave<DailyArchiveGraph>(config);
  }

	static diSet(): boolean {
		return duoDiSet(0)
	}
	
	constructor() {
		super(0)
	}
}
