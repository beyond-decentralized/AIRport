import { DI } from "@airport/di";
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
}
DI.set(API_REGISTRY, ApiRegistry)
