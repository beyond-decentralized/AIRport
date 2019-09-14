import { IDao, IEntityCascadeGraph, IEntityCreateProperties, IEntityIdProperties, IEntitySelectProperties, IEntityUpdateColumns, IEntityUpdateProperties, IQEntity } from '@airport/air-control';
import { Dao } from '@airport/check-in';
import { EntityId as DbEntityId } from '@airport/ground-control';
import { ILogEntry, LogEntryESelect, LogEntryECascadeGraph, LogEntryECreateProperties, LogEntryEUpdateColumns, LogEntryEUpdateProperties, LogEntryEId, QLogEntry } from './qlogentry';
import { ILogEntryType, LogEntryTypeESelect, LogEntryTypeECascadeGraph, LogEntryTypeECreateProperties, LogEntryTypeEUpdateColumns, LogEntryTypeEUpdateProperties, LogEntryTypeEId, QLogEntryType } from './qlogentrytype';
import { ILogEntryValue, LogEntryValueESelect, LogEntryValueECascadeGraph, LogEntryValueECreateProperties, LogEntryValueEUpdateColumns, LogEntryValueEUpdateProperties, LogEntryValueEId, QLogEntryValue } from './qlogentryvalue';
import { ILoggedError, LoggedErrorESelect, LoggedErrorECascadeGraph, LoggedErrorECreateProperties, LoggedErrorEUpdateColumns, LoggedErrorEUpdateProperties, LoggedErrorEId, QLoggedError } from './qloggederror';
import { ILoggedErrorStackTrace, LoggedErrorStackTraceESelect, LoggedErrorStackTraceECascadeGraph, LoggedErrorStackTraceECreateProperties, LoggedErrorStackTraceEUpdateColumns, LoggedErrorStackTraceEUpdateProperties, LoggedErrorStackTraceEId, QLoggedErrorStackTrace } from './qloggederrorstacktrace';
export declare class SQDIDao<Entity, EntitySelect extends IEntitySelectProperties, EntityCreate extends IEntityCreateProperties, EntityUpdateColumns extends IEntityUpdateColumns, EntityUpdateProperties extends IEntityUpdateProperties, EntityId extends IEntityIdProperties, EntityCascadeGraph extends IEntityCascadeGraph, IQE extends IQEntity> extends Dao<Entity, EntitySelect, EntityCreate, EntityUpdateColumns, EntityUpdateProperties, EntityId, EntityCascadeGraph, IQE> {
    constructor(dbEntityId: DbEntityId);
}
export interface IBaseLogEntryDao extends IDao<ILogEntry, LogEntryESelect, LogEntryECreateProperties, LogEntryEUpdateColumns, LogEntryEUpdateProperties, LogEntryEId, LogEntryECascadeGraph, QLogEntry> {
}
export declare class BaseLogEntryDao extends SQDIDao<ILogEntry, LogEntryESelect, LogEntryECreateProperties, LogEntryEUpdateColumns, LogEntryEUpdateProperties, LogEntryEId, LogEntryECascadeGraph, QLogEntry> implements IBaseLogEntryDao {
    static diSet(): boolean;
    constructor();
}
export interface IBaseLogEntryTypeDao extends IDao<ILogEntryType, LogEntryTypeESelect, LogEntryTypeECreateProperties, LogEntryTypeEUpdateColumns, LogEntryTypeEUpdateProperties, LogEntryTypeEId, LogEntryTypeECascadeGraph, QLogEntryType> {
}
export declare class BaseLogEntryTypeDao extends SQDIDao<ILogEntryType, LogEntryTypeESelect, LogEntryTypeECreateProperties, LogEntryTypeEUpdateColumns, LogEntryTypeEUpdateProperties, LogEntryTypeEId, LogEntryTypeECascadeGraph, QLogEntryType> implements IBaseLogEntryTypeDao {
    static diSet(): boolean;
    constructor();
}
export interface IBaseLogEntryValueDao extends IDao<ILogEntryValue, LogEntryValueESelect, LogEntryValueECreateProperties, LogEntryValueEUpdateColumns, LogEntryValueEUpdateProperties, LogEntryValueEId, LogEntryValueECascadeGraph, QLogEntryValue> {
}
export declare class BaseLogEntryValueDao extends SQDIDao<ILogEntryValue, LogEntryValueESelect, LogEntryValueECreateProperties, LogEntryValueEUpdateColumns, LogEntryValueEUpdateProperties, LogEntryValueEId, LogEntryValueECascadeGraph, QLogEntryValue> implements IBaseLogEntryValueDao {
    static diSet(): boolean;
    constructor();
}
export interface IBaseLoggedErrorDao extends IDao<ILoggedError, LoggedErrorESelect, LoggedErrorECreateProperties, LoggedErrorEUpdateColumns, LoggedErrorEUpdateProperties, LoggedErrorEId, LoggedErrorECascadeGraph, QLoggedError> {
}
export declare class BaseLoggedErrorDao extends SQDIDao<ILoggedError, LoggedErrorESelect, LoggedErrorECreateProperties, LoggedErrorEUpdateColumns, LoggedErrorEUpdateProperties, LoggedErrorEId, LoggedErrorECascadeGraph, QLoggedError> implements IBaseLoggedErrorDao {
    static diSet(): boolean;
    constructor();
}
export interface IBaseLoggedErrorStackTraceDao extends IDao<ILoggedErrorStackTrace, LoggedErrorStackTraceESelect, LoggedErrorStackTraceECreateProperties, LoggedErrorStackTraceEUpdateColumns, LoggedErrorStackTraceEUpdateProperties, LoggedErrorStackTraceEId, LoggedErrorStackTraceECascadeGraph, QLoggedErrorStackTrace> {
}
export declare class BaseLoggedErrorStackTraceDao extends SQDIDao<ILoggedErrorStackTrace, LoggedErrorStackTraceESelect, LoggedErrorStackTraceECreateProperties, LoggedErrorStackTraceEUpdateColumns, LoggedErrorStackTraceEUpdateProperties, LoggedErrorStackTraceEId, LoggedErrorStackTraceECascadeGraph, QLoggedErrorStackTrace> implements IBaseLoggedErrorStackTraceDao {
    static diSet(): boolean;
    constructor();
}
