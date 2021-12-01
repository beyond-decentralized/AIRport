import type { ITerminalStore } from '@airport/terminal-map';
import { AllDdlObjects } from './QueryObjectInitializer';
export interface IDdlObjectLinker {
    link(ddlObjects: AllDdlObjects, terminalStore: ITerminalStore): void;
}
export declare class DdlObjectLinker implements IDdlObjectLinker {
    link(allDdlObjects: AllDdlObjects, terminalStore: ITerminalStore): void;
    private linkDomainsAndApplicationsAndVersions;
    private linkEntities;
    private linkPropertiesAndRelations;
    private linkColumns;
}
//# sourceMappingURL=DdlObjectLinker.d.ts.map