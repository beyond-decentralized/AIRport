/* eslint-disable */
import {
	IChild,
} from './child';
import {
	ChildESelect,
	ChildECreateColumns,
	ChildECreateProperties,
	ChildEUpdateColumns,
	ChildEUpdateProperties,
	ChildEId,
	ChildGraph,
	QChild,
} from './qchild';
import {
	IParent,
} from './parent';
import {
	ParentESelect,
	ParentECreateColumns,
	ParentECreateProperties,
	ParentEUpdateColumns,
	ParentEUpdateProperties,
	ParentEId,
	ParentGraph,
	QParent,
} from './qparent';
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


export interface IBaseChildDuo
  extends IDuo<IChild, ChildESelect, ChildECreateProperties, ChildEUpdateColumns, ChildEUpdateProperties, ChildEId, ChildGraph, QChild> {
}

export class BaseChildDuo
  extends SQDIDuo<IChild, ChildESelect, ChildECreateProperties, ChildEUpdateColumns, ChildEUpdateProperties, ChildEId, ChildGraph, QChild>
	implements IBaseChildDuo {

	static diSet(): boolean {
		return duoDiSet(1)
	}
	
	constructor() {
		super(1)
	}
}


export interface IBaseParentDuo
  extends IDuo<IParent, ParentESelect, ParentECreateProperties, ParentEUpdateColumns, ParentEUpdateProperties, ParentEId, ParentGraph, QParent> {
}

export class BaseParentDuo
  extends SQDIDuo<IParent, ParentESelect, ParentECreateProperties, ParentEUpdateColumns, ParentEUpdateProperties, ParentEId, ParentGraph, QParent>
	implements IBaseParentDuo {

	static diSet(): boolean {
		return duoDiSet(0)
	}
	
	constructor() {
		super(0)
	}
}
