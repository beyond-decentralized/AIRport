import { IDao, IUtils } from '@airport/air-control';
import { Dao } from '@airport/check-in';
import { IApplication, ApplicationESelect, ApplicationECreateProperties, ApplicationEUpdateColumns, ApplicationEUpdateProperties, ApplicationEId, QApplication } from './qapplication';
import { IApplicationPackage, ApplicationPackageESelect, ApplicationPackageECreateProperties, ApplicationPackageEUpdateColumns, ApplicationPackageEUpdateProperties, ApplicationPackageEId, QApplicationPackage } from './qapplicationpackage';
import { IDomain, DomainESelect, DomainECreateProperties, DomainEUpdateColumns, DomainEUpdateProperties, DomainEId, QDomain } from './qdomain';
import { IPackage, PackageESelect, PackageECreateProperties, PackageEUpdateColumns, PackageEUpdateProperties, PackageEId, QPackage } from './qpackage';
import { IPackagedUnit, PackagedUnitESelect, PackagedUnitECreateProperties, PackagedUnitEUpdateColumns, PackagedUnitEUpdateProperties, PackagedUnitEId, QPackagedUnit } from './qpackagedunit';
export interface IBaseApplicationDao extends IDao<IApplication, ApplicationESelect, ApplicationECreateProperties, ApplicationEUpdateColumns, ApplicationEUpdateProperties, ApplicationEId, QApplication> {
}
export declare class BaseApplicationDao extends Dao<IApplication, ApplicationESelect, ApplicationECreateProperties, ApplicationEUpdateColumns, ApplicationEUpdateProperties, ApplicationEId, QApplication> implements IBaseApplicationDao {
    constructor(utils: IUtils);
}
export interface IBaseApplicationPackageDao extends IDao<IApplicationPackage, ApplicationPackageESelect, ApplicationPackageECreateProperties, ApplicationPackageEUpdateColumns, ApplicationPackageEUpdateProperties, ApplicationPackageEId, QApplicationPackage> {
}
export declare class BaseApplicationPackageDao extends Dao<IApplicationPackage, ApplicationPackageESelect, ApplicationPackageECreateProperties, ApplicationPackageEUpdateColumns, ApplicationPackageEUpdateProperties, ApplicationPackageEId, QApplicationPackage> implements IBaseApplicationPackageDao {
    constructor(utils: IUtils);
}
export interface IBaseDomainDao extends IDao<IDomain, DomainESelect, DomainECreateProperties, DomainEUpdateColumns, DomainEUpdateProperties, DomainEId, QDomain> {
}
export declare class BaseDomainDao extends Dao<IDomain, DomainESelect, DomainECreateProperties, DomainEUpdateColumns, DomainEUpdateProperties, DomainEId, QDomain> implements IBaseDomainDao {
    constructor(utils: IUtils);
}
export interface IBasePackageDao extends IDao<IPackage, PackageESelect, PackageECreateProperties, PackageEUpdateColumns, PackageEUpdateProperties, PackageEId, QPackage> {
}
export declare class BasePackageDao extends Dao<IPackage, PackageESelect, PackageECreateProperties, PackageEUpdateColumns, PackageEUpdateProperties, PackageEId, QPackage> implements IBasePackageDao {
    constructor(utils: IUtils);
}
export interface IBasePackagedUnitDao extends IDao<IPackagedUnit, PackagedUnitESelect, PackagedUnitECreateProperties, PackagedUnitEUpdateColumns, PackagedUnitEUpdateProperties, PackagedUnitEId, QPackagedUnit> {
}
export declare class BasePackagedUnitDao extends Dao<IPackagedUnit, PackagedUnitESelect, PackagedUnitECreateProperties, PackagedUnitEUpdateColumns, PackagedUnitEUpdateProperties, PackagedUnitEId, QPackagedUnit> implements IBasePackagedUnitDao {
    constructor(utils: IUtils);
}
