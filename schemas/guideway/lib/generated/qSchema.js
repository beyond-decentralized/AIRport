"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const air_control_1 = require("@airport/air-control");
const di_1 = require("@airport/di");
const ground_control_1 = require("@airport/ground-control");
const agtrepositorytransactionblock_1 = require("../ddl/synchronization/agtrepositorytransactionblock");
const agtsharingmessage_1 = require("../ddl/synchronization/agtsharingmessage");
const archive_1 = require("../ddl/repository/archive");
const dailyarchivelog_1 = require("../ddl/archive/dailyarchivelog");
const dailyterminalsynclog_1 = require("../ddl/archive/dailyterminalsynclog");
const monthlyarchivelog_1 = require("../ddl/archive/monthlyarchivelog");
const monthlyterminalsynclog_1 = require("../ddl/archive/monthlyterminalsynclog");
const repository_1 = require("../ddl/repository/repository");
const repositoryarchive_1 = require("../ddl/repository/repositoryarchive");
const securityanswer_1 = require("../ddl/user/security/securityanswer");
const securityquestion_1 = require("../ddl/user/security/securityquestion");
const server_1 = require("../ddl/server/server");
const serversynclog_1 = require("../ddl/server/serversynclog");
const synclog_1 = require("../ddl/synchronization/synclog");
const terminal_1 = require("../ddl/terminal/terminal");
const terminalrepository_1 = require("../ddl/terminal/terminalrepository");
const tuningparameters_1 = require("../ddl/tuning/tuningparameters");
const user_1 = require("../ddl/user/user");
const userrepository_1 = require("../ddl/user/userrepository");
const __constructors__ = {
    AgtRepositoryTransactionBlock: agtrepositorytransactionblock_1.AgtRepositoryTransactionBlock,
    AgtSharingMessage: agtsharingmessage_1.AgtSharingMessage,
    Archive: archive_1.Archive,
    DailyArchiveLog: dailyarchivelog_1.DailyArchiveLog,
    DailyTerminalSyncLog: dailyterminalsynclog_1.DailyTerminalSyncLog,
    MonthlyArchiveLog: monthlyarchivelog_1.MonthlyArchiveLog,
    MonthlyTerminalSyncLog: monthlyterminalsynclog_1.MonthlyTerminalSyncLog,
    Repository: repository_1.Repository,
    RepositoryArchive: repositoryarchive_1.RepositoryArchive,
    SecurityAnswer: securityanswer_1.SecurityAnswer,
    SecurityQuestion: securityquestion_1.SecurityQuestion,
    Server: server_1.Server,
    ServerSyncLog: serversynclog_1.ServerSyncLog,
    SyncLog: synclog_1.SyncLog,
    Terminal: terminal_1.Terminal,
    TerminalRepository: terminalrepository_1.TerminalRepository,
    TuningParameters: tuningparameters_1.TuningParameters,
    User: user_1.User,
    UserRepository: userrepository_1.UserRepository
};
exports.Q_SCHEMA = {
    __constructors__,
    domain: 'github.com',
    name: '@airport/guideway'
};
exports.Q = exports.Q_SCHEMA;
di_1.DI.get((airportDatabase) => {
    airportDatabase.QM[ground_control_1.getSchemaName(exports.Q_SCHEMA)] = exports.Q;
}, air_control_1.AIR_DB);
//# sourceMappingURL=qSchema.js.map