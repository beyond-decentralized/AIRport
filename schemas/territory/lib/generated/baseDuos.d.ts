import { IDuo, IEntityCreateProperties, IEntityIdProperties, IEntitySelectProperties, IEntityUpdateProperties, IQEntity } from '@airport/air-control';
import { Duo } from "@airport/check-in";
import { EntityId as DbEntityId } from '@airport/ground-control';
import { IApplication, ApplicationESelect, ApplicationECreateProperties, ApplicationEUpdateProperties, ApplicationEId, QApplication } from './qapplication';
import { IApplicationPackage, ApplicationPackageESelect, ApplicationPackageECreateProperties, ApplicationPackageEUpdateProperties, ApplicationPackageEId, QApplicationPackage } from './qapplicationpackage';
import { IDomain, DomainESelect, DomainECreateProperties, DomainEUpdateProperties, DomainEId, QDomain } from './qdomain';
import { IPackage, PackageESelect, PackageECreateProperties, PackageEUpdateProperties, PackageEId, QPackage } from './qpackage';
import { IPackagedUnit, PackagedUnitESelect, PackagedUnitECreateProperties, PackagedUnitEUpdateProperties, PackagedUnitEId, QPackagedUnit } from './qpackagedunit';
export declare class SQDIDuo<Entity, EntitySelect extends IEntitySelectProperties, EntityCreate extends IEntityCreateProperties, EntityUpdateProperties extends IEntityUpdateProperties, EntityId extends IEntityIdProperties, IQE extends IQEntity> extends Duo<Entity, EntitySelect, EntityCreate, EntityUpdateProperties, EntityId, IQE> {
    constructor(dbEntityId: DbEntityId);
}
export interface IBaseApplicationDuo extends IDuo<IApplication, ApplicationESelect, ApplicationECreateProperties, ApplicationEUpdateProperties, ApplicationEId, QApplication> {
}
export declare class BaseApplicationDuo extends SQDIDuo<IApplication, ApplicationESelect, ApplicationECreateProperties, ApplicationEUpdateProperties, ApplicationEId, QApplication> implements IBaseApplicationDuo {
    static diSet(): boolean;
    constructor();
}
export interface IBaseApplicationPackageDuo extends IDuo<IApplicationPackage, ApplicationPackageESelect, ApplicationPackageECreateProperties, ApplicationPackageEUpdateProperties, ApplicationPackageEId, QApplicationPackage> {
}
export declare class BaseApplicationPackageDuo extends SQDIDuo<IApplicationPackage, ApplicationPackageESelect, ApplicationPackageECreateProperties, ApplicationPackageEUpdateProperties, ApplicationPackageEId, QApplicationPackage> implements IBaseApplicationPackageDuo {
    static diSet(): boolean;
    constructor();
}
export interface IBaseDomainDuo extends IDuo<IDomain, DomainESelect, DomainECreateProperties, DomainEUpdateProperties, DomainEId, QDomain> {
}
export declare class BaseDomainDuo extends SQDIDuo<IDomain, DomainESelect, DomainECreateProperties, DomainEUpdateProperties, DomainEId, QDomain> implements IBaseDomainDuo {
    static diSet(): boolean;
    constructor();
}
export interface IBasePackageDuo extends IDuo<IPackage, PackageESelect, PackageECreateProperties, PackageEUpdateProperties, PackageEId, QPackage> {
}
export declare class BasePackageDuo extends SQDIDuo<IPackage, PackageESelect, PackageECreateProperties, PackageEUpdateProperties, PackageEId, QPackage> implements IBasePackageDuo {
    static diSet(): boolean;
    constructor();
}
export interface IBasePackagedUnitDuo extends IDuo<IPackagedUnit, PackagedUnitESelect, PackagedUnitECreateProperties, PackagedUnitEUpdateProperties, PackagedUnitEId, QPackagedUnit> {
}
export declare class BasePackagedUnitDuo extends SQDIDuo<IPackagedUnit, PackagedUnitESelect, PackagedUnitECreateProperties, PackagedUnitEUpdateProperties, PackagedUnitEId, QPackagedUnit> implements IBasePackagedUnitDuo {
    static diSet(): boolean;
    constructor();
}
