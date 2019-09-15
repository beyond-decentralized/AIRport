"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const air_control_1 = require("@airport/air-control");
const check_in_1 = require("@airport/check-in");
const di_1 = require("@airport/di");
const ground_control_1 = require("@airport/ground-control");
const Agt_1 = require("../ddl/Agt");
const Terminal_1 = require("../ddl/Terminal");
const TerminalAgt_1 = require("../ddl/TerminalAgt");
const User_1 = require("../ddl/User");
const UserTerminal_1 = require("../ddl/UserTerminal");
const UserTerminalAgt_1 = require("../ddl/UserTerminalAgt");
const __constructors__ = {
    Agt: Agt_1.Agt,
    Terminal: Terminal_1.Terminal,
    TerminalAgt: TerminalAgt_1.TerminalAgt,
    User: User_1.User,
    UserTerminal: UserTerminal_1.UserTerminal,
    UserTerminalAgt: UserTerminalAgt_1.UserTerminalAgt
};
exports.Q_SCHEMA = {
    __constructors__,
    domain: 'npmjs.org',
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