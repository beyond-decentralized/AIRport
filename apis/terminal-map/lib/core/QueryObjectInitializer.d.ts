import { AllDdlObjects } from "./DllObjects";
export interface IQueryObjectInitializer {
    initialize(): Promise<AllDdlObjects>;
    generateQObjectsAndPopulateStore(allDdlObjects: AllDdlObjects): void;
}
//# sourceMappingURL=QueryObjectInitializer.d.ts.map