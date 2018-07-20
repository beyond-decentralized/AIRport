"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AbstractRepositoryEntity_1 = require("../ddl/repository/AbstractRepositoryEntity");
const Actor_1 = require("../ddl/infrastructure/Actor");
const ActorApplication_1 = require("../ddl/infrastructure/ActorApplication");
const Application_1 = require("../ddl/infrastructure/Application");
const OperationHistory_1 = require("../ddl/history/OperationHistory");
const RecordHistory_1 = require("../ddl/history/RecordHistory");
const RecordHistoryNewValue_1 = require("../ddl/history/RecordHistoryNewValue");
const RecordHistoryOldValue_1 = require("../ddl/history/RecordHistoryOldValue");
const RepoTransHistoryChangedRepositoryActor_1 = require("../ddl/history/RepoTransHistoryChangedRepositoryActor");
const Repository_1 = require("../ddl/repository/Repository");
const RepositoryActor_1 = require("../ddl/repository/RepositoryActor");
const RepositoryApplication_1 = require("../ddl/repository/RepositoryApplication");
const RepositorySchema_1 = require("../ddl/repository/RepositorySchema");
const RepositoryTransactionHistory_1 = require("../ddl/history/RepositoryTransactionHistory");
const Terminal_1 = require("../ddl/infrastructure/Terminal");
const TransactionHistory_1 = require("../ddl/history/TransactionHistory");
const User_1 = require("../ddl/infrastructure/User");
const __constructors__ = {
    AbstractRepositoryEntity: AbstractRepositoryEntity_1.AbstractRepositoryEntity,
    Actor: Actor_1.Actor,
    ActorApplication: ActorApplication_1.ActorApplication,
    Application: Application_1.Application,
    OperationHistory: OperationHistory_1.OperationHistory,
    RecordHistory: RecordHistory_1.RecordHistory,
    RecordHistoryNewValue: RecordHistoryNewValue_1.RecordHistoryNewValue,
    RecordHistoryOldValue: RecordHistoryOldValue_1.RecordHistoryOldValue,
    RepoTransHistoryChangedRepositoryActor: RepoTransHistoryChangedRepositoryActor_1.RepoTransHistoryChangedRepositoryActor,
    Repository: Repository_1.Repository,
    RepositoryActor: RepositoryActor_1.RepositoryActor,
    RepositoryApplication: RepositoryApplication_1.RepositoryApplication,
    RepositorySchema: RepositorySchema_1.RepositorySchema,
    RepositoryTransactionHistory: RepositoryTransactionHistory_1.RepositoryTransactionHistory,
    Terminal: Terminal_1.Terminal,
    TransactionHistory: TransactionHistory_1.TransactionHistory,
    User: User_1.User
};
exports.Q_SCHEMA = {
    __constructors__
};
exports.Q = exports.Q_SCHEMA;
//# sourceMappingURL=qSchema.js.map