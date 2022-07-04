import { FullApplication_Name } from "@airport/ground-control";
import { ApplicationInitializer } from "@airport/landing";
import { IApplicationInitializer } from "@airport/terminal-map";
export interface IIFrameApplicationInitializer extends IApplicationInitializer {
}
export declare class IFrameApplicationInitializer extends ApplicationInitializer {
    applicationWindowMap: Map<FullApplication_Name, Window>;
    nativeInitializeApplication(domain: string, application: string, fullApplication_Name: string): Promise<void>;
}
//# sourceMappingURL=IFrameApplicationInitializer.d.ts.map