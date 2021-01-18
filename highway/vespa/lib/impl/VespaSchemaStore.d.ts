import { IVespaDocument } from '../lingo/model/VespaDocument';
export interface IVespaSchemaStore {
    documentMap: {
        [documentName: string]: IVespaDocument;
    };
}
export declare class VespaSchemaStore {
    documentMap: {
        [documentName: string]: IVespaDocument;
    };
}
//# sourceMappingURL=VespaSchemaStore.d.ts.map