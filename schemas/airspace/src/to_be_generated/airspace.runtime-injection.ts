import { DbDomainDao } from '../dao/DbDomainDao'
import { DbColumnDao } from '../dao/application/entity/DbColumnDao';
import { DbApplicationDao } from '../dao/application/DbApplicationDao';
import { DbEntityDao } from '../dao/application/entity/DbEntityDao';
import { DbPropertyColumnDao } from '../dao/application/entity/DbPropertyColumnDao';
import { DbPropertyDao } from '../dao/application/entity/DbPropertyDao';
import { DbApplicationReferenceDao } from '../dao/application/DbApplicationReferenceDao';
import { DbRelationColumnDao } from '../dao/application/entity/DbRelationColumnDao';
import { DbRelationDao } from '../dao/application/entity/DbRelationDao';
import { DbApplicationVersionDao } from '../dao/application/DbApplicationVersionDao';
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
    DbApplicationDao, DbApplicationReferenceDao,
    DbApplicationVersionDao, DbColumnDao, DbDomainDao,
    DbEntityDao, DbPropertyColumnDao, DbPropertyDao,
    DbRelationColumnDao, DbRelationDao,

)

airspace.setDependencies(DbColumnDao, {
    datastructureUtils: DatastructureUtils
})

airspace.setDependencies(DbRelationDao, {
    datastructureUtils: DatastructureUtils
})

airspace.setDependencies(DbApplicationDao, {
    airportDatabase: AIRPORT_DATABASE,
    datastructureUtils: DatastructureUtils
})
