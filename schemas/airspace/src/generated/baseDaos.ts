/* eslint-disable */
import {
	Application,
} from '../ddl/application/application';
import {
	ApplicationESelect,
	ApplicationECreateColumns,
	ApplicationECreateProperties,
	ApplicationEUpdateColumns,
	ApplicationEUpdateProperties,
	ApplicationEId,
	ApplicationGraph,
	QApplication,
} from './application/qapplication';
import {
	ApplicationColumn,
} from '../ddl/application/applicationcolumn';
import {
	ApplicationColumnESelect,
	ApplicationColumnECreateColumns,
	ApplicationColumnECreateProperties,
	ApplicationColumnEUpdateColumns,
	ApplicationColumnEUpdateProperties,
	ApplicationColumnEId,
	ApplicationColumnGraph,
	QApplicationColumn,
} from './application/qapplicationcolumn';
import {
	ApplicationCurrentVersion,
} from '../ddl/application/applicationcurrentversion';
import {
	ApplicationCurrentVersionESelect,
	ApplicationCurrentVersionECreateColumns,
	ApplicationCurrentVersionECreateProperties,
	ApplicationCurrentVersionEUpdateColumns,
	ApplicationCurrentVersionEUpdateProperties,
	ApplicationCurrentVersionEId,
	ApplicationCurrentVersionGraph,
	QApplicationCurrentVersion,
} from './application/qapplicationcurrentversion';
import {
	ApplicationEntity,
} from '../ddl/application/applicationentity';
import {
	ApplicationEntityESelect,
	ApplicationEntityECreateColumns,
	ApplicationEntityECreateProperties,
	ApplicationEntityEUpdateColumns,
	ApplicationEntityEUpdateProperties,
	ApplicationEntityEId,
	ApplicationEntityGraph,
	QApplicationEntity,
} from './application/qapplicationentity';
import {
	ApplicationOperation,
} from '../ddl/application/applicationoperation';
import {
	ApplicationOperationESelect,
	ApplicationOperationECreateColumns,
	ApplicationOperationECreateProperties,
	ApplicationOperationEUpdateColumns,
	ApplicationOperationEUpdateProperties,
	ApplicationOperationEId,
	ApplicationOperationGraph,
	QApplicationOperation,
} from './application/qapplicationoperation';
import {
	ApplicationProperty,
} from '../ddl/application/applicationproperty';
import {
	ApplicationPropertyESelect,
	ApplicationPropertyECreateColumns,
	ApplicationPropertyECreateProperties,
	ApplicationPropertyEUpdateColumns,
	ApplicationPropertyEUpdateProperties,
	ApplicationPropertyEId,
	ApplicationPropertyGraph,
	QApplicationProperty,
} from './application/qapplicationproperty';
import {
	ApplicationPropertyColumn,
} from '../ddl/application/applicationpropertycolumn';
import {
	ApplicationPropertyColumnESelect,
	ApplicationPropertyColumnECreateColumns,
	ApplicationPropertyColumnECreateProperties,
	ApplicationPropertyColumnEUpdateColumns,
	ApplicationPropertyColumnEUpdateProperties,
	ApplicationPropertyColumnEId,
	ApplicationPropertyColumnGraph,
	QApplicationPropertyColumn,
} from './application/qapplicationpropertycolumn';
import {
	ApplicationReference,
} from '../ddl/application/applicationreference';
import {
	ApplicationReferenceESelect,
	ApplicationReferenceECreateColumns,
	ApplicationReferenceECreateProperties,
	ApplicationReferenceEUpdateColumns,
	ApplicationReferenceEUpdateProperties,
	ApplicationReferenceEId,
	ApplicationReferenceGraph,
	QApplicationReference,
} from './application/qapplicationreference';
import {
	ApplicationRelation,
} from '../ddl/application/applicationrelation';
import {
	ApplicationRelationESelect,
	ApplicationRelationECreateColumns,
	ApplicationRelationECreateProperties,
	ApplicationRelationEUpdateColumns,
	ApplicationRelationEUpdateProperties,
	ApplicationRelationEId,
	ApplicationRelationGraph,
	QApplicationRelation,
} from './application/qapplicationrelation';
import {
	ApplicationRelationColumn,
} from '../ddl/application/applicationrelationcolumn';
import {
	ApplicationRelationColumnESelect,
	ApplicationRelationColumnECreateColumns,
	ApplicationRelationColumnECreateProperties,
	ApplicationRelationColumnEUpdateColumns,
	ApplicationRelationColumnEUpdateProperties,
	ApplicationRelationColumnEId,
	ApplicationRelationColumnGraph,
	QApplicationRelationColumn,
} from './application/qapplicationrelationcolumn';
import {
	ApplicationVersion,
} from '../ddl/application/applicationversion';
import {
	ApplicationVersionESelect,
	ApplicationVersionECreateColumns,
	ApplicationVersionECreateProperties,
	ApplicationVersionEUpdateColumns,
	ApplicationVersionEUpdateProperties,
	ApplicationVersionEId,
	ApplicationVersionGraph,
	QApplicationVersion,
} from './application/qapplicationversion';
import {
	Domain,
} from '../ddl/application/domain';
import {
	DomainESelect,
	DomainECreateColumns,
	DomainECreateProperties,
	DomainEUpdateColumns,
	DomainEUpdateProperties,
	DomainEId,
	DomainGraph,
	QDomain,
} from './application/qdomain';
import {
	IEntityCascadeGraph,
	IEntityCreateProperties,
	IEntityIdProperties,
	IEntitySelectProperties,
	IEntityUpdateColumns,
	IEntityUpdateProperties,
	IQEntity,
} from '@airport/tarmaq-query';
import {
	IDao,
	DaoQueryDecorators,
} from '@airport/tarmaq-dao';
import {
	Dao,
} from '@airport/air-traffic-control';
import {
	ApplicationEntity_LocalId as DbEntityId,
} from '@airport/ground-control';
import {
	Q,
	duoDiSet,
} from './qApplication';


