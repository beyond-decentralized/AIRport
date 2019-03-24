import { SetLogLevel } from '@airport/runway-edge-lighting';
import { IApplicationPackage, PackagedUnitName } from '@airport/territory';
import { ILogged, Logged } from './Logged';
import { ILogger } from './Logger';
export interface ILoggedPackage extends ILogged {
    loggerMap: Map<PackagedUnitName, ILogger>;
    applicationPackage: IApplicationPackage;
    addLogger(logger: ILogger): void;
    add(packagedUnitName: PackagedUnitName): ILogger;
}
export declare class LoggedPackage extends Logged implements ILoggedPackage {
    loggerMap: Map<PackagedUnitName, ILogger>;
    private package;
    constructor(packageName: string, level?: SetLogLevel);
    _applicationPackage: IApplicationPackage;
    applicationPackage: IApplicationPackage;
    level: SetLogLevel;
    addLogger(logger: ILogger): void;
    add(packagedUnitName: PackagedUnitName): ILogger;
}
