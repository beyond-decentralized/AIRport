import { DbApplication_FullName } from "../application/DbApplication"
import { DbColumn_Name } from "../application/DbProperty"

export interface IDbApplicationUtils {

    getDbApplication_FullName({
        domain,
        name
    }: {
        domain?: string | {
            name?: string
        },
        name?: string
    }): DbApplication_FullName

    getDbApplication_FullNameFromDomainAndName(
        domainName: string,
        applicationName: string,
    ): DbApplication_FullName

    getSequenceName(
        prefixedTableName: string,
        columnName: DbColumn_Name,
    ): string

}