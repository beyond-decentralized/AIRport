"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
    TransactionHistory: transactionhistory_1.TransactionHistory
};
exports.Q_SCHEMA = {
    __constructors__
};
exports.Q = exports.Q_SCHEMA;
//# sourceMappingURL=qSchema.js.map