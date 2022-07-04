import { IVespaApplicationStore } from './VespaApplicationStore';
export interface IVespaApplicationProcessor {
    process(store: IVespaApplicationStore): Promise<void>;
}
export declare class VespaApplicationProcessor implements IVespaApplicationProcessor {
    process(store: IVespaApplicationStore): Promise<void>;
}
//# sourceMappingURL=VespaSchemaProcessor.d.ts.map