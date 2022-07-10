import { ApplicationColumn_Name } from "../application/Property"

export interface IDbApplicationUtils {

    getFullApplication_Name({
        domain,
        name,
    }: {
        domain: string | {
            name: string
        },
        name: string
    }): string

    getFullApplication_NameFromDomainAndName(
        domainName: string,
        applicationName: string,
    ): string

    getSequenceName(
        prefixedTableName: string,
        columnName: ApplicationColumn_Name,
    ): string

}