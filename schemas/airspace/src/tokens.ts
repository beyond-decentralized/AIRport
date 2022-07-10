import { lib } from '@airport/direction-indicator';
import { DomainDao, IDomainDao } from './dao/DomainDao'
import { ApplicationColumnDao, IApplicationColumnDao } from './dao/ApplicationColumnDao';
import { ApplicationDao, IApplicationDao } from './dao/ApplicationDao';
import { ApplicationEntityDao, IApplicationEntityDao } from './dao/ApplicationEntityDao';
import { ApplicationPropertyColumnDao, IApplicationPropertyColumnDao } from './dao/ApplicationPropertyColumnDao';
import { ApplicationPropertyDao, IApplicationPropertyDao } from './dao/ApplicationPropertyDao';
import { ApplicationReferenceDao, IApplicationReferenceDao } from './dao/ApplicationReferenceDao';
import { ApplicationRelationColumnDao, IApplicationRelationColumnDao } from './dao/ApplicationRelationColumnDao';
import { ApplicationRelationDao, IApplicationRelationDao } from './dao/ApplicationRelationDao';
import { ApplicationVersionDao, IApplicationVersionDao } from './dao/ApplicationVersionDao';
import { ApplicationVersionDuo, IApplicationVersionDuo } from './duo/ApplicationVersionDuo';
import { AIRPORT_DATABASE } from '@airport/air-traffic-control';

const trafficPattern = lib('traffic-pattern');

export const DOMAIN_DAO = trafficPattern.token<IDomainDao>({
    class: DomainDao,
    interface: 'IDomainDao',
    token: 'DOMAIN_DAO'
})
export const APPLICATION_COLUMN_DAO = trafficPattern.token<IApplicationColumnDao>({
    class: ApplicationColumnDao,
    interface: 'IApplicationColumnDao',
    token: 'APPLICATION_COLUMN_DAO'
});
export const APPLICATION_DAO = trafficPattern.token<IApplicationDao>({
    class: ApplicationDao,
    interface: 'IApplicationDao',
    token: 'APPLICATION_DAO'
});
export const APPLICATION_ENTITY_DAO = trafficPattern.token<IApplicationEntityDao>({
    class: ApplicationEntityDao,
    interface: 'IApplicationEntityDao',
    token: 'APPLICATION_ENTITY_DAO'
});
export const APPLICATION_PROPERTY_COLUMN_DAO = trafficPattern.token<IApplicationPropertyColumnDao>({
    class: ApplicationPropertyColumnDao,
    interface: 'IApplicationPropertyColumnDao',
    token: 'APPLICATION_PROPERTY_COLUMN_DAO'
});
export const APPLICATION_PROPERTY_DAO = trafficPattern.token<IApplicationPropertyDao>({
    class: ApplicationPropertyDao,
    interface: 'IApplicationPropertyDao',
    token: 'APPLICATION_PROPERTY_DAO'
});
export const APPLICATION_REFERENCE_DAO = trafficPattern.token<IApplicationReferenceDao>({
    class: ApplicationReferenceDao,
    interface: 'IApplicationReferenceDao',
    token: 'APPLICATION_REFERENCE_DAO'
});
export const APPLICATION_RELATION_COLUMN_DAO = trafficPattern.token<IApplicationRelationColumnDao>({
    class: ApplicationRelationColumnDao,
    interface: 'IApplicationRelationColumnDao',
    token: 'APPLICATION_RELATION_COLUMN_DAO'
});
export const APPLICATION_RELATION_DAO = trafficPattern.token<IApplicationRelationDao>({
    class: ApplicationRelationDao,
    interface: 'IApplicationRelationDao',
    token: 'APPLICATION_RELATION_DAO'
});
export const APPLICATION_VERSION_DAO = trafficPattern.token<IApplicationVersionDao>({
    class: ApplicationVersionDao,
    interface: 'IApplicationVersionDao',
    token: 'APPLICATION_VERSION_DAO'
});
export const APPLICATION_VERSION_DUO = trafficPattern.token<IApplicationVersionDuo>({
    class: ApplicationVersionDuo,
    interface: 'IApplicationVersionDuo',
    token: 'APPLICATION_VERSION_DUO'
});

APPLICATION_DAO.setDependencies({
    airportDatabase: AIRPORT_DATABASE
})
