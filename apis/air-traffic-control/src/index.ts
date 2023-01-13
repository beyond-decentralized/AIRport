
export * from './definition/utils/IQMetadataUtils'
export * from './definition/utils/IQApplicationBuilderUtils';
export * from './definition/utils/ISystemWideOperationIdUtils';
export * from './definition/utils/Utils'
export * from './definition/AirportDatabase'
export * from './definition/DatabaseState'
export * from './definition/RepositoryLoader'
export * from './implementation/utils/ApplicationUtils';
export * from './implementation/utils/EntityUtils';
export * from './implementation/utils/FieldUtils';
export * from './implementation/utils/QApplicationBuilderUtils';
export * from './implementation/utils/QMetadataUtils';
export * from './implementation/utils/QueryUtils';
export * from './implementation/databaseState';
export * from './implementation/DatabaseStore';
export * from './implementation/RelationManager';
export * from './implementation/utils/SystemWideOperationIdUtils';
export * from './implementation/Utils';
export * from './coreInjection';
export * from './injection';

import { QApp } from '@airport/aviation-communication'
import { IOC } from '@airport/direction-indicator';
import { AIRPORT_DATABASE } from './injection';

globalThis.airApi.setQApp = function (
    qApplication: QApp
) {
    IOC.eventuallyGet(AIRPORT_DATABASE).then((
        airportDatabase,
    ) => {
        airportDatabase.setQApp(qApplication)
    })
}

export function loadAirTrafficControl() {
    console.debug(`@airport@air-traffic-control loaded`)
}
