import { ISequence } from './sequence';
import { SequenceESelect, SequenceECreateProperties, SequenceEUpdateColumns, SequenceEUpdateProperties, SequenceEId, SequenceGraph, QSequence } from './qsequence';
import { ISystemWideOperationId } from './systemwideoperationid';
import { SystemWideOperationIdESelect, SystemWideOperationIdECreateProperties, SystemWideOperationIdEUpdateColumns, SystemWideOperationIdEUpdateProperties, SystemWideOperationIdEId, SystemWideOperationIdGraph, QSystemWideOperationId } from './qsystemwideoperationid';
import { ITerminalRun } from './terminalrun';
import { TerminalRunESelect, TerminalRunECreateProperties, TerminalRunEUpdateColumns, TerminalRunEUpdateProperties, TerminalRunEId, TerminalRunGraph, QTerminalRun } from './qterminalrun';
import { IDao, IEntityCascadeGraph, IEntityCreateProperties, IEntityIdProperties, IEntitySelectProperties, IEntityUpdateColumns, IEntityUpdateProperties, IQEntity } from '@airport/air-control';
import { Dao, DaoQueryDecorators } from '@airport/check-in';
import { EntityId as DbEntityId } from '@airport/ground-control';
export declare class SQDIDao<Entity, EntitySelect extends IEntitySelectProperties, EntityCreate extends IEntityCreateProperties, EntityUpdateColumns extends IEntityUpdateColumns, EntityUpdateProperties extends IEntityUpdateProperties, EntityId extends IEntityIdProperties, EntityCascadeGraph extends IEntityCascadeGraph, IQE extends IQEntity<Entity>> extends Dao<Entity, EntitySelect, EntityCreate, EntityUpdateColumns, EntityUpdateProperties, EntityId, EntityCascadeGraph, IQE> {
    constructor(dbEntityId: DbEntityId);
}
export interface IBaseSequenceDao extends IDao<ISequence, SequenceESelect, SequenceECreateProperties, SequenceEUpdateColumns, SequenceEUpdateProperties, SequenceEId, SequenceGraph, QSequence> {
}
export declare class BaseSequenceDao extends SQDIDao<ISequence, SequenceESelect, SequenceECreateProperties, SequenceEUpdateColumns, SequenceEUpdateProperties, SequenceEId, SequenceGraph, QSequence> implements IBaseSequenceDao {
    static Find: DaoQueryDecorators<SequenceESelect>;
    static FindOne: DaoQueryDecorators<SequenceESelect>;
    static Search: DaoQueryDecorators<SequenceESelect>;
    static SearchOne: DaoQueryDecorators<SequenceESelect>;
    static Save(config: SequenceGraph): PropertyDecorator;
    static diSet(): boolean;
    constructor();
}
export interface IBaseSystemWideOperationIdDao extends IDao<ISystemWideOperationId, SystemWideOperationIdESelect, SystemWideOperationIdECreateProperties, SystemWideOperationIdEUpdateColumns, SystemWideOperationIdEUpdateProperties, SystemWideOperationIdEId, SystemWideOperationIdGraph, QSystemWideOperationId> {
}
export declare class BaseSystemWideOperationIdDao extends SQDIDao<ISystemWideOperationId, SystemWideOperationIdESelect, SystemWideOperationIdECreateProperties, SystemWideOperationIdEUpdateColumns, SystemWideOperationIdEUpdateProperties, SystemWideOperationIdEId, SystemWideOperationIdGraph, QSystemWideOperationId> implements IBaseSystemWideOperationIdDao {
    static Find: DaoQueryDecorators<SystemWideOperationIdESelect>;
    static FindOne: DaoQueryDecorators<SystemWideOperationIdESelect>;
    static Search: DaoQueryDecorators<SystemWideOperationIdESelect>;
    static SearchOne: DaoQueryDecorators<SystemWideOperationIdESelect>;
    static Save(config: SystemWideOperationIdGraph): PropertyDecorator;
    static diSet(): boolean;
    constructor();
}
export interface IBaseTerminalRunDao extends IDao<ITerminalRun, TerminalRunESelect, TerminalRunECreateProperties, TerminalRunEUpdateColumns, TerminalRunEUpdateProperties, TerminalRunEId, TerminalRunGraph, QTerminalRun> {
}
export declare class BaseTerminalRunDao extends SQDIDao<ITerminalRun, TerminalRunESelect, TerminalRunECreateProperties, TerminalRunEUpdateColumns, TerminalRunEUpdateProperties, TerminalRunEId, TerminalRunGraph, QTerminalRun> implements IBaseTerminalRunDao {
    static Find: DaoQueryDecorators<TerminalRunESelect>;
    static FindOne: DaoQueryDecorators<TerminalRunESelect>;
    static Search: DaoQueryDecorators<TerminalRunESelect>;
    static SearchOne: DaoQueryDecorators<TerminalRunESelect>;
    static Save(config: TerminalRunGraph): PropertyDecorator;
    static diSet(): boolean;
    constructor();
}
//# sourceMappingURL=baseDaos.d.ts.map