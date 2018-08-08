"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const check_in_1 = require("@airport/check-in");
const qSchema_1 = require("./qSchema");
class BaseAgtDmo extends check_in_1.Dmo {
    constructor() {
        super(qSchema_1.Q.db.currentVersion.entityMapByName['Agt']);
    }
}
exports.BaseAgtDmo = BaseAgtDmo;
class BaseTerminalDmo extends check_in_1.Dmo {
    constructor() {
        super(qSchema_1.Q.db.currentVersion.entityMapByName['Terminal']);
    }
}
exports.BaseTerminalDmo = BaseTerminalDmo;
class BaseTerminalAgtDmo extends check_in_1.Dmo {
    constructor() {
        super(qSchema_1.Q.db.currentVersion.entityMapByName['TerminalAgt']);
    }
}
exports.BaseTerminalAgtDmo = BaseTerminalAgtDmo;
class BaseUserDmo extends check_in_1.Dmo {
    constructor() {
        super(qSchema_1.Q.db.currentVersion.entityMapByName['User']);
    }
}
exports.BaseUserDmo = BaseUserDmo;
class BaseUserTerminalDmo extends check_in_1.Dmo {
    constructor() {
        super(qSchema_1.Q.db.currentVersion.entityMapByName['UserTerminal']);
    }
}
exports.BaseUserTerminalDmo = BaseUserTerminalDmo;
class BaseUserTerminalAgtDmo extends check_in_1.Dmo {
    constructor() {
        super(qSchema_1.Q.db.currentVersion.entityMapByName['UserTerminalAgt']);
    }
}
exports.BaseUserTerminalAgtDmo = BaseUserTerminalAgtDmo;
//# sourceMappingURL=baseDmos.js.map