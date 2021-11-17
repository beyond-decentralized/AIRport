import { IApiOperation, IApiRegistry, ISchemaApi } from "@airport/check-in";
export declare class ApiRegistry implements IApiRegistry {
    schemaApi: ISchemaApi;
    initialize(schemaApi: ISchemaApi): void;
    findApiObjectAndOperation(systemName: string, schemaSignature: string, apiObjectName: string, methodName: string): Promise<{
        apiObject: any;
        apiOperation: IApiOperation;
    }>;
}
//# sourceMappingURL=ApiRegistry.d.ts.map