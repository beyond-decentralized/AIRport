import { IApplication } from './application/application';
import { ApplicationESelect, ApplicationECreateProperties, ApplicationEUpdateColumns, ApplicationEUpdateProperties, ApplicationEId, ApplicationGraph, QApplication } from './application/qapplication';
import { IApplicationColumn } from './application/applicationcolumn';
import { ApplicationColumnESelect, ApplicationColumnECreateProperties, ApplicationColumnEUpdateColumns, ApplicationColumnEUpdateProperties, ApplicationColumnEId, ApplicationColumnGraph, QApplicationColumn } from './application/qapplicationcolumn';
import { IApplicationCurrentVersion } from './application/applicationcurrentversion';
import { ApplicationCurrentVersionESelect, ApplicationCurrentVersionECreateProperties, ApplicationCurrentVersionEUpdateColumns, ApplicationCurrentVersionEUpdateProperties, ApplicationCurrentVersionEId, ApplicationCurrentVersionGraph, QApplicationCurrentVersion } from './application/qapplicationcurrentversion';
import { IApplicationEntity } from './application/applicationentity';
import { ApplicationEntityESelect, ApplicationEntityECreateProperties, ApplicationEntityEUpdateColumns, ApplicationEntityEUpdateProperties, ApplicationEntityEId, ApplicationEntityGraph, QApplicationEntity } from './application/qapplicationentity';
import { IApplicationOperation } from './application/applicationoperation';
import { ApplicationOperationESelect, ApplicationOperationECreateProperties, ApplicationOperationEUpdateColumns, ApplicationOperationEUpdateProperties, ApplicationOperationEId, ApplicationOperationGraph, QApplicationOperation } from './application/qapplicationoperation';
import { IApplicationProperty } from './application/applicationproperty';
import { ApplicationPropertyESelect, ApplicationPropertyECreateProperties, ApplicationPropertyEUpdateColumns, ApplicationPropertyEUpdateProperties, ApplicationPropertyEId, ApplicationPropertyGraph, QApplicationProperty } from './application/qapplicationproperty';
import { IApplicationPropertyColumn } from './application/applicationpropertycolumn';
import { ApplicationPropertyColumnESelect, ApplicationPropertyColumnECreateProperties, ApplicationPropertyColumnEUpdateColumns, ApplicationPropertyColumnEUpdateProperties, ApplicationPropertyColumnEId, ApplicationPropertyColumnGraph, QApplicationPropertyColumn } from './application/qapplicationpropertycolumn';
import { IApplicationReference } from './application/applicationreference';
import { ApplicationReferenceESelect, ApplicationReferenceECreateProperties, ApplicationReferenceEUpdateColumns, ApplicationReferenceEUpdateProperties, ApplicationReferenceEId, ApplicationReferenceGraph, QApplicationReference } from './application/qapplicationreference';
import { IApplicationRelation } from './application/applicationrelation';
import { ApplicationRelationESelect, ApplicationRelationECreateProperties, ApplicationRelationEUpdateColumns, ApplicationRelationEUpdateProperties, ApplicationRelationEId, ApplicationRelationGraph, QApplicationRelation } from './application/qapplicationrelation';
import { IApplicationRelationColumn } from './application/applicationrelationcolumn';
import { ApplicationRelationColumnESelect, ApplicationRelationColumnECreateProperties, ApplicationRelationColumnEUpdateColumns, ApplicationRelationColumnEUpdateProperties, ApplicationRelationColumnEId, ApplicationRelationColumnGraph, QApplicationRelationColumn } from './application/qapplicationrelationcolumn';
import { IApplicationVersion } from './application/applicationversion';
import { ApplicationVersionESelect, ApplicationVersionECreateProperties, ApplicationVersionEUpdateColumns, ApplicationVersionEUpdateProperties, ApplicationVersionEId, ApplicationVersionGraph, QApplicationVersion } from './application/qapplicationversion';
import { IDomain } from './application/domain';
import { DomainESelect, DomainECreateProperties, DomainEUpdateColumns, DomainEUpdateProperties, DomainEId, DomainGraph, QDomain } from './application/qdomain';
import { IDuo, IEntityCascadeGraph, IEntityCreateProperties, IEntityIdProperties, IEntitySelectProperties, IEntityUpdateColumns, IEntityUpdateProperties, IQEntity } from '@airport/air-traffic-control';
import { Duo } from '@airport/check-in';
import { EntityId as DbEntityId } from '@airport/ground-control';
export declare class SQDIDuo<Entity, EntitySelect extends IEntitySelectProperties, EntityCreate extends IEntityCreateProperties, EntityUpdateColumns extends IEntityUpdateColumns, EntityUpdateProperties extends IEntityUpdateProperties, EntityId extends IEntityIdProperties, EntityCascadeGraph extends IEntityCascadeGraph, IQE extends IQEntity> extends Duo<Entity, EntitySelect, EntityCreate, EntityUpdateColumns, EntityUpdateProperties, EntityId, EntityCascadeGraph, IQE> {
    constructor(dbEntityId: DbEntityId);
}
export interface IBaseApplicationDuo extends IDuo<IApplication, ApplicationESelect, ApplicationECreateProperties, ApplicationEUpdateColumns, ApplicationEUpdateProperties, ApplicationEId, ApplicationGraph, QApplication> {
}
export declare class BaseApplicationDuo extends SQDIDuo<IApplication, ApplicationESelect, ApplicationECreateProperties, ApplicationEUpdateColumns, ApplicationEUpdateProperties, ApplicationEId, ApplicationGraph, QApplication> implements IBaseApplicationDuo {
    static diSet(): boolean;
    constructor();
}
export interface IBaseApplicationColumnDuo extends IDuo<IApplicationColumn, ApplicationColumnESelect, ApplicationColumnECreateProperties, ApplicationColumnEUpdateColumns, ApplicationColumnEUpdateProperties, ApplicationColumnEId, ApplicationColumnGraph, QApplicationColumn> {
}
export declare class BaseApplicationColumnDuo extends SQDIDuo<IApplicationColumn, ApplicationColumnESelect, ApplicationColumnECreateProperties, ApplicationColumnEUpdateColumns, ApplicationColumnEUpdateProperties, ApplicationColumnEId, ApplicationColumnGraph, QApplicationColumn> implements IBaseApplicationColumnDuo {
    static diSet(): boolean;
    constructor();
}
export interface IBaseApplicationCurrentVersionDuo extends IDuo<IApplicationCurrentVersion, ApplicationCurrentVersionESelect, ApplicationCurrentVersionECreateProperties, ApplicationCurrentVersionEUpdateColumns, ApplicationCurrentVersionEUpdateProperties, ApplicationCurrentVersionEId, ApplicationCurrentVersionGraph, QApplicationCurrentVersion> {
}
export declare class BaseApplicationCurrentVersionDuo extends SQDIDuo<IApplicationCurrentVersion, ApplicationCurrentVersionESelect, ApplicationCurrentVersionECreateProperties, ApplicationCurrentVersionEUpdateColumns, ApplicationCurrentVersionEUpdateProperties, ApplicationCurrentVersionEId, ApplicationCurrentVersionGraph, QApplicationCurrentVersion> implements IBaseApplicationCurrentVersionDuo {
    static diSet(): boolean;
    constructor();
}
export interface IBaseApplicationEntityDuo extends IDuo<IApplicationEntity, ApplicationEntityESelect, ApplicationEntityECreateProperties, ApplicationEntityEUpdateColumns, ApplicationEntityEUpdateProperties, ApplicationEntityEId, ApplicationEntityGraph, QApplicationEntity> {
}
export declare class BaseApplicationEntityDuo extends SQDIDuo<IApplicationEntity, ApplicationEntityESelect, ApplicationEntityECreateProperties, ApplicationEntityEUpdateColumns, ApplicationEntityEUpdateProperties, ApplicationEntityEId, ApplicationEntityGraph, QApplicationEntity> implements IBaseApplicationEntityDuo {
    static diSet(): boolean;
    constructor();
}
export interface IBaseApplicationOperationDuo extends IDuo<IApplicationOperation, ApplicationOperationESelect, ApplicationOperationECreateProperties, ApplicationOperationEUpdateColumns, ApplicationOperationEUpdateProperties, ApplicationOperationEId, ApplicationOperationGraph, QApplicationOperation> {
}
export declare class BaseApplicationOperationDuo extends SQDIDuo<IApplicationOperation, ApplicationOperationESelect, ApplicationOperationECreateProperties, ApplicationOperationEUpdateColumns, ApplicationOperationEUpdateProperties, ApplicationOperationEId, ApplicationOperationGraph, QApplicationOperation> implements IBaseApplicationOperationDuo {
    static diSet(): boolean;
    constructor();
}
export interface IBaseApplicationPropertyDuo extends IDuo<IApplicationProperty, ApplicationPropertyESelect, ApplicationPropertyECreateProperties, ApplicationPropertyEUpdateColumns, ApplicationPropertyEUpdateProperties, ApplicationPropertyEId, ApplicationPropertyGraph, QApplicationProperty> {
}
export declare class BaseApplicationPropertyDuo extends SQDIDuo<IApplicationProperty, ApplicationPropertyESelect, ApplicationPropertyECreateProperties, ApplicationPropertyEUpdateColumns, ApplicationPropertyEUpdateProperties, ApplicationPropertyEId, ApplicationPropertyGraph, QApplicationProperty> implements IBaseApplicationPropertyDuo {
    static diSet(): boolean;
    constructor();
}
export interface IBaseApplicationPropertyColumnDuo extends IDuo<IApplicationPropertyColumn, ApplicationPropertyColumnESelect, ApplicationPropertyColumnECreateProperties, ApplicationPropertyColumnEUpdateColumns, ApplicationPropertyColumnEUpdateProperties, ApplicationPropertyColumnEId, ApplicationPropertyColumnGraph, QApplicationPropertyColumn> {
}
export declare class BaseApplicationPropertyColumnDuo extends SQDIDuo<IApplicationPropertyColumn, ApplicationPropertyColumnESelect, ApplicationPropertyColumnECreateProperties, ApplicationPropertyColumnEUpdateColumns, ApplicationPropertyColumnEUpdateProperties, ApplicationPropertyColumnEId, ApplicationPropertyColumnGraph, QApplicationPropertyColumn> implements IBaseApplicationPropertyColumnDuo {
    static diSet(): boolean;
    constructor();
}
export interface IBaseApplicationReferenceDuo extends IDuo<IApplicationReference, ApplicationReferenceESelect, ApplicationReferenceECreateProperties, ApplicationReferenceEUpdateColumns, ApplicationReferenceEUpdateProperties, ApplicationReferenceEId, ApplicationReferenceGraph, QApplicationReference> {
}
export declare class BaseApplicationReferenceDuo extends SQDIDuo<IApplicationReference, ApplicationReferenceESelect, ApplicationReferenceECreateProperties, ApplicationReferenceEUpdateColumns, ApplicationReferenceEUpdateProperties, ApplicationReferenceEId, ApplicationReferenceGraph, QApplicationReference> implements IBaseApplicationReferenceDuo {
    static diSet(): boolean;
    constructor();
}
export interface IBaseApplicationRelationDuo extends IDuo<IApplicationRelation, ApplicationRelationESelect, ApplicationRelationECreateProperties, ApplicationRelationEUpdateColumns, ApplicationRelationEUpdateProperties, ApplicationRelationEId, ApplicationRelationGraph, QApplicationRelation> {
}
export declare class BaseApplicationRelationDuo extends SQDIDuo<IApplicationRelation, ApplicationRelationESelect, ApplicationRelationECreateProperties, ApplicationRelationEUpdateColumns, ApplicationRelationEUpdateProperties, ApplicationRelationEId, ApplicationRelationGraph, QApplicationRelation> implements IBaseApplicationRelationDuo {
    static diSet(): boolean;
    constructor();
}
export interface IBaseApplicationRelationColumnDuo extends IDuo<IApplicationRelationColumn, ApplicationRelationColumnESelect, ApplicationRelationColumnECreateProperties, ApplicationRelationColumnEUpdateColumns, ApplicationRelationColumnEUpdateProperties, ApplicationRelationColumnEId, ApplicationRelationColumnGraph, QApplicationRelationColumn> {
}
export declare class BaseApplicationRelationColumnDuo extends SQDIDuo<IApplicationRelationColumn, ApplicationRelationColumnESelect, ApplicationRelationColumnECreateProperties, ApplicationRelationColumnEUpdateColumns, ApplicationRelationColumnEUpdateProperties, ApplicationRelationColumnEId, ApplicationRelationColumnGraph, QApplicationRelationColumn> implements IBaseApplicationRelationColumnDuo {
    static diSet(): boolean;
    constructor();
}
export interface IBaseApplicationVersionDuo extends IDuo<IApplicationVersion, ApplicationVersionESelect, ApplicationVersionECreateProperties, ApplicationVersionEUpdateColumns, ApplicationVersionEUpdateProperties, ApplicationVersionEId, ApplicationVersionGraph, QApplicationVersion> {
}
export declare class BaseApplicationVersionDuo extends SQDIDuo<IApplicationVersion, ApplicationVersionESelect, ApplicationVersionECreateProperties, ApplicationVersionEUpdateColumns, ApplicationVersionEUpdateProperties, ApplicationVersionEId, ApplicationVersionGraph, QApplicationVersion> implements IBaseApplicationVersionDuo {
    static diSet(): boolean;
    constructor();
}
export interface IBaseDomainDuo extends IDuo<IDomain, DomainESelect, DomainECreateProperties, DomainEUpdateColumns, DomainEUpdateProperties, DomainEId, DomainGraph, QDomain> {
}
export declare class BaseDomainDuo extends SQDIDuo<IDomain, DomainESelect, DomainECreateProperties, DomainEUpdateColumns, DomainEUpdateProperties, DomainEId, DomainGraph, QDomain> implements IBaseDomainDuo {
    static diSet(): boolean;
    constructor();
}
//# sourceMappingURL=baseDuos.d.ts.map