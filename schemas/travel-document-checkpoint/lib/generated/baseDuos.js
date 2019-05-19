"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const check_in_1 = require("@airport/check-in");
const qSchema_1 = require("./qSchema");
// Schema Q object Dependency Injection readiness detection DAO
class SQDIDuo extends check_in_1.Duo {
    constructor(dbEntityName) {
        super(dbEntityName, qSchema_1.Q);
    }
    static diSet() {
        return qSchema_1.Q.__dbSchema__;
    }
}
exports.SQDIDuo = SQDIDuo;
class BaseAgtDuo extends SQDIDuo {
    constructor() {
        super('Agt');
    }
}
exports.BaseAgtDuo = BaseAgtDuo;
class BaseTerminalDuo extends SQDIDuo {
    constructor() {
        super('Terminal');
    }
}
exports.BaseTerminalDuo = BaseTerminalDuo;
class BaseTerminalAgtDuo extends SQDIDuo {
    constructor() {
        super('TerminalAgt');
    }
}
exports.BaseTerminalAgtDuo = BaseTerminalAgtDuo;
class BaseUserDuo extends SQDIDuo {
    constructor() {
        super('User');
    }
}
exports.BaseUserDuo = BaseUserDuo;
class BaseUserTerminalDuo extends SQDIDuo {
    constructor() {
        super('UserTerminal');
    }
}
exports.BaseUserTerminalDuo = BaseUserTerminalDuo;
class BaseUserTerminalAgtDuo extends SQDIDuo {
    constructor() {
        super('UserTerminalAgt');
    }
}
exports.BaseUserTerminalAgtDuo = BaseUserTerminalAgtDuo;
//# sourceMappingURL=baseDuos.js.map