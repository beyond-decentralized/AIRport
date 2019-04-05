"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const check_in_1 = require("@airport/check-in");
const qSchema_1 = require("./qSchema");
// Schema Q object Dependency Injection readiness detection DAO
class SQDIDmo extends check_in_1.Dmo {
    constructor(dbEntityName) {
        super(dbEntityName, qSchema_1.Q);
    }
    static diSet() {
        return qSchema_1.Q.db;
    }
}
exports.SQDIDmo = SQDIDmo;
class BaseAgtDmo extends SQDIDmo {
    constructor() {
        super('Agt');
    }
}
exports.BaseAgtDmo = BaseAgtDmo;
class BaseTerminalDmo extends SQDIDmo {
    constructor() {
        super('Terminal');
    }
}
exports.BaseTerminalDmo = BaseTerminalDmo;
class BaseTerminalAgtDmo extends SQDIDmo {
    constructor() {
        super('TerminalAgt');
    }
}
exports.BaseTerminalAgtDmo = BaseTerminalAgtDmo;
class BaseUserDmo extends SQDIDmo {
    constructor() {
        super('User');
    }
}
exports.BaseUserDmo = BaseUserDmo;
class BaseUserTerminalDmo extends SQDIDmo {
    constructor() {
        super('UserTerminal');
    }
}
exports.BaseUserTerminalDmo = BaseUserTerminalDmo;
class BaseUserTerminalAgtDmo extends SQDIDmo {
    constructor() {
        super('UserTerminalAgt');
    }
}
exports.BaseUserTerminalAgtDmo = BaseUserTerminalAgtDmo;
//# sourceMappingURL=baseDmos.js.map