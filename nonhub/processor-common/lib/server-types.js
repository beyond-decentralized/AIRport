"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServerError = exports.ServerState = void 0;
var ServerState;
(function (ServerState) {
    ServerState["RUNNING"] = "RUNNING";
    ServerState["SHUTTING_DOWN_REQUESTS"] = "SHUTTING_DOWN_REQUESTS";
    ServerState["SHUTTING_DOWN_SERVER"] = "SHUTTING_DOWN_SERVER";
})(ServerState = exports.ServerState || (exports.ServerState = {}));
var ServerError;
(function (ServerError) {
    ServerError["DATABASE"] = "DATABASE";
    ServerError["INVALID"] = "INVALID";
    ServerError["SHUTDOWN"] = "SHUTDOWN";
})(ServerError = exports.ServerError || (exports.ServerError = {}));
//# sourceMappingURL=server-types.js.map