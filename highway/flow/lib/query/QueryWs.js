export var QueryType;
(function (QueryType) {
    QueryType[QueryType["PREPARED"] = 0] = "PREPARED";
    QueryType[QueryType["DYNAMIC"] = 1] = "DYNAMIC";
})(QueryType || (QueryType = {}));
export function getQueryWsHandler(config) {
    return async (request, context) => {
        return await queryWsHandler(request, config, context);
    };
}
export async function queryWsHandler(request, config = {}, context) {
    switch (request.type) {
        case QueryType.DYNAMIC:
            return {
                error: `Dynamic queries are not (yet) supported by Highway.`
            };
        case QueryType.PREPARED:
            // TODO: implement
            return null;
        default:
            return {
                error: `Unknown Query type: ${request.type}`
            };
    }
}
//# sourceMappingURL=QueryWs.js.map