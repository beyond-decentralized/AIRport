"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const air_control_1 = require("@airport/air-control");
const check_in_1 = require("@airport/check-in");
const di_1 = require("@airport/di");
const observe_1 = require("@airport/observe");
const diTokens_1 = require("../diTokens");
class TerminalStore {
    constructor() {
        this.state = new observe_1.BehaviorSubject({
            domains: [],
            nodesBySyncFrequency: new Map(),
            schemas: [],
            terminal: null,
        });
        this.getTerminalState = check_in_1.createRootSelector(this.state);
        this.getDomains = check_in_1.createSelector(this.getTerminalState, terminal => terminal.domains);
        // getNodesBySyncFrequency = createSelector(this.getTerminalState,
        // 	terminal => terminal.nodesBySyncFrequency)
        this.getLatestSchemaVersionMapByNames = check_in_1.createSelector(this.getDomains, domains => {
            const latestSchemaVersionMapByNames = new Map();
            for (const domain of domains) {
                const mapForDomain = this.utils.ensureChildJsMap(latestSchemaVersionMapByNames, domain.name);
                for (const schema of domain.schemas) {
                    mapForDomain.set(schema.name, schema.currentVersion);
                }
            }
            return latestSchemaVersionMapByNames;
        });
        this.getLatestSchemaVersionMapBySchemaName = check_in_1.createSelector(this.getLatestSchemaVersionMapByNames, (latestSchemaVersionMapByNames) => {
            const latestSchemaVersionMapBySchemaName = new Map();
            for (const schemaVersionsForDomainName of latestSchemaVersionMapByNames.values()) {
                for (const schemaVersion of schemaVersionsForDomainName.values()) {
                    latestSchemaVersionMapBySchemaName.set(schemaVersion.schema.name, schemaVersion);
                }
            }
            return latestSchemaVersionMapBySchemaName;
        });
        this.getLatestSchemaVersionsByIndexes = check_in_1.createSelector(this.getDomains, domains => {
            const latestSchemaVersionsByNames = [];
            for (const domain of domains) {
                for (const schema of domain.schemas) {
                    latestSchemaVersionsByNames[schema.index] = schema.currentVersion;
                }
            }
            return latestSchemaVersionsByNames;
        });
        this.getSchemas = check_in_1.createSelector(this.getTerminalState, terminal => terminal.schemas);
        di_1.DI.get(utils => {
            this.utils = utils;
        }, air_control_1.UTILS);
    }
    tearDown() {
    }
}
exports.TerminalStore = TerminalStore;
di_1.DI.set(diTokens_1.TERMINAL_STORE, TerminalStore);
//# sourceMappingURL=TerminalStore.js.map