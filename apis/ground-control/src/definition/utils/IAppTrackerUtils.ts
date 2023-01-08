export interface IAppTrackerUtils {

    getInternalApp(): string

    getInternalDomain(): string

    isInternalDomain(
        domainName: string
    ): Promise<boolean>

}
