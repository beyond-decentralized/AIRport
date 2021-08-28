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


export interface IBaseChildDao
  extends IDao<IChild, ChildESelect, ChildECreateProperties, ChildEUpdateColumns, ChildEUpdateProperties, ChildEId, ChildGraph, QChild> {
}

export class BaseChildDao
  extends SQDIDao<IChild, ChildESelect, ChildECreateProperties, ChildEUpdateColumns, ChildEUpdateProperties, ChildEId, ChildGraph, QChild>
	implements IBaseChildDao {
	
	static Find      = new DaoQueryDecorators<ChildESelect>();
	static FindOne   = new DaoQueryDecorators<ChildESelect>();
	static Search    = new DaoQueryDecorators<ChildESelect>();
	static SearchOne = new DaoQueryDecorators<ChildESelect>();
	static Save(
		config: ChildGraph
	): PropertyDecorator {
		return Dao.BaseSave<ChildGraph>(config);
  }

	static diSet(): boolean {
		return duoDiSet(1)
	}
	
	constructor() {
		super(1)
	}
}


export interface IBaseParentDao
  extends IDao<IParent, ParentESelect, ParentECreateProperties, ParentEUpdateColumns, ParentEUpdateProperties, ParentEId, ParentGraph, QParent> {
}

export class BaseParentDao
  extends SQDIDao<IParent, ParentESelect, ParentECreateProperties, ParentEUpdateColumns, ParentEUpdateProperties, ParentEId, ParentGraph, QParent>
	implements IBaseParentDao {
	
	static Find      = new DaoQueryDecorators<ParentESelect>();
	static FindOne   = new DaoQueryDecorators<ParentESelect>();
	static Search    = new DaoQueryDecorators<ParentESelect>();
	static SearchOne = new DaoQueryDecorators<ParentESelect>();
	static Save(
		config: ParentGraph
	): PropertyDecorator {
		return Dao.BaseSave<ParentGraph>(config);
  }

	static diSet(): boolean {
		return duoDiSet(0)
	}
	
	constructor() {
		super(0)
	}
}
