import { ColumnName } from '../../lingo/application/Property';
export declare class DbApplicationUtils {
    getFullApplicationName({ domain, name, }: {
        domain: string | {
            name: string;
        };
        name: string;
    }): string;
    getFullApplicationNameFromDomainAndName(domainName: string, applicationName: string): string;
    getSequenceName(prefixedTableName: string, columnName: ColumnName): string;
}
//# sourceMappingURL=DbApplicationUtils.d.ts.map