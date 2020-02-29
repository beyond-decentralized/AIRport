import { AIR_DB } from '@airport/air-control';
import { diSet as dS, duoDiSet as ddS } from '@airport/check-in';
import { DI } from '@airport/di';
import { getSchemaName } from '@airport/ground-control';
import { MissingRecord } from '../ddl/missingRecord/MissingRecord';
import { MissingRecordRepoTransBlock } from '../ddl/missingRecord/MissingRecordRepoTransBlock';
import { RecordUpdateStage } from '../ddl/RecordUpdateStage';
import { RepoTransBlockResponseStage } from '../ddl/repositoryTransactionBlock/RepoTransBlockResponseStage';
import { RepoTransBlockSchemaToChange } from '../ddl/repositoryTransactionBlock/RepoTransBlockSchemaToChange';
import { RepositoryTransactionBlock } from '../ddl/repositoryTransactionBlock/RepositoryTransactionBlock';
import { RepositoryTransactionHistoryUpdateStage } from '../ddl/repositoryTransactionBlock/RepositoryTransactionHistoryUpdateStage';
import { SharingMessage } from '../ddl/sharingMessage/SharingMessage';
import { SharingMessageRepoTransBlock } from '../ddl/sharingMessage/SharingMessageRepoTransBlock';
import { SharingNode } from '../ddl/sharingNode/SharingNode';
import { SharingNodeRepoTransBlock } from '../ddl/sharingNode/SharingNodeRepoTransBlock';
import { SharingNodeRepoTransBlockStage } from '../ddl/sharingNode/SharingNodeRepoTransBlockStage';
import { SharingNodeRepository } from '../ddl/sharingNode/SharingNodeRepository';
import { SharingNodeTerminal } from '../ddl/sharingNode/SharingNodeTerminal';
import { SynchronizationConflict } from '../ddl/conflict/SynchronizationConflict';
import { SynchronizationConflictPendingNotification } from '../ddl/conflict/SynchronizationConflictPendingNotification';
import { SynchronizationConflictValues } from '../ddl/conflict/SynchronizationConflictValues';
const __constructors__ = {
    MissingRecord: MissingRecord,
    MissingRecordRepoTransBlock: MissingRecordRepoTransBlock,
    RecordUpdateStage: RecordUpdateStage,
    RepoTransBlockResponseStage: RepoTransBlockResponseStage,
    RepoTransBlockSchemaToChange: RepoTransBlockSchemaToChange,
    RepositoryTransactionBlock: RepositoryTransactionBlock,
    RepositoryTransactionHistoryUpdateStage: RepositoryTransactionHistoryUpdateStage,
    SharingMessage: SharingMessage,
    SharingMessageRepoTransBlock: SharingMessageRepoTransBlock,
    SharingNode: SharingNode,
    SharingNodeRepoTransBlock: SharingNodeRepoTransBlock,
    SharingNodeRepoTransBlockStage: SharingNodeRepoTransBlockStage,
    SharingNodeRepository: SharingNodeRepository,
    SharingNodeTerminal: SharingNodeTerminal,
    SynchronizationConflict: SynchronizationConflict,
    SynchronizationConflictPendingNotification: SynchronizationConflictPendingNotification,
    SynchronizationConflictValues: SynchronizationConflictValues
};
export const Q_SCHEMA = {
    __constructors__,
    domain: 'npmjs.org',
    name: '@airport/moving-walkway'
};
export const Q = Q_SCHEMA;
export function diSet(dbEntityId) {
    return dS(Q.__dbSchema__, dbEntityId);
}
export function duoDiSet(dbEntityId) {
    return ddS(Q.__dbSchema__, dbEntityId);
}
DI.db().get(AIR_DB).then((airDb) => {
    airDb.QM[getSchemaName(Q_SCHEMA)] = Q;
});
//# sourceMappingURL=qSchema.js.map