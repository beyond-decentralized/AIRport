import { Application_FullName } from "../application/IApplication"
import { DbColumn_Name } from "../application/DbProperty"

export interface IApplicationNameUtils {

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
        columnName: DbColumn_Name,
    ): string

}
