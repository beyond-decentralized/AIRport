/* eslint-disable */
import {
	IDomain,
} from './application/domain';
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
	IApplication,
} from './application/application';
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
	IApplicationColumn,
} from './application/applicationcolumn';
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
	IApplicationCurrentVersion,
} from './application/applicationcurrentversion';
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
	IApplicationEntity,
} from './application/applicationentity';
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
	IApplicationOperation,
} from './application/applicationoperation';
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
	IApplicationProperty,
} from './application/applicationproperty';
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
	IApplicationPropertyColumn,
} from './application/applicationpropertycolumn';
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
	IApplicationReference,
} from './application/applicationreference';
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
	IApplicationRelation,
} from './application/applicationrelation';
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
	IApplicationRelationColumn,
} from './application/applicationrelationcolumn';
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
	IApplicationVersion,
} from './application/applicationversion';
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
} from './qApplication';


// Application Q object Dependency Injection readiness detection Duo
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


export interface IBaseDomainDuo
  extends IDuo<IDomain, DomainESelect, DomainECreateProperties, DomainEUpdateColumns, DomainEUpdateProperties, DomainEId, DomainGraph, QDomain> {
}

export class BaseDomainDuo
  extends SQDIDuo<IDomain, DomainESelect, DomainECreateProperties, DomainEUpdateColumns, DomainEUpdateProperties, DomainEId, DomainGraph, QDomain>
	implements IBaseDomainDuo {

	static diSet(): boolean {
		return duoDiSet(11)
	}
	
	constructor() {
		super(11)
	}
}


export interface IBaseApplicationDuo
  extends IDuo<IApplication, ApplicationESelect, ApplicationECreateProperties, ApplicationEUpdateColumns, ApplicationEUpdateProperties, ApplicationEId, ApplicationGraph, QApplication> {
}

export class BaseApplicationDuo
  extends SQDIDuo<IApplication, ApplicationESelect, ApplicationECreateProperties, ApplicationEUpdateColumns, ApplicationEUpdateProperties, ApplicationEId, ApplicationGraph, QApplication>
	implements IBaseApplicationDuo {

	static diSet(): boolean {
		return duoDiSet(10)
	}
	
	constructor() {
		super(10)
	}
}


export interface IBaseApplicationColumnDuo
  extends IDuo<IApplicationColumn, ApplicationColumnESelect, ApplicationColumnECreateProperties, ApplicationColumnEUpdateColumns, ApplicationColumnEUpdateProperties, ApplicationColumnEId, ApplicationColumnGraph, QApplicationColumn> {
}

export class BaseApplicationColumnDuo
  extends SQDIDuo<IApplicationColumn, ApplicationColumnESelect, ApplicationColumnECreateProperties, ApplicationColumnEUpdateColumns, ApplicationColumnEUpdateProperties, ApplicationColumnEId, ApplicationColumnGraph, QApplicationColumn>
	implements IBaseApplicationColumnDuo {

	static diSet(): boolean {
		return duoDiSet(4)
	}
	
	constructor() {
		super(4)
	}
}


export interface IBaseApplicationCurrentVersionDuo
  extends IDuo<IApplicationCurrentVersion, ApplicationCurrentVersionESelect, ApplicationCurrentVersionECreateProperties, ApplicationCurrentVersionEUpdateColumns, ApplicationCurrentVersionEUpdateProperties, ApplicationCurrentVersionEId, ApplicationCurrentVersionGraph, QApplicationCurrentVersion> {
}

export class BaseApplicationCurrentVersionDuo
  extends SQDIDuo<IApplicationCurrentVersion, ApplicationCurrentVersionESelect, ApplicationCurrentVersionECreateProperties, ApplicationCurrentVersionEUpdateColumns, ApplicationCurrentVersionEUpdateProperties, ApplicationCurrentVersionEId, ApplicationCurrentVersionGraph, QApplicationCurrentVersion>
	implements IBaseApplicationCurrentVersionDuo {

	static diSet(): boolean {
		return duoDiSet(9)
	}
	
	constructor() {
		super(9)
	}
}


export interface IBaseApplicationEntityDuo
  extends IDuo<IApplicationEntity, ApplicationEntityESelect, ApplicationEntityECreateProperties, ApplicationEntityEUpdateColumns, ApplicationEntityEUpdateProperties, ApplicationEntityEId, ApplicationEntityGraph, QApplicationEntity> {
}

export class BaseApplicationEntityDuo
  extends SQDIDuo<IApplicationEntity, ApplicationEntityESelect, ApplicationEntityECreateProperties, ApplicationEntityEUpdateColumns, ApplicationEntityEUpdateProperties, ApplicationEntityEId, ApplicationEntityGraph, QApplicationEntity>
	implements IBaseApplicationEntityDuo {

	static diSet(): boolean {
		return duoDiSet(6)
	}
	
	constructor() {
		super(6)
	}
}


export interface IBaseApplicationOperationDuo
  extends IDuo<IApplicationOperation, ApplicationOperationESelect, ApplicationOperationECreateProperties, ApplicationOperationEUpdateColumns, ApplicationOperationEUpdateProperties, ApplicationOperationEId, ApplicationOperationGraph, QApplicationOperation> {
}

export class BaseApplicationOperationDuo
  extends SQDIDuo<IApplicationOperation, ApplicationOperationESelect, ApplicationOperationECreateProperties, ApplicationOperationEUpdateColumns, ApplicationOperationEUpdateProperties, ApplicationOperationEId, ApplicationOperationGraph, QApplicationOperation>
	implements IBaseApplicationOperationDuo {

	static diSet(): boolean {
		return duoDiSet(5)
	}
	
	constructor() {
		super(5)
	}
}


export interface IBaseApplicationPropertyDuo
  extends IDuo<IApplicationProperty, ApplicationPropertyESelect, ApplicationPropertyECreateProperties, ApplicationPropertyEUpdateColumns, ApplicationPropertyEUpdateProperties, ApplicationPropertyEId, ApplicationPropertyGraph, QApplicationProperty> {
}

export class BaseApplicationPropertyDuo
  extends SQDIDuo<IApplicationProperty, ApplicationPropertyESelect, ApplicationPropertyECreateProperties, ApplicationPropertyEUpdateColumns, ApplicationPropertyEUpdateProperties, ApplicationPropertyEId, ApplicationPropertyGraph, QApplicationProperty>
	implements IBaseApplicationPropertyDuo {

	static diSet(): boolean {
		return duoDiSet(2)
	}
	
	constructor() {
		super(2)
	}
}


export interface IBaseApplicationPropertyColumnDuo
  extends IDuo<IApplicationPropertyColumn, ApplicationPropertyColumnESelect, ApplicationPropertyColumnECreateProperties, ApplicationPropertyColumnEUpdateColumns, ApplicationPropertyColumnEUpdateProperties, ApplicationPropertyColumnEId, ApplicationPropertyColumnGraph, QApplicationPropertyColumn> {
}

export class BaseApplicationPropertyColumnDuo
  extends SQDIDuo<IApplicationPropertyColumn, ApplicationPropertyColumnESelect, ApplicationPropertyColumnECreateProperties, ApplicationPropertyColumnEUpdateColumns, ApplicationPropertyColumnEUpdateProperties, ApplicationPropertyColumnEId, ApplicationPropertyColumnGraph, QApplicationPropertyColumn>
	implements IBaseApplicationPropertyColumnDuo {

	static diSet(): boolean {
		return duoDiSet(3)
	}
	
	constructor() {
		super(3)
	}
}


export interface IBaseApplicationReferenceDuo
  extends IDuo<IApplicationReference, ApplicationReferenceESelect, ApplicationReferenceECreateProperties, ApplicationReferenceEUpdateColumns, ApplicationReferenceEUpdateProperties, ApplicationReferenceEId, ApplicationReferenceGraph, QApplicationReference> {
}

export class BaseApplicationReferenceDuo
  extends SQDIDuo<IApplicationReference, ApplicationReferenceESelect, ApplicationReferenceECreateProperties, ApplicationReferenceEUpdateColumns, ApplicationReferenceEUpdateProperties, ApplicationReferenceEId, ApplicationReferenceGraph, QApplicationReference>
	implements IBaseApplicationReferenceDuo {

	static diSet(): boolean {
		return duoDiSet(7)
	}
	
	constructor() {
		super(7)
	}
}


export interface IBaseApplicationRelationDuo
  extends IDuo<IApplicationRelation, ApplicationRelationESelect, ApplicationRelationECreateProperties, ApplicationRelationEUpdateColumns, ApplicationRelationEUpdateProperties, ApplicationRelationEId, ApplicationRelationGraph, QApplicationRelation> {
}

export class BaseApplicationRelationDuo
  extends SQDIDuo<IApplicationRelation, ApplicationRelationESelect, ApplicationRelationECreateProperties, ApplicationRelationEUpdateColumns, ApplicationRelationEUpdateProperties, ApplicationRelationEId, ApplicationRelationGraph, QApplicationRelation>
	implements IBaseApplicationRelationDuo {

	static diSet(): boolean {
		return duoDiSet(1)
	}
	
	constructor() {
		super(1)
	}
}


export interface IBaseApplicationRelationColumnDuo
  extends IDuo<IApplicationRelationColumn, ApplicationRelationColumnESelect, ApplicationRelationColumnECreateProperties, ApplicationRelationColumnEUpdateColumns, ApplicationRelationColumnEUpdateProperties, ApplicationRelationColumnEId, ApplicationRelationColumnGraph, QApplicationRelationColumn> {
}

export class BaseApplicationRelationColumnDuo
  extends SQDIDuo<IApplicationRelationColumn, ApplicationRelationColumnESelect, ApplicationRelationColumnECreateProperties, ApplicationRelationColumnEUpdateColumns, ApplicationRelationColumnEUpdateProperties, ApplicationRelationColumnEId, ApplicationRelationColumnGraph, QApplicationRelationColumn>
	implements IBaseApplicationRelationColumnDuo {

	static diSet(): boolean {
		return duoDiSet(0)
	}
	
	constructor() {
		super(0)
	}
}


export interface IBaseApplicationVersionDuo
  extends IDuo<IApplicationVersion, ApplicationVersionESelect, ApplicationVersionECreateProperties, ApplicationVersionEUpdateColumns, ApplicationVersionEUpdateProperties, ApplicationVersionEId, ApplicationVersionGraph, QApplicationVersion> {
}

export class BaseApplicationVersionDuo
  extends SQDIDuo<IApplicationVersion, ApplicationVersionESelect, ApplicationVersionECreateProperties, ApplicationVersionEUpdateColumns, ApplicationVersionEUpdateProperties, ApplicationVersionEId, ApplicationVersionGraph, QApplicationVersion>
	implements IBaseApplicationVersionDuo {

	static diSet(): boolean {
		return duoDiSet(8)
	}
	
	constructor() {
		super(8)
	}
}
