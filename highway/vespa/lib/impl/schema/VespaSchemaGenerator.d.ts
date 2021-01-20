import { IVespaSchemaStore } from './VespaSchemaStore';
export interface IVespaSchemaGenerator {
    generate(store: IVespaSchemaStore): Promise<void>;
}
export declare class VespaSchemaGenerator implements IVespaSchemaGenerator {
    generate(store: IVespaSchemaStore): Promise<void>;
    private generateDeploymentXml;
    private generateHostsXml;
    private generateServicesXml;
    private generateSearchDefinition;
    private getFieldType;
}
//# sourceMappingURL=VespaSchemaGenerator.d.ts.map