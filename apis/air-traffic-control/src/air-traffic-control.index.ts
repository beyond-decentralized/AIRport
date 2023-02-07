
export * from './api/Api';
export * from './api/ApiOperation'
export * from './api/ApiRegistry'
export * from './api/ApiValidator'
export * from './api/JsonApplicationWithApi'
export * from './definition/utils/IQMetadataUtils'
export * from './definition/utils/IQApplicationBuilderUtils';
export * from './definition/utils/DbSystemWideOperationIdUtils';
export * from './definition/utils/IUtils'
export * from './definition/IAirportDatabase'
export * from './definition/IDatabaseState'
export * from './definition/JsonApplicationWithLastIds'
export * from './definition/ILastIds'
export * from './definition/IRepositoryLoader'
export * from './implementation/utils/ApplicationUtils';
export * from './implementation/utils/EntityUtils';
export * from './implementation/utils/FieldUtils';
export * from './implementation/utils/QApplicationBuilderUtils';
export * from './implementation/utils/QMetadataUtils';
export * from './implementation/utils/QueryUtils';
export * from './implementation/databaseState';
export * from './implementation/DatabaseStore';
export * from './implementation/QueryRelationManager';
export * from './implementation/utils/SystemWideOperationIdUtils';
export * from './implementation/Utils';
export * from './air-traffic-control.coreInjection';
export * from './air-traffic-control.injection';

import { QApp } from '@airport/aviation-communication'
import { IOC } from '@airport/direction-indicator';
import { AIRPORT_DATABASE } from './air-traffic-control.injection';

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