// Application Q object Dependency Injection readiness detection Dao
export class SQDIDao<Entity,
	EntitySelect extends IEntitySelectProperties,
	EntityCreate extends IEntityCreateProperties,
	EntityUpdateColumns extends IEntityUpdateColumns,
	EntityUpdateProperties extends IEntityUpdateProperties,
	ApplicationEntity_LocalId extends IEntityIdProperties,
	EntityCascadeGraph extends IEntityCascadeGraph,
	IQE extends IQEntity>
	extends Dao<Entity,
		EntitySelect,
		EntityCreate,
		EntityUpdateColumns,
		EntityUpdateProperties,
		ApplicationEntity_LocalId,
		EntityCascadeGraph,
		IQE> {

	constructor(
		dbEntityId: DbEntityId
	) {
		super(dbEntityId, Q)
	}
}


export interface IBaseApplicationDao
  extends IDao<Application, ApplicationESelect, ApplicationECreateProperties, ApplicationEUpdateColumns, ApplicationEUpdateProperties, ApplicationEId, ApplicationGraph, QApplication> {
}

export class BaseApplicationDao
  extends SQDIDao<Application, ApplicationESelect, ApplicationECreateProperties, ApplicationEUpdateColumns, ApplicationEUpdateProperties, ApplicationEId, ApplicationGraph, QApplication>
	implements IBaseApplicationDao {
	
	static Find      = new DaoQueryDecorators<ApplicationESelect>();
	static FindOne   = new DaoQueryDecorators<ApplicationESelect>();
	static Search    = new DaoQueryDecorators<ApplicationESelect>();
	static SearchOne = new DaoQueryDecorators<ApplicationESelect>();
	static Save(
		config: ApplicationGraph
	): PropertyDecorator {
		return Dao.BaseSave<ApplicationGraph>(config);
  }

	static diSet(): boolean {
		return duoDiSet(10)
	}
	
	constructor() {
		super(10)
	}
}


export interface IBaseApplicationColumnDao
  extends IDao<ApplicationColumn, ApplicationColumnESelect, ApplicationColumnECreateProperties, ApplicationColumnEUpdateColumns, ApplicationColumnEUpdateProperties, ApplicationColumnEId, ApplicationColumnGraph, QApplicationColumn> {
}

export class BaseApplicationColumnDao
  extends SQDIDao<ApplicationColumn, ApplicationColumnESelect, ApplicationColumnECreateProperties, ApplicationColumnEUpdateColumns, ApplicationColumnEUpdateProperties, ApplicationColumnEId, ApplicationColumnGraph, QApplicationColumn>
	implements IBaseApplicationColumnDao {
	
	static Find      = new DaoQueryDecorators<ApplicationColumnESelect>();
	static FindOne   = new DaoQueryDecorators<ApplicationColumnESelect>();
	static Search    = new DaoQueryDecorators<ApplicationColumnESelect>();
	static SearchOne = new DaoQueryDecorators<ApplicationColumnESelect>();
	static Save(
		config: ApplicationColumnGraph
	): PropertyDecorator {
		return Dao.BaseSave<ApplicationColumnGraph>(config);
  }

	static diSet(): boolean {
		return duoDiSet(4)
	}
	
	constructor() {
		super(4)
	}
}


