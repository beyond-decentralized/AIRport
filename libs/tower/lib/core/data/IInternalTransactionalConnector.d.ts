import { ITransactionalConnector } from "@airport/ground-control";
import { DistributionStrategy, PlatformType } from "@airport/terminal-map";
export interface IInternalTransactionalConnector extends ITransactionalConnector {
    addRepository(name: string, url: string, platform: PlatformType, platformConfig: string, distributionStrategy: DistributionStrategy): Promise<number>;
}
