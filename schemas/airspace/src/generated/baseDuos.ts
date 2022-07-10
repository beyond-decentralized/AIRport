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
	Duo,
	IDuo,
} from '@airport/tarmaq-dao';
import {
	ApplicationEntity_LocalId as DbEntityId,
} from '@airport/ground-control';
import {
	Q,
	duoDiSet,
} from './qApplication';


// Application Q object Dependency Injection readiness detection Duo
export class SQDIDuo<Entity,
	EntitySelect extends IEntitySelectProperties,
	EntityCreate extends IEntityCreateProperties,
	EntityUpdateColumns extends IEntityUpdateColumns,
	EntityUpdateProperties extends IEntityUpdateProperties,
	ApplicationEntity_LocalId extends IEntityIdProperties,
	EntityCascadeGraph extends IEntityCascadeGraph,
	IQE extends IQEntity>
	extends Duo<Entity,
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


export interface IBaseApplicationDuo
  extends IDuo<Application, ApplicationESelect, ApplicationECreateProperties, ApplicationEUpdateColumns, ApplicationEUpdateProperties, ApplicationEId, ApplicationGraph, QApplication> {
}

export class BaseApplicationDuo
  extends SQDIDuo<Application, ApplicationESelect, ApplicationECreateProperties, ApplicationEUpdateColumns, ApplicationEUpdateProperties, ApplicationEId, ApplicationGraph, QApplication>
	implements IBaseApplicationDuo {

	static diSet(): boolean {
		return duoDiSet(10)
	}
	
	constructor() {
		super(10)
	}
}


export interface IBaseApplicationColumnDuo
  extends IDuo<ApplicationColumn, ApplicationColumnESelect, ApplicationColumnECreateProperties, ApplicationColumnEUpdateColumns, ApplicationColumnEUpdateProperties, ApplicationColumnEId, ApplicationColumnGraph, QApplicationColumn> {
}

export class BaseApplicationColumnDuo
  extends SQDIDuo<ApplicationColumn, ApplicationColumnESelect, ApplicationColumnECreateProperties, ApplicationColumnEUpdateColumns, ApplicationColumnEUpdateProperties, ApplicationColumnEId, ApplicationColumnGraph, QApplicationColumn>
	implements IBaseApplicationColumnDuo {

	static diSet(): boolean {
		return duoDiSet(4)
	}
	
	constructor() {
		super(4)
	}
}


export interface IBaseApplicationCurrentVersionDuo
  extends IDuo<ApplicationCurrentVersion, ApplicationCurrentVersionESelect, ApplicationCurrentVersionECreateProperties, ApplicationCurrentVersionEUpdateColumns, ApplicationCurrentVersionEUpdateProperties, ApplicationCurrentVersionEId, ApplicationCurrentVersionGraph, QApplicationCurrentVersion> {
}

export class BaseApplicationCurrentVersionDuo
  extends SQDIDuo<ApplicationCurrentVersion, ApplicationCurrentVersionESelect, ApplicationCurrentVersionECreateProperties, ApplicationCurrentVersionEUpdateColumns, ApplicationCurrentVersionEUpdateProperties, ApplicationCurrentVersionEId, ApplicationCurrentVersionGraph, QApplicationCurrentVersion>
	implements IBaseApplicationCurrentVersionDuo {

	static diSet(): boolean {
		return duoDiSet(9)
	}
	
	constructor() {
		super(9)
	}
}


export interface IBaseApplicationEntityDuo
  extends IDuo<ApplicationEntity, ApplicationEntityESelect, ApplicationEntityECreateProperties, ApplicationEntityEUpdateColumns, ApplicationEntityEUpdateProperties, ApplicationEntityEId, ApplicationEntityGraph, QApplicationEntity> {
}

export class BaseApplicationEntityDuo
  extends SQDIDuo<ApplicationEntity, ApplicationEntityESelect, ApplicationEntityECreateProperties, ApplicationEntityEUpdateColumns, ApplicationEntityEUpdateProperties, ApplicationEntityEId, ApplicationEntityGraph, QApplicationEntity>
	implements IBaseApplicationEntityDuo {

	static diSet(): boolean {
		return duoDiSet(6)
	}
	
	constructor() {
		super(6)
	}
}


export interface IBaseApplicationOperationDuo
  extends IDuo<ApplicationOperation, ApplicationOperationESelect, ApplicationOperationECreateProperties, ApplicationOperationEUpdateColumns, ApplicationOperationEUpdateProperties, ApplicationOperationEId, ApplicationOperationGraph, QApplicationOperation> {
}

export class BaseApplicationOperationDuo
  extends SQDIDuo<ApplicationOperation, ApplicationOperationESelect, ApplicationOperationECreateProperties, ApplicationOperationEUpdateColumns, ApplicationOperationEUpdateProperties, ApplicationOperationEId, ApplicationOperationGraph, QApplicationOperation>
	implements IBaseApplicationOperationDuo {

	static diSet(): boolean {
		return duoDiSet(5)
	}
	
	constructor() {
		super(5)
	}
}


export interface IBaseApplicationPropertyDuo
  extends IDuo<ApplicationProperty, ApplicationPropertyESelect, ApplicationPropertyECreateProperties, ApplicationPropertyEUpdateColumns, ApplicationPropertyEUpdateProperties, ApplicationPropertyEId, ApplicationPropertyGraph, QApplicationProperty> {
}

export class BaseApplicationPropertyDuo
  extends SQDIDuo<ApplicationProperty, ApplicationPropertyESelect, ApplicationPropertyECreateProperties, ApplicationPropertyEUpdateColumns, ApplicationPropertyEUpdateProperties, ApplicationPropertyEId, ApplicationPropertyGraph, QApplicationProperty>
	implements IBaseApplicationPropertyDuo {

	static diSet(): boolean {
		return duoDiSet(2)
	}
	
	constructor() {
		super(2)
	}
}


export interface IBaseApplicationPropertyColumnDuo
  extends IDuo<ApplicationPropertyColumn, ApplicationPropertyColumnESelect, ApplicationPropertyColumnECreateProperties, ApplicationPropertyColumnEUpdateColumns, ApplicationPropertyColumnEUpdateProperties, ApplicationPropertyColumnEId, ApplicationPropertyColumnGraph, QApplicationPropertyColumn> {
}

export class BaseApplicationPropertyColumnDuo
  extends SQDIDuo<ApplicationPropertyColumn, ApplicationPropertyColumnESelect, ApplicationPropertyColumnECreateProperties, ApplicationPropertyColumnEUpdateColumns, ApplicationPropertyColumnEUpdateProperties, ApplicationPropertyColumnEId, ApplicationPropertyColumnGraph, QApplicationPropertyColumn>
	implements IBaseApplicationPropertyColumnDuo {

	static diSet(): boolean {
		return duoDiSet(3)
	}
	
	constructor() {
		super(3)
	}
}


export interface IBaseApplicationReferenceDuo
  extends IDuo<ApplicationReference, ApplicationReferenceESelect, ApplicationReferenceECreateProperties, ApplicationReferenceEUpdateColumns, ApplicationReferenceEUpdateProperties, ApplicationReferenceEId, ApplicationReferenceGraph, QApplicationReference> {
}

export class BaseApplicationReferenceDuo
  extends SQDIDuo<ApplicationReference, ApplicationReferenceESelect, ApplicationReferenceECreateProperties, ApplicationReferenceEUpdateColumns, ApplicationReferenceEUpdateProperties, ApplicationReferenceEId, ApplicationReferenceGraph, QApplicationReference>
	implements IBaseApplicationReferenceDuo {

	static diSet(): boolean {
		return duoDiSet(7)
	}
	
	constructor() {
		super(7)
	}
}


export interface IBaseApplicationRelationDuo
  extends IDuo<ApplicationRelation, ApplicationRelationESelect, ApplicationRelationECreateProperties, ApplicationRelationEUpdateColumns, ApplicationRelationEUpdateProperties, ApplicationRelationEId, ApplicationRelationGraph, QApplicationRelation> {
}

export class BaseApplicationRelationDuo
  extends SQDIDuo<ApplicationRelation, ApplicationRelationESelect, ApplicationRelationECreateProperties, ApplicationRelationEUpdateColumns, ApplicationRelationEUpdateProperties, ApplicationRelationEId, ApplicationRelationGraph, QApplicationRelation>
	implements IBaseApplicationRelationDuo {

	static diSet(): boolean {
		return duoDiSet(1)
	}
	
	constructor() {
		super(1)
	}
}


export interface IBaseApplicationRelationColumnDuo
  extends IDuo<ApplicationRelationColumn, ApplicationRelationColumnESelect, ApplicationRelationColumnECreateProperties, ApplicationRelationColumnEUpdateColumns, ApplicationRelationColumnEUpdateProperties, ApplicationRelationColumnEId, ApplicationRelationColumnGraph, QApplicationRelationColumn> {
}

export class BaseApplicationRelationColumnDuo
  extends SQDIDuo<ApplicationRelationColumn, ApplicationRelationColumnESelect, ApplicationRelationColumnECreateProperties, ApplicationRelationColumnEUpdateColumns, ApplicationRelationColumnEUpdateProperties, ApplicationRelationColumnEId, ApplicationRelationColumnGraph, QApplicationRelationColumn>
	implements IBaseApplicationRelationColumnDuo {

	static diSet(): boolean {
		return duoDiSet(0)
	}
	
	constructor() {
		super(0)
	}
}


export interface IBaseApplicationVersionDuo
  extends IDuo<ApplicationVersion, ApplicationVersionESelect, ApplicationVersionECreateProperties, ApplicationVersionEUpdateColumns, ApplicationVersionEUpdateProperties, ApplicationVersionEId, ApplicationVersionGraph, QApplicationVersion> {
}

export class BaseApplicationVersionDuo
  extends SQDIDuo<ApplicationVersion, ApplicationVersionESelect, ApplicationVersionECreateProperties, ApplicationVersionEUpdateColumns, ApplicationVersionEUpdateProperties, ApplicationVersionEId, ApplicationVersionGraph, QApplicationVersion>
	implements IBaseApplicationVersionDuo {

	static diSet(): boolean {
		return duoDiSet(8)
	}
	
	constructor() {
		super(8)
	}
}


export interface IBaseDomainDuo
  extends IDuo<Domain, DomainESelect, DomainECreateProperties, DomainEUpdateColumns, DomainEUpdateProperties, DomainEId, DomainGraph, QDomain> {
}

export class BaseDomainDuo
  extends SQDIDuo<Domain, DomainESelect, DomainECreateProperties, DomainEUpdateColumns, DomainEUpdateProperties, DomainEId, DomainGraph, QDomain>
	implements IBaseDomainDuo {

	static diSet(): boolean {
		return duoDiSet(11)
	}
	
	constructor() {
		super(11)
	}
}
