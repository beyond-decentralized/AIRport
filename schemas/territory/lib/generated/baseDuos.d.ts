import { IDuo, IEntityCascadeGraph, IEntityCreateProperties, IEntityIdProperties, IEntitySelectProperties, IEntityUpdateColumns, IEntityUpdateProperties, IQEntity } from '@airport/air-control';
import { Duo } from '@airport/check-in';
import { EntityId as DbEntityId } from '@airport/ground-control';
import { IApplication } from './application';
import { ApplicationESelect, ApplicationECreateProperties, ApplicationEUpdateColumns, ApplicationEUpdateProperties, ApplicationEId, ApplicationECascadeGraph, QApplication } from './qapplication';
import { IApplicationPackage } from './applicationpackage';
import { ApplicationPackageESelect, ApplicationPackageECreateProperties, ApplicationPackageEUpdateColumns, ApplicationPackageEUpdateProperties, ApplicationPackageEId, ApplicationPackageECascadeGraph, QApplicationPackage } from './qapplicationpackage';
import { IDomain } from './domain';
import { DomainESelect, DomainECreateProperties, DomainEUpdateColumns, DomainEUpdateProperties, DomainEId, DomainECascadeGraph, QDomain } from './qdomain';
import { IPackage } from './package';
import { PackageESelect, PackageECreateProperties, PackageEUpdateColumns, PackageEUpdateProperties, PackageEId, PackageECascadeGraph, QPackage } from './qpackage';
import { IPackagedUnit } from './packagedunit';
import { PackagedUnitESelect, PackagedUnitECreateProperties, PackagedUnitEUpdateColumns, PackagedUnitEUpdateProperties, PackagedUnitEId, PackagedUnitECascadeGraph, QPackagedUnit } from './qpackagedunit';
export declare class SQDIDuo<Entity, EntitySelect extends IEntitySelectProperties, EntityCreate extends IEntityCreateProperties, EntityUpdateColumns extends IEntityUpdateColumns, EntityUpdateProperties extends IEntityUpdateProperties, EntityId extends IEntityIdProperties, EntityCascadeGraph extends IEntityCascadeGraph, IQE extends IQEntity> extends Duo<Entity, EntitySelect, EntityCreate, EntityUpdateColumns, EntityUpdateProperties, EntityId, EntityCascadeGraph, IQE> {
    constructor(dbEntityId: DbEntityId);
}
export interface IBaseApplicationDuo extends IDuo<IApplication, ApplicationESelect, ApplicationECreateProperties, ApplicationEUpdateColumns, ApplicationEUpdateProperties, ApplicationEId, ApplicationECascadeGraph, QApplication> {
}
export declare class BaseApplicationDuo extends SQDIDuo<IApplication, ApplicationESelect, ApplicationECreateProperties, ApplicationEUpdateColumns, ApplicationEUpdateProperties, ApplicationEId, ApplicationECascadeGraph, QApplication> implements IBaseApplicationDuo {
    static diSet(): boolean;
    constructor();
}
export interface IBaseApplicationPackageDuo extends IDuo<IApplicationPackage, ApplicationPackageESelect, ApplicationPackageECreateProperties, ApplicationPackageEUpdateColumns, ApplicationPackageEUpdateProperties, ApplicationPackageEId, ApplicationPackageECascadeGraph, QApplicationPackage> {
}
export declare class BaseApplicationPackageDuo extends SQDIDuo<IApplicationPackage, ApplicationPackageESelect, ApplicationPackageECreateProperties, ApplicationPackageEUpdateColumns, ApplicationPackageEUpdateProperties, ApplicationPackageEId, ApplicationPackageECascadeGraph, QApplicationPackage> implements IBaseApplicationPackageDuo {
    static diSet(): boolean;
    constructor();
}
export interface IBaseDomainDuo extends IDuo<IDomain, DomainESelect, DomainECreateProperties, DomainEUpdateColumns, DomainEUpdateProperties, DomainEId, DomainECascadeGraph, QDomain> {
}
export declare class BaseDomainDuo extends SQDIDuo<IDomain, DomainESelect, DomainECreateProperties, DomainEUpdateColumns, DomainEUpdateProperties, DomainEId, DomainECascadeGraph, QDomain> implements IBaseDomainDuo {
    static diSet(): boolean;
    constructor();
}
export interface IBasePackageDuo extends IDuo<IPackage, PackageESelect, PackageECreateProperties, PackageEUpdateColumns, PackageEUpdateProperties, PackageEId, PackageECascadeGraph, QPackage> {
}
export declare class BasePackageDuo extends SQDIDuo<IPackage, PackageESelect, PackageECreateProperties, PackageEUpdateColumns, PackageEUpdateProperties, PackageEId, PackageECascadeGraph, QPackage> implements IBasePackageDuo {
    static diSet(): boolean;
    constructor();
}
export interface IBasePackagedUnitDuo extends IDuo<IPackagedUnit, PackagedUnitESelect, PackagedUnitECreateProperties, PackagedUnitEUpdateColumns, PackagedUnitEUpdateProperties, PackagedUnitEId, PackagedUnitECascadeGraph, QPackagedUnit> {
}
export declare class BasePackagedUnitDuo extends SQDIDuo<IPackagedUnit, PackagedUnitESelect, PackagedUnitECreateProperties, PackagedUnitEUpdateColumns, PackagedUnitEUpdateProperties, PackagedUnitEId, PackagedUnitECascadeGraph, QPackagedUnit> implements IBasePackagedUnitDuo {
    static diSet(): boolean;
    constructor();
}
