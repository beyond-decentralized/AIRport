import { ApplicationColumn_Name } from '../../definition/application/Property';
export declare class DbApplicationUtils {
    getFullApplication_Name({ domain, name, }: {
        domain: string | {
            name: string;
        };
        name: string;
    }): string;
    getFullApplication_NameFromDomainAndName(domainName: string, applicationName: string): string;
    getSequenceName(prefixedTableName: string, columnName: ApplicationColumn_Name): string;
}
//# sourceMappingURL=DbApplicationUtils.d.ts.map