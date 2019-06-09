"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const check_in_1 = require("@airport/check-in");
const qSchema_1 = require("./qSchema");
// Schema Q object Dependency Injection readiness detection DAO
class SQDIDao extends check_in_1.Dao {
    constructor(dbEntityId) {
        super(dbEntityId, qSchema_1.Q);
    }
}
exports.SQDIDao = SQDIDao;
class BaseAgtDao extends SQDIDao {
    static diSet() {
        return qSchema_1.diSet(5);
    }
    constructor() {
        super(5);
    }
}
exports.BaseAgtDao = BaseAgtDao;
class BaseTerminalDao extends SQDIDao {
    static diSet() {
        return qSchema_1.diSet(3);
    }
    constructor() {
        super(3);
    }
}
exports.BaseTerminalDao = BaseTerminalDao;
class BaseTerminalAgtDao extends SQDIDao {
    static diSet() {
        return qSchema_1.diSet(4);
    }
    constructor() {
        super(4);
    }
}
exports.BaseTerminalAgtDao = BaseTerminalAgtDao;
class BaseUserDao extends SQDIDao {
    static diSet() {
        return qSchema_1.diSet(2);
    }
    constructor() {
        super(2);
    }
}
exports.BaseUserDao = BaseUserDao;
class BaseUserTerminalDao extends SQDIDao {
    static diSet() {
        return qSchema_1.diSet(0);
    }
    constructor() {
        super(0);
    }
}
exports.BaseUserTerminalDao = BaseUserTerminalDao;
class BaseUserTerminalAgtDao extends SQDIDao {
    static diSet() {
        return qSchema_1.diSet(1);
    }
    constructor() {
        super(1);
    }
}
exports.BaseUserTerminalAgtDao = BaseUserTerminalAgtDao;
//# sourceMappingURL=baseDaos.js.map