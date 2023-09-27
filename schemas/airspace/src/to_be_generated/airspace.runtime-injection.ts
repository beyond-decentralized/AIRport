import { DdlDomainDao } from '../dao/DdlDomainDao'
import { DdlColumnDao } from '../dao/application/entity/DdlColumnDao';
import { DdlApplicationDao } from '../dao/application/DdlApplicationDao';
import { DdlEntityDao } from '../dao/application/entity/DdlEntityDao';
import { DdlPropertyColumnDao } from '../dao/application/entity/DdlPropertyColumnDao';
import { DdlPropertyDao } from '../dao/application/entity/DdlPropertyDao';
import { DdlApplicationReferenceDao } from '../dao/application/DdlApplicationReferenceDao';
import { DdlRelationColumnDao } from '../dao/application/entity/DdlRelationColumnDao';
import { DdlRelationDao } from '../dao/application/entity/DdlRelationDao';
import { DdlApplicationVersionDao } from '../dao/application/DdlApplicationVersionDao';
import { AIRPORT_DATABASE } from '@airport/air-traffic-control';
import { app } from '@airport/direction-indicator';
import { application } from './app-declaration';
import { DatastructureUtils } from '@airport/ground-control';
import { ApplicationApiClassDao } from '../dao/application/api/ApplicationApiClassDao';
import { ApplicationApiOperationDao } from '../dao/application/api/ApplicationApiOperationDao';
import { ApplicationApiParameterDao } from '../dao/application/api/ApplicationApiParameterDao';
import { ApplicationApiReturnTypeDao } from '../dao/application/api/ApplicationApiReturnTypeDao';

export const airspace = app(application);

airspace.register(
    ApplicationApiClassDao, ApplicationApiOperationDao,
    ApplicationApiParameterDao, ApplicationApiReturnTypeDao,
    DdlApplicationDao, DdlApplicationReferenceDao,
    DdlApplicationVersionDao, DdlColumnDao, DdlDomainDao,
    DdlEntityDao, DdlPropertyColumnDao, DdlPropertyDao,
    DdlRelationColumnDao, DdlRelationDao,

)

airspace.setDependencies(DdlColumnDao, {
    datastructureUtils: DatastructureUtils
})

airspace.setDependencies(DdlRelationDao, {
    datastructureUtils: DatastructureUtils
})

airspace.setDependencies(DdlApplicationDao, {
    airportDatabase: AIRPORT_DATABASE,
    datastructureUtils: DatastructureUtils
})
