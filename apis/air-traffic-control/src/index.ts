
export * from './definition/utils/IQMetadataUtils'
export * from './definition/utils/Utils'
export * from './definition/AirportDatabase'
export * from './definition/DatabaseState'
export * from './definition/RepositoryLoader'
export * from './implementation/utils/ApplicationUtils';
export * from './implementation/utils/EntityUtils';
export * from './implementation/utils/FieldUtils';
export * from './implementation/utils/QMetadataUtils';
export * from './implementation/utils/qApplicationBuilderUtils';
export * from './implementation/utils/QueryUtils';
export * from './implementation/databaseState';
export * from './implementation/DatabaseStore';
export * from './implementation/RelationManager';
export * from './implementation/SystemWideOperationIds';
export * from './implementation/Utils';
export * from './core-tokens';
export * from './tokens';

import { airApi, QApplication } from '@airport/aviation-communication'
import { DEPENDENCY_INJECTION } from '@airport/direction-indicator';
import { AIRPORT_DATABASE } from './tokens';

airApi.setQApplication = function (
    qApplication: QApplication
) {
    DEPENDENCY_INJECTION.db().eventuallyGet(AIRPORT_DATABASE).then((
        airportDatabase,
    ) => {
        airportDatabase.setQApplication(qApplication)
    })
}