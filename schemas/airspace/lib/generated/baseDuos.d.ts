import { Application } from '../ddl/application/application';
import { ApplicationESelect, ApplicationECreateProperties, ApplicationEUpdateColumns, ApplicationEUpdateProperties, ApplicationEId, ApplicationGraph, QApplication } from './application/qapplication';
import { ApplicationColumn } from '../ddl/application/applicationcolumn';
import { ApplicationColumnESelect, ApplicationColumnECreateProperties, ApplicationColumnEUpdateColumns, ApplicationColumnEUpdateProperties, ApplicationColumnEId, ApplicationColumnGraph, QApplicationColumn } from './application/qapplicationcolumn';
import { ApplicationCurrentVersion } from '../ddl/application/applicationcurrentversion';
import { ApplicationCurrentVersionESelect, ApplicationCurrentVersionECreateProperties, ApplicationCurrentVersionEUpdateColumns, ApplicationCurrentVersionEUpdateProperties, ApplicationCurrentVersionEId, ApplicationCurrentVersionGraph, QApplicationCurrentVersion } from './application/qapplicationcurrentversion';
import { ApplicationEntity } from '../ddl/application/applicationentity';
import { ApplicationEntityESelect, ApplicationEntityECreateProperties, ApplicationEntityEUpdateColumns, ApplicationEntityEUpdateProperties, ApplicationEntityEId, ApplicationEntityGraph, QApplicationEntity } from './application/qapplicationentity';
import { ApplicationOperation } from '../ddl/application/applicationoperation';
import { ApplicationOperationESelect, ApplicationOperationECreateProperties, ApplicationOperationEUpdateColumns, ApplicationOperationEUpdateProperties, ApplicationOperationEId, ApplicationOperationGraph, QApplicationOperation } from './application/qapplicationoperation';
import { ApplicationProperty } from '../ddl/application/applicationproperty';
import { ApplicationPropertyESelect, ApplicationPropertyECreateProperties, ApplicationPropertyEUpdateColumns, ApplicationPropertyEUpdateProperties, ApplicationPropertyEId, ApplicationPropertyGraph, QApplicationProperty } from './application/qapplicationproperty';
import { ApplicationPropertyColumn } from '../ddl/application/applicationpropertycolumn';
import { ApplicationPropertyColumnESelect, ApplicationPropertyColumnECreateProperties, ApplicationPropertyColumnEUpdateColumns, ApplicationPropertyColumnEUpdateProperties, ApplicationPropertyColumnEId, ApplicationPropertyColumnGraph, QApplicationPropertyColumn } from './application/qapplicationpropertycolumn';
import { ApplicationReference } from '../ddl/application/applicationreference';
import { ApplicationReferenceESelect, ApplicationReferenceECreateProperties, ApplicationReferenceEUpdateColumns, ApplicationReferenceEUpdateProperties, ApplicationReferenceEId, ApplicationReferenceGraph, QApplicationReference } from './application/qapplicationreference';
import { ApplicationRelation } from '../ddl/application/applicationrelation';
import { ApplicationRelationESelect, ApplicationRelationECreateProperties, ApplicationRelationEUpdateColumns, ApplicationRelationEUpdateProperties, ApplicationRelationEId, ApplicationRelationGraph, QApplicationRelation } from './application/qapplicationrelation';
import { ApplicationRelationColumn } from '../ddl/application/applicationrelationcolumn';
import { ApplicationRelationColumnESelect, ApplicationRelationColumnECreateProperties, ApplicationRelationColumnEUpdateColumns, ApplicationRelationColumnEUpdateProperties, ApplicationRelationColumnEId, ApplicationRelationColumnGraph, QApplicationRelationColumn } from './application/qapplicationrelationcolumn';
import { ApplicationVersion } from '../ddl/application/applicationversion';
import { ApplicationVersionESelect, ApplicationVersionECreateProperties, ApplicationVersionEUpdateColumns, ApplicationVersionEUpdateProperties, ApplicationVersionEId, ApplicationVersionGraph, QApplicationVersion } from './application/qapplicationversion';
import { Domain } from '../ddl/application/domain';
import { DomainESelect, DomainECreateProperties, DomainEUpdateColumns, DomainEUpdateProperties, DomainEId, DomainGraph, QDomain } from './application/qdomain';
import { IEntityCascadeGraph, IEntityCreateProperties, IEntityIdProperties, IEntitySelectProperties, IEntityUpdateColumns, IEntityUpdateProperties, IQEntity } from '@airport/tarmaq-query';
import { Duo, IDuo } from '@airport/tarmaq-dao';
import { ApplicationEntity_LocalId as DbEntityId } from '@airport/ground-control';
export declare class SQDIDuo<Entity, EntitySelect extends IEntitySelectProperties, EntityCreate extends IEntityCreateProperties, EntityUpdateColumns extends IEntityUpdateColumns, EntityUpdateProperties extends IEntityUpdateProperties, ApplicationEntity_LocalId extends IEntityIdProperties, EntityCascadeGraph extends IEntityCascadeGraph, IQE extends IQEntity> extends Duo<Entity, EntitySelect, EntityCreate, EntityUpdateColumns, EntityUpdateProperties, ApplicationEntity_LocalId, EntityCascadeGraph, IQE> {
    constructor(dbEntityId: DbEntityId);
}
export interface IBaseApplicationDuo extends IDuo<Application, ApplicationESelect, ApplicationECreateProperties, ApplicationEUpdateColumns, ApplicationEUpdateProperties, ApplicationEId, ApplicationGraph, QApplication> {
}
export declare class BaseApplicationDuo extends SQDIDuo<Application, ApplicationESelect, ApplicationECreateProperties, ApplicationEUpdateColumns, ApplicationEUpdateProperties, ApplicationEId, ApplicationGraph, QApplication> implements IBaseApplicationDuo {
    static diSet(): boolean;
    constructor();
}
export interface IBaseApplicationColumnDuo extends IDuo<ApplicationColumn, ApplicationColumnESelect, ApplicationColumnECreateProperties, ApplicationColumnEUpdateColumns, ApplicationColumnEUpdateProperties, ApplicationColumnEId, ApplicationColumnGraph, QApplicationColumn> {
}
export declare class BaseApplicationColumnDuo extends SQDIDuo<ApplicationColumn, ApplicationColumnESelect, ApplicationColumnECreateProperties, ApplicationColumnEUpdateColumns, ApplicationColumnEUpdateProperties, ApplicationColumnEId, ApplicationColumnGraph, QApplicationColumn> implements IBaseApplicationColumnDuo {
    static diSet(): boolean;
    constructor();
}
export interface IBaseApplicationCurrentVersionDuo extends IDuo<ApplicationCurrentVersion, ApplicationCurrentVersionESelect, ApplicationCurrentVersionECreateProperties, ApplicationCurrentVersionEUpdateColumns, ApplicationCurrentVersionEUpdateProperties, ApplicationCurrentVersionEId, ApplicationCurrentVersionGraph, QApplicationCurrentVersion> {
}
export declare class BaseApplicationCurrentVersionDuo extends SQDIDuo<ApplicationCurrentVersion, ApplicationCurrentVersionESelect, ApplicationCurrentVersionECreateProperties, ApplicationCurrentVersionEUpdateColumns, ApplicationCurrentVersionEUpdateProperties, ApplicationCurrentVersionEId, ApplicationCurrentVersionGraph, QApplicationCurrentVersion> implements IBaseApplicationCurrentVersionDuo {
    static diSet(): boolean;
    constructor();
}
export interface IBaseApplicationEntityDuo extends IDuo<ApplicationEntity, ApplicationEntityESelect, ApplicationEntityECreateProperties, ApplicationEntityEUpdateColumns, ApplicationEntityEUpdateProperties, ApplicationEntityEId, ApplicationEntityGraph, QApplicationEntity> {
}
export declare class BaseApplicationEntityDuo extends SQDIDuo<ApplicationEntity, ApplicationEntityESelect, ApplicationEntityECreateProperties, ApplicationEntityEUpdateColumns, ApplicationEntityEUpdateProperties, ApplicationEntityEId, ApplicationEntityGraph, QApplicationEntity> implements IBaseApplicationEntityDuo {
    static diSet(): boolean;
    constructor();
}
export interface IBaseApplicationOperationDuo extends IDuo<ApplicationOperation, ApplicationOperationESelect, ApplicationOperationECreateProperties, ApplicationOperationEUpdateColumns, ApplicationOperationEUpdateProperties, ApplicationOperationEId, ApplicationOperationGraph, QApplicationOperation> {
}
export declare class BaseApplicationOperationDuo extends SQDIDuo<ApplicationOperation, ApplicationOperationESelect, ApplicationOperationECreateProperties, ApplicationOperationEUpdateColumns, ApplicationOperationEUpdateProperties, ApplicationOperationEId, ApplicationOperationGraph, QApplicationOperation> implements IBaseApplicationOperationDuo {
    static diSet(): boolean;
    constructor();
}
export interface IBaseApplicationPropertyDuo extends IDuo<ApplicationProperty, ApplicationPropertyESelect, ApplicationPropertyECreateProperties, ApplicationPropertyEUpdateColumns, ApplicationPropertyEUpdateProperties, ApplicationPropertyEId, ApplicationPropertyGraph, QApplicationProperty> {
}
export declare class BaseApplicationPropertyDuo extends SQDIDuo<ApplicationProperty, ApplicationPropertyESelect, ApplicationPropertyECreateProperties, ApplicationPropertyEUpdateColumns, ApplicationPropertyEUpdateProperties, ApplicationPropertyEId, ApplicationPropertyGraph, QApplicationProperty> implements IBaseApplicationPropertyDuo {
    static diSet(): boolean;
    constructor();
}
export interface IBaseApplicationPropertyColumnDuo extends IDuo<ApplicationPropertyColumn, ApplicationPropertyColumnESelect, ApplicationPropertyColumnECreateProperties, ApplicationPropertyColumnEUpdateColumns, ApplicationPropertyColumnEUpdateProperties, ApplicationPropertyColumnEId, ApplicationPropertyColumnGraph, QApplicationPropertyColumn> {
}
export declare class BaseApplicationPropertyColumnDuo extends SQDIDuo<ApplicationPropertyColumn, ApplicationPropertyColumnESelect, ApplicationPropertyColumnECreateProperties, ApplicationPropertyColumnEUpdateColumns, ApplicationPropertyColumnEUpdateProperties, ApplicationPropertyColumnEId, ApplicationPropertyColumnGraph, QApplicationPropertyColumn> implements IBaseApplicationPropertyColumnDuo {
    static diSet(): boolean;
    constructor();
}
export interface IBaseApplicationReferenceDuo extends IDuo<ApplicationReference, ApplicationReferenceESelect, ApplicationReferenceECreateProperties, ApplicationReferenceEUpdateColumns, ApplicationReferenceEUpdateProperties, ApplicationReferenceEId, ApplicationReferenceGraph, QApplicationReference> {
}
export declare class BaseApplicationReferenceDuo extends SQDIDuo<ApplicationReference, ApplicationReferenceESelect, ApplicationReferenceECreateProperties, ApplicationReferenceEUpdateColumns, ApplicationReferenceEUpdateProperties, ApplicationReferenceEId, ApplicationReferenceGraph, QApplicationReference> implements IBaseApplicationReferenceDuo {
    static diSet(): boolean;
    constructor();
}
export interface IBaseApplicationRelationDuo extends IDuo<ApplicationRelation, ApplicationRelationESelect, ApplicationRelationECreateProperties, ApplicationRelationEUpdateColumns, ApplicationRelationEUpdateProperties, ApplicationRelationEId, ApplicationRelationGraph, QApplicationRelation> {
}
export declare class BaseApplicationRelationDuo extends SQDIDuo<ApplicationRelation, ApplicationRelationESelect, ApplicationRelationECreateProperties, ApplicationRelationEUpdateColumns, ApplicationRelationEUpdateProperties, ApplicationRelationEId, ApplicationRelationGraph, QApplicationRelation> implements IBaseApplicationRelationDuo {
    static diSet(): boolean;
    constructor();
}
export interface IBaseApplicationRelationColumnDuo extends IDuo<ApplicationRelationColumn, ApplicationRelationColumnESelect, ApplicationRelationColumnECreateProperties, ApplicationRelationColumnEUpdateColumns, ApplicationRelationColumnEUpdateProperties, ApplicationRelationColumnEId, ApplicationRelationColumnGraph, QApplicationRelationColumn> {
}
export declare class BaseApplicationRelationColumnDuo extends SQDIDuo<ApplicationRelationColumn, ApplicationRelationColumnESelect, ApplicationRelationColumnECreateProperties, ApplicationRelationColumnEUpdateColumns, ApplicationRelationColumnEUpdateProperties, ApplicationRelationColumnEId, ApplicationRelationColumnGraph, QApplicationRelationColumn> implements IBaseApplicationRelationColumnDuo {
    static diSet(): boolean;
    constructor();
}
export interface IBaseApplicationVersionDuo extends IDuo<ApplicationVersion, ApplicationVersionESelect, ApplicationVersionECreateProperties, ApplicationVersionEUpdateColumns, ApplicationVersionEUpdateProperties, ApplicationVersionEId, ApplicationVersionGraph, QApplicationVersion> {
}
export declare class BaseApplicationVersionDuo extends SQDIDuo<ApplicationVersion, ApplicationVersionESelect, ApplicationVersionECreateProperties, ApplicationVersionEUpdateColumns, ApplicationVersionEUpdateProperties, ApplicationVersionEId, ApplicationVersionGraph, QApplicationVersion> implements IBaseApplicationVersionDuo {
    static diSet(): boolean;
    constructor();
}
export interface IBaseDomainDuo extends IDuo<Domain, DomainESelect, DomainECreateProperties, DomainEUpdateColumns, DomainEUpdateProperties, DomainEId, DomainGraph, QDomain> {
}
export declare class BaseDomainDuo extends SQDIDuo<Domain, DomainESelect, DomainECreateProperties, DomainEUpdateColumns, DomainEUpdateProperties, DomainEId, DomainGraph, QDomain> implements IBaseDomainDuo {
    static diSet(): boolean;
    constructor();
}
//# sourceMappingURL=baseDuos.d.ts.map