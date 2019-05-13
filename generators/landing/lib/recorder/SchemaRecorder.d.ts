import { DdlObjects } from '@airport/takeoff';
export interface ISchemaRecorder {
    record(ddlObjects: DdlObjects, normalOperation: boolean): Promise<void>;
}
export declare class SchemaRecorder implements ISchemaRecorder {
    private domainDao;
    private schemaColumnDao;
    private schemaDao;
    private schemaEntityDao;
    private schemaPropertyColumnDao;
    private schemaPropertyDao;
    private schemaReferenceDao;
    private schemaRelationColumnDao;
    private schemaRelationDao;
    private schemaVersionDao;
    constructor();
    record(ddlObjects: DdlObjects, normalOperation: boolean): Promise<void>;
    private normalRecord;
    private bootstrapRecord;
    private bulkCreate;
}
