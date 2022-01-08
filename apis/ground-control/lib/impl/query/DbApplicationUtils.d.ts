import { FullApplicationName } from '../..';
import { ColumnName } from '../../lingo/application/Property';
export declare function getFullApplicationName({ domain, name, }: {
    domain: any;
    name: any;
}): string;
export declare function getFullApplicationNameFromDomainAndName(domainName: any, applicationName: any): string;
export declare function getApplicationAndDomainFromFullName(fullApplicationName: FullApplicationName): void;
export declare function getSequenceName(prefixedTableName: string, columnName: ColumnName): string;
//# sourceMappingURL=DbApplicationUtils.d.ts.map