import { IDao, IEntityCascadeGraph, IEntityCreateProperties, IEntityIdProperties, IEntitySelectProperties, IEntityUpdateColumns, IEntityUpdateProperties, IQEntity } from '@airport/air-control';
import { Dao } from '@airport/check-in';
import { EntityId as DbEntityId } from '@airport/ground-control';
import { IApplication, ApplicationESelect, ApplicationECascadeGraph, ApplicationECreateProperties, ApplicationEUpdateColumns, ApplicationEUpdateProperties, ApplicationEId, QApplication } from './qapplication';
import { IApplicationPackage, ApplicationPackageESelect, ApplicationPackageECascadeGraph, ApplicationPackageECreateProperties, ApplicationPackageEUpdateColumns, ApplicationPackageEUpdateProperties, ApplicationPackageEId, QApplicationPackage } from './qapplicationpackage';
import { IDomain, DomainESelect, DomainECascadeGraph, DomainECreateProperties, DomainEUpdateColumns, DomainEUpdateProperties, DomainEId, QDomain } from './qdomain';
import { IPackage, PackageESelect, PackageECascadeGraph, PackageECreateProperties, PackageEUpdateColumns, PackageEUpdateProperties, PackageEId, QPackage } from './qpackage';
import { IPackagedUnit, PackagedUnitESelect, PackagedUnitECascadeGraph, PackagedUnitECreateProperties, PackagedUnitEUpdateColumns, PackagedUnitEUpdateProperties, PackagedUnitEId, QPackagedUnit } from './qpackagedunit';
export declare class SQDIDao<Entity, EntitySelect extends IEntitySelectProperties, EntityCreate extends IEntityCreateProperties, EntityUpdateColumns extends IEntityUpdateColumns, EntityUpdateProperties extends IEntityUpdateProperties, EntityId extends IEntityIdProperties, EntityCascadeGraph extends IEntityCascadeGraph, IQE extends IQEntity> extends Dao<Entity, EntitySelect, EntityCreate, EntityUpdateColumns, EntityUpdateProperties, EntityId, EntityCascadeGraph, IQE> {
    constructor(dbEntityId: DbEntityId);
}
export interface IBaseApplicationDao extends IDao<IApplication, ApplicationESelect, ApplicationECreateProperties, ApplicationEUpdateColumns, ApplicationEUpdateProperties, ApplicationEId, ApplicationECascadeGraph, QApplication> {
}
export declare class BaseApplicationDao extends SQDIDao<IApplication, ApplicationESelect, ApplicationECreateProperties, ApplicationEUpdateColumns, ApplicationEUpdateProperties, ApplicationEId, ApplicationECascadeGraph, QApplication> implements IBaseApplicationDao {
    static diSet(): boolean;
    constructor();
}
export interface IBaseApplicationPackageDao extends IDao<IApplicationPackage, ApplicationPackageESelect, ApplicationPackageECreateProperties, ApplicationPackageEUpdateColumns, ApplicationPackageEUpdateProperties, ApplicationPackageEId, ApplicationPackageECascadeGraph, QApplicationPackage> {
}
export declare class BaseApplicationPackageDao extends SQDIDao<IApplicationPackage, ApplicationPackageESelect, ApplicationPackageECreateProperties, ApplicationPackageEUpdateColumns, ApplicationPackageEUpdateProperties, ApplicationPackageEId, ApplicationPackageECascadeGraph, QApplicationPackage> implements IBaseApplicationPackageDao {
    static diSet(): boolean;
    constructor();
}
export interface IBaseDomainDao extends IDao<IDomain, DomainESelect, DomainECreateProperties, DomainEUpdateColumns, DomainEUpdateProperties, DomainEId, DomainECascadeGraph, QDomain> {
}
export declare class BaseDomainDao extends SQDIDao<IDomain, DomainESelect, DomainECreateProperties, DomainEUpdateColumns, DomainEUpdateProperties, DomainEId, DomainECascadeGraph, QDomain> implements IBaseDomainDao {
    static diSet(): boolean;
    constructor();
}
export interface IBasePackageDao extends IDao<IPackage, PackageESelect, PackageECreateProperties, PackageEUpdateColumns, PackageEUpdateProperties, PackageEId, PackageECascadeGraph, QPackage> {
}
export declare class BasePackageDao extends SQDIDao<IPackage, PackageESelect, PackageECreateProperties, PackageEUpdateColumns, PackageEUpdateProperties, PackageEId, PackageECascadeGraph, QPackage> implements IBasePackageDao {
    static diSet(): boolean;
    constructor();
}
export interface IBasePackagedUnitDao extends IDao<IPackagedUnit, PackagedUnitESelect, PackagedUnitECreateProperties, PackagedUnitEUpdateColumns, PackagedUnitEUpdateProperties, PackagedUnitEId, PackagedUnitECascadeGraph, QPackagedUnit> {
}
export declare class BasePackagedUnitDao extends SQDIDao<IPackagedUnit, PackagedUnitESelect, PackagedUnitECreateProperties, PackagedUnitEUpdateColumns, PackagedUnitEUpdateProperties, PackagedUnitEId, PackagedUnitECascadeGraph, QPackagedUnit> implements IBasePackagedUnitDao {
    static diSet(): boolean;
    constructor();
}
