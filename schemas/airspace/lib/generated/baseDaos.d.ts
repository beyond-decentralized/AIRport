import { IDomain } from './application/domain';
import { DomainESelect, DomainECreateProperties, DomainEUpdateColumns, DomainEUpdateProperties, DomainEId, DomainGraph, QDomain } from './application/qdomain';
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
import { IDao, IEntityCascadeGraph, IEntityCreateProperties, IEntityIdProperties, IEntitySelectProperties, IEntityUpdateColumns, IEntityUpdateProperties, IQEntity } from '@airport/air-control';
import { Dao, DaoQueryDecorators } from '@airport/check-in';
import { EntityId as DbEntityId } from '@airport/ground-control';
export declare class SQDIDao<Entity, EntitySelect extends IEntitySelectProperties, EntityCreate extends IEntityCreateProperties, EntityUpdateColumns extends IEntityUpdateColumns, EntityUpdateProperties extends IEntityUpdateProperties, EntityId extends IEntityIdProperties, EntityCascadeGraph extends IEntityCascadeGraph, IQE extends IQEntity<Entity>> extends Dao<Entity, EntitySelect, EntityCreate, EntityUpdateColumns, EntityUpdateProperties, EntityId, EntityCascadeGraph, IQE> {
    constructor(dbEntityId: DbEntityId);
}
export interface IBaseDomainDao extends IDao<IDomain, DomainESelect, DomainECreateProperties, DomainEUpdateColumns, DomainEUpdateProperties, DomainEId, DomainGraph, QDomain> {
}
export declare class BaseDomainDao extends SQDIDao<IDomain, DomainESelect, DomainECreateProperties, DomainEUpdateColumns, DomainEUpdateProperties, DomainEId, DomainGraph, QDomain> implements IBaseDomainDao {
    static Find: DaoQueryDecorators<DomainESelect>;
    static FindOne: DaoQueryDecorators<DomainESelect>;
    static Search: DaoQueryDecorators<DomainESelect>;
    static SearchOne: DaoQueryDecorators<DomainESelect>;
    static Save(config: DomainGraph): PropertyDecorator;
    static diSet(): boolean;
    constructor();
}
export interface IBaseApplicationDao extends IDao<IApplication, ApplicationESelect, ApplicationECreateProperties, ApplicationEUpdateColumns, ApplicationEUpdateProperties, ApplicationEId, ApplicationGraph, QApplication> {
}
export declare class BaseApplicationDao extends SQDIDao<IApplication, ApplicationESelect, ApplicationECreateProperties, ApplicationEUpdateColumns, ApplicationEUpdateProperties, ApplicationEId, ApplicationGraph, QApplication> implements IBaseApplicationDao {
    static Find: DaoQueryDecorators<ApplicationESelect>;
    static FindOne: DaoQueryDecorators<ApplicationESelect>;
    static Search: DaoQueryDecorators<ApplicationESelect>;
    static SearchOne: DaoQueryDecorators<ApplicationESelect>;
    static Save(config: ApplicationGraph): PropertyDecorator;
    static diSet(): boolean;
    constructor();
}
export interface IBaseApplicationColumnDao extends IDao<IApplicationColumn, ApplicationColumnESelect, ApplicationColumnECreateProperties, ApplicationColumnEUpdateColumns, ApplicationColumnEUpdateProperties, ApplicationColumnEId, ApplicationColumnGraph, QApplicationColumn> {
}
export declare class BaseApplicationColumnDao extends SQDIDao<IApplicationColumn, ApplicationColumnESelect, ApplicationColumnECreateProperties, ApplicationColumnEUpdateColumns, ApplicationColumnEUpdateProperties, ApplicationColumnEId, ApplicationColumnGraph, QApplicationColumn> implements IBaseApplicationColumnDao {
    static Find: DaoQueryDecorators<ApplicationColumnESelect>;
    static FindOne: DaoQueryDecorators<ApplicationColumnESelect>;
    static Search: DaoQueryDecorators<ApplicationColumnESelect>;
    static SearchOne: DaoQueryDecorators<ApplicationColumnESelect>;
    static Save(config: ApplicationColumnGraph): PropertyDecorator;
    static diSet(): boolean;
    constructor();
}
export interface IBaseApplicationCurrentVersionDao extends IDao<IApplicationCurrentVersion, ApplicationCurrentVersionESelect, ApplicationCurrentVersionECreateProperties, ApplicationCurrentVersionEUpdateColumns, ApplicationCurrentVersionEUpdateProperties, ApplicationCurrentVersionEId, ApplicationCurrentVersionGraph, QApplicationCurrentVersion> {
}
export declare class BaseApplicationCurrentVersionDao extends SQDIDao<IApplicationCurrentVersion, ApplicationCurrentVersionESelect, ApplicationCurrentVersionECreateProperties, ApplicationCurrentVersionEUpdateColumns, ApplicationCurrentVersionEUpdateProperties, ApplicationCurrentVersionEId, ApplicationCurrentVersionGraph, QApplicationCurrentVersion> implements IBaseApplicationCurrentVersionDao {
    static Find: DaoQueryDecorators<ApplicationCurrentVersionESelect>;
    static FindOne: DaoQueryDecorators<ApplicationCurrentVersionESelect>;
    static Search: DaoQueryDecorators<ApplicationCurrentVersionESelect>;
    static SearchOne: DaoQueryDecorators<ApplicationCurrentVersionESelect>;
    static Save(config: ApplicationCurrentVersionGraph): PropertyDecorator;
    static diSet(): boolean;
    constructor();
}
export interface IBaseApplicationEntityDao extends IDao<IApplicationEntity, ApplicationEntityESelect, ApplicationEntityECreateProperties, ApplicationEntityEUpdateColumns, ApplicationEntityEUpdateProperties, ApplicationEntityEId, ApplicationEntityGraph, QApplicationEntity> {
}
export declare class BaseApplicationEntityDao extends SQDIDao<IApplicationEntity, ApplicationEntityESelect, ApplicationEntityECreateProperties, ApplicationEntityEUpdateColumns, ApplicationEntityEUpdateProperties, ApplicationEntityEId, ApplicationEntityGraph, QApplicationEntity> implements IBaseApplicationEntityDao {
    static Find: DaoQueryDecorators<ApplicationEntityESelect>;
    static FindOne: DaoQueryDecorators<ApplicationEntityESelect>;
    static Search: DaoQueryDecorators<ApplicationEntityESelect>;
    static SearchOne: DaoQueryDecorators<ApplicationEntityESelect>;
    static Save(config: ApplicationEntityGraph): PropertyDecorator;
    static diSet(): boolean;
    constructor();
}
export interface IBaseApplicationOperationDao extends IDao<IApplicationOperation, ApplicationOperationESelect, ApplicationOperationECreateProperties, ApplicationOperationEUpdateColumns, ApplicationOperationEUpdateProperties, ApplicationOperationEId, ApplicationOperationGraph, QApplicationOperation> {
}
export declare class BaseApplicationOperationDao extends SQDIDao<IApplicationOperation, ApplicationOperationESelect, ApplicationOperationECreateProperties, ApplicationOperationEUpdateColumns, ApplicationOperationEUpdateProperties, ApplicationOperationEId, ApplicationOperationGraph, QApplicationOperation> implements IBaseApplicationOperationDao {
    static Find: DaoQueryDecorators<ApplicationOperationESelect>;
    static FindOne: DaoQueryDecorators<ApplicationOperationESelect>;
    static Search: DaoQueryDecorators<ApplicationOperationESelect>;
    static SearchOne: DaoQueryDecorators<ApplicationOperationESelect>;
    static Save(config: ApplicationOperationGraph): PropertyDecorator;
    static diSet(): boolean;
    constructor();
}
export interface IBaseApplicationPropertyDao extends IDao<IApplicationProperty, ApplicationPropertyESelect, ApplicationPropertyECreateProperties, ApplicationPropertyEUpdateColumns, ApplicationPropertyEUpdateProperties, ApplicationPropertyEId, ApplicationPropertyGraph, QApplicationProperty> {
}
export declare class BaseApplicationPropertyDao extends SQDIDao<IApplicationProperty, ApplicationPropertyESelect, ApplicationPropertyECreateProperties, ApplicationPropertyEUpdateColumns, ApplicationPropertyEUpdateProperties, ApplicationPropertyEId, ApplicationPropertyGraph, QApplicationProperty> implements IBaseApplicationPropertyDao {
    static Find: DaoQueryDecorators<ApplicationPropertyESelect>;
    static FindOne: DaoQueryDecorators<ApplicationPropertyESelect>;
    static Search: DaoQueryDecorators<ApplicationPropertyESelect>;
    static SearchOne: DaoQueryDecorators<ApplicationPropertyESelect>;
    static Save(config: ApplicationPropertyGraph): PropertyDecorator;
    static diSet(): boolean;
    constructor();
}
export interface IBaseApplicationPropertyColumnDao extends IDao<IApplicationPropertyColumn, ApplicationPropertyColumnESelect, ApplicationPropertyColumnECreateProperties, ApplicationPropertyColumnEUpdateColumns, ApplicationPropertyColumnEUpdateProperties, ApplicationPropertyColumnEId, ApplicationPropertyColumnGraph, QApplicationPropertyColumn> {
}
export declare class BaseApplicationPropertyColumnDao extends SQDIDao<IApplicationPropertyColumn, ApplicationPropertyColumnESelect, ApplicationPropertyColumnECreateProperties, ApplicationPropertyColumnEUpdateColumns, ApplicationPropertyColumnEUpdateProperties, ApplicationPropertyColumnEId, ApplicationPropertyColumnGraph, QApplicationPropertyColumn> implements IBaseApplicationPropertyColumnDao {
    static Find: DaoQueryDecorators<ApplicationPropertyColumnESelect>;
    static FindOne: DaoQueryDecorators<ApplicationPropertyColumnESelect>;
    static Search: DaoQueryDecorators<ApplicationPropertyColumnESelect>;
    static SearchOne: DaoQueryDecorators<ApplicationPropertyColumnESelect>;
    static Save(config: ApplicationPropertyColumnGraph): PropertyDecorator;
    static diSet(): boolean;
    constructor();
}
export interface IBaseApplicationReferenceDao extends IDao<IApplicationReference, ApplicationReferenceESelect, ApplicationReferenceECreateProperties, ApplicationReferenceEUpdateColumns, ApplicationReferenceEUpdateProperties, ApplicationReferenceEId, ApplicationReferenceGraph, QApplicationReference> {
}
export declare class BaseApplicationReferenceDao extends SQDIDao<IApplicationReference, ApplicationReferenceESelect, ApplicationReferenceECreateProperties, ApplicationReferenceEUpdateColumns, ApplicationReferenceEUpdateProperties, ApplicationReferenceEId, ApplicationReferenceGraph, QApplicationReference> implements IBaseApplicationReferenceDao {
    static Find: DaoQueryDecorators<ApplicationReferenceESelect>;
    static FindOne: DaoQueryDecorators<ApplicationReferenceESelect>;
    static Search: DaoQueryDecorators<ApplicationReferenceESelect>;
    static SearchOne: DaoQueryDecorators<ApplicationReferenceESelect>;
    static Save(config: ApplicationReferenceGraph): PropertyDecorator;
    static diSet(): boolean;
    constructor();
}
export interface IBaseApplicationRelationDao extends IDao<IApplicationRelation, ApplicationRelationESelect, ApplicationRelationECreateProperties, ApplicationRelationEUpdateColumns, ApplicationRelationEUpdateProperties, ApplicationRelationEId, ApplicationRelationGraph, QApplicationRelation> {
}
export declare class BaseApplicationRelationDao extends SQDIDao<IApplicationRelation, ApplicationRelationESelect, ApplicationRelationECreateProperties, ApplicationRelationEUpdateColumns, ApplicationRelationEUpdateProperties, ApplicationRelationEId, ApplicationRelationGraph, QApplicationRelation> implements IBaseApplicationRelationDao {
    static Find: DaoQueryDecorators<ApplicationRelationESelect>;
    static FindOne: DaoQueryDecorators<ApplicationRelationESelect>;
    static Search: DaoQueryDecorators<ApplicationRelationESelect>;
    static SearchOne: DaoQueryDecorators<ApplicationRelationESelect>;
    static Save(config: ApplicationRelationGraph): PropertyDecorator;
    static diSet(): boolean;
    constructor();
}
export interface IBaseApplicationRelationColumnDao extends IDao<IApplicationRelationColumn, ApplicationRelationColumnESelect, ApplicationRelationColumnECreateProperties, ApplicationRelationColumnEUpdateColumns, ApplicationRelationColumnEUpdateProperties, ApplicationRelationColumnEId, ApplicationRelationColumnGraph, QApplicationRelationColumn> {
}
export declare class BaseApplicationRelationColumnDao extends SQDIDao<IApplicationRelationColumn, ApplicationRelationColumnESelect, ApplicationRelationColumnECreateProperties, ApplicationRelationColumnEUpdateColumns, ApplicationRelationColumnEUpdateProperties, ApplicationRelationColumnEId, ApplicationRelationColumnGraph, QApplicationRelationColumn> implements IBaseApplicationRelationColumnDao {
    static Find: DaoQueryDecorators<ApplicationRelationColumnESelect>;
    static FindOne: DaoQueryDecorators<ApplicationRelationColumnESelect>;
    static Search: DaoQueryDecorators<ApplicationRelationColumnESelect>;
    static SearchOne: DaoQueryDecorators<ApplicationRelationColumnESelect>;
    static Save(config: ApplicationRelationColumnGraph): PropertyDecorator;
    static diSet(): boolean;
    constructor();
}
export interface IBaseApplicationVersionDao extends IDao<IApplicationVersion, ApplicationVersionESelect, ApplicationVersionECreateProperties, ApplicationVersionEUpdateColumns, ApplicationVersionEUpdateProperties, ApplicationVersionEId, ApplicationVersionGraph, QApplicationVersion> {
}
export declare class BaseApplicationVersionDao extends SQDIDao<IApplicationVersion, ApplicationVersionESelect, ApplicationVersionECreateProperties, ApplicationVersionEUpdateColumns, ApplicationVersionEUpdateProperties, ApplicationVersionEId, ApplicationVersionGraph, QApplicationVersion> implements IBaseApplicationVersionDao {
    static Find: DaoQueryDecorators<ApplicationVersionESelect>;
    static FindOne: DaoQueryDecorators<ApplicationVersionESelect>;
    static Search: DaoQueryDecorators<ApplicationVersionESelect>;
    static SearchOne: DaoQueryDecorators<ApplicationVersionESelect>;
    static Save(config: ApplicationVersionGraph): PropertyDecorator;
    static diSet(): boolean;
    constructor();
}
//# sourceMappingURL=baseDaos.d.ts.map