import { IDmo } from "@airport/air-control";
import { Dmo } from "@airport/check-in";
import { IApplication, ApplicationESelect, ApplicationECreateProperties, ApplicationEUpdateProperties, ApplicationEId, QApplication } from './qapplication';
import { IApplicationPackage, ApplicationPackageESelect, ApplicationPackageECreateProperties, ApplicationPackageEUpdateProperties, ApplicationPackageEId, QApplicationPackage } from './qapplicationpackage';
import { IDomain, DomainESelect, DomainECreateProperties, DomainEUpdateProperties, DomainEId, QDomain } from './qdomain';
import { IPackage, PackageESelect, PackageECreateProperties, PackageEUpdateProperties, PackageEId, QPackage } from './qpackage';
import { IPackagedUnit, PackagedUnitESelect, PackagedUnitECreateProperties, PackagedUnitEUpdateProperties, PackagedUnitEId, QPackagedUnit } from './qpackagedunit';
export interface IBaseApplicationDmo extends IDmo<IApplication, ApplicationESelect, ApplicationECreateProperties, ApplicationEUpdateProperties, ApplicationEId, QApplication> {
}
export declare class BaseApplicationDmo extends Dmo<IApplication, ApplicationESelect, ApplicationECreateProperties, ApplicationEUpdateProperties, ApplicationEId, QApplication> implements IBaseApplicationDmo {
    constructor();
}
export interface IBaseApplicationPackageDmo extends IDmo<IApplicationPackage, ApplicationPackageESelect, ApplicationPackageECreateProperties, ApplicationPackageEUpdateProperties, ApplicationPackageEId, QApplicationPackage> {
}
export declare class BaseApplicationPackageDmo extends Dmo<IApplicationPackage, ApplicationPackageESelect, ApplicationPackageECreateProperties, ApplicationPackageEUpdateProperties, ApplicationPackageEId, QApplicationPackage> implements IBaseApplicationPackageDmo {
    constructor();
}
export interface IBaseDomainDmo extends IDmo<IDomain, DomainESelect, DomainECreateProperties, DomainEUpdateProperties, DomainEId, QDomain> {
}
export declare class BaseDomainDmo extends Dmo<IDomain, DomainESelect, DomainECreateProperties, DomainEUpdateProperties, DomainEId, QDomain> implements IBaseDomainDmo {
    constructor();
}
export interface IBasePackageDmo extends IDmo<IPackage, PackageESelect, PackageECreateProperties, PackageEUpdateProperties, PackageEId, QPackage> {
}
export declare class BasePackageDmo extends Dmo<IPackage, PackageESelect, PackageECreateProperties, PackageEUpdateProperties, PackageEId, QPackage> implements IBasePackageDmo {
    constructor();
}
export interface IBasePackagedUnitDmo extends IDmo<IPackagedUnit, PackagedUnitESelect, PackagedUnitECreateProperties, PackagedUnitEUpdateProperties, PackagedUnitEId, QPackagedUnit> {
}
export declare class BasePackagedUnitDmo extends Dmo<IPackagedUnit, PackagedUnitESelect, PackagedUnitECreateProperties, PackagedUnitEUpdateProperties, PackagedUnitEId, QPackagedUnit> implements IBasePackagedUnitDmo {
    constructor();
}
