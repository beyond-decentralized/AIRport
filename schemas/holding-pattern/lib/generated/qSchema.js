"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const air_control_1 = require("@airport/air-control");
const check_in_1 = require("@airport/check-in");
const di_1 = require("@airport/di");
const ground_control_1 = require("@airport/ground-control");
const actor_1 = require("../ddl/infrastructure/actor");
const actorapplication_1 = require("../ddl/infrastructure/actorapplication");
const application_1 = require("../ddl/infrastructure/application");
const childreporow_1 = require("../ddl/traditional/childreporow");
const childrow_1 = require("../ddl/traditional/childrow");
const immutablereporow_1 = require("../ddl/traditional/immutablereporow");
const immutablerow_1 = require("../ddl/traditional/immutablerow");
const mutablereporow_1 = require("../ddl/traditional/mutablereporow");
const mutablerow_1 = require("../ddl/traditional/mutablerow");
const operationhistory_1 = require("../ddl/history/operationhistory");
const recordhistory_1 = require("../ddl/history/recordhistory");
const recordhistorynewvalue_1 = require("../ddl/history/recordhistorynewvalue");
const recordhistoryoldvalue_1 = require("../ddl/history/recordhistoryoldvalue");
const referencerow_1 = require("../ddl/traditional/referencerow");
const repotranshistorychangedrepositoryactor_1 = require("../ddl/history/repotranshistorychangedrepositoryactor");
const repository_1 = require("../ddl/repository/repository");
const repositoryactor_1 = require("../ddl/repository/repositoryactor");
const repositoryapplication_1 = require("../ddl/repository/repositoryapplication");
const repositoryentity_1 = require("../ddl/repository/repositoryentity");
const repositoryschema_1 = require("../ddl/repository/repositoryschema");
const repositorytransactionhistory_1 = require("../ddl/history/repositorytransactionhistory");
const stageable_1 = require("../ddl/infrastructure/stageable");
const transactionhistory_1 = require("../ddl/history/transactionhistory");
const __constructors__ = {
    Actor: actor_1.Actor,
    ActorApplication: actorapplication_1.ActorApplication,
    Application: application_1.Application,
    ChildRepoRow: childreporow_1.ChildRepoRow,
    ChildRow: childrow_1.ChildRow,
    ImmutableRepoRow: immutablereporow_1.ImmutableRepoRow,
    ImmutableRow: immutablerow_1.ImmutableRow,
    MutableRepoRow: mutablereporow_1.MutableRepoRow,
    MutableRow: mutablerow_1.MutableRow,
    OperationHistory: operationhistory_1.OperationHistory,
    RecordHistory: recordhistory_1.RecordHistory,
    RecordHistoryNewValue: recordhistorynewvalue_1.RecordHistoryNewValue,
    RecordHistoryOldValue: recordhistoryoldvalue_1.RecordHistoryOldValue,
    ReferenceRow: referencerow_1.ReferenceRow,
    RepoTransHistoryChangedRepositoryActor: repotranshistorychangedrepositoryactor_1.RepoTransHistoryChangedRepositoryActor,
    Repository: repository_1.Repository,
    RepositoryActor: repositoryactor_1.RepositoryActor,
    RepositoryApplication: repositoryapplication_1.RepositoryApplication,
    RepositoryEntity: repositoryentity_1.RepositoryEntity,
    RepositorySchema: repositoryschema_1.RepositorySchema,
    RepositoryTransactionHistory: repositorytransactionhistory_1.RepositoryTransactionHistory,
    Stageable: stageable_1.Stageable,
    TransactionHistory: transactionhistory_1.TransactionHistory
};
exports.Q_SCHEMA = {
    __constructors__,
    domain: 'github.com',
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
di_1.DI.get(air_control_1.AIR_DB).then((airDb) => {
    airDb.QM[ground_control_1.getSchemaName(exports.Q_SCHEMA)] = exports.Q;
});
//# sourceMappingURL=qSchema.js.map