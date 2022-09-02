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
import { airspace } from './common-tokens';


export const DOMAIN_DAO = airspace.token<IDomainDao>({
    class: DomainDao,
    interface: 'IDomainDao',
    token: 'DOMAIN_DAO'
})
export const APPLICATION_COLUMN_DAO = airspace.token<IApplicationColumnDao>({
    class: ApplicationColumnDao,
    interface: 'IApplicationColumnDao',
    token: 'APPLICATION_COLUMN_DAO'
});
export const APPLICATION_DAO = airspace.token<IApplicationDao>({
    class: ApplicationDao,
    interface: 'IApplicationDao',
    token: 'APPLICATION_DAO'
});
export const APPLICATION_ENTITY_DAO = airspace.token<IApplicationEntityDao>({
    class: ApplicationEntityDao,
    interface: 'IApplicationEntityDao',
    token: 'APPLICATION_ENTITY_DAO'
});
export const APPLICATION_PROPERTY_COLUMN_DAO = airspace.token<IApplicationPropertyColumnDao>({
    class: ApplicationPropertyColumnDao,
    interface: 'IApplicationPropertyColumnDao',
    token: 'APPLICATION_PROPERTY_COLUMN_DAO'
});
export const APPLICATION_PROPERTY_DAO = airspace.token<IApplicationPropertyDao>({
    class: ApplicationPropertyDao,
    interface: 'IApplicationPropertyDao',
    token: 'APPLICATION_PROPERTY_DAO'
});
export const APPLICATION_REFERENCE_DAO = airspace.token<IApplicationReferenceDao>({
    class: ApplicationReferenceDao,
    interface: 'IApplicationReferenceDao',
    token: 'APPLICATION_REFERENCE_DAO'
});
export const APPLICATION_RELATION_COLUMN_DAO = airspace.token<IApplicationRelationColumnDao>({
    class: ApplicationRelationColumnDao,
    interface: 'IApplicationRelationColumnDao',
    token: 'APPLICATION_RELATION_COLUMN_DAO'
});
export const APPLICATION_RELATION_DAO = airspace.token<IApplicationRelationDao>({
    class: ApplicationRelationDao,
    interface: 'IApplicationRelationDao',
    token: 'APPLICATION_RELATION_DAO'
});
export const APPLICATION_VERSION_DAO = airspace.token<IApplicationVersionDao>({
    class: ApplicationVersionDao,
    interface: 'IApplicationVersionDao',
    token: 'APPLICATION_VERSION_DAO'
});

APPLICATION_DAO.setDependencies({
    airportDatabase: AIRPORT_DATABASE
})
