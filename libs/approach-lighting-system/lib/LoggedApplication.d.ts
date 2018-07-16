import { SetLogLevel } from "@airport/runway-edge-lighting";
import { ApplicationName, IApplication, PackageName } from "@airport/territory";
import { ILogged, Logged } from "./Logged";
import { ILoggedPackage } from "./LoggedPackage";
export interface ILoggedApplication extends ILogged {
    application: IApplication;
    packageMap: Map<PackageName, ILoggedPackage>;
    addPackage(loggedPackage: ILoggedPackage): void;
}
export declare class LoggedApplication extends Logged implements ILoggedApplication {
    application: IApplication;
    packageMap: Map<PackageName, ILoggedPackage>;
    constructor(applicationName: ApplicationName, level?: SetLogLevel);
    level: SetLogLevel;
    addPackage(loggedPackage: ILoggedPackage): void;
}