export interface IBaseApplicationCurrentVersionDao
  extends IDao<ApplicationCurrentVersion, ApplicationCurrentVersionESelect, ApplicationCurrentVersionECreateProperties, ApplicationCurrentVersionEUpdateColumns, ApplicationCurrentVersionEUpdateProperties, ApplicationCurrentVersionEId, ApplicationCurrentVersionGraph, QApplicationCurrentVersion> {
}

export class BaseApplicationCurrentVersionDao
  extends SQDIDao<ApplicationCurrentVersion, ApplicationCurrentVersionESelect, ApplicationCurrentVersionECreateProperties, ApplicationCurrentVersionEUpdateColumns, ApplicationCurrentVersionEUpdateProperties, ApplicationCurrentVersionEId, ApplicationCurrentVersionGraph, QApplicationCurrentVersion>
	implements IBaseApplicationCurrentVersionDao {
	
	static Find      = new DaoQueryDecorators<ApplicationCurrentVersionESelect>();
	static FindOne   = new DaoQueryDecorators<ApplicationCurrentVersionESelect>();
	static Search    = new DaoQueryDecorators<ApplicationCurrentVersionESelect>();
	static SearchOne = new DaoQueryDecorators<ApplicationCurrentVersionESelect>();
	static Save(
		config: ApplicationCurrentVersionGraph
	): PropertyDecorator {
		return Dao.BaseSave<ApplicationCurrentVersionGraph>(config);
  }

	static diSet(): boolean {
		return duoDiSet(9)
	}
	
	constructor() {
		super(9)
	}
}


export interface IBaseApplicationEntityDao
  extends IDao<ApplicationEntity, ApplicationEntityESelect, ApplicationEntityECreateProperties, ApplicationEntityEUpdateColumns, ApplicationEntityEUpdateProperties, ApplicationEntityEId, ApplicationEntityGraph, QApplicationEntity> {
}

export class BaseApplicationEntityDao
  extends SQDIDao<ApplicationEntity, ApplicationEntityESelect, ApplicationEntityECreateProperties, ApplicationEntityEUpdateColumns, ApplicationEntityEUpdateProperties, ApplicationEntityEId, ApplicationEntityGraph, QApplicationEntity>
	implements IBaseApplicationEntityDao {
	
	static Find      = new DaoQueryDecorators<ApplicationEntityESelect>();
	static FindOne   = new DaoQueryDecorators<ApplicationEntityESelect>();
	static Search    = new DaoQueryDecorators<ApplicationEntityESelect>();
	static SearchOne = new DaoQueryDecorators<ApplicationEntityESelect>();
	static Save(
		config: ApplicationEntityGraph
	): PropertyDecorator {
		return Dao.BaseSave<ApplicationEntityGraph>(config);
  }

	static diSet(): boolean {
		return duoDiSet(6)
	}
	
	constructor() {
		super(6)
	}
}


export interface IBaseApplicationOperationDao
  extends IDao<ApplicationOperation, ApplicationOperationESelect, ApplicationOperationECreateProperties, ApplicationOperationEUpdateColumns, ApplicationOperationEUpdateProperties, ApplicationOperationEId, ApplicationOperationGraph, QApplicationOperation> {
}

export class BaseApplicationOperationDao
  extends SQDIDao<ApplicationOperation, ApplicationOperationESelect, ApplicationOperationECreateProperties, ApplicationOperationEUpdateColumns, ApplicationOperationEUpdateProperties, ApplicationOperationEId, ApplicationOperationGraph, QApplicationOperation>
	implements IBaseApplicationOperationDao {
	
	static Find      = new DaoQueryDecorators<ApplicationOperationESelect>();
	static FindOne   = new DaoQueryDecorators<ApplicationOperationESelect>();
	static Search    = new DaoQueryDecorators<ApplicationOperationESelect>();
	static SearchOne = new DaoQueryDecorators<ApplicationOperationESelect>();
	static Save(
		config: ApplicationOperationGraph
	): PropertyDecorator {
		return Dao.BaseSave<ApplicationOperationGraph>(config);
  }

	static diSet(): boolean {
		return duoDiSet(5)
	}
	
	constructor() {
		super(5)
	}
}


export interface IBaseApplicationPropertyDao
  extends IDao<ApplicationProperty, ApplicationPropertyESelect, ApplicationPropertyECreateProperties, ApplicationPropertyEUpdateColumns, ApplicationPropertyEUpdateProperties, ApplicationPropertyEId, ApplicationPropertyGraph, QApplicationProperty> {
}

export class BaseApplicationPropertyDao
  extends SQDIDao<ApplicationProperty, ApplicationPropertyESelect, ApplicationPropertyECreateProperties, ApplicationPropertyEUpdateColumns, ApplicationPropertyEUpdateProperties, ApplicationPropertyEId, ApplicationPropertyGraph, QApplicationProperty>
	implements IBaseApplicationPropertyDao {
	
	static Find      = new DaoQueryDecorators<ApplicationPropertyESelect>();
	static FindOne   = new DaoQueryDecorators<ApplicationPropertyESelect>();
	static Search    = new DaoQueryDecorators<ApplicationPropertyESelect>();
	static SearchOne = new DaoQueryDecorators<ApplicationPropertyESelect>();
	static Save(
		config: ApplicationPropertyGraph
	): PropertyDecorator {
		return Dao.BaseSave<ApplicationPropertyGraph>(config);
  }

	static diSet(): boolean {
		return duoDiSet(2)
	}
	
	constructor() {
		super(2)
	}
}


export interface IBaseApplicationPropertyColumnDao
  extends IDao<ApplicationPropertyColumn, ApplicationPropertyColumnESelect, ApplicationPropertyColumnECreateProperties, ApplicationPropertyColumnEUpdateColumns, ApplicationPropertyColumnEUpdateProperties, ApplicationPropertyColumnEId, ApplicationPropertyColumnGraph, QApplicationPropertyColumn> {
}

export class BaseApplicationPropertyColumnDao
  extends SQDIDao<ApplicationPropertyColumn, ApplicationPropertyColumnESelect, ApplicationPropertyColumnECreateProperties, ApplicationPropertyColumnEUpdateColumns, ApplicationPropertyColumnEUpdateProperties, ApplicationPropertyColumnEId, ApplicationPropertyColumnGraph, QApplicationPropertyColumn>
	implements IBaseApplicationPropertyColumnDao {
	
	static Find      = new DaoQueryDecorators<ApplicationPropertyColumnESelect>();
	static FindOne   = new DaoQueryDecorators<ApplicationPropertyColumnESelect>();
	static Search    = new DaoQueryDecorators<ApplicationPropertyColumnESelect>();
	static SearchOne = new DaoQueryDecorators<ApplicationPropertyColumnESelect>();
	static Save(
		config: ApplicationPropertyColumnGraph
	): PropertyDecorator {
		return Dao.BaseSave<ApplicationPropertyColumnGraph>(config);
  }

	static diSet(): boolean {
		return duoDiSet(3)
	}
	
	constructor() {
		super(3)
	}
}


export interface IBaseApplicationReferenceDao
  extends IDao<ApplicationReference, ApplicationReferenceESelect, ApplicationReferenceECreateProperties, ApplicationReferenceEUpdateColumns, ApplicationReferenceEUpdateProperties, ApplicationReferenceEId, ApplicationReferenceGraph, QApplicationReference> {
}

export class BaseApplicationReferenceDao
  extends SQDIDao<ApplicationReference, ApplicationReferenceESelect, ApplicationReferenceECreateProperties, ApplicationReferenceEUpdateColumns, ApplicationReferenceEUpdateProperties, ApplicationReferenceEId, ApplicationReferenceGraph, QApplicationReference>
	implements IBaseApplicationReferenceDao {
	
	static Find      = new DaoQueryDecorators<ApplicationReferenceESelect>();
	static FindOne   = new DaoQueryDecorators<ApplicationReferenceESelect>();
	static Search    = new DaoQueryDecorators<ApplicationReferenceESelect>();
	static SearchOne = new DaoQueryDecorators<ApplicationReferenceESelect>();
	static Save(
		config: ApplicationReferenceGraph
	): PropertyDecorator {
		return Dao.BaseSave<ApplicationReferenceGraph>(config);
  }

	static diSet(): boolean {
		return duoDiSet(7)
	}
	
	constructor() {
		super(7)
	}
}


export interface IBaseApplicationRelationDao
  extends IDao<ApplicationRelation, ApplicationRelationESelect, ApplicationRelationECreateProperties, ApplicationRelationEUpdateColumns, ApplicationRelationEUpdateProperties, ApplicationRelationEId, ApplicationRelationGraph, QApplicationRelation> {
}

