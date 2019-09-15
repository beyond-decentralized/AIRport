"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const air_control_1 = require("@airport/air-control");
const check_in_1 = require("@airport/check-in");
const di_1 = require("@airport/di");
const ground_control_1 = require("@airport/ground-control");
const MissingRecord_1 = require("../ddl/missingRecord/MissingRecord");
const MissingRecordRepoTransBlock_1 = require("../ddl/missingRecord/MissingRecordRepoTransBlock");
const RecordUpdateStage_1 = require("../ddl/RecordUpdateStage");
const RepoTransBlockResponseStage_1 = require("../ddl/repositoryTransactionBlock/RepoTransBlockResponseStage");
const RepoTransBlockSchemaToChange_1 = require("../ddl/repositoryTransactionBlock/RepoTransBlockSchemaToChange");
const RepositoryTransactionBlock_1 = require("../ddl/repositoryTransactionBlock/RepositoryTransactionBlock");
const RepositoryTransactionHistoryUpdateStage_1 = require("../ddl/repositoryTransactionBlock/RepositoryTransactionHistoryUpdateStage");
const SharingMessage_1 = require("../ddl/sharingMessage/SharingMessage");
const SharingMessageRepoTransBlock_1 = require("../ddl/sharingMessage/SharingMessageRepoTransBlock");
const SharingNode_1 = require("../ddl/sharingNode/SharingNode");
const SharingNodeRepoTransBlock_1 = require("../ddl/sharingNode/SharingNodeRepoTransBlock");
const SharingNodeRepoTransBlockStage_1 = require("../ddl/sharingNode/SharingNodeRepoTransBlockStage");
const SharingNodeRepository_1 = require("../ddl/sharingNode/SharingNodeRepository");
const SharingNodeTerminal_1 = require("../ddl/sharingNode/SharingNodeTerminal");
const SynchronizationConflict_1 = require("../ddl/conflict/SynchronizationConflict");
const SynchronizationConflictPendingNotification_1 = require("../ddl/conflict/SynchronizationConflictPendingNotification");
const SynchronizationConflictValues_1 = require("../ddl/conflict/SynchronizationConflictValues");
const __constructors__ = {
    MissingRecord: MissingRecord_1.MissingRecord,
    MissingRecordRepoTransBlock: MissingRecordRepoTransBlock_1.MissingRecordRepoTransBlock,
    RecordUpdateStage: RecordUpdateStage_1.RecordUpdateStage,
    RepoTransBlockResponseStage: RepoTransBlockResponseStage_1.RepoTransBlockResponseStage,
    RepoTransBlockSchemaToChange: RepoTransBlockSchemaToChange_1.RepoTransBlockSchemaToChange,
    RepositoryTransactionBlock: RepositoryTransactionBlock_1.RepositoryTransactionBlock,
    RepositoryTransactionHistoryUpdateStage: RepositoryTransactionHistoryUpdateStage_1.RepositoryTransactionHistoryUpdateStage,
    SharingMessage: SharingMessage_1.SharingMessage,
    SharingMessageRepoTransBlock: SharingMessageRepoTransBlock_1.SharingMessageRepoTransBlock,
    SharingNode: SharingNode_1.SharingNode,
    SharingNodeRepoTransBlock: SharingNodeRepoTransBlock_1.SharingNodeRepoTransBlock,
    SharingNodeRepoTransBlockStage: SharingNodeRepoTransBlockStage_1.SharingNodeRepoTransBlockStage,
    SharingNodeRepository: SharingNodeRepository_1.SharingNodeRepository,
    SharingNodeTerminal: SharingNodeTerminal_1.SharingNodeTerminal,
    SynchronizationConflict: SynchronizationConflict_1.SynchronizationConflict,
    SynchronizationConflictPendingNotification: SynchronizationConflictPendingNotification_1.SynchronizationConflictPendingNotification,
    SynchronizationConflictValues: SynchronizationConflictValues_1.SynchronizationConflictValues
};
exports.Q_SCHEMA = {
    __constructors__,
    domain: 'npmjs.org',
    name: '@airport/moving-walkway'
};
exports.Q = exports.Q_SCHEMA;
function diSet(dbEntityId) {
    return check_in_1.diSet(exports.Q.__dbSchema__, dbEntityId);
}
exports.diSet = diSet;
function duoDiSet(dbEntityId) {
    return check_in_1.duoDiSet(exports.Q.__dbSchema__, dbEntityId);
}
exports.duoDiSet = duoDiSet;
di_1.DI.get(air_control_1.AIR_DB).then((airDb) => {
    airDb.QM[ground_control_1.getSchemaName(exports.Q_SCHEMA)] = exports.Q;
});
//# sourceMappingURL=qSchema.js.map