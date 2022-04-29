import { AllDdlObjects, IDdlObjectLinker, IQueryEntityClassCreator, IQueryObjectInitializer, ITerminalStore } from '@airport/terminal-map';
import { IDdlObjectRetriever } from './DdlObjectRetriever';
export declare class QueryObjectInitializer implements IQueryObjectInitializer {
    ddlObjectLinker: IDdlObjectLinker;
    ddlObjectRetriever: IDdlObjectRetriever;
    queryEntityClassCreator: IQueryEntityClassCreator;
    terminalStore: ITerminalStore;
    generateQObjectsAndPopulateStore(allDdlObjects: AllDdlObjects): void;
    initialize(): Promise<AllDdlObjects>;
}
//# sourceMappingURL=QueryObjectInitializer.d.ts.map