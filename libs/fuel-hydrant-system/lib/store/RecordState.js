export class RecordStateData {
    constructor() {
        this.accessed = {};
        this.current = {};
        this.initialized = {};
        this.original = {};
    }
}
export var CurrentState;
(function (CurrentState) {
    CurrentState[CurrentState["CREATED"] = 0] = "CREATED";
    CurrentState[CurrentState["DELETED"] = 1] = "DELETED";
    CurrentState[CurrentState["UPDATED"] = 2] = "UPDATED";
})(CurrentState || (CurrentState = {}));
export class RecordState {
    constructor() {
        this.data = new RecordStateData();
        this.initialized = false;
        this.isDirty = false;
        this.proxied = false;
    }
    create() {
        this.currentState = CurrentState.CREATED;
    }
    delete() {
        this.currentState = CurrentState.DELETED;
    }
    getChangeRecord() {
        return null;
    }
    toJSON() {
        // TODO: implement
        return null;
    }
    update() {
        this.currentState = CurrentState.UPDATED;
    }
}
//# sourceMappingURL=RecordState.js.map