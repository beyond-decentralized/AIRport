import { Application_FullName } from "../application/Application"
import { ApplicationColumn_Name } from "../application/Property"

export interface IDbApplicationUtils {

    getApplication_FullName({
        domain,
        name
    }: {
        domain?: string | {
            name?: string
        },
        name?: string
    }): Application_FullName

    getApplication_FullNameFromDomainAndName(
        domainName: string,
        applicationName: string,
    ): Application_FullName

    getSequenceName(
        prefixedTableName: string,
        columnName: ApplicationColumn_Name,
    ): string

}