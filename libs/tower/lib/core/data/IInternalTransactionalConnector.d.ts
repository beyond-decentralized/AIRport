import { ITransactionalConnector } from '@airport/ground-control';
import { DistributionStrategy, PlatformType } from '@airport/terminal-map';
export interface ITransactionalServer extends ITransactionalConnector {
    init(): any;
    addRepository(name: string, url: string, platform: PlatformType, platformConfig: string, distributionStrategy: DistributionStrategy): Promise<number>;
    transact(domainAndPort: string): Promise<void>;
    rollback(domainAndPort: string): Promise<void>;
    commit(domainAndPort: string): Promise<void>;
}
