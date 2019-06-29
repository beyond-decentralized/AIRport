"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const air_control_1 = require("@airport/air-control");
const check_in_1 = require("@airport/check-in");
const di_1 = require("@airport/di");
const ground_control_1 = require("@airport/ground-control");
const agt_1 = require("../ddl/agt");
const terminal_1 = require("../ddl/terminal");
const terminalagt_1 = require("../ddl/terminalagt");
const user_1 = require("../ddl/user");
const userterminal_1 = require("../ddl/userterminal");
const userterminalagt_1 = require("../ddl/userterminalagt");
const __constructors__ = {
    Agt: agt_1.Agt,
    Terminal: terminal_1.Terminal,
    TerminalAgt: terminalagt_1.TerminalAgt,
    User: user_1.User,
    UserTerminal: userterminal_1.UserTerminal,
    UserTerminalAgt: userterminalagt_1.UserTerminalAgt
};
exports.Q_SCHEMA = {
    __constructors__,
    domain: 'github.com',
    name: '@airport/travel-document-checkpoint'
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