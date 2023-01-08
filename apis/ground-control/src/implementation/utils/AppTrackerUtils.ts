import { IAppTrackerUtils } from "../../definition/utils/IAppTrackerUtils";

export class AppTrackerUtils
    implements IAppTrackerUtils {

    INTERNAL_APP = '@airport/terminal'
    INTERNAL_DOMAIN = 'internal://domain'
    INTERNAL_APP_DOMAIN = 'airport'
    INTERNAL_BRIDGE_DOMAIN = 'airbridge'

    INTERNAL_DOMAINS = [
        this.INTERNAL_DOMAIN,
        this.INTERNAL_APP_DOMAIN,
        this.INTERNAL_BRIDGE_DOMAIN
    ]

    getInternalApp(): string {
        return this.INTERNAL_APP
    }

    getInternalDomain(): string {
        return this.INTERNAL_DOMAIN
    }

    async isInternalDomain(
        domainName: string
    ): Promise<boolean> {
        return this.INTERNAL_DOMAINS.indexOf(domainName) > -1
    }

}
