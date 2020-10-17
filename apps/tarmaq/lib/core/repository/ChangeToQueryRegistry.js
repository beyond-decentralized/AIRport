/**
 * Created by Papa on 9/10/2016.
 */
export class Query {
}
export class ChangeToQueryRegistry {
    constructor() {
        this.activeQueries = [];
    }
    addQuery(subject, fieldMap) {
        this.activeQueries.push({
            subject: subject,
            fieldMap: fieldMap
        });
    }
    removeQuery(subject) {
        for (let i = 0; i < this.activeQueries.length; i++) {
            let query = this.activeQueries[i];
            if (query.subject === subject) {
                this.activeQueries.splice(i, 1);
                break;
            }
        }
    }
    findAffectedQueries(changeRecords) {
        let affectedQueries = [];
        // TODO: work here next
        return affectedQueries;
    }
}
//# sourceMappingURL=ChangeToQueryRegistry.js.map