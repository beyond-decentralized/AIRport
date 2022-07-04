import { IVespaApplicationStore } from './VespaApplicationStore';
export interface IVespaApplicationGenerator {
    generate(store: IVespaApplicationStore): Promise<void>;
}
export declare class VespaApplicationGenerator implements IVespaApplicationGenerator {
    generate(store: IVespaApplicationStore): Promise<void>;
    private generateDeploymentXml;
    private generateHostsXml;
    private generateServicesXml;
    private generateSearchDefinition;
    private getFieldType;
}
//# sourceMappingURL=VespaSchemaGenerator.d.ts.map