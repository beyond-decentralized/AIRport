/* eslint-disable */
import {
	Application,
} from '../ddl/application/Application';
import {
	ApplicationESelect,
	ApplicationECreateColumns,
	ApplicationECreateProperties,
	ApplicationEUpdateColumns,
	ApplicationEUpdateProperties,
	ApplicationEId,
	ApplicationGraph,
	QApplication,
} from './application/qApplication';
import {
	ApplicationColumn,
} from '../ddl/application/ApplicationColumn';
import {
	ApplicationColumnESelect,
	ApplicationColumnECreateColumns,
	ApplicationColumnECreateProperties,
	ApplicationColumnEUpdateColumns,
	ApplicationColumnEUpdateProperties,
	ApplicationColumnEId,
	ApplicationColumnGraph,
	QApplicationColumn,
} from './application/qApplicationColumn';
import {
	ApplicationCurrentVersion,
} from '../ddl/application/ApplicationCurrentVersion';
import {
	ApplicationCurrentVersionESelect,
	ApplicationCurrentVersionECreateColumns,
	ApplicationCurrentVersionECreateProperties,
	ApplicationCurrentVersionEUpdateColumns,
	ApplicationCurrentVersionEUpdateProperties,
	ApplicationCurrentVersionEId,
	ApplicationCurrentVersionGraph,
	QApplicationCurrentVersion,
} from './application/qApplicationCurrentVersion';
import {
	ApplicationEntity,
} from '../ddl/application/ApplicationEntity';
import {
	ApplicationEntityESelect,
	ApplicationEntityECreateColumns,
	ApplicationEntityECreateProperties,
	ApplicationEntityEUpdateColumns,
	ApplicationEntityEUpdateProperties,
	ApplicationEntityEId,
	ApplicationEntityGraph,
	QApplicationEntity,
} from './application/qApplicationEntity';
import {
	ApplicationOperation,
} from '../ddl/application/ApplicationOperation';
import {
	ApplicationOperationESelect,
	ApplicationOperationECreateColumns,
	ApplicationOperationECreateProperties,
	ApplicationOperationEUpdateColumns,
	ApplicationOperationEUpdateProperties,
	ApplicationOperationEId,
	ApplicationOperationGraph,
	QApplicationOperation,
} from './application/qApplicationOperation';
import {
	ApplicationProperty,
} from '../ddl/application/ApplicationProperty';
import {
	ApplicationPropertyESelect,
	ApplicationPropertyECreateColumns,
	ApplicationPropertyECreateProperties,
	ApplicationPropertyEUpdateColumns,
	ApplicationPropertyEUpdateProperties,
	ApplicationPropertyEId,
	ApplicationPropertyGraph,
	QApplicationProperty,
} from './application/qApplicationProperty';
import {
	ApplicationPropertyColumn,
} from '../ddl/application/ApplicationPropertyColumn';
import {
	ApplicationPropertyColumnESelect,
	ApplicationPropertyColumnECreateColumns,
	ApplicationPropertyColumnECreateProperties,
	ApplicationPropertyColumnEUpdateColumns,
	ApplicationPropertyColumnEUpdateProperties,
	ApplicationPropertyColumnEId,
	ApplicationPropertyColumnGraph,
	QApplicationPropertyColumn,
} from './application/qApplicationPropertyColumn';
import {
	ApplicationReference,
} from '../ddl/application/ApplicationReference';
import {
	ApplicationReferenceESelect,
	ApplicationReferenceECreateColumns,
	ApplicationReferenceECreateProperties,
	ApplicationReferenceEUpdateColumns,
	ApplicationReferenceEUpdateProperties,
	ApplicationReferenceEId,
	ApplicationReferenceGraph,
	QApplicationReference,
} from './application/qApplicationReference';
import {
	ApplicationRelation,
} from '../ddl/application/ApplicationRelation';
import {
	ApplicationRelationESelect,
	ApplicationRelationECreateColumns,
	ApplicationRelationECreateProperties,
	ApplicationRelationEUpdateColumns,
	ApplicationRelationEUpdateProperties,
	ApplicationRelationEId,
	ApplicationRelationGraph,
	QApplicationRelation,
} from './application/qApplicationRelation';
import {
	ApplicationRelationColumn,
} from '../ddl/application/ApplicationRelationColumn';
import {
	ApplicationRelationColumnESelect,
	ApplicationRelationColumnECreateColumns,
	ApplicationRelationColumnECreateProperties,
	ApplicationRelationColumnEUpdateColumns,
	ApplicationRelationColumnEUpdateProperties,
	ApplicationRelationColumnEId,
	ApplicationRelationColumnGraph,
	QApplicationRelationColumn,
} from './application/qApplicationRelationColumn';
import {
	ApplicationVersion,
} from '../ddl/application/ApplicationVersion';
import {
	ApplicationVersionESelect,
	ApplicationVersionECreateColumns,
	ApplicationVersionECreateProperties,
	ApplicationVersionEUpdateColumns,
	ApplicationVersionEUpdateProperties,
	ApplicationVersionEId,
	ApplicationVersionGraph,
	QApplicationVersion,
} from './application/qApplicationVersion';
import {
	Domain,
} from '../ddl/application/Domain';
import {
	DomainESelect,
	DomainECreateColumns,
	DomainECreateProperties,
	DomainEUpdateColumns,
	DomainEUpdateProperties,
	DomainEId,
	DomainGraph,
	QDomain,
} from './application/qDomain';
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
	Dao,
	DaoQueryDecorators,
} from '@airport/tarmaq-dao';
import {
	ApplicationEntity_LocalId as DbEntityId,
} from '@airport/ground-control';
import {
	air____at_airport_slash_airspace_diSet,
} from './qApplication';

import Q from './qApplication'

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
		return air____at_airport_slash_airspace_diSet(10)
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
		return air____at_airport_slash_airspace_diSet(4)
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
		return air____at_airport_slash_airspace_diSet(9)
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
		return air____at_airport_slash_airspace_diSet(6)
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
		return air____at_airport_slash_airspace_diSet(5)
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
		return air____at_airport_slash_airspace_diSet(2)
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
		return air____at_airport_slash_airspace_diSet(3)
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
		return air____at_airport_slash_airspace_diSet(7)
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
		return air____at_airport_slash_airspace_diSet(1)
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
		return air____at_airport_slash_airspace_diSet(0)
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
		return air____at_airport_slash_airspace_diSet(8)
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
		return air____at_airport_slash_airspace_diSet(11)
	}
	
	constructor() {
		super(11)
	}
}
