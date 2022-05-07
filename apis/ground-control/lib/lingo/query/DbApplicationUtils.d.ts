import { ColumnName } from "../application/Property";
export interface IDbApplicationUtils {
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