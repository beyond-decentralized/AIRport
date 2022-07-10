import { Sequence } from '../ddl/sequence';
import { SequenceESelect, SequenceECreateProperties, SequenceEUpdateColumns, SequenceEUpdateProperties, SequenceEId, SequenceGraph, QSequence } from './qsequence';
import { SystemWideOperationId } from '../ddl/systemwideoperationid';
import { SystemWideOperationIdESelect, SystemWideOperationIdECreateProperties, SystemWideOperationIdEUpdateColumns, SystemWideOperationIdEUpdateProperties, SystemWideOperationIdEId, SystemWideOperationIdGraph, QSystemWideOperationId } from './qsystemwideoperationid';
import { TerminalRun } from '../ddl/terminalrun';
import { TerminalRunESelect, TerminalRunECreateProperties, TerminalRunEUpdateColumns, TerminalRunEUpdateProperties, TerminalRunEId, TerminalRunGraph, QTerminalRun } from './qterminalrun';
import { IEntityCascadeGraph, IEntityCreateProperties, IEntityIdProperties, IEntitySelectProperties, IEntityUpdateColumns, IEntityUpdateProperties, IQEntity } from '@airport/tarmaq-query';
import { IDao, DaoQueryDecorators } from '@airport/tarmaq-dao';
import { Dao } from '@airport/air-traffic-control';
import { ApplicationEntity_LocalId as DbEntityId } from '@airport/ground-control';
export declare class SQDIDao<Entity, EntitySelect extends IEntitySelectProperties, EntityCreate extends IEntityCreateProperties, EntityUpdateColumns extends IEntityUpdateColumns, EntityUpdateProperties extends IEntityUpdateProperties, ApplicationEntity_LocalId extends IEntityIdProperties, EntityCascadeGraph extends IEntityCascadeGraph, IQE extends IQEntity> extends Dao<Entity, EntitySelect, EntityCreate, EntityUpdateColumns, EntityUpdateProperties, ApplicationEntity_LocalId, EntityCascadeGraph, IQE> {
    constructor(dbEntityId: DbEntityId);
}
export interface IBaseSequenceDao extends IDao<Sequence, SequenceESelect, SequenceECreateProperties, SequenceEUpdateColumns, SequenceEUpdateProperties, SequenceEId, SequenceGraph, QSequence> {
}
export declare class BaseSequenceDao extends SQDIDao<Sequence, SequenceESelect, SequenceECreateProperties, SequenceEUpdateColumns, SequenceEUpdateProperties, SequenceEId, SequenceGraph, QSequence> implements IBaseSequenceDao {
    static Find: DaoQueryDecorators<SequenceESelect>;
    static FindOne: DaoQueryDecorators<SequenceESelect>;
    static Search: DaoQueryDecorators<SequenceESelect>;
    static SearchOne: DaoQueryDecorators<SequenceESelect>;
    static Save(config: SequenceGraph): PropertyDecorator;
    static diSet(): boolean;
    constructor();
}
export interface IBaseSystemWideOperationIdDao extends IDao<SystemWideOperationId, SystemWideOperationIdESelect, SystemWideOperationIdECreateProperties, SystemWideOperationIdEUpdateColumns, SystemWideOperationIdEUpdateProperties, SystemWideOperationIdEId, SystemWideOperationIdGraph, QSystemWideOperationId> {
}
export declare class BaseSystemWideOperationIdDao extends SQDIDao<SystemWideOperationId, SystemWideOperationIdESelect, SystemWideOperationIdECreateProperties, SystemWideOperationIdEUpdateColumns, SystemWideOperationIdEUpdateProperties, SystemWideOperationIdEId, SystemWideOperationIdGraph, QSystemWideOperationId> implements IBaseSystemWideOperationIdDao {
    static Find: DaoQueryDecorators<SystemWideOperationIdESelect>;
    static FindOne: DaoQueryDecorators<SystemWideOperationIdESelect>;
    static Search: DaoQueryDecorators<SystemWideOperationIdESelect>;
    static SearchOne: DaoQueryDecorators<SystemWideOperationIdESelect>;
    static Save(config: SystemWideOperationIdGraph): PropertyDecorator;
    static diSet(): boolean;
    constructor();
}
export interface IBaseTerminalRunDao extends IDao<TerminalRun, TerminalRunESelect, TerminalRunECreateProperties, TerminalRunEUpdateColumns, TerminalRunEUpdateProperties, TerminalRunEId, TerminalRunGraph, QTerminalRun> {
}
export declare class BaseTerminalRunDao extends SQDIDao<TerminalRun, TerminalRunESelect, TerminalRunECreateProperties, TerminalRunEUpdateColumns, TerminalRunEUpdateProperties, TerminalRunEId, TerminalRunGraph, QTerminalRun> implements IBaseTerminalRunDao {
    static Find: DaoQueryDecorators<TerminalRunESelect>;
    static FindOne: DaoQueryDecorators<TerminalRunESelect>;
    static Search: DaoQueryDecorators<TerminalRunESelect>;
    static SearchOne: DaoQueryDecorators<TerminalRunESelect>;
    static Save(config: TerminalRunGraph): PropertyDecorator;
    static diSet(): boolean;
    constructor();
}
//# sourceMappingURL=baseDaos.d.ts.map