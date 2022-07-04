import { FullApplication_Name } from "@airport/ground-control";
import { ApplicationInitializer } from "@airport/landing";
import { IApplicationInitializer, ITerminalStore } from "@airport/terminal-map";
export interface IWebApplicationInitializer extends IApplicationInitializer {
    applicationWindowMap: Map<FullApplication_Name, Window>;
    initializingApplicationMap: Map<FullApplication_Name, boolean>;
}
export declare class WebApplicationInitializer extends ApplicationInitializer {
    terminalStore: ITerminalStore;
    nativeInitializeApplication(domain: string, application: string, fullApplication_Name: string): Promise<void>;
}
//# sourceMappingURL=WebApplicationInitializer.d.ts.map