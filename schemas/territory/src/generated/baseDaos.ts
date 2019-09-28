import {
	IDao,
	IEntityCascadeGraph,
	IEntityCreateProperties,
	IEntityIdProperties,
	IEntitySelectProperties,
	IEntityUpdateColumns,
	IEntityUpdateProperties,
	IQEntity
} from '@airport/air-control'
import { Dao } from '@airport/check-in'
import {
	EntityId as DbEntityId
} from '@airport/ground-control'
import {
	Q,
	duoDiSet
} from './qSchema'
import {
	IApplication
} from './application'
import {
	ApplicationESelect,
	ApplicationECreateColumns,
	ApplicationECreateProperties,
	ApplicationEUpdateColumns,
	ApplicationEUpdateProperties,
	ApplicationEId,
	ApplicationECascadeGraph,
	QApplication
} from './qapplication'
import {
	IApplicationPackage
} from './applicationpackage'
import {
	ApplicationPackageESelect,
	ApplicationPackageECreateColumns,
	ApplicationPackageECreateProperties,
	ApplicationPackageEUpdateColumns,
	ApplicationPackageEUpdateProperties,
	ApplicationPackageEId,
	ApplicationPackageECascadeGraph,
	QApplicationPackage
} from './qapplicationpackage'
import {
	IDomain
} from './domain'
import {
	DomainESelect,
	DomainECreateColumns,
	DomainECreateProperties,
	DomainEUpdateColumns,
	DomainEUpdateProperties,
	DomainEId,
	DomainECascadeGraph,
	QDomain
} from './qdomain'
import {
	IPackage
} from './package'
import {
	PackageESelect,
	PackageECreateColumns,
	PackageECreateProperties,
	PackageEUpdateColumns,
	PackageEUpdateProperties,
	PackageEId,
	PackageECascadeGraph,
	QPackage
} from './qpackage'
import {
	IPackagedUnit
} from './packagedunit'
import {
	PackagedUnitESelect,
	PackagedUnitECreateColumns,
	PackagedUnitECreateProperties,
	PackagedUnitEUpdateColumns,
	PackagedUnitEUpdateProperties,
	PackagedUnitEId,
	PackagedUnitECascadeGraph,
	QPackagedUnit
} from './qpackagedunit'


// Schema Q object Dependency Injection readiness detection Dao
export class SQDIDao<Entity,
	EntitySelect extends IEntitySelectProperties,
	EntityCreate extends IEntityCreateProperties,
  EntityUpdateColumns extends IEntityUpdateColumns,
	EntityUpdateProperties extends IEntityUpdateProperties,
	EntityId extends IEntityIdProperties,
	EntityCascadeGraph extends IEntityCascadeGraph,
	IQE extends IQEntity>
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


export interface IBaseApplicationDao
  extends IDao<IApplication, ApplicationESelect, ApplicationECreateProperties, ApplicationEUpdateColumns, ApplicationEUpdateProperties, ApplicationEId, ApplicationECascadeGraph, QApplication> {
}

export class BaseApplicationDao
  extends SQDIDao<IApplication, ApplicationESelect, ApplicationECreateProperties, ApplicationEUpdateColumns, ApplicationEUpdateProperties, ApplicationEId, ApplicationECascadeGraph, QApplication>
	implements IBaseApplicationDao {

	static diSet(): boolean {
		return duoDiSet(3)
	}
	
	constructor() {
		super(3)
	}
}


export interface IBaseApplicationPackageDao
  extends IDao<IApplicationPackage, ApplicationPackageESelect, ApplicationPackageECreateProperties, ApplicationPackageEUpdateColumns, ApplicationPackageEUpdateProperties, ApplicationPackageEId, ApplicationPackageECascadeGraph, QApplicationPackage> {
}

export class BaseApplicationPackageDao
  extends SQDIDao<IApplicationPackage, ApplicationPackageESelect, ApplicationPackageECreateProperties, ApplicationPackageEUpdateColumns, ApplicationPackageEUpdateProperties, ApplicationPackageEId, ApplicationPackageECascadeGraph, QApplicationPackage>
	implements IBaseApplicationPackageDao {

	static diSet(): boolean {
		return duoDiSet(1)
	}
	
	constructor() {
		super(1)
	}
}


export interface IBaseDomainDao
  extends IDao<IDomain, DomainESelect, DomainECreateProperties, DomainEUpdateColumns, DomainEUpdateProperties, DomainEId, DomainECascadeGraph, QDomain> {
}

export class BaseDomainDao
  extends SQDIDao<IDomain, DomainESelect, DomainECreateProperties, DomainEUpdateColumns, DomainEUpdateProperties, DomainEId, DomainECascadeGraph, QDomain>
	implements IBaseDomainDao {

	static diSet(): boolean {
		return duoDiSet(2)
	}
	
	constructor() {
		super(2)
	}
}


export interface IBasePackageDao
  extends IDao<IPackage, PackageESelect, PackageECreateProperties, PackageEUpdateColumns, PackageEUpdateProperties, PackageEId, PackageECascadeGraph, QPackage> {
}

export class BasePackageDao
  extends SQDIDao<IPackage, PackageESelect, PackageECreateProperties, PackageEUpdateColumns, PackageEUpdateProperties, PackageEId, PackageECascadeGraph, QPackage>
	implements IBasePackageDao {

	static diSet(): boolean {
		return duoDiSet(0)
	}
	
	constructor() {
		super(0)
	}
}


export interface IBasePackagedUnitDao
  extends IDao<IPackagedUnit, PackagedUnitESelect, PackagedUnitECreateProperties, PackagedUnitEUpdateColumns, PackagedUnitEUpdateProperties, PackagedUnitEId, PackagedUnitECascadeGraph, QPackagedUnit> {
}

export class BasePackagedUnitDao
  extends SQDIDao<IPackagedUnit, PackagedUnitESelect, PackagedUnitECreateProperties, PackagedUnitEUpdateColumns, PackagedUnitEUpdateProperties, PackagedUnitEId, PackagedUnitECascadeGraph, QPackagedUnit>
	implements IBasePackagedUnitDao {

	static diSet(): boolean {
		return duoDiSet(4)
	}
	
	constructor() {
		super(4)
	}
}
