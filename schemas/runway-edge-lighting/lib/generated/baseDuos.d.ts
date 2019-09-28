import { IDuo, IEntityCascadeGraph, IEntityCreateProperties, IEntityIdProperties, IEntitySelectProperties, IEntityUpdateColumns, IEntityUpdateProperties, IQEntity } from '@airport/air-control';
import { Duo } from '@airport/check-in';
import { EntityId as DbEntityId } from '@airport/ground-control';
import { ILogEntry } from './logentry';
import { LogEntryESelect, LogEntryECreateProperties, LogEntryEUpdateColumns, LogEntryEUpdateProperties, LogEntryEId, LogEntryECascadeGraph, QLogEntry } from './qlogentry';
import { ILogEntryType } from './logentrytype';
import { LogEntryTypeESelect, LogEntryTypeECreateProperties, LogEntryTypeEUpdateColumns, LogEntryTypeEUpdateProperties, LogEntryTypeEId, LogEntryTypeECascadeGraph, QLogEntryType } from './qlogentrytype';
import { ILogEntryValue } from './logentryvalue';
import { LogEntryValueESelect, LogEntryValueECreateProperties, LogEntryValueEUpdateColumns, LogEntryValueEUpdateProperties, LogEntryValueEId, LogEntryValueECascadeGraph, QLogEntryValue } from './qlogentryvalue';
import { ILoggedError } from './loggederror';
import { LoggedErrorESelect, LoggedErrorECreateProperties, LoggedErrorEUpdateColumns, LoggedErrorEUpdateProperties, LoggedErrorEId, LoggedErrorECascadeGraph, QLoggedError } from './qloggederror';
import { ILoggedErrorStackTrace } from './loggederrorstacktrace';
import { LoggedErrorStackTraceESelect, LoggedErrorStackTraceECreateProperties, LoggedErrorStackTraceEUpdateColumns, LoggedErrorStackTraceEUpdateProperties, LoggedErrorStackTraceEId, LoggedErrorStackTraceECascadeGraph, QLoggedErrorStackTrace } from './qloggederrorstacktrace';
export declare class SQDIDuo<Entity, EntitySelect extends IEntitySelectProperties, EntityCreate extends IEntityCreateProperties, EntityUpdateColumns extends IEntityUpdateColumns, EntityUpdateProperties extends IEntityUpdateProperties, EntityId extends IEntityIdProperties, EntityCascadeGraph extends IEntityCascadeGraph, IQE extends IQEntity> extends Duo<Entity, EntitySelect, EntityCreate, EntityUpdateColumns, EntityUpdateProperties, EntityId, EntityCascadeGraph, IQE> {
    constructor(dbEntityId: DbEntityId);
}
export interface IBaseLogEntryDuo extends IDuo<ILogEntry, LogEntryESelect, LogEntryECreateProperties, LogEntryEUpdateColumns, LogEntryEUpdateProperties, LogEntryEId, LogEntryECascadeGraph, QLogEntry> {
}
export declare class BaseLogEntryDuo extends SQDIDuo<ILogEntry, LogEntryESelect, LogEntryECreateProperties, LogEntryEUpdateColumns, LogEntryEUpdateProperties, LogEntryEId, LogEntryECascadeGraph, QLogEntry> implements IBaseLogEntryDuo {
    static diSet(): boolean;
    constructor();
}
export interface IBaseLogEntryTypeDuo extends IDuo<ILogEntryType, LogEntryTypeESelect, LogEntryTypeECreateProperties, LogEntryTypeEUpdateColumns, LogEntryTypeEUpdateProperties, LogEntryTypeEId, LogEntryTypeECascadeGraph, QLogEntryType> {
}
export declare class BaseLogEntryTypeDuo extends SQDIDuo<ILogEntryType, LogEntryTypeESelect, LogEntryTypeECreateProperties, LogEntryTypeEUpdateColumns, LogEntryTypeEUpdateProperties, LogEntryTypeEId, LogEntryTypeECascadeGraph, QLogEntryType> implements IBaseLogEntryTypeDuo {
    static diSet(): boolean;
    constructor();
}
export interface IBaseLogEntryValueDuo extends IDuo<ILogEntryValue, LogEntryValueESelect, LogEntryValueECreateProperties, LogEntryValueEUpdateColumns, LogEntryValueEUpdateProperties, LogEntryValueEId, LogEntryValueECascadeGraph, QLogEntryValue> {
}
export declare class BaseLogEntryValueDuo extends SQDIDuo<ILogEntryValue, LogEntryValueESelect, LogEntryValueECreateProperties, LogEntryValueEUpdateColumns, LogEntryValueEUpdateProperties, LogEntryValueEId, LogEntryValueECascadeGraph, QLogEntryValue> implements IBaseLogEntryValueDuo {
    static diSet(): boolean;
    constructor();
}
export interface IBaseLoggedErrorDuo extends IDuo<ILoggedError, LoggedErrorESelect, LoggedErrorECreateProperties, LoggedErrorEUpdateColumns, LoggedErrorEUpdateProperties, LoggedErrorEId, LoggedErrorECascadeGraph, QLoggedError> {
}
export declare class BaseLoggedErrorDuo extends SQDIDuo<ILoggedError, LoggedErrorESelect, LoggedErrorECreateProperties, LoggedErrorEUpdateColumns, LoggedErrorEUpdateProperties, LoggedErrorEId, LoggedErrorECascadeGraph, QLoggedError> implements IBaseLoggedErrorDuo {
    static diSet(): boolean;
    constructor();
}
export interface IBaseLoggedErrorStackTraceDuo extends IDuo<ILoggedErrorStackTrace, LoggedErrorStackTraceESelect, LoggedErrorStackTraceECreateProperties, LoggedErrorStackTraceEUpdateColumns, LoggedErrorStackTraceEUpdateProperties, LoggedErrorStackTraceEId, LoggedErrorStackTraceECascadeGraph, QLoggedErrorStackTrace> {
}
export declare class BaseLoggedErrorStackTraceDuo extends SQDIDuo<ILoggedErrorStackTrace, LoggedErrorStackTraceESelect, LoggedErrorStackTraceECreateProperties, LoggedErrorStackTraceEUpdateColumns, LoggedErrorStackTraceEUpdateProperties, LoggedErrorStackTraceEId, LoggedErrorStackTraceECascadeGraph, QLoggedErrorStackTrace> implements IBaseLoggedErrorStackTraceDuo {
    static diSet(): boolean;
    constructor();
}
