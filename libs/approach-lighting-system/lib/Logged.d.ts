import { SetLogLevel } from "@airport/runway-edge-lighting";
export interface ILogged {
    level: SetLogLevel;
}
export declare abstract class Logged implements ILogged {
    protected _level: SetLogLevel;
    constructor(level?: SetLogLevel);
    get level(): SetLogLevel;
    set level(newLevel: SetLogLevel);
}
//# sourceMappingURL=Logged.d.ts.map