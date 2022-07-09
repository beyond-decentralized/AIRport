var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Injected } from "@airport/direction-indicator";
import { databaseState as theDatabaseState } from "./databaseState";
let DatabaseStore = class DatabaseStore {
    constructor() {
        this.databaseState = theDatabaseState;
    }
    get applications() {
        return this.databaseState.applications;
    }
    get entityMap() {
        return this.databaseState.entityMap;
    }
    get functions() {
        return this.databaseState.functions;
    }
    get qApplications() {
        return this.databaseState.qApplications;
    }
    get QM() {
        return this.databaseState.QM;
    }
};
DatabaseStore = __decorate([
    Injected()
], DatabaseStore);
export { DatabaseStore };
//# sourceMappingURL=DatabaseStore.js.map