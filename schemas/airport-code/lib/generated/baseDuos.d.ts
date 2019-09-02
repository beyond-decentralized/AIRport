import { IDuo, IEntityCreateProperties, IEntityIdProperties, IEntitySelectProperties, IEntityUpdateProperties, IQEntity } from '@airport/air-control';
import { Duo } from "@airport/check-in";
import { EntityId as DbEntityId } from '@airport/ground-control';
import { ISequence, SequenceESelect, SequenceECreateProperties, SequenceEUpdateProperties, SequenceEId, QSequence } from './qsequence';
import { ISystemWideOperationId, SystemWideOperationIdESelect, SystemWideOperationIdECreateProperties, SystemWideOperationIdEUpdateProperties, SystemWideOperationIdEId, QSystemWideOperationId } from './qsystemwideoperationid';
import { ITerminalRun, TerminalRunESelect, TerminalRunECreateProperties, TerminalRunEUpdateProperties, TerminalRunEId, QTerminalRun } from './qterminalrun';
export declare class SQDIDuo<Entity, EntitySelect extends IEntitySelectProperties, EntityCreate extends IEntityCreateProperties, EntityUpdateProperties extends IEntityUpdateProperties, EntityId extends IEntityIdProperties, IQE extends IQEntity> extends Duo<Entity, EntitySelect, EntityCreate, EntityUpdateProperties, EntityId, IQE> {
    constructor(dbEntityId: DbEntityId);
}
export interface IBaseSequenceDuo extends IDuo<ISequence, SequenceESelect, SequenceECreateProperties, SequenceEUpdateProperties, SequenceEId, QSequence> {
}
export declare class BaseSequenceDuo extends SQDIDuo<ISequence, SequenceESelect, SequenceECreateProperties, SequenceEUpdateProperties, SequenceEId, QSequence> implements IBaseSequenceDuo {
    static diSet(): boolean;
    constructor();
}
export interface IBaseSystemWideOperationIdDuo extends IDuo<ISystemWideOperationId, SystemWideOperationIdESelect, SystemWideOperationIdECreateProperties, SystemWideOperationIdEUpdateProperties, SystemWideOperationIdEId, QSystemWideOperationId> {
}
export declare class BaseSystemWideOperationIdDuo extends SQDIDuo<ISystemWideOperationId, SystemWideOperationIdESelect, SystemWideOperationIdECreateProperties, SystemWideOperationIdEUpdateProperties, SystemWideOperationIdEId, QSystemWideOperationId> implements IBaseSystemWideOperationIdDuo {
    static diSet(): boolean;
    constructor();
}
export interface IBaseTerminalRunDuo extends IDuo<ITerminalRun, TerminalRunESelect, TerminalRunECreateProperties, TerminalRunEUpdateProperties, TerminalRunEId, QTerminalRun> {
}
export declare class BaseTerminalRunDuo extends SQDIDuo<ITerminalRun, TerminalRunESelect, TerminalRunECreateProperties, TerminalRunEUpdateProperties, TerminalRunEId, QTerminalRun> implements IBaseTerminalRunDuo {
    static diSet(): boolean;
    constructor();
}
