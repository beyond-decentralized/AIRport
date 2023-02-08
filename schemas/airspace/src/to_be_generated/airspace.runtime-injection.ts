import { DomainDao } from '../dao/DdlDomainDao'
import { ApplicationColumnDao } from '../dao/ApplicationColumnDao';
import { ApplicationDao } from '../dao/ApplicationDao';
import { ApplicationEntityDao } from '../dao/ApplicationEntityDao';
import { ApplicationPropertyColumnDao } from '../dao/ApplicationPropertyColumnDao';
import { ApplicationPropertyDao } from '../dao/ApplicationPropertyDao';
import { ApplicationReferenceDao } from '../dao/ApplicationReferenceDao';
import { ApplicationRelationColumnDao } from '../dao/ApplicationRelationColumnDao';
import { ApplicationRelationDao } from '../dao/ApplicationRelationDao';
import { ApplicationVersionDao } from '../dao/ApplicationVersionDao';
import { AIRPORT_DATABASE } from '@airport/air-traffic-control';
import { app } from '@airport/direction-indicator';
import { application } from './app-declaration';
import { DatastructureUtils } from '@airport/ground-control';

export const airspace = app(application);

airspace.register(
    DomainDao, ApplicationColumnDao, ApplicationDao,
    ApplicationEntityDao, ApplicationPropertyColumnDao, ApplicationPropertyDao,
    ApplicationReferenceDao, ApplicationRelationColumnDao, ApplicationRelationDao,
    ApplicationVersionDao
)

airspace.setDependencies(ApplicationColumnDao, {
    datastructureUtils: DatastructureUtils
})

airspace.setDependencies(ApplicationDao, {
    airportDatabase: AIRPORT_DATABASE,
    datastructureUtils: DatastructureUtils
})
