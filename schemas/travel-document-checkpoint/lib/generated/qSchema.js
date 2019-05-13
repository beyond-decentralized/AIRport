"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
//# sourceMappingURL=qSchema.js.map