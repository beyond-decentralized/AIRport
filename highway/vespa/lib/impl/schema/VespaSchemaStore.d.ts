import { IVespaDocument } from '../../lingo/model/VespaDocument';
export interface IVespaApplicationStore {
    documentMap: {
        [documentName: string]: IVespaDocument;
    };
}
export declare class VespaApplicationStore {
    documentMap: {
        [documentName: string]: IVespaDocument;
    };
}
//# sourceMappingURL=VespaSchemaStore.d.ts.map