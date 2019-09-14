import {
	IDuo,
	IEntityCascadeGraph,
	IEntityCreateProperties,
	IEntityIdProperties,
	IEntitySelectProperties,
	IEntityUpdateProperties,
	IQEntity
} from '@airport/air-control'
import { Duo } from "@airport/check-in"
import {
	EntityId as DbEntityId
} from '@airport/ground-control'
import {
	Q,
	duoDiSet
} from './qSchema'
import {
	IDailyArchive,
	DailyArchiveESelect,
	DailyArchiveECreateColumns,
	DailyArchiveECreateProperties,
	DailyArchiveEUpdateColumns,
	DailyArchiveEUpdateProperties,
	DailyArchiveEId,
	DailyArchiveECascadeGraph,
	QDailyArchive
} from './qdailyarchive'


// Schema Q object Dependency Injection readiness detection DAO
export class SQDIDuo<Entity,
	EntitySelect extends IEntitySelectProperties,
	EntityCreate extends IEntityCreateProperties,
	EntityUpdateProperties extends IEntityUpdateProperties,
	EntityId extends IEntityIdProperties,
	EntityCascadeGraph extends IEntityCascadeGraph,
	IQE extends IQEntity>
	extends Duo<Entity,
		EntitySelect,
		EntityCreate,
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


export interface IBaseDailyArchiveDuo
  extends IDuo<IDailyArchive, DailyArchiveESelect, DailyArchiveECreateProperties, DailyArchiveEUpdateProperties, DailyArchiveEId, DailyArchiveECascadeGraph, QDailyArchive> {
}

export class BaseDailyArchiveDuo
  extends SQDIDuo<IDailyArchive, DailyArchiveESelect, DailyArchiveECreateProperties, DailyArchiveEUpdateProperties, DailyArchiveEId, DailyArchiveECascadeGraph, QDailyArchive>
	implements IBaseDailyArchiveDuo {

	static diSet(): boolean {
		return duoDiSet(0)
	}
	
	constructor() {
		super(0)
	}
}
