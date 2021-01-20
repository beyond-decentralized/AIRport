import { IVespaSchemaStore } from './VespaSchemaStore';
export interface IVespaSchemaProcessor {
    process(store: IVespaSchemaStore): Promise<void>;
}
export declare class VespaSchemaProcessor implements IVespaSchemaProcessor {
    process(store: IVespaSchemaStore): Promise<void>;
}
//# sourceMappingURL=VespaSchemaProcessor.d.ts.map