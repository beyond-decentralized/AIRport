import { Sequence } from '../ddl/sequence';
import { SequenceVDescriptor } from './vsequence';
import { SystemWideOperationId } from '../ddl/systemwideoperationid';
import { SystemWideOperationIdVDescriptor } from './vsystemwideoperationid';
import { TerminalRun } from '../ddl/terminalrun';
import { TerminalRunVDescriptor } from './vterminalrun';
import { IDvo, Dvo } from '@airport/airbridge-validate';
import { ApplicationEntity_LocalId as DbEntityId } from '@airport/ground-control';
export declare class SQDIDvo<Entity, EntityVDescriptor> extends Dvo<Entity, EntityVDescriptor> {
    constructor(dbEntityId: DbEntityId);
}
export interface IBaseSequenceDvo extends IDvo<Sequence, SequenceVDescriptor<Sequence>> {
}
export declare class BaseSequenceDvo extends SQDIDvo<Sequence, SequenceVDescriptor<Sequence>> implements IBaseSequenceDvo {
    static diSet(): boolean;
    constructor();
}
export interface IBaseSystemWideOperationIdDvo extends IDvo<SystemWideOperationId, SystemWideOperationIdVDescriptor<SystemWideOperationId>> {
}
export declare class BaseSystemWideOperationIdDvo extends SQDIDvo<SystemWideOperationId, SystemWideOperationIdVDescriptor<SystemWideOperationId>> implements IBaseSystemWideOperationIdDvo {
    static diSet(): boolean;
    constructor();
}
export interface IBaseTerminalRunDvo extends IDvo<TerminalRun, TerminalRunVDescriptor<TerminalRun>> {
}
export declare class BaseTerminalRunDvo extends SQDIDvo<TerminalRun, TerminalRunVDescriptor<TerminalRun>> implements IBaseTerminalRunDvo {
    static diSet(): boolean;
    constructor();
}
//# sourceMappingURL=baseDvos.d.ts.map