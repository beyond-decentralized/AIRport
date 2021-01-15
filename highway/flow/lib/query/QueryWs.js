export function getQueryWsHandler(config) {
    return async (request, context) => {
        return await queryWsHandler(request, config, context);
    };
}
export async function queryWsHandler(request, config = {}, context) {
    return null;
}
//# sourceMappingURL=QueryWs.js.map