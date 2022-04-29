import type { AllDdlObjects, IDdlObjectLinker, ITerminalStore } from '@airport/terminal-map';
export declare class DdlObjectLinker implements IDdlObjectLinker {
    terminalStore: ITerminalStore;
    link(allDdlObjects: AllDdlObjects): void;
    private linkDomainsAndApplicationsAndVersions;
    private linkEntities;
    private linkPropertiesAndRelations;
    private linkColumns;
}
//# sourceMappingURL=DdlObjectLinker.d.ts.map