export function getReadWsHandler(config) {
    return async (request, context) => {
        return await schemaQueryWsHandler(request, config, context);
    };
}
export async function schemaQueryWsHandler(request, config = {}, context) {
    return null;
}
//# sourceMappingURL=QueryWs.js.map