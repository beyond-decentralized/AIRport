import {
	IDuo,
	IEntityCascadeGraph,
	IEntityCreateProperties,
	IEntityIdProperties,
	IEntitySelectProperties,
	IEntityUpdateColumns,
	IEntityUpdateProperties,
	IQEntity
} from '@airport/air-control'
import { Duo } from '@airport/check-in'
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


// Schema Q object Dependency Injection readiness detection Duo
export class SQDIDuo<Entity,
	EntitySelect extends IEntitySelectProperties,
	EntityCreate extends IEntityCreateProperties,
  EntityUpdateColumns extends IEntityUpdateColumns,
	EntityUpdateProperties extends IEntityUpdateProperties,
	EntityId extends IEntityIdProperties,
	EntityCascadeGraph extends IEntityCascadeGraph,
	IQE extends IQEntity>
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


export interface IBaseApplicationDuo
  extends IDuo<IApplication, ApplicationESelect, ApplicationECreateProperties, ApplicationEUpdateColumns, ApplicationEUpdateProperties, ApplicationEId, ApplicationECascadeGraph, QApplication> {
}

export class BaseApplicationDuo
  extends SQDIDuo<IApplication, ApplicationESelect, ApplicationECreateProperties, ApplicationEUpdateColumns, ApplicationEUpdateProperties, ApplicationEId, ApplicationECascadeGraph, QApplication>
	implements IBaseApplicationDuo {

	static diSet(): boolean {
		return duoDiSet(3)
	}
	
	constructor() {
		super(3)
	}
}


export interface IBaseApplicationPackageDuo
  extends IDuo<IApplicationPackage, ApplicationPackageESelect, ApplicationPackageECreateProperties, ApplicationPackageEUpdateColumns, ApplicationPackageEUpdateProperties, ApplicationPackageEId, ApplicationPackageECascadeGraph, QApplicationPackage> {
}

export class BaseApplicationPackageDuo
  extends SQDIDuo<IApplicationPackage, ApplicationPackageESelect, ApplicationPackageECreateProperties, ApplicationPackageEUpdateColumns, ApplicationPackageEUpdateProperties, ApplicationPackageEId, ApplicationPackageECascadeGraph, QApplicationPackage>
	implements IBaseApplicationPackageDuo {

	static diSet(): boolean {
		return duoDiSet(1)
	}
	
	constructor() {
		super(1)
	}
}


export interface IBaseDomainDuo
  extends IDuo<IDomain, DomainESelect, DomainECreateProperties, DomainEUpdateColumns, DomainEUpdateProperties, DomainEId, DomainECascadeGraph, QDomain> {
}

export class BaseDomainDuo
  extends SQDIDuo<IDomain, DomainESelect, DomainECreateProperties, DomainEUpdateColumns, DomainEUpdateProperties, DomainEId, DomainECascadeGraph, QDomain>
	implements IBaseDomainDuo {

	static diSet(): boolean {
		return duoDiSet(2)
	}
	
	constructor() {
		super(2)
	}
}


export interface IBasePackageDuo
  extends IDuo<IPackage, PackageESelect, PackageECreateProperties, PackageEUpdateColumns, PackageEUpdateProperties, PackageEId, PackageECascadeGraph, QPackage> {
}

export class BasePackageDuo
  extends SQDIDuo<IPackage, PackageESelect, PackageECreateProperties, PackageEUpdateColumns, PackageEUpdateProperties, PackageEId, PackageECascadeGraph, QPackage>
	implements IBasePackageDuo {

	static diSet(): boolean {
		return duoDiSet(0)
	}
	
	constructor() {
		super(0)
	}
}


export interface IBasePackagedUnitDuo
  extends IDuo<IPackagedUnit, PackagedUnitESelect, PackagedUnitECreateProperties, PackagedUnitEUpdateColumns, PackagedUnitEUpdateProperties, PackagedUnitEId, PackagedUnitECascadeGraph, QPackagedUnit> {
}

export class BasePackagedUnitDuo
  extends SQDIDuo<IPackagedUnit, PackagedUnitESelect, PackagedUnitECreateProperties, PackagedUnitEUpdateColumns, PackagedUnitEUpdateProperties, PackagedUnitEId, PackagedUnitECascadeGraph, QPackagedUnit>
	implements IBasePackagedUnitDuo {

	static diSet(): boolean {
		return duoDiSet(4)
	}
	
	constructor() {
		super(4)
	}
}
