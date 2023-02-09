export interface IAppTrackerUtils {

    getInternalApp(): string

    getInternalDomain(): string

    isInternalDomain(
        domainName: string
    ): boolean

    entityHasExternalAccessPermissions(
        checkedDomainName: string,
        checkedApplicationName: string,
        checkedApplicationIntegerVersion: number,
        checkedEntityName: string,
        checkedColumnName?: string
    ): boolean

    /*
    isNoExternalPermissionsEntity(
        domainName: string,
        applicationName: string,
        integerVersion: number,
        entityName: string
    ): boolean
*/

}
