/* eslint-disable */
import {
	IApplication,
} from './application';
import {
	ApplicationESelect,
	ApplicationECreateColumns,
	ApplicationECreateProperties,
	ApplicationEUpdateColumns,
	ApplicationEUpdateProperties,
	ApplicationEId,
	ApplicationGraph,
	QApplication,
} from './qapplication';
import {
	IApplicationPackage,
} from './applicationpackage';
import {
	ApplicationPackageESelect,
	ApplicationPackageECreateColumns,
	ApplicationPackageECreateProperties,
	ApplicationPackageEUpdateColumns,
	ApplicationPackageEUpdateProperties,
	ApplicationPackageEId,
	ApplicationPackageGraph,
	QApplicationPackage,
} from './qapplicationpackage';
import {
	IDomain,
} from './domain';
import {
	DomainESelect,
	DomainECreateColumns,
	DomainECreateProperties,
	DomainEUpdateColumns,
	DomainEUpdateProperties,
	DomainEId,
	DomainGraph,
	QDomain,
} from './qdomain';
import {
	IPackage,
} from './package';
import {
	PackageESelect,
	PackageECreateColumns,
	PackageECreateProperties,
	PackageEUpdateColumns,
	PackageEUpdateProperties,
	PackageEId,
	PackageGraph,
	QPackage,
} from './qpackage';
import {
	IPackagedUnit,
} from './packagedunit';
import {
	PackagedUnitESelect,
	PackagedUnitECreateColumns,
	PackagedUnitECreateProperties,
	PackagedUnitEUpdateColumns,
	PackagedUnitEUpdateProperties,
	PackagedUnitEId,
	PackagedUnitGraph,
	QPackagedUnit,
} from './qpackagedunit';
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


export interface IBaseApplicationDao
  extends IDao<IApplication, ApplicationESelect, ApplicationECreateProperties, ApplicationEUpdateColumns, ApplicationEUpdateProperties, ApplicationEId, ApplicationGraph, QApplication> {
}

export class BaseApplicationDao
  extends SQDIDao<IApplication, ApplicationESelect, ApplicationECreateProperties, ApplicationEUpdateColumns, ApplicationEUpdateProperties, ApplicationEId, ApplicationGraph, QApplication>
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
		return duoDiSet(3)
	}
	
	constructor() {
		super(3)
	}
}


export interface IBaseApplicationPackageDao
  extends IDao<IApplicationPackage, ApplicationPackageESelect, ApplicationPackageECreateProperties, ApplicationPackageEUpdateColumns, ApplicationPackageEUpdateProperties, ApplicationPackageEId, ApplicationPackageGraph, QApplicationPackage> {
}

export class BaseApplicationPackageDao
  extends SQDIDao<IApplicationPackage, ApplicationPackageESelect, ApplicationPackageECreateProperties, ApplicationPackageEUpdateColumns, ApplicationPackageEUpdateProperties, ApplicationPackageEId, ApplicationPackageGraph, QApplicationPackage>
	implements IBaseApplicationPackageDao {
	
	static Find      = new DaoQueryDecorators<ApplicationPackageESelect>();
	static FindOne   = new DaoQueryDecorators<ApplicationPackageESelect>();
	static Search    = new DaoQueryDecorators<ApplicationPackageESelect>();
	static SearchOne = new DaoQueryDecorators<ApplicationPackageESelect>();
	static Save(
		config: ApplicationPackageGraph
	): PropertyDecorator {
		return Dao.BaseSave<ApplicationPackageGraph>(config);
  }

	static diSet(): boolean {
		return duoDiSet(1)
	}
	
	constructor() {
		super(1)
	}
}


export interface IBaseDomainDao
  extends IDao<IDomain, DomainESelect, DomainECreateProperties, DomainEUpdateColumns, DomainEUpdateProperties, DomainEId, DomainGraph, QDomain> {
}

export class BaseDomainDao
  extends SQDIDao<IDomain, DomainESelect, DomainECreateProperties, DomainEUpdateColumns, DomainEUpdateProperties, DomainEId, DomainGraph, QDomain>
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
		return duoDiSet(2)
	}
	
	constructor() {
		super(2)
	}
}


export interface IBasePackageDao
  extends IDao<IPackage, PackageESelect, PackageECreateProperties, PackageEUpdateColumns, PackageEUpdateProperties, PackageEId, PackageGraph, QPackage> {
}

export class BasePackageDao
  extends SQDIDao<IPackage, PackageESelect, PackageECreateProperties, PackageEUpdateColumns, PackageEUpdateProperties, PackageEId, PackageGraph, QPackage>
	implements IBasePackageDao {
	
	static Find      = new DaoQueryDecorators<PackageESelect>();
	static FindOne   = new DaoQueryDecorators<PackageESelect>();
	static Search    = new DaoQueryDecorators<PackageESelect>();
	static SearchOne = new DaoQueryDecorators<PackageESelect>();
	static Save(
		config: PackageGraph
	): PropertyDecorator {
		return Dao.BaseSave<PackageGraph>(config);
  }

	static diSet(): boolean {
		return duoDiSet(0)
	}
	
	constructor() {
		super(0)
	}
}


export interface IBasePackagedUnitDao
  extends IDao<IPackagedUnit, PackagedUnitESelect, PackagedUnitECreateProperties, PackagedUnitEUpdateColumns, PackagedUnitEUpdateProperties, PackagedUnitEId, PackagedUnitGraph, QPackagedUnit> {
}

export class BasePackagedUnitDao
  extends SQDIDao<IPackagedUnit, PackagedUnitESelect, PackagedUnitECreateProperties, PackagedUnitEUpdateColumns, PackagedUnitEUpdateProperties, PackagedUnitEId, PackagedUnitGraph, QPackagedUnit>
	implements IBasePackagedUnitDao {
	
	static Find      = new DaoQueryDecorators<PackagedUnitESelect>();
	static FindOne   = new DaoQueryDecorators<PackagedUnitESelect>();
	static Search    = new DaoQueryDecorators<PackagedUnitESelect>();
	static SearchOne = new DaoQueryDecorators<PackagedUnitESelect>();
	static Save(
		config: PackagedUnitGraph
	): PropertyDecorator {
		return Dao.BaseSave<PackagedUnitGraph>(config);
  }

	static diSet(): boolean {
		return duoDiSet(4)
	}
	
	constructor() {
		super(4)
	}
}
