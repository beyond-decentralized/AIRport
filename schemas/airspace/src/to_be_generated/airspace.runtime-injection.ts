import { DdlDomainDao } from '../dao/DdlDomainDao'
import { DbColumnDao } from '../dao/application/entity/DbColumnDao';
import { DdlApplicationDao } from '../dao/application/DdlApplicationDao';
import { DbEntityDao } from '../dao/application/entity/DbEntityDao';
import { DbPropertyColumnDao } from '../dao/application/entity/DbPropertyColumnDao';
import { DbPropertyDao } from '../dao/application/entity/DbPropertyDao';
import { DdlApplicationReferenceDao } from '../dao/application/DdlApplicationReferenceDao';
import { DbRelationColumnDao } from '../dao/application/entity/DbRelationColumnDao';
import { DbRelationDao } from '../dao/application/entity/DbRelationDao';
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
    DdlApplicationVersionDao, DbColumnDao, DdlDomainDao,
    DbEntityDao, DbPropertyColumnDao, DbPropertyDao,
    DbRelationColumnDao, DbRelationDao,

)

airspace.setDependencies(DbColumnDao, {
    datastructureUtils: DatastructureUtils
})

airspace.setDependencies(DbRelationDao, {
    datastructureUtils: DatastructureUtils
})

airspace.setDependencies(DdlApplicationDao, {
    airportDatabase: AIRPORT_DATABASE,
    datastructureUtils: DatastructureUtils
})
