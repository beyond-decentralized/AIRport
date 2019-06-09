import { IDao, IEntityCreateProperties, IEntityIdProperties, IEntitySelectProperties, IEntityUpdateColumns, IEntityUpdateProperties, IQEntity } from '@airport/air-control';
import { Dao } from '@airport/check-in';
import { ISequence, SequenceESelect, SequenceECreateProperties, SequenceEUpdateColumns, SequenceEUpdateProperties, SequenceEId, QSequence } from './qsequence';
import { ISequenceBlock, SequenceBlockESelect, SequenceBlockECreateProperties, SequenceBlockEUpdateColumns, SequenceBlockEUpdateProperties, SequenceBlockEId, QSequenceBlock } from './qsequenceblock';
import { ITerminalRun, TerminalRunESelect, TerminalRunECreateProperties, TerminalRunEUpdateColumns, TerminalRunEUpdateProperties, TerminalRunEId, QTerminalRun } from './qterminalrun';
export declare class SQDIDao<Entity, EntitySelect extends IEntitySelectProperties, EntityCreate extends IEntityCreateProperties, EntityUpdateColumns extends IEntityUpdateColumns, EntityUpdateProperties extends IEntityUpdateProperties, EntityId extends IEntityIdProperties, IQE extends IQEntity> extends Dao<Entity, EntitySelect, EntityCreate, EntityUpdateColumns, EntityUpdateProperties, EntityId, IQE> {
    static diSet(): boolean;
    constructor(dbEntityName: string);
}
export interface IBaseSequenceDao extends IDao<ISequence, SequenceESelect, SequenceECreateProperties, SequenceEUpdateColumns, SequenceEUpdateProperties, SequenceEId, QSequence> {
}
export declare class BaseSequenceDao extends SQDIDao<ISequence, SequenceESelect, SequenceECreateProperties, SequenceEUpdateColumns, SequenceEUpdateProperties, SequenceEId, QSequence> implements IBaseSequenceDao {
    constructor();
}
export interface IBaseSequenceBlockDao extends IDao<ISequenceBlock, SequenceBlockESelect, SequenceBlockECreateProperties, SequenceBlockEUpdateColumns, SequenceBlockEUpdateProperties, SequenceBlockEId, QSequenceBlock> {
}
export declare class BaseSequenceBlockDao extends SQDIDao<ISequenceBlock, SequenceBlockESelect, SequenceBlockECreateProperties, SequenceBlockEUpdateColumns, SequenceBlockEUpdateProperties, SequenceBlockEId, QSequenceBlock> implements IBaseSequenceBlockDao {
    constructor();
}
export interface IBaseTerminalRunDao extends IDao<ITerminalRun, TerminalRunESelect, TerminalRunECreateProperties, TerminalRunEUpdateColumns, TerminalRunEUpdateProperties, TerminalRunEId, QTerminalRun> {
}
export declare class BaseTerminalRunDao extends SQDIDao<ITerminalRun, TerminalRunESelect, TerminalRunECreateProperties, TerminalRunEUpdateColumns, TerminalRunEUpdateProperties, TerminalRunEId, QTerminalRun> implements IBaseTerminalRunDao {
    constructor();
}
