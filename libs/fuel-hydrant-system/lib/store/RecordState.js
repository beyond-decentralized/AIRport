/**
 * Created by Papa on 6/28/2016.
 */
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
    CurrentState["CREATED"] = "CREATED";
    CurrentState["DELETED"] = "DELETED";
    CurrentState["UPDATED"] = "UPDATED";
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
    toJSON() {
        // TODO: implement
        return null;
    }
    update() {
        this.currentState = CurrentState.UPDATED;
    }
}
//# sourceMappingURL=RecordState.js.map