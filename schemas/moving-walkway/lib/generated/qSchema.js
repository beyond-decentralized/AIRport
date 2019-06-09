"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const air_control_1 = require("@airport/air-control");
const check_in_1 = require("@airport/check-in");
const di_1 = require("@airport/di");
const ground_control_1 = require("@airport/ground-control");
const missingrecord_1 = require("../ddl/missingrecord/missingrecord");
const missingrecordrepotransblock_1 = require("../ddl/missingrecord/missingrecordrepotransblock");
const recordupdatestage_1 = require("../ddl/recordupdatestage");
const repotransblockresponsestage_1 = require("../ddl/repositorytransactionblock/repotransblockresponsestage");
const repotransblockschematochange_1 = require("../ddl/repositorytransactionblock/repotransblockschematochange");
const repositorytransactionblock_1 = require("../ddl/repositorytransactionblock/repositorytransactionblock");
const repositorytransactionhistoryupdatestage_1 = require("../ddl/repositorytransactionblock/repositorytransactionhistoryupdatestage");
const sharingmessage_1 = require("../ddl/sharingmessage/sharingmessage");
const sharingmessagerepotransblock_1 = require("../ddl/sharingmessage/sharingmessagerepotransblock");
const sharingnode_1 = require("../ddl/sharingnode/sharingnode");
const sharingnoderepotransblock_1 = require("../ddl/sharingnode/sharingnoderepotransblock");
const sharingnoderepotransblockstage_1 = require("../ddl/sharingnode/sharingnoderepotransblockstage");
const sharingnoderepository_1 = require("../ddl/sharingnode/sharingnoderepository");
const sharingnodeterminal_1 = require("../ddl/sharingnode/sharingnodeterminal");
const synchronizationconflict_1 = require("../ddl/conflict/synchronizationconflict");
const synchronizationconflictpendingnotification_1 = require("../ddl/conflict/synchronizationconflictpendingnotification");
const synchronizationconflictvalues_1 = require("../ddl/conflict/synchronizationconflictvalues");
const __constructors__ = {
    MissingRecord: missingrecord_1.MissingRecord,
    MissingRecordRepoTransBlock: missingrecordrepotransblock_1.MissingRecordRepoTransBlock,
    RecordUpdateStage: recordupdatestage_1.RecordUpdateStage,
    RepoTransBlockResponseStage: repotransblockresponsestage_1.RepoTransBlockResponseStage,
    RepoTransBlockSchemaToChange: repotransblockschematochange_1.RepoTransBlockSchemaToChange,
    RepositoryTransactionBlock: repositorytransactionblock_1.RepositoryTransactionBlock,
    RepositoryTransactionHistoryUpdateStage: repositorytransactionhistoryupdatestage_1.RepositoryTransactionHistoryUpdateStage,
    SharingMessage: sharingmessage_1.SharingMessage,
    SharingMessageRepoTransBlock: sharingmessagerepotransblock_1.SharingMessageRepoTransBlock,
    SharingNode: sharingnode_1.SharingNode,
    SharingNodeRepoTransBlock: sharingnoderepotransblock_1.SharingNodeRepoTransBlock,
    SharingNodeRepoTransBlockStage: sharingnoderepotransblockstage_1.SharingNodeRepoTransBlockStage,
    SharingNodeRepository: sharingnoderepository_1.SharingNodeRepository,
    SharingNodeTerminal: sharingnodeterminal_1.SharingNodeTerminal,
    SynchronizationConflict: synchronizationconflict_1.SynchronizationConflict,
    SynchronizationConflictPendingNotification: synchronizationconflictpendingnotification_1.SynchronizationConflictPendingNotification,
    SynchronizationConflictValues: synchronizationconflictvalues_1.SynchronizationConflictValues
};
exports.Q_SCHEMA = {
    __constructors__,
    domain: 'github.com',
    name: '@airport/moving-walkway'
};
exports.Q = exports.Q_SCHEMA;
function diSet(dbEntityId) {
    return check_in_1.diSet(exports.Q.__dbSchema__, dbEntityId);
}
exports.diSet = diSet;
di_1.DI.get((airportDatabase) => {
    airportDatabase.QM[ground_control_1.getSchemaName(exports.Q_SCHEMA)] = exports.Q;
}, air_control_1.AIR_DB);
//# sourceMappingURL=qSchema.js.map