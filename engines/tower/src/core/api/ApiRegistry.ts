import { container, DI } from "@airport/di";
import {
    API_REGISTRY,
    IApiOperation,
    IApiRegistry,
    InstalledApi
} from "@airport/security-check";

export class ApiRegistry
    implements IApiRegistry {

    installedApi: InstalledApi

    findOperation(
        apiObjectName: string,
        methodName: string
    ): IApiOperation {
        throw new Error('TODO: implement');
    }
    

    findApiObject(
        apiObjectName: string,
        methodName: string
    ): any {
        container(this).getSync(apiObjectName);
    }
}
DI.set(API_REGISTRY, ApiRegistry)
