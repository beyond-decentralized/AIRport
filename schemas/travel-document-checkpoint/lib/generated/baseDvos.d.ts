import { Classification } from '../ddl/type/classification';
import { ClassificationVDescriptor } from './type/vclassification';
import { Client } from '../ddl/client/client';
import { ClientVDescriptor } from './client/vclient';
import { ClientType } from '../ddl/client/clienttype';
import { ClientTypeVDescriptor } from './client/vclienttype';
import { Continent } from '../ddl/locality/continent';
import { ContinentVDescriptor } from './locality/vcontinent';
import { Country } from '../ddl/locality/country';
import { CountryVDescriptor } from './locality/vcountry';
import { Database } from '../ddl/database/database';
import { DatabaseVDescriptor } from './database/vdatabase';
import { DatabaseType } from '../ddl/database/databasetype';
import { DatabaseTypeVDescriptor } from './database/vdatabasetype';
import { MetroArea } from '../ddl/locality/metroarea';
import { MetroAreaVDescriptor } from './locality/vmetroarea';
import { MetroAreaState } from '../ddl/locality/metroareastate';
import { MetroAreaStateVDescriptor } from './locality/vmetroareastate';
import { State } from '../ddl/locality/state';
import { StateVDescriptor } from './locality/vstate';
import { Terminal } from '../ddl/terminal/terminal';
import { TerminalVDescriptor } from './terminal/vterminal';
import { TerminalType } from '../ddl/terminal/terminaltype';
import { TerminalTypeVDescriptor } from './terminal/vterminaltype';
import { Type } from '../ddl/type/type';
import { TypeVDescriptor } from './type/vtype';
import { TypeClassification } from '../ddl/type/typeclassification';
import { TypeClassificationVDescriptor } from './type/vtypeclassification';
import { UserAccount } from '../ddl/useraccount';
import { UserAccountVDescriptor } from './vuseraccount';
import { IDvo, Dvo } from '@airbridge/validate';
import { ApplicationEntity_LocalId as DbEntityId } from '@airport/ground-control';
export declare class SQDIDvo<Entity, EntityVDescriptor> extends Dvo<Entity, EntityVDescriptor> {
    constructor(dbEntityId: DbEntityId);
}
export interface IBaseClassificationDvo extends IDvo<Classification, ClassificationVDescriptor<Classification>> {
}
export declare class BaseClassificationDvo extends SQDIDvo<Classification, ClassificationVDescriptor<Classification>> implements IBaseClassificationDvo {
    static diSet(): boolean;
    constructor();
}
export interface IBaseClientDvo extends IDvo<Client, ClientVDescriptor<Client>> {
}
export declare class BaseClientDvo extends SQDIDvo<Client, ClientVDescriptor<Client>> implements IBaseClientDvo {
    static diSet(): boolean;
    constructor();
}
export interface IBaseClientTypeDvo extends IDvo<ClientType, ClientTypeVDescriptor<ClientType>> {
}
export declare class BaseClientTypeDvo extends SQDIDvo<ClientType, ClientTypeVDescriptor<ClientType>> implements IBaseClientTypeDvo {
    static diSet(): boolean;
    constructor();
}
export interface IBaseContinentDvo extends IDvo<Continent, ContinentVDescriptor<Continent>> {
}
export declare class BaseContinentDvo extends SQDIDvo<Continent, ContinentVDescriptor<Continent>> implements IBaseContinentDvo {
    static diSet(): boolean;
    constructor();
}
export interface IBaseCountryDvo extends IDvo<Country, CountryVDescriptor<Country>> {
}
export declare class BaseCountryDvo extends SQDIDvo<Country, CountryVDescriptor<Country>> implements IBaseCountryDvo {
    static diSet(): boolean;
    constructor();
}
export interface IBaseDatabaseDvo extends IDvo<Database, DatabaseVDescriptor<Database>> {
}
export declare class BaseDatabaseDvo extends SQDIDvo<Database, DatabaseVDescriptor<Database>> implements IBaseDatabaseDvo {
    static diSet(): boolean;
    constructor();
}
export interface IBaseDatabaseTypeDvo extends IDvo<DatabaseType, DatabaseTypeVDescriptor<DatabaseType>> {
}
export declare class BaseDatabaseTypeDvo extends SQDIDvo<DatabaseType, DatabaseTypeVDescriptor<DatabaseType>> implements IBaseDatabaseTypeDvo {
    static diSet(): boolean;
    constructor();
}
export interface IBaseMetroAreaDvo extends IDvo<MetroArea, MetroAreaVDescriptor<MetroArea>> {
}
export declare class BaseMetroAreaDvo extends SQDIDvo<MetroArea, MetroAreaVDescriptor<MetroArea>> implements IBaseMetroAreaDvo {
    static diSet(): boolean;
    constructor();
}
export interface IBaseMetroAreaStateDvo extends IDvo<MetroAreaState, MetroAreaStateVDescriptor<MetroAreaState>> {
}
export declare class BaseMetroAreaStateDvo extends SQDIDvo<MetroAreaState, MetroAreaStateVDescriptor<MetroAreaState>> implements IBaseMetroAreaStateDvo {
    static diSet(): boolean;
    constructor();
}
export interface IBaseStateDvo extends IDvo<State, StateVDescriptor<State>> {
}
export declare class BaseStateDvo extends SQDIDvo<State, StateVDescriptor<State>> implements IBaseStateDvo {
    static diSet(): boolean;
    constructor();
}
export interface IBaseTerminalDvo extends IDvo<Terminal, TerminalVDescriptor<Terminal>> {
}
export declare class BaseTerminalDvo extends SQDIDvo<Terminal, TerminalVDescriptor<Terminal>> implements IBaseTerminalDvo {
    static diSet(): boolean;
    constructor();
}
export interface IBaseTerminalTypeDvo extends IDvo<TerminalType, TerminalTypeVDescriptor<TerminalType>> {
}
export declare class BaseTerminalTypeDvo extends SQDIDvo<TerminalType, TerminalTypeVDescriptor<TerminalType>> implements IBaseTerminalTypeDvo {
    static diSet(): boolean;
    constructor();
}
export interface IBaseTypeDvo extends IDvo<Type, TypeVDescriptor<Type>> {
}
export declare class BaseTypeDvo extends SQDIDvo<Type, TypeVDescriptor<Type>> implements IBaseTypeDvo {
    static diSet(): boolean;
    constructor();
}
export interface IBaseTypeClassificationDvo extends IDvo<TypeClassification, TypeClassificationVDescriptor<TypeClassification>> {
}
export declare class BaseTypeClassificationDvo extends SQDIDvo<TypeClassification, TypeClassificationVDescriptor<TypeClassification>> implements IBaseTypeClassificationDvo {
    static diSet(): boolean;
    constructor();
}
export interface IBaseUserAccountDvo extends IDvo<UserAccount, UserAccountVDescriptor<UserAccount>> {
}
export declare class BaseUserAccountDvo extends SQDIDvo<UserAccount, UserAccountVDescriptor<UserAccount>> implements IBaseUserAccountDvo {
    static diSet(): boolean;
    constructor();
}
//# sourceMappingURL=baseDvos.d.ts.map