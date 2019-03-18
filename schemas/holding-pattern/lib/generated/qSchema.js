"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const abstractrepositoryentity_1 = require("../ddl/repository/abstractrepositoryentity");
const actor_1 = require("../ddl/infrastructure/actor");
const actorapplication_1 = require("../ddl/infrastructure/actorapplication");
const application_1 = require("../ddl/infrastructure/application");
const operationhistory_1 = require("../ddl/history/operationhistory");
const recordhistory_1 = require("../ddl/history/recordhistory");
const recordhistorynewvalue_1 = require("../ddl/history/recordhistorynewvalue");
const recordhistoryoldvalue_1 = require("../ddl/history/recordhistoryoldvalue");
const repotranshistorychangedrepositoryactor_1 = require("../ddl/history/repotranshistorychangedrepositoryactor");
const repository_1 = require("../ddl/repository/repository");
const repositoryactor_1 = require("../ddl/repository/repositoryactor");
const repositoryapplication_1 = require("../ddl/repository/repositoryapplication");
const repositoryschema_1 = require("../ddl/repository/repositoryschema");
const repositorytransactionhistory_1 = require("../ddl/history/repositorytransactionhistory");
const transactionhistory_1 = require("../ddl/history/transactionhistory");
const __constructors__ = {
    AbstractRepositoryEntity: abstractrepositoryentity_1.AbstractRepositoryEntity,
    Actor: actor_1.Actor,
    ActorApplication: actorapplication_1.ActorApplication,
    Application: application_1.Application,
    OperationHistory: operationhistory_1.OperationHistory,
    RecordHistory: recordhistory_1.RecordHistory,
    RecordHistoryNewValue: recordhistorynewvalue_1.RecordHistoryNewValue,
    RecordHistoryOldValue: recordhistoryoldvalue_1.RecordHistoryOldValue,
    RepoTransHistoryChangedRepositoryActor: repotranshistorychangedrepositoryactor_1.RepoTransHistoryChangedRepositoryActor,
    Repository: repository_1.Repository,
    RepositoryActor: repositoryactor_1.RepositoryActor,
    RepositoryApplication: repositoryapplication_1.RepositoryApplication,
    RepositorySchema: repositoryschema_1.RepositorySchema,
    RepositoryTransactionHistory: repositorytransactionhistory_1.RepositoryTransactionHistory,
    TransactionHistory: transactionhistory_1.TransactionHistory
};
exports.Q_SCHEMA = {
    __constructors__
};
exports.Q = exports.Q_SCHEMA;
//# sourceMappingURL=qSchema.js.map