import { system } from '@airport/di';
import { IDomainDao } from './dao/DomainDao'
import { IApplicationColumnDao } from './dao/ApplicationColumnDao';
import { IApplicationDao } from './dao/ApplicationDao';
import { IApplicationEntityDao } from './dao/ApplicationEntityDao';
import { IApplicationPropertyColumnDao } from './dao/ApplicationPropertyColumnDao';
import { IApplicationPropertyDao } from './dao/ApplicationPropertyDao';
import { IApplicationReferenceDao } from './dao/ApplicationReferenceDao';
import { IApplicationRelationColumnDao } from './dao/ApplicationRelationColumnDao';
import { IApplicationRelationDao } from './dao/ApplicationRelationDao';
import { IApplicationVersionDao } from './dao/ApplicationVersionDao';
import { IApplicationVersionDuo } from './duo/ApplicationVersionDuo';

const trafficPattern = system('airport').lib('traffic-pattern');

export const DOMAIN_DAO = trafficPattern.token<IDomainDao>('DOMAIN_DAO')
export const APPLICATION_COLUMN_DAO = trafficPattern.token<IApplicationColumnDao>('APPLICATION_COLUMN_DAO');
export const APPLICATION_DAO = trafficPattern.token<IApplicationDao>('APPLICATION_DAO');
export const APPLICATION_ENTITY_DAO = trafficPattern.token<IApplicationEntityDao>('APPLICATION_ENTITY_DAO');
export const APPLICATION_PROPERTY_COLUMN_DAO = trafficPattern.token<IApplicationPropertyColumnDao>('APPLICATION_PROPERTY_COLUMN_DAO');
export const APPLICATION_PROPERTY_DAO = trafficPattern.token<IApplicationPropertyDao>('APPLICATION_PROPERTY_DAO');
export const APPLICATION_REFERENCE_DAO = trafficPattern.token<IApplicationReferenceDao>('APPLICATION_REFERENCE_DAO');
export const APPLICATION_RELATION_COLUMN_DAO = trafficPattern.token<IApplicationRelationColumnDao>('APPLICATION_RELATION_COLUMN_DAO');
export const APPLICATION_RELATION_DAO = trafficPattern.token<IApplicationRelationDao>('APPLICATION_RELATION_DAO');
export const APPLICATION_VERSION_DAO = trafficPattern.token<IApplicationVersionDao>('APPLICATION_VERSION_DAO');
export const APPLICATION_VERSION_DUO = trafficPattern.token<IApplicationVersionDuo>('APPLICATION_VERSION_DUO');
