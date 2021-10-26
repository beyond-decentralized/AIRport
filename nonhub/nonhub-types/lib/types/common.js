export var ServerState;
(function (ServerState) {
    ServerState["RUNNING"] = "RUNNING";
    ServerState["SHUTTING_DOWN_REQUESTS"] = "SHUTTING_DOWN_REQUESTS";
    ServerState["SHUTTING_DOWN_SERVER"] = "SHUTTING_DOWN_SERVER";
})(ServerState || (ServerState = {}));
export var ServerError;
(function (ServerError) {
    ServerError["DATABASE"] = "DATABASE";
    ServerError["INVALID"] = "INVALID";
    ServerError["SHUTDOWN"] = "SHUTDOWN";
})(ServerError || (ServerError = {}));
//# sourceMappingURL=common.js.map