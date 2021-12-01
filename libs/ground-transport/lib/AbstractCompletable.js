export class AbstractCompletable {
    constructor() {
        this.subsriptions = [];
    }
    async tearDown( //
    ) {
        this.subsriptions.forEach(subscription => subscription.unsubscribe());
    }
    record(subscription) {
        this.subsriptions.push(subscription);
    }
}
//# sourceMappingURL=AbstractCompletable.js.map