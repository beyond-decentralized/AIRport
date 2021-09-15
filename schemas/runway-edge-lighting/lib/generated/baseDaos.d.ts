import { ILogEntry } from './logentry';
import { LogEntryESelect, LogEntryECreateProperties, LogEntryEUpdateColumns, LogEntryEUpdateProperties, LogEntryEId, LogEntryGraph, QLogEntry } from './qlogentry';
import { ILogEntryType } from './logentrytype';
import { LogEntryTypeESelect, LogEntryTypeECreateProperties, LogEntryTypeEUpdateColumns, LogEntryTypeEUpdateProperties, LogEntryTypeEId, LogEntryTypeGraph, QLogEntryType } from './qlogentrytype';
import { ILogEntryValue } from './logentryvalue';
import { LogEntryValueESelect, LogEntryValueECreateProperties, LogEntryValueEUpdateColumns, LogEntryValueEUpdateProperties, LogEntryValueEId, LogEntryValueGraph, QLogEntryValue } from './qlogentryvalue';
import { ILoggedError } from './loggederror';
import { LoggedErrorESelect, LoggedErrorECreateProperties, LoggedErrorEUpdateColumns, LoggedErrorEUpdateProperties, LoggedErrorEId, LoggedErrorGraph, QLoggedError } from './qloggederror';
import { ILoggedErrorStackTrace } from './loggederrorstacktrace';
import { LoggedErrorStackTraceESelect, LoggedErrorStackTraceECreateProperties, LoggedErrorStackTraceEUpdateColumns, LoggedErrorStackTraceEUpdateProperties, LoggedErrorStackTraceEId, LoggedErrorStackTraceGraph, QLoggedErrorStackTrace } from './qloggederrorstacktrace';
import { IDao, IEntityCascadeGraph, IEntityCreateProperties, IEntityIdProperties, IEntitySelectProperties, IEntityUpdateColumns, IEntityUpdateProperties, IQEntity } from '@airport/air-control';
import { Dao, DaoQueryDecorators } from '@airport/check-in';
import { EntityId as DbEntityId } from '@airport/ground-control';
export declare class SQDIDao<Entity, EntitySelect extends IEntitySelectProperties, EntityCreate extends IEntityCreateProperties, EntityUpdateColumns extends IEntityUpdateColumns, EntityUpdateProperties extends IEntityUpdateProperties, EntityId extends IEntityIdProperties, EntityCascadeGraph extends IEntityCascadeGraph, IQE extends IQEntity<Entity>> extends Dao<Entity, EntitySelect, EntityCreate, EntityUpdateColumns, EntityUpdateProperties, EntityId, EntityCascadeGraph, IQE> {
    constructor(dbEntityId: DbEntityId);
}
export interface IBaseLogEntryDao extends IDao<ILogEntry, LogEntryESelect, LogEntryECreateProperties, LogEntryEUpdateColumns, LogEntryEUpdateProperties, LogEntryEId, LogEntryGraph, QLogEntry> {
}
export declare class BaseLogEntryDao extends SQDIDao<ILogEntry, LogEntryESelect, LogEntryECreateProperties, LogEntryEUpdateColumns, LogEntryEUpdateProperties, LogEntryEId, LogEntryGraph, QLogEntry> implements IBaseLogEntryDao {
    static Find: DaoQueryDecorators<LogEntryESelect>;
    static FindOne: DaoQueryDecorators<LogEntryESelect>;
    static Search: DaoQueryDecorators<LogEntryESelect>;
    static SearchOne: DaoQueryDecorators<LogEntryESelect>;
    static Save(config: LogEntryGraph): PropertyDecorator;
    static diSet(): boolean;
    constructor();
}
export interface IBaseLogEntryTypeDao extends IDao<ILogEntryType, LogEntryTypeESelect, LogEntryTypeECreateProperties, LogEntryTypeEUpdateColumns, LogEntryTypeEUpdateProperties, LogEntryTypeEId, LogEntryTypeGraph, QLogEntryType> {
}
export declare class BaseLogEntryTypeDao extends SQDIDao<ILogEntryType, LogEntryTypeESelect, LogEntryTypeECreateProperties, LogEntryTypeEUpdateColumns, LogEntryTypeEUpdateProperties, LogEntryTypeEId, LogEntryTypeGraph, QLogEntryType> implements IBaseLogEntryTypeDao {
    static Find: DaoQueryDecorators<LogEntryTypeESelect>;
    static FindOne: DaoQueryDecorators<LogEntryTypeESelect>;
    static Search: DaoQueryDecorators<LogEntryTypeESelect>;
    static SearchOne: DaoQueryDecorators<LogEntryTypeESelect>;
    static Save(config: LogEntryTypeGraph): PropertyDecorator;
    static diSet(): boolean;
    constructor();
}
export interface IBaseLogEntryValueDao extends IDao<ILogEntryValue, LogEntryValueESelect, LogEntryValueECreateProperties, LogEntryValueEUpdateColumns, LogEntryValueEUpdateProperties, LogEntryValueEId, LogEntryValueGraph, QLogEntryValue> {
}
export declare class BaseLogEntryValueDao extends SQDIDao<ILogEntryValue, LogEntryValueESelect, LogEntryValueECreateProperties, LogEntryValueEUpdateColumns, LogEntryValueEUpdateProperties, LogEntryValueEId, LogEntryValueGraph, QLogEntryValue> implements IBaseLogEntryValueDao {
    static Find: DaoQueryDecorators<LogEntryValueESelect>;
    static FindOne: DaoQueryDecorators<LogEntryValueESelect>;
    static Search: DaoQueryDecorators<LogEntryValueESelect>;
    static SearchOne: DaoQueryDecorators<LogEntryValueESelect>;
    static Save(config: LogEntryValueGraph): PropertyDecorator;
    static diSet(): boolean;
    constructor();
}
export interface IBaseLoggedErrorDao extends IDao<ILoggedError, LoggedErrorESelect, LoggedErrorECreateProperties, LoggedErrorEUpdateColumns, LoggedErrorEUpdateProperties, LoggedErrorEId, LoggedErrorGraph, QLoggedError> {
}
export declare class BaseLoggedErrorDao extends SQDIDao<ILoggedError, LoggedErrorESelect, LoggedErrorECreateProperties, LoggedErrorEUpdateColumns, LoggedErrorEUpdateProperties, LoggedErrorEId, LoggedErrorGraph, QLoggedError> implements IBaseLoggedErrorDao {
    static Find: DaoQueryDecorators<LoggedErrorESelect>;
    static FindOne: DaoQueryDecorators<LoggedErrorESelect>;
    static Search: DaoQueryDecorators<LoggedErrorESelect>;
    static SearchOne: DaoQueryDecorators<LoggedErrorESelect>;
    static Save(config: LoggedErrorGraph): PropertyDecorator;
    static diSet(): boolean;
    constructor();
}
export interface IBaseLoggedErrorStackTraceDao extends IDao<ILoggedErrorStackTrace, LoggedErrorStackTraceESelect, LoggedErrorStackTraceECreateProperties, LoggedErrorStackTraceEUpdateColumns, LoggedErrorStackTraceEUpdateProperties, LoggedErrorStackTraceEId, LoggedErrorStackTraceGraph, QLoggedErrorStackTrace> {
}
export declare class BaseLoggedErrorStackTraceDao extends SQDIDao<ILoggedErrorStackTrace, LoggedErrorStackTraceESelect, LoggedErrorStackTraceECreateProperties, LoggedErrorStackTraceEUpdateColumns, LoggedErrorStackTraceEUpdateProperties, LoggedErrorStackTraceEId, LoggedErrorStackTraceGraph, QLoggedErrorStackTrace> implements IBaseLoggedErrorStackTraceDao {
    static Find: DaoQueryDecorators<LoggedErrorStackTraceESelect>;
    static FindOne: DaoQueryDecorators<LoggedErrorStackTraceESelect>;
    static Search: DaoQueryDecorators<LoggedErrorStackTraceESelect>;
    static SearchOne: DaoQueryDecorators<LoggedErrorStackTraceESelect>;
    static Save(config: LoggedErrorStackTraceGraph): PropertyDecorator;
    static diSet(): boolean;
    constructor();
}
//# sourceMappingURL=baseDaos.d.ts.map