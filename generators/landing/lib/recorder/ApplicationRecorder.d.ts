import { IContext } from '@airport/di';
import { DdlObjects } from '@airport/terminal-map';
export interface IApplicationRecorder {
    record(ddlObjects: DdlObjects, context: IContext): Promise<void>;
}
export declare class ApplicationRecorder implements IApplicationRecorder {
    record(ddlObjects: DdlObjects, context: IContext): Promise<void>;
    private setDefaultVersioning;
    private bulkCreate;
}
//# sourceMappingURL=ApplicationRecorder.d.ts.map