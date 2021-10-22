/* eslint-disable */
import {
	ILevel1,
} from './level1';
import {
	Level1ESelect,
	Level1ECreateColumns,
	Level1ECreateProperties,
	Level1EUpdateColumns,
	Level1EUpdateProperties,
	Level1EId,
	Level1Graph,
	QLevel1,
} from './qlevel1';
import {
	ILevel2,
} from './level2';
import {
	Level2ESelect,
	Level2ECreateColumns,
	Level2ECreateProperties,
	Level2EUpdateColumns,
	Level2EUpdateProperties,
	Level2EId,
	Level2Graph,
	QLevel2,
} from './qlevel2';
import {
	IDuo,
	IEntityCascadeGraph,
	IEntityCreateProperties,
	IEntityIdProperties,
	IEntitySelectProperties,
	IEntityUpdateColumns,
	IEntityUpdateProperties,
	IQEntity,
} from '@airport/air-control';
import {
	Duo,
} from '@airport/check-in';
import {
	EntityId as DbEntityId,
} from '@airport/ground-control';
import {
	Q,
	duoDiSet,
} from './qSchema';


// Schema Q object Dependency Injection readiness detection Duo
export class SQDIDuo<Entity,
	EntitySelect extends IEntitySelectProperties,
	EntityCreate extends IEntityCreateProperties,
  EntityUpdateColumns extends IEntityUpdateColumns,
	EntityUpdateProperties extends IEntityUpdateProperties,
	EntityId extends IEntityIdProperties,
	EntityCascadeGraph extends IEntityCascadeGraph,
	IQE extends IQEntity<Entity>>
	extends Duo<Entity,
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


export interface IBaseLevel1Duo
  extends IDuo<ILevel1, Level1ESelect, Level1ECreateProperties, Level1EUpdateColumns, Level1EUpdateProperties, Level1EId, Level1Graph, QLevel1> {
}

export class BaseLevel1Duo
  extends SQDIDuo<ILevel1, Level1ESelect, Level1ECreateProperties, Level1EUpdateColumns, Level1EUpdateProperties, Level1EId, Level1Graph, QLevel1>
	implements IBaseLevel1Duo {

	static diSet(): boolean {
		return duoDiSet(1)
	}
	
	constructor() {
		super(1)
	}
}


export interface IBaseLevel2Duo
  extends IDuo<ILevel2, Level2ESelect, Level2ECreateProperties, Level2EUpdateColumns, Level2EUpdateProperties, Level2EId, Level2Graph, QLevel2> {
}

export class BaseLevel2Duo
  extends SQDIDuo<ILevel2, Level2ESelect, Level2ECreateProperties, Level2EUpdateColumns, Level2EUpdateProperties, Level2EId, Level2Graph, QLevel2>
	implements IBaseLevel2Duo {

	static diSet(): boolean {
		return duoDiSet(0)
	}
	
	constructor() {
		super(0)
	}
}
