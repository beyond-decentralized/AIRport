import { IAirportDatabase } from '@airport/air-control';
import { AllDdlObjects, IQueryEntityClassCreator, IQueryObjectInitializer, ITerminalStore } from '@airport/terminal-map';
import { IDdlObjectLinker } from './DdlObjectLinker';
export declare class QueryObjectInitializer implements IQueryObjectInitializer {
    generateQObjectsAndPopulateStore(allDdlObjects: AllDdlObjects, airDb: IAirportDatabase, ddlObjectLinker: IDdlObjectLinker, queryEntityClassCreator: IQueryEntityClassCreator, terminalStore: ITerminalStore): void;
    initialize(airDb: IAirportDatabase): Promise<AllDdlObjects>;
}
//# sourceMappingURL=QueryObjectInitializer.d.ts.map