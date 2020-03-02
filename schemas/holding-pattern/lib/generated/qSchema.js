"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const air_control_1 = require("@airport/air-control");
const check_in_1 = require("@airport/check-in");
const di_1 = require("@airport/di");
const ground_control_1 = require("@airport/ground-control");
const Actor_1 = require("../ddl/infrastructure/Actor");
const ActorApplication_1 = require("../ddl/infrastructure/ActorApplication");
const Application_1 = require("../ddl/infrastructure/Application");
const ChildRepoRow_1 = require("../ddl/traditional/ChildRepoRow");
const ChildRow_1 = require("../ddl/traditional/ChildRow");
const ImmutableRepoRow_1 = require("../ddl/traditional/ImmutableRepoRow");
const ImmutableRow_1 = require("../ddl/traditional/ImmutableRow");
const MutableRepoRow_1 = require("../ddl/traditional/MutableRepoRow");
const MutableRow_1 = require("../ddl/traditional/MutableRow");
const OperationHistory_1 = require("../ddl/history/OperationHistory");
const RecordHistory_1 = require("../ddl/history/RecordHistory");
const RecordHistoryNewValue_1 = require("../ddl/history/RecordHistoryNewValue");
const RecordHistoryOldValue_1 = require("../ddl/history/RecordHistoryOldValue");
const ReferenceRow_1 = require("../ddl/traditional/ReferenceRow");
const RepoTransHistoryChangedRepositoryActor_1 = require("../ddl/history/RepoTransHistoryChangedRepositoryActor");
const Repository_1 = require("../ddl/repository/Repository");
const RepositoryActor_1 = require("../ddl/repository/RepositoryActor");
const RepositoryApplication_1 = require("../ddl/repository/RepositoryApplication");
const RepositoryEntity_1 = require("../ddl/repository/RepositoryEntity");
const RepositorySchema_1 = require("../ddl/repository/RepositorySchema");
const RepositoryTransactionHistory_1 = require("../ddl/history/RepositoryTransactionHistory");
const Stageable_1 = require("../ddl/infrastructure/Stageable");
const TransactionHistory_1 = require("../ddl/history/TransactionHistory");
const __constructors__ = {
    Actor: Actor_1.Actor,
    ActorApplication: ActorApplication_1.ActorApplication,
    Application: Application_1.Application,
    ChildRepoRow: ChildRepoRow_1.ChildRepoRow,
    ChildRow: ChildRow_1.ChildRow,
    ImmutableRepoRow: ImmutableRepoRow_1.ImmutableRepoRow,
    ImmutableRow: ImmutableRow_1.ImmutableRow,
    MutableRepoRow: MutableRepoRow_1.MutableRepoRow,
    MutableRow: MutableRow_1.MutableRow,
    OperationHistory: OperationHistory_1.OperationHistory,
    RecordHistory: RecordHistory_1.RecordHistory,
    RecordHistoryNewValue: RecordHistoryNewValue_1.RecordHistoryNewValue,
    RecordHistoryOldValue: RecordHistoryOldValue_1.RecordHistoryOldValue,
    ReferenceRow: ReferenceRow_1.ReferenceRow,
    RepoTransHistoryChangedRepositoryActor: RepoTransHistoryChangedRepositoryActor_1.RepoTransHistoryChangedRepositoryActor,
    Repository: Repository_1.Repository,
    RepositoryActor: RepositoryActor_1.RepositoryActor,
    RepositoryApplication: RepositoryApplication_1.RepositoryApplication,
    RepositoryEntity: RepositoryEntity_1.RepositoryEntity,
    RepositorySchema: RepositorySchema_1.RepositorySchema,
    RepositoryTransactionHistory: RepositoryTransactionHistory_1.RepositoryTransactionHistory,
    Stageable: Stageable_1.Stageable,
    TransactionHistory: TransactionHistory_1.TransactionHistory
};
exports.Q_SCHEMA = {
    __constructors__,
    domain: 'npmjs.org',
    name: '@airport/holding-pattern'
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
di_1.DI.db().get(air_control_1.AIR_DB).then((airDb) => {
    airDb.QM[ground_control_1.getSchemaName(exports.Q_SCHEMA)] = exports.Q;
});
//# sourceMappingURL=qSchema.js.map