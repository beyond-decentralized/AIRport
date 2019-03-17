import {
	IDao, 
	IUtils 
} from '@airport/air-control';
import { Dao } from '@airport/check-in';
import { Q } from './qSchema';
import {
	IApplication,
	ApplicationESelect,
	ApplicationECreateColumns,
	ApplicationECreateProperties,
	ApplicationEUpdateColumns,
	ApplicationEUpdateProperties,
	ApplicationEId,
	QApplication
} from './qapplication';
import {
	IApplicationPackage,
	ApplicationPackageESelect,
	ApplicationPackageECreateColumns,
	ApplicationPackageECreateProperties,
	ApplicationPackageEUpdateColumns,
	ApplicationPackageEUpdateProperties,
	ApplicationPackageEId,
	QApplicationPackage
} from './qapplicationpackage';
import {
	IDomain,
	DomainESelect,
	DomainECreateColumns,
	DomainECreateProperties,
	DomainEUpdateColumns,
	DomainEUpdateProperties,
	DomainEId,
	QDomain
} from './qdomain';
import {
	IPackage,
	PackageESelect,
	PackageECreateColumns,
	PackageECreateProperties,
	PackageEUpdateColumns,
	PackageEUpdateProperties,
	PackageEId,
	QPackage
} from './qpackage';
import {
	IPackagedUnit,
	PackagedUnitESelect,
	PackagedUnitECreateColumns,
	PackagedUnitECreateProperties,
	PackagedUnitEUpdateColumns,
	PackagedUnitEUpdateProperties,
	PackagedUnitEId,
	QPackagedUnit
} from './qpackagedunit';


export interface IBaseApplicationDao
  extends IDao<IApplication, ApplicationESelect, ApplicationECreateProperties, ApplicationEUpdateColumns, ApplicationEUpdateProperties, ApplicationEId, QApplication> {
}

export class BaseApplicationDao
  extends Dao<IApplication, ApplicationESelect, ApplicationECreateProperties, ApplicationEUpdateColumns, ApplicationEUpdateProperties, ApplicationEId, QApplication>
	implements IBaseApplicationDao {
	constructor() {
		super(Q.db.currentVersion.entityMapByName['Application'], Q)
	}
}


export interface IBaseApplicationPackageDao
  extends IDao<IApplicationPackage, ApplicationPackageESelect, ApplicationPackageECreateProperties, ApplicationPackageEUpdateColumns, ApplicationPackageEUpdateProperties, ApplicationPackageEId, QApplicationPackage> {
}

export class BaseApplicationPackageDao
  extends Dao<IApplicationPackage, ApplicationPackageESelect, ApplicationPackageECreateProperties, ApplicationPackageEUpdateColumns, ApplicationPackageEUpdateProperties, ApplicationPackageEId, QApplicationPackage>
	implements IBaseApplicationPackageDao {
	constructor() {
		super(Q.db.currentVersion.entityMapByName['ApplicationPackage'], Q)
	}
}


export interface IBaseDomainDao
  extends IDao<IDomain, DomainESelect, DomainECreateProperties, DomainEUpdateColumns, DomainEUpdateProperties, DomainEId, QDomain> {
}

export class BaseDomainDao
  extends Dao<IDomain, DomainESelect, DomainECreateProperties, DomainEUpdateColumns, DomainEUpdateProperties, DomainEId, QDomain>
	implements IBaseDomainDao {
	constructor() {
		super(Q.db.currentVersion.entityMapByName['Domain'], Q)
	}
}


export interface IBasePackageDao
  extends IDao<IPackage, PackageESelect, PackageECreateProperties, PackageEUpdateColumns, PackageEUpdateProperties, PackageEId, QPackage> {
}

export class BasePackageDao
  extends Dao<IPackage, PackageESelect, PackageECreateProperties, PackageEUpdateColumns, PackageEUpdateProperties, PackageEId, QPackage>
	implements IBasePackageDao {
	constructor() {
		super(Q.db.currentVersion.entityMapByName['Package'], Q)
	}
}


export interface IBasePackagedUnitDao
  extends IDao<IPackagedUnit, PackagedUnitESelect, PackagedUnitECreateProperties, PackagedUnitEUpdateColumns, PackagedUnitEUpdateProperties, PackagedUnitEId, QPackagedUnit> {
}

export class BasePackagedUnitDao
  extends Dao<IPackagedUnit, PackagedUnitESelect, PackagedUnitECreateProperties, PackagedUnitEUpdateColumns, PackagedUnitEUpdateProperties, PackagedUnitEId, QPackagedUnit>
	implements IBasePackagedUnitDao {
	constructor() {
		super(Q.db.currentVersion.entityMapByName['PackagedUnit'], Q)
	}
}
