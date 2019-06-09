import { IDuo, IEntityCreateProperties, IEntityIdProperties, IEntitySelectProperties, IEntityUpdateProperties, IQEntity } from '@airport/air-control';
import { Duo } from "@airport/check-in";
import { ISequence, SequenceESelect, SequenceECreateProperties, SequenceEUpdateProperties, SequenceEId, QSequence } from './qsequence';
import { ISequenceBlock, SequenceBlockESelect, SequenceBlockECreateProperties, SequenceBlockEUpdateProperties, SequenceBlockEId, QSequenceBlock } from './qsequenceblock';
import { ITerminalRun, TerminalRunESelect, TerminalRunECreateProperties, TerminalRunEUpdateProperties, TerminalRunEId, QTerminalRun } from './qterminalrun';
export declare class SQDIDuo<Entity, EntitySelect extends IEntitySelectProperties, EntityCreate extends IEntityCreateProperties, EntityUpdateProperties extends IEntityUpdateProperties, EntityId extends IEntityIdProperties, IQE extends IQEntity> extends Duo<Entity, EntitySelect, EntityCreate, EntityUpdateProperties, EntityId, IQE> {
    static diSet(): boolean;
    constructor(dbEntityName: string);
}
export interface IBaseSequenceDuo extends IDuo<ISequence, SequenceESelect, SequenceECreateProperties, SequenceEUpdateProperties, SequenceEId, QSequence> {
}
export declare class BaseSequenceDuo extends SQDIDuo<ISequence, SequenceESelect, SequenceECreateProperties, SequenceEUpdateProperties, SequenceEId, QSequence> implements IBaseSequenceDuo {
    constructor();
}
export interface IBaseSequenceBlockDuo extends IDuo<ISequenceBlock, SequenceBlockESelect, SequenceBlockECreateProperties, SequenceBlockEUpdateProperties, SequenceBlockEId, QSequenceBlock> {
}
export declare class BaseSequenceBlockDuo extends SQDIDuo<ISequenceBlock, SequenceBlockESelect, SequenceBlockECreateProperties, SequenceBlockEUpdateProperties, SequenceBlockEId, QSequenceBlock> implements IBaseSequenceBlockDuo {
    constructor();
}
export interface IBaseTerminalRunDuo extends IDuo<ITerminalRun, TerminalRunESelect, TerminalRunECreateProperties, TerminalRunEUpdateProperties, TerminalRunEId, QTerminalRun> {
}
export declare class BaseTerminalRunDuo extends SQDIDuo<ITerminalRun, TerminalRunESelect, TerminalRunECreateProperties, TerminalRunEUpdateProperties, TerminalRunEId, QTerminalRun> implements IBaseTerminalRunDuo {
    constructor();
}
