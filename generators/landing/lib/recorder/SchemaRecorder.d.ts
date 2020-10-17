import { DdlObjects } from '@airport/takeoff';
export interface ISchemaRecorder {
    record(ddlObjects: DdlObjects, normalOperation: boolean): Promise<void>;
}
export declare class SchemaRecorder implements ISchemaRecorder {
    record(ddlObjects: DdlObjects, normalOperation: boolean): Promise<void>;
    private normalRecord;
    private setDefaultVersioning;
    private bootstrapRecord;
    private bulkCreate;
}
//# sourceMappingURL=SchemaRecorder.d.ts.map