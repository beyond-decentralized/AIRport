import { Application } from '../ddl/application/application';
import { ApplicationVDescriptor } from './application/vapplication';
import { ApplicationColumn } from '../ddl/application/applicationcolumn';
import { ApplicationColumnVDescriptor } from './application/vapplicationcolumn';
import { ApplicationCurrentVersion } from '../ddl/application/applicationcurrentversion';
import { ApplicationCurrentVersionVDescriptor } from './application/vapplicationcurrentversion';
import { ApplicationEntity } from '../ddl/application/applicationentity';
import { ApplicationEntityVDescriptor } from './application/vapplicationentity';
import { ApplicationOperation } from '../ddl/application/applicationoperation';
import { ApplicationOperationVDescriptor } from './application/vapplicationoperation';
import { ApplicationProperty } from '../ddl/application/applicationproperty';
import { ApplicationPropertyVDescriptor } from './application/vapplicationproperty';
import { ApplicationPropertyColumn } from '../ddl/application/applicationpropertycolumn';
import { ApplicationPropertyColumnVDescriptor } from './application/vapplicationpropertycolumn';
import { ApplicationReference } from '../ddl/application/applicationreference';
import { ApplicationReferenceVDescriptor } from './application/vapplicationreference';
import { ApplicationRelation } from '../ddl/application/applicationrelation';
import { ApplicationRelationVDescriptor } from './application/vapplicationrelation';
import { ApplicationRelationColumn } from '../ddl/application/applicationrelationcolumn';
import { ApplicationRelationColumnVDescriptor } from './application/vapplicationrelationcolumn';
import { ApplicationVersion } from '../ddl/application/applicationversion';
import { ApplicationVersionVDescriptor } from './application/vapplicationversion';
import { Domain } from '../ddl/application/domain';
import { DomainVDescriptor } from './application/vdomain';
import { IDvo, Dvo } from '@airport/airbridge-validate';
import { ApplicationEntity_LocalId as DbEntityId } from '@airport/ground-control';
export declare class SQDIDvo<Entity, EntityVDescriptor> extends Dvo<Entity, EntityVDescriptor> {
    constructor(dbEntityId: DbEntityId);
}
export interface IBaseApplicationDvo extends IDvo<Application, ApplicationVDescriptor<Application>> {
}
export declare class BaseApplicationDvo extends SQDIDvo<Application, ApplicationVDescriptor<Application>> implements IBaseApplicationDvo {
    static diSet(): boolean;
    constructor();
}
export interface IBaseApplicationColumnDvo extends IDvo<ApplicationColumn, ApplicationColumnVDescriptor<ApplicationColumn>> {
}
export declare class BaseApplicationColumnDvo extends SQDIDvo<ApplicationColumn, ApplicationColumnVDescriptor<ApplicationColumn>> implements IBaseApplicationColumnDvo {
    static diSet(): boolean;
    constructor();
}
export interface IBaseApplicationCurrentVersionDvo extends IDvo<ApplicationCurrentVersion, ApplicationCurrentVersionVDescriptor<ApplicationCurrentVersion>> {
}
export declare class BaseApplicationCurrentVersionDvo extends SQDIDvo<ApplicationCurrentVersion, ApplicationCurrentVersionVDescriptor<ApplicationCurrentVersion>> implements IBaseApplicationCurrentVersionDvo {
    static diSet(): boolean;
    constructor();
}
export interface IBaseApplicationEntityDvo extends IDvo<ApplicationEntity, ApplicationEntityVDescriptor<ApplicationEntity>> {
}
export declare class BaseApplicationEntityDvo extends SQDIDvo<ApplicationEntity, ApplicationEntityVDescriptor<ApplicationEntity>> implements IBaseApplicationEntityDvo {
    static diSet(): boolean;
    constructor();
}
export interface IBaseApplicationOperationDvo extends IDvo<ApplicationOperation, ApplicationOperationVDescriptor<ApplicationOperation>> {
}
export declare class BaseApplicationOperationDvo extends SQDIDvo<ApplicationOperation, ApplicationOperationVDescriptor<ApplicationOperation>> implements IBaseApplicationOperationDvo {
    static diSet(): boolean;
    constructor();
}
export interface IBaseApplicationPropertyDvo extends IDvo<ApplicationProperty, ApplicationPropertyVDescriptor<ApplicationProperty>> {
}
export declare class BaseApplicationPropertyDvo extends SQDIDvo<ApplicationProperty, ApplicationPropertyVDescriptor<ApplicationProperty>> implements IBaseApplicationPropertyDvo {
    static diSet(): boolean;
    constructor();
}
export interface IBaseApplicationPropertyColumnDvo extends IDvo<ApplicationPropertyColumn, ApplicationPropertyColumnVDescriptor<ApplicationPropertyColumn>> {
}
export declare class BaseApplicationPropertyColumnDvo extends SQDIDvo<ApplicationPropertyColumn, ApplicationPropertyColumnVDescriptor<ApplicationPropertyColumn>> implements IBaseApplicationPropertyColumnDvo {
    static diSet(): boolean;
    constructor();
}
export interface IBaseApplicationReferenceDvo extends IDvo<ApplicationReference, ApplicationReferenceVDescriptor<ApplicationReference>> {
}
export declare class BaseApplicationReferenceDvo extends SQDIDvo<ApplicationReference, ApplicationReferenceVDescriptor<ApplicationReference>> implements IBaseApplicationReferenceDvo {
    static diSet(): boolean;
    constructor();
}
export interface IBaseApplicationRelationDvo extends IDvo<ApplicationRelation, ApplicationRelationVDescriptor<ApplicationRelation>> {
}
export declare class BaseApplicationRelationDvo extends SQDIDvo<ApplicationRelation, ApplicationRelationVDescriptor<ApplicationRelation>> implements IBaseApplicationRelationDvo {
    static diSet(): boolean;
    constructor();
}
export interface IBaseApplicationRelationColumnDvo extends IDvo<ApplicationRelationColumn, ApplicationRelationColumnVDescriptor<ApplicationRelationColumn>> {
}
export declare class BaseApplicationRelationColumnDvo extends SQDIDvo<ApplicationRelationColumn, ApplicationRelationColumnVDescriptor<ApplicationRelationColumn>> implements IBaseApplicationRelationColumnDvo {
    static diSet(): boolean;
    constructor();
}
export interface IBaseApplicationVersionDvo extends IDvo<ApplicationVersion, ApplicationVersionVDescriptor<ApplicationVersion>> {
}
export declare class BaseApplicationVersionDvo extends SQDIDvo<ApplicationVersion, ApplicationVersionVDescriptor<ApplicationVersion>> implements IBaseApplicationVersionDvo {
    static diSet(): boolean;
    constructor();
}
export interface IBaseDomainDvo extends IDvo<Domain, DomainVDescriptor<Domain>> {
}
export declare class BaseDomainDvo extends SQDIDvo<Domain, DomainVDescriptor<Domain>> implements IBaseDomainDvo {
    static diSet(): boolean;
    constructor();
}
//# sourceMappingURL=baseDvos.d.ts.map