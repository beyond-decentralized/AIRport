import { Inject } from "@airport/direction-indicator";
import { Dictionary } from "../../definition/core/entity/Dictionary";
import { IAppTrackerUtils } from "../../definition/utils/IAppTrackerUtils";

export interface ExternalPermissionsForDomain {
    domainName: 'airbride' | 'airport' | 'airway',
    applicationPermissions: Array<{
        applicationName: string,
        versionPermissions: Array<{
            // undefined is ALL versions, must be defined once in the object tree for compiler pick it up
            integerVersion?: number,
            // undefined is since integer version 1
            sinceIntegerVersion?: number,
            // undefined is before any integer version
            beforeIntegerVersion?: number,
            entities: Array<{
                name: string,
                columnNames?: string[],
                propertyNames?: string[]
            }>
        }>
    }>
}

export class AppTrackerUtils
    implements IAppTrackerUtils {

    @Inject()
    dictionary: Dictionary

    // Switching to white list - too many serialization rules to write
    // Every allowed entity must be properly serialized when transaction logs
    // are synchronized
    /*     NO_EXTERNAL_PERMISSIONS_ENTITIES: NoExternalPermissionsForDomain[] = [{
            domainName: 'airbride',
            applicationPermissions: [{
                applicationName: '@airbridge/keyring',
                versionPermissions: [{
                    entityNames: [
                        'KeyRing',
                        'RepositoryKey'
                    ]
                }]
            }]
        }] */

    private _EXTERNAL_ACCESS_ENTITIES: ExternalPermissionsForDomain[]

    private get EXTERNAL_ACCESS_ENTITIES(): ExternalPermissionsForDomain[] {
        if (this._EXTERNAL_ACCESS_ENTITIES) {
            return this._EXTERNAL_ACCESS_ENTITIES
        }

        const apps = this.dictionary.airport.apps
        const Actor = this.dictionary.Actor
        const Repository = this.dictionary.Repository
        const UserAccount = this.dictionary.UserAccount

        // Serialization check rules must be added for every new entity in this list
        this._EXTERNAL_ACCESS_ENTITIES = [{
            domainName: this.dictionary.airport.DOMAIN_NAME,
            applicationPermissions: [{
                applicationName: apps.TRAVEL_DOCUMENT_CHECKPOINT.name,
                versionPermissions: [{
                    entities: [{
                        name: UserAccount.name,
                        columnNames: [
                            UserAccount.columns.USER_ACCOUNT_LID
                        ]
                    }]
                }]
            },
            {
                applicationName: apps.HOLDING_PATTERN.name,
                versionPermissions: [{
                    entities: [{
                        name: Actor.name,
                        columnNames: [
                            Actor.columns.ACTOR_LID
                        ]
                    },
                    {
                        name: Repository.name,
                        columnNames: [
                            Repository.columns.REPOSITORY_LID
                        ]
                    }]
                }]
            }]
        }]

        return this._EXTERNAL_ACCESS_ENTITIES
    }

    getInternalApp(): string {
        return this.dictionary.INTERNAL_APP
    }

    getInternalDomain(): string {
        return this.dictionary.INTERNAL_DOMAIN
    }

    isInternalDomain(
        domainName: string
    ): boolean {
        return [
            this.dictionary.airbridge.DOMAIN_NAME,
            this.dictionary.airport.DOMAIN_NAME,
            this.dictionary.airway.DOMAIN_NAME,
            this.dictionary.INTERNAL_DOMAIN
        ].indexOf(domainName) > -1
    }

    entityHasExternalAccessPermissions(
        checkedDomainName: string,
        checkedApplicationName: string,
        checkedApplicationIntegerVersion: number,
        checkedEntityName: string,
        checkedColumnName?: string
    ): boolean {
        for (const domainPermissions of this.EXTERNAL_ACCESS_ENTITIES) {
            if (domainPermissions.domainName !== checkedDomainName) {
                continue
            }
            for (const applicationPermissions of domainPermissions.applicationPermissions) {
                if (applicationPermissions.applicationName !== checkedApplicationName) {
                    continue
                }
                for (const versionPermissions of applicationPermissions.versionPermissions) {
                    if ((!versionPermissions.integerVersion
                        && !versionPermissions.sinceIntegerVersion
                        && !versionPermissions.beforeIntegerVersion)
                        || (versionPermissions.integerVersion
                            && versionPermissions.integerVersion === checkedApplicationIntegerVersion)
                        || (versionPermissions.sinceIntegerVersion
                            && versionPermissions.sinceIntegerVersion <= checkedApplicationIntegerVersion)
                        || (versionPermissions.beforeIntegerVersion
                            && versionPermissions.beforeIntegerVersion > checkedApplicationIntegerVersion)
                    ) {
                        for (const entity of versionPermissions.entities) {
                            if (entity.name !== checkedEntityName) {
                                continue
                            }
                            if (!checkedColumnName) {
                                return true
                            }
                            return entity.columnNames.includes(checkedColumnName)
                        }
                    }
                }
            }
        }

        return false
    }

    /*
        isNoExternalPermissionsEntity(
            domainName: string,
            applicationName: string,
            integerVersion: number,
            entityName: string
        ): boolean {
            for (const domainPermissions of this.NO_EXTERNAL_PERMISSIONS_ENTITIES) {
                if (domainPermissions.domainName !== domainName) {
                    continue
                }
                for (const applicationPermissions of domainPermissions.applicationPermissions) {
                    if (applicationPermissions.applicationName !== applicationName) {
                        continue
                    }
                    for (const versionPermissions of applicationPermissions.versionPermissions) {
                        if (versionPermissions.integerVersion === integerVersion
                            || (versionPermissions.sinceIntegerVersion
                                && versionPermissions.sinceIntegerVersion <= integerVersion)
                            || (versionPermissions.beforeIntegerVersion
                                && versionPermissions.beforeIntegerVersion > integerVersion)
                        ) {
                            return versionPermissions.entityNames.includes(entityName)
                        }
                    }
                }
            }
    
            return false
        }
    */
}
