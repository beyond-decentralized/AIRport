import { FullApplicationName } from "@airport/ground-control";
import { ApplicationInitializer } from "@airport/landing";
import { IApplicationInitializer, ITerminalStore } from "@airport/terminal-map";
export interface IWebApplicationInitializer extends IApplicationInitializer {
    applicationWindowMap: Map<FullApplicationName, Window>;
    initializingApplicationMap: Map<FullApplicationName, boolean>;
}
export declare class WebApplicationInitializer extends ApplicationInitializer {
    terminalStore: ITerminalStore;
    applicationWindowMap: Map<FullApplicationName, Window>;
    initializingApplicationMap: Map<FullApplicationName, boolean>;
    nativeInitializeApplication(domain: string, application: string, fullApplicationName: string): Promise<void>;
}
//# sourceMappingURL=WebApplicationInitializer.d.ts.map