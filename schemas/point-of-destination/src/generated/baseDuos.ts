import {
	IDuo,
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
	QDailyArchive
} from './qdailyarchive'


// Schema Q object Dependency Injection readiness detection DAO
export class SQDIDuo<Entity,
	EntitySelect extends IEntitySelectProperties,
	EntityCreate extends IEntityCreateProperties,
	EntityUpdateProperties extends IEntityUpdateProperties,
	EntityId extends IEntityIdProperties,
	IQE extends IQEntity>
	extends Duo<Entity,
		EntitySelect,
		EntityCreate,
		EntityUpdateProperties,
		EntityId,
		IQE> {

	constructor(
		dbEntityId: DbEntityId
	) {
		super(dbEntityId, Q)
	}
}


export interface IBaseDailyArchiveDuo
  extends IDuo<IDailyArchive, DailyArchiveESelect, DailyArchiveECreateProperties, DailyArchiveEUpdateProperties, DailyArchiveEId, QDailyArchive> {
}

export class BaseDailyArchiveDuo
  extends SQDIDuo<IDailyArchive, DailyArchiveESelect, DailyArchiveECreateProperties, DailyArchiveEUpdateProperties, DailyArchiveEId, QDailyArchive>
	implements IBaseDailyArchiveDuo {

	static diSet(): boolean {
		return duoDiSet(0)
	}
	
	constructor() {
		super(0)
	}
}