export class BaseApplicationRelationDao
  extends SQDIDao<ApplicationRelation, ApplicationRelationESelect, ApplicationRelationECreateProperties, ApplicationRelationEUpdateColumns, ApplicationRelationEUpdateProperties, ApplicationRelationEId, ApplicationRelationGraph, QApplicationRelation>
	implements IBaseApplicationRelationDao {
	
	static Find      = new DaoQueryDecorators<ApplicationRelationESelect>();
	static FindOne   = new DaoQueryDecorators<ApplicationRelationESelect>();
	static Search    = new DaoQueryDecorators<ApplicationRelationESelect>();
	static SearchOne = new DaoQueryDecorators<ApplicationRelationESelect>();
	static Save(
		config: ApplicationRelationGraph
	): PropertyDecorator {
		return Dao.BaseSave<ApplicationRelationGraph>(config);
  }

	static diSet(): boolean {
		return duoDiSet(1)
	}
	
	constructor() {
		super(1)
	}
}


export interface IBaseApplicationRelationColumnDao
  extends IDao<ApplicationRelationColumn, ApplicationRelationColumnESelect, ApplicationRelationColumnECreateProperties, ApplicationRelationColumnEUpdateColumns, ApplicationRelationColumnEUpdateProperties, ApplicationRelationColumnEId, ApplicationRelationColumnGraph, QApplicationRelationColumn> {
}

export class BaseApplicationRelationColumnDao
  extends SQDIDao<ApplicationRelationColumn, ApplicationRelationColumnESelect, ApplicationRelationColumnECreateProperties, ApplicationRelationColumnEUpdateColumns, ApplicationRelationColumnEUpdateProperties, ApplicationRelationColumnEId, ApplicationRelationColumnGraph, QApplicationRelationColumn>
	implements IBaseApplicationRelationColumnDao {
	
	static Find      = new DaoQueryDecorators<ApplicationRelationColumnESelect>();
	static FindOne   = new DaoQueryDecorators<ApplicationRelationColumnESelect>();
	static Search    = new DaoQueryDecorators<ApplicationRelationColumnESelect>();
	static SearchOne = new DaoQueryDecorators<ApplicationRelationColumnESelect>();
	static Save(
		config: ApplicationRelationColumnGraph
	): PropertyDecorator {
		return Dao.BaseSave<ApplicationRelationColumnGraph>(config);
  }

	static diSet(): boolean {
		return duoDiSet(0)
	}
	
	constructor() {
		super(0)
	}
}


export interface IBaseApplicationVersionDao
  extends IDao<ApplicationVersion, ApplicationVersionESelect, ApplicationVersionECreateProperties, ApplicationVersionEUpdateColumns, ApplicationVersionEUpdateProperties, ApplicationVersionEId, ApplicationVersionGraph, QApplicationVersion> {
}

export class BaseApplicationVersionDao
  extends SQDIDao<ApplicationVersion, ApplicationVersionESelect, ApplicationVersionECreateProperties, ApplicationVersionEUpdateColumns, ApplicationVersionEUpdateProperties, ApplicationVersionEId, ApplicationVersionGraph, QApplicationVersion>
	implements IBaseApplicationVersionDao {
	
	static Find      = new DaoQueryDecorators<ApplicationVersionESelect>();
	static FindOne   = new DaoQueryDecorators<ApplicationVersionESelect>();
	static Search    = new DaoQueryDecorators<ApplicationVersionESelect>();
	static SearchOne = new DaoQueryDecorators<ApplicationVersionESelect>();
	static Save(
		config: ApplicationVersionGraph
	): PropertyDecorator {
		return Dao.BaseSave<ApplicationVersionGraph>(config);
  }

	static diSet(): boolean {
		return duoDiSet(8)
	}
	
	constructor() {
		super(8)
	}
}


export interface IBaseDomainDao
  extends IDao<Domain, DomainESelect, DomainECreateProperties, DomainEUpdateColumns, DomainEUpdateProperties, DomainEId, DomainGraph, QDomain> {
}

export class BaseDomainDao
  extends SQDIDao<Domain, DomainESelect, DomainECreateProperties, DomainEUpdateColumns, DomainEUpdateProperties, DomainEId, DomainGraph, QDomain>
	implements IBaseDomainDao {
	
	static Find      = new DaoQueryDecorators<DomainESelect>();
	static FindOne   = new DaoQueryDecorators<DomainESelect>();
	static Search    = new DaoQueryDecorators<DomainESelect>();
	static SearchOne = new DaoQueryDecorators<DomainESelect>();
	static Save(
		config: DomainGraph
	): PropertyDecorator {
		return Dao.BaseSave<DomainGraph>(config);
  }

	static diSet(): boolean {
		return duoDiSet(11)
	}
	
	constructor() {
		super(11)
	}
}
