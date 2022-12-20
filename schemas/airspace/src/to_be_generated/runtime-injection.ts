import { DomainDao, IDomainDao } from '../dao/DomainDao'
import { ApplicationColumnDao, IApplicationColumnDao } from '../dao/ApplicationColumnDao';
import { ApplicationDao, IApplicationDao } from '../dao/ApplicationDao';
import { ApplicationEntityDao, IApplicationEntityDao } from '../dao/ApplicationEntityDao';
import { ApplicationPropertyColumnDao, IApplicationPropertyColumnDao } from '../dao/ApplicationPropertyColumnDao';
import { ApplicationPropertyDao, IApplicationPropertyDao } from '../dao/ApplicationPropertyDao';
import { ApplicationReferenceDao, IApplicationReferenceDao } from '../dao/ApplicationReferenceDao';
import { ApplicationRelationColumnDao, IApplicationRelationColumnDao } from '../dao/ApplicationRelationColumnDao';
import { ApplicationRelationDao, IApplicationRelationDao } from '../dao/ApplicationRelationDao';
import { ApplicationVersionDao, IApplicationVersionDao } from '../dao/ApplicationVersionDao';
import { AIRPORT_DATABASE } from '@airport/air-traffic-control';
import { app } from '@airport/direction-indicator';
import { application } from './app-declaration';

export const airspace = app(application);

airspace.register(
    DomainDao, ApplicationColumnDao, ApplicationDao,
    ApplicationEntityDao, ApplicationPropertyColumnDao, ApplicationPropertyDao,
    ApplicationReferenceDao, ApplicationRelationColumnDao, ApplicationRelationDao,
    ApplicationVersionDao
)

airspace.setDependencies(ApplicationDao, {
    airportDatabase: AIRPORT_DATABASE
})
