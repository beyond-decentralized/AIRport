import { lib } from '@airport/direction-indicator';
import { DomainDao } from './dao/DomainDao';
import { ApplicationColumnDao } from './dao/ApplicationColumnDao';
import { ApplicationDao } from './dao/ApplicationDao';
import { ApplicationEntityDao } from './dao/ApplicationEntityDao';
import { ApplicationPropertyColumnDao } from './dao/ApplicationPropertyColumnDao';
import { ApplicationPropertyDao } from './dao/ApplicationPropertyDao';
import { ApplicationReferenceDao } from './dao/ApplicationReferenceDao';
import { ApplicationRelationColumnDao } from './dao/ApplicationRelationColumnDao';
import { ApplicationRelationDao } from './dao/ApplicationRelationDao';
import { ApplicationVersionDao } from './dao/ApplicationVersionDao';
import { ApplicationVersionDuo } from './duo/ApplicationVersionDuo';
const trafficPattern = lib('traffic-pattern');
export const DOMAIN_DAO = trafficPattern.token({
    class: DomainDao,
    interface: 'IDomainDao',
    token: 'DOMAIN_DAO'
});
export const APPLICATION_COLUMN_DAO = trafficPattern.token({
    class: ApplicationColumnDao,
    interface: 'IApplicationColumnDao',
    token: 'APPLICATION_COLUMN_DAO'
});
export const APPLICATION_DAO = trafficPattern.token({
    class: ApplicationDao,
    interface: 'IApplicationDao',
    token: 'APPLICATION_DAO'
});
export const APPLICATION_ENTITY_DAO = trafficPattern.token({
    class: ApplicationEntityDao,
    interface: 'IApplicationEntityDao',
    token: 'APPLICATION_ENTITY_DAO'
});
export const APPLICATION_PROPERTY_COLUMN_DAO = trafficPattern.token({
    class: ApplicationPropertyColumnDao,
    interface: 'IApplicationPropertyColumnDao',
    token: 'APPLICATION_PROPERTY_COLUMN_DAO'
});
export const APPLICATION_PROPERTY_DAO = trafficPattern.token({
    class: ApplicationPropertyDao,
    interface: 'IApplicationPropertyDao',
    token: 'APPLICATION_PROPERTY_DAO'
});
export const APPLICATION_REFERENCE_DAO = trafficPattern.token({
    class: ApplicationReferenceDao,
    interface: 'IApplicationReferenceDao',
    token: 'APPLICATION_REFERENCE_DAO'
});
export const APPLICATION_RELATION_COLUMN_DAO = trafficPattern.token({
    class: ApplicationRelationColumnDao,
    interface: 'IApplicationRelationColumnDao',
    token: 'APPLICATION_RELATION_COLUMN_DAO'
});
export const APPLICATION_RELATION_DAO = trafficPattern.token({
    class: ApplicationRelationDao,
    interface: 'IApplicationRelationDao',
    token: 'APPLICATION_RELATION_DAO'
});
export const APPLICATION_VERSION_DAO = trafficPattern.token({
    class: ApplicationVersionDao,
    interface: 'IApplicationVersionDao',
    token: 'APPLICATION_VERSION_DAO'
});
export const APPLICATION_VERSION_DUO = trafficPattern.token({
    class: ApplicationVersionDuo,
    interface: 'IApplicationVersionDuo',
    token: 'APPLICATION_VERSION_DUO'
});
//# sourceMappingURL=tokens.js.map