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
import { Dao, IDao, DaoQueryDecorators } from '@airport/tarmaq-dao';
import { ApplicationEntity_LocalId as DbEntityId } from '@airport/ground-control';
export declare class SQDIDao<Entity, EntitySelect extends IEntitySelectProperties, EntityCreate extends IEntityCreateProperties, EntityUpdateColumns extends IEntityUpdateColumns, EntityUpdateProperties extends IEntityUpdateProperties, ApplicationEntity_LocalId extends IEntityIdProperties, EntityCascadeGraph extends IEntityCascadeGraph, IQE extends IQEntity> extends Dao<Entity, EntitySelect, EntityCreate, EntityUpdateColumns, EntityUpdateProperties, ApplicationEntity_LocalId, EntityCascadeGraph, IQE> {
    constructor(dbEntityId: DbEntityId);
}
export interface IBaseApplicationDao extends IDao<Application, ApplicationESelect, ApplicationECreateProperties, ApplicationEUpdateColumns, ApplicationEUpdateProperties, ApplicationEId, ApplicationGraph, QApplication> {
}
export declare class BaseApplicationDao extends SQDIDao<Application, ApplicationESelect, ApplicationECreateProperties, ApplicationEUpdateColumns, ApplicationEUpdateProperties, ApplicationEId, ApplicationGraph, QApplication> implements IBaseApplicationDao {
    static Find: DaoQueryDecorators<ApplicationESelect>;
    static FindOne: DaoQueryDecorators<ApplicationESelect>;
    static Search: DaoQueryDecorators<ApplicationESelect>;
    static SearchOne: DaoQueryDecorators<ApplicationESelect>;
    static Save(config: ApplicationGraph): PropertyDecorator;
    static diSet(): boolean;
    constructor();
}
export interface IBaseApplicationColumnDao extends IDao<ApplicationColumn, ApplicationColumnESelect, ApplicationColumnECreateProperties, ApplicationColumnEUpdateColumns, ApplicationColumnEUpdateProperties, ApplicationColumnEId, ApplicationColumnGraph, QApplicationColumn> {
}
export declare class BaseApplicationColumnDao extends SQDIDao<ApplicationColumn, ApplicationColumnESelect, ApplicationColumnECreateProperties, ApplicationColumnEUpdateColumns, ApplicationColumnEUpdateProperties, ApplicationColumnEId, ApplicationColumnGraph, QApplicationColumn> implements IBaseApplicationColumnDao {
    static Find: DaoQueryDecorators<ApplicationColumnESelect>;
    static FindOne: DaoQueryDecorators<ApplicationColumnESelect>;
    static Search: DaoQueryDecorators<ApplicationColumnESelect>;
    static SearchOne: DaoQueryDecorators<ApplicationColumnESelect>;
    static Save(config: ApplicationColumnGraph): PropertyDecorator;
    static diSet(): boolean;
    constructor();
}
export interface IBaseApplicationCurrentVersionDao extends IDao<ApplicationCurrentVersion, ApplicationCurrentVersionESelect, ApplicationCurrentVersionECreateProperties, ApplicationCurrentVersionEUpdateColumns, ApplicationCurrentVersionEUpdateProperties, ApplicationCurrentVersionEId, ApplicationCurrentVersionGraph, QApplicationCurrentVersion> {
}
export declare class BaseApplicationCurrentVersionDao extends SQDIDao<ApplicationCurrentVersion, ApplicationCurrentVersionESelect, ApplicationCurrentVersionECreateProperties, ApplicationCurrentVersionEUpdateColumns, ApplicationCurrentVersionEUpdateProperties, ApplicationCurrentVersionEId, ApplicationCurrentVersionGraph, QApplicationCurrentVersion> implements IBaseApplicationCurrentVersionDao {
    static Find: DaoQueryDecorators<ApplicationCurrentVersionESelect>;
    static FindOne: DaoQueryDecorators<ApplicationCurrentVersionESelect>;
    static Search: DaoQueryDecorators<ApplicationCurrentVersionESelect>;
    static SearchOne: DaoQueryDecorators<ApplicationCurrentVersionESelect>;
    static Save(config: ApplicationCurrentVersionGraph): PropertyDecorator;
    static diSet(): boolean;
    constructor();
}
export interface IBaseApplicationEntityDao extends IDao<ApplicationEntity, ApplicationEntityESelect, ApplicationEntityECreateProperties, ApplicationEntityEUpdateColumns, ApplicationEntityEUpdateProperties, ApplicationEntityEId, ApplicationEntityGraph, QApplicationEntity> {
}
export declare class BaseApplicationEntityDao extends SQDIDao<ApplicationEntity, ApplicationEntityESelect, ApplicationEntityECreateProperties, ApplicationEntityEUpdateColumns, ApplicationEntityEUpdateProperties, ApplicationEntityEId, ApplicationEntityGraph, QApplicationEntity> implements IBaseApplicationEntityDao {
    static Find: DaoQueryDecorators<ApplicationEntityESelect>;
    static FindOne: DaoQueryDecorators<ApplicationEntityESelect>;
    static Search: DaoQueryDecorators<ApplicationEntityESelect>;
    static SearchOne: DaoQueryDecorators<ApplicationEntityESelect>;
    static Save(config: ApplicationEntityGraph): PropertyDecorator;
    static diSet(): boolean;
    constructor();
}
export interface IBaseApplicationOperationDao extends IDao<ApplicationOperation, ApplicationOperationESelect, ApplicationOperationECreateProperties, ApplicationOperationEUpdateColumns, ApplicationOperationEUpdateProperties, ApplicationOperationEId, ApplicationOperationGraph, QApplicationOperation> {
}
export declare class BaseApplicationOperationDao extends SQDIDao<ApplicationOperation, ApplicationOperationESelect, ApplicationOperationECreateProperties, ApplicationOperationEUpdateColumns, ApplicationOperationEUpdateProperties, ApplicationOperationEId, ApplicationOperationGraph, QApplicationOperation> implements IBaseApplicationOperationDao {
    static Find: DaoQueryDecorators<ApplicationOperationESelect>;
    static FindOne: DaoQueryDecorators<ApplicationOperationESelect>;
    static Search: DaoQueryDecorators<ApplicationOperationESelect>;
    static SearchOne: DaoQueryDecorators<ApplicationOperationESelect>;
    static Save(config: ApplicationOperationGraph): PropertyDecorator;
    static diSet(): boolean;
    constructor();
}
export interface IBaseApplicationPropertyDao extends IDao<ApplicationProperty, ApplicationPropertyESelect, ApplicationPropertyECreateProperties, ApplicationPropertyEUpdateColumns, ApplicationPropertyEUpdateProperties, ApplicationPropertyEId, ApplicationPropertyGraph, QApplicationProperty> {
}
export declare class BaseApplicationPropertyDao extends SQDIDao<ApplicationProperty, ApplicationPropertyESelect, ApplicationPropertyECreateProperties, ApplicationPropertyEUpdateColumns, ApplicationPropertyEUpdateProperties, ApplicationPropertyEId, ApplicationPropertyGraph, QApplicationProperty> implements IBaseApplicationPropertyDao {
    static Find: DaoQueryDecorators<ApplicationPropertyESelect>;
    static FindOne: DaoQueryDecorators<ApplicationPropertyESelect>;
    static Search: DaoQueryDecorators<ApplicationPropertyESelect>;
    static SearchOne: DaoQueryDecorators<ApplicationPropertyESelect>;
    static Save(config: ApplicationPropertyGraph): PropertyDecorator;
    static diSet(): boolean;
    constructor();
}
export interface IBaseApplicationPropertyColumnDao extends IDao<ApplicationPropertyColumn, ApplicationPropertyColumnESelect, ApplicationPropertyColumnECreateProperties, ApplicationPropertyColumnEUpdateColumns, ApplicationPropertyColumnEUpdateProperties, ApplicationPropertyColumnEId, ApplicationPropertyColumnGraph, QApplicationPropertyColumn> {
}
export declare class BaseApplicationPropertyColumnDao extends SQDIDao<ApplicationPropertyColumn, ApplicationPropertyColumnESelect, ApplicationPropertyColumnECreateProperties, ApplicationPropertyColumnEUpdateColumns, ApplicationPropertyColumnEUpdateProperties, ApplicationPropertyColumnEId, ApplicationPropertyColumnGraph, QApplicationPropertyColumn> implements IBaseApplicationPropertyColumnDao {
    static Find: DaoQueryDecorators<ApplicationPropertyColumnESelect>;
    static FindOne: DaoQueryDecorators<ApplicationPropertyColumnESelect>;
    static Search: DaoQueryDecorators<ApplicationPropertyColumnESelect>;
    static SearchOne: DaoQueryDecorators<ApplicationPropertyColumnESelect>;
    static Save(config: ApplicationPropertyColumnGraph): PropertyDecorator;
    static diSet(): boolean;
    constructor();
}
export interface IBaseApplicationReferenceDao extends IDao<ApplicationReference, ApplicationReferenceESelect, ApplicationReferenceECreateProperties, ApplicationReferenceEUpdateColumns, ApplicationReferenceEUpdateProperties, ApplicationReferenceEId, ApplicationReferenceGraph, QApplicationReference> {
}
export declare class BaseApplicationReferenceDao extends SQDIDao<ApplicationReference, ApplicationReferenceESelect, ApplicationReferenceECreateProperties, ApplicationReferenceEUpdateColumns, ApplicationReferenceEUpdateProperties, ApplicationReferenceEId, ApplicationReferenceGraph, QApplicationReference> implements IBaseApplicationReferenceDao {
    static Find: DaoQueryDecorators<ApplicationReferenceESelect>;
    static FindOne: DaoQueryDecorators<ApplicationReferenceESelect>;
    static Search: DaoQueryDecorators<ApplicationReferenceESelect>;
    static SearchOne: DaoQueryDecorators<ApplicationReferenceESelect>;
    static Save(config: ApplicationReferenceGraph): PropertyDecorator;
    static diSet(): boolean;
    constructor();
}
export interface IBaseApplicationRelationDao extends IDao<ApplicationRelation, ApplicationRelationESelect, ApplicationRelationECreateProperties, ApplicationRelationEUpdateColumns, ApplicationRelationEUpdateProperties, ApplicationRelationEId, ApplicationRelationGraph, QApplicationRelation> {
}
export declare class BaseApplicationRelationDao extends SQDIDao<ApplicationRelation, ApplicationRelationESelect, ApplicationRelationECreateProperties, ApplicationRelationEUpdateColumns, ApplicationRelationEUpdateProperties, ApplicationRelationEId, ApplicationRelationGraph, QApplicationRelation> implements IBaseApplicationRelationDao {
    static Find: DaoQueryDecorators<ApplicationRelationESelect>;
    static FindOne: DaoQueryDecorators<ApplicationRelationESelect>;
    static Search: DaoQueryDecorators<ApplicationRelationESelect>;
    static SearchOne: DaoQueryDecorators<ApplicationRelationESelect>;
    static Save(config: ApplicationRelationGraph): PropertyDecorator;
    static diSet(): boolean;
    constructor();
}
export interface IBaseApplicationRelationColumnDao extends IDao<ApplicationRelationColumn, ApplicationRelationColumnESelect, ApplicationRelationColumnECreateProperties, ApplicationRelationColumnEUpdateColumns, ApplicationRelationColumnEUpdateProperties, ApplicationRelationColumnEId, ApplicationRelationColumnGraph, QApplicationRelationColumn> {
}
export declare class BaseApplicationRelationColumnDao extends SQDIDao<ApplicationRelationColumn, ApplicationRelationColumnESelect, ApplicationRelationColumnECreateProperties, ApplicationRelationColumnEUpdateColumns, ApplicationRelationColumnEUpdateProperties, ApplicationRelationColumnEId, ApplicationRelationColumnGraph, QApplicationRelationColumn> implements IBaseApplicationRelationColumnDao {
    static Find: DaoQueryDecorators<ApplicationRelationColumnESelect>;
    static FindOne: DaoQueryDecorators<ApplicationRelationColumnESelect>;
    static Search: DaoQueryDecorators<ApplicationRelationColumnESelect>;
    static SearchOne: DaoQueryDecorators<ApplicationRelationColumnESelect>;
    static Save(config: ApplicationRelationColumnGraph): PropertyDecorator;
    static diSet(): boolean;
    constructor();
}
export interface IBaseApplicationVersionDao extends IDao<ApplicationVersion, ApplicationVersionESelect, ApplicationVersionECreateProperties, ApplicationVersionEUpdateColumns, ApplicationVersionEUpdateProperties, ApplicationVersionEId, ApplicationVersionGraph, QApplicationVersion> {
}
export declare class BaseApplicationVersionDao extends SQDIDao<ApplicationVersion, ApplicationVersionESelect, ApplicationVersionECreateProperties, ApplicationVersionEUpdateColumns, ApplicationVersionEUpdateProperties, ApplicationVersionEId, ApplicationVersionGraph, QApplicationVersion> implements IBaseApplicationVersionDao {
    static Find: DaoQueryDecorators<ApplicationVersionESelect>;
    static FindOne: DaoQueryDecorators<ApplicationVersionESelect>;
    static Search: DaoQueryDecorators<ApplicationVersionESelect>;
    static SearchOne: DaoQueryDecorators<ApplicationVersionESelect>;
    static Save(config: ApplicationVersionGraph): PropertyDecorator;
    static diSet(): boolean;
    constructor();
}
export interface IBaseDomainDao extends IDao<Domain, DomainESelect, DomainECreateProperties, DomainEUpdateColumns, DomainEUpdateProperties, DomainEId, DomainGraph, QDomain> {
}
export declare class BaseDomainDao extends SQDIDao<Domain, DomainESelect, DomainECreateProperties, DomainEUpdateColumns, DomainEUpdateProperties, DomainEId, DomainGraph, QDomain> implements IBaseDomainDao {
    static Find: DaoQueryDecorators<DomainESelect>;
    static FindOne: DaoQueryDecorators<DomainESelect>;
    static Search: DaoQueryDecorators<DomainESelect>;
    static SearchOne: DaoQueryDecorators<DomainESelect>;
    static Save(config: DomainGraph): PropertyDecorator;
    static diSet(): boolean;
    constructor();
}
//# sourceMappingURL=baseDaos.d.ts.map