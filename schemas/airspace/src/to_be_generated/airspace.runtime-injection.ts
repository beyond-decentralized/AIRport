import { DbDomainDao } from '../dao/DbDomainDao'
import { DbColumnDao } from '../dao/DbColumnDao';
import { DbApplicationDao } from '../dao/DbApplicationDao';
import { DbEntityDao } from '../dao/DbEntityDao';
import { DbPropertyColumnDao } from '../dao/DbPropertyColumnDao';
import { DbPropertyDao } from '../dao/DbPropertyDao';
import { DbApplicationReferenceDao } from '../dao/DbApplicationReferenceDao';
import { DbRelationColumnDao } from '../dao/DbRelationColumnDao';
import { DbRelationDao } from '../dao/DbRelationDao';
import { DbApplicationVersionDao } from '../dao/DbApplicationVersionDao';
import { AIRPORT_DATABASE } from '@airport/air-traffic-control';
import { app } from '@airport/direction-indicator';
import { application } from './app-declaration';
import { DatastructureUtils } from '@airport/ground-control';

export const airspace = app(application);

airspace.register(
    DbDomainDao, DbColumnDao, DbApplicationDao,
    DbEntityDao, DbPropertyColumnDao, DbPropertyDao,
    DbApplicationReferenceDao, DbRelationColumnDao, DbRelationDao,
    DbApplicationVersionDao
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
