import { IContext } from '@airport/di';
import { DdlObjects } from '@airport/takeoff';
export interface ISchemaRecorder {
    record(ddlObjects: DdlObjects, context: IContext): Promise<void>;
}
export declare class SchemaRecorder implements ISchemaRecorder {
    record(ddlObjects: DdlObjects, context: IContext): Promise<void>;
    private setDefaultVersioning;
    private bulkCreate;
}
//# sourceMappingURL=SchemaRecorder.d.ts.map