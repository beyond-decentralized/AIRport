export class QueryWebService {
    async handle(request, config = {}, context) {
        try {
            this.queryValidator.validate(request);
        }
        catch (e) {
            return {
                error: e.message
            };
        }
    }
}
//# sourceMappingURL=QueryWs.js.map