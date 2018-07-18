import { IDmo } from "@airport/air-control";
import { Dmo } from "@airport/check-in";
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


export interface IBaseApplicationDmo
  extends IDmo<IApplication, ApplicationESelect, ApplicationECreateProperties, ApplicationEUpdateProperties, ApplicationEId, QApplication> {
}

export class BaseApplicationDmo
  extends Dmo<IApplication, ApplicationESelect, ApplicationECreateProperties, ApplicationEUpdateProperties, ApplicationEId, QApplication>
	implements IBaseApplicationDmo {
	constructor() {
		super(Q.db.currentVersion.entityMapByName['Application']);
	}
}


export interface IBaseApplicationPackageDmo
  extends IDmo<IApplicationPackage, ApplicationPackageESelect, ApplicationPackageECreateProperties, ApplicationPackageEUpdateProperties, ApplicationPackageEId, QApplicationPackage> {
}

export class BaseApplicationPackageDmo
  extends Dmo<IApplicationPackage, ApplicationPackageESelect, ApplicationPackageECreateProperties, ApplicationPackageEUpdateProperties, ApplicationPackageEId, QApplicationPackage>
	implements IBaseApplicationPackageDmo {
	constructor() {
		super(Q.db.currentVersion.entityMapByName['ApplicationPackage']);
	}
}


export interface IBaseDomainDmo
  extends IDmo<IDomain, DomainESelect, DomainECreateProperties, DomainEUpdateProperties, DomainEId, QDomain> {
}

export class BaseDomainDmo
  extends Dmo<IDomain, DomainESelect, DomainECreateProperties, DomainEUpdateProperties, DomainEId, QDomain>
	implements IBaseDomainDmo {
	constructor() {
		super(Q.db.currentVersion.entityMapByName['Domain']);
	}
}


export interface IBasePackageDmo
  extends IDmo<IPackage, PackageESelect, PackageECreateProperties, PackageEUpdateProperties, PackageEId, QPackage> {
}

export class BasePackageDmo
  extends Dmo<IPackage, PackageESelect, PackageECreateProperties, PackageEUpdateProperties, PackageEId, QPackage>
	implements IBasePackageDmo {
	constructor() {
		super(Q.db.currentVersion.entityMapByName['Package']);
	}
}


export interface IBasePackagedUnitDmo
  extends IDmo<IPackagedUnit, PackagedUnitESelect, PackagedUnitECreateProperties, PackagedUnitEUpdateProperties, PackagedUnitEId, QPackagedUnit> {
}

export class BasePackagedUnitDmo
  extends Dmo<IPackagedUnit, PackagedUnitESelect, PackagedUnitECreateProperties, PackagedUnitEUpdateProperties, PackagedUnitEId, QPackagedUnit>
	implements IBasePackagedUnitDmo {
	constructor() {
		super(Q.db.currentVersion.entityMapByName['PackagedUnit']);
	}
}
