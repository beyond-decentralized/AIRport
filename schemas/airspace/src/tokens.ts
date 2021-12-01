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

export const DOMAIN_DAO = trafficPattern.token<IDomainDao>('IDomainDao')
export const APPLICATION_COLUMN_DAO = trafficPattern.token<IApplicationColumnDao>('IApplicationColumnDao');
export const APPLICATION_DAO = trafficPattern.token<IApplicationDao>('IApplicationDao');
export const APPLICATION_ENTITY_DAO = trafficPattern.token<IApplicationEntityDao>('IApplicationEntityDao');
export const APPLICATION_PROPERTY_COLUMN_DAO = trafficPattern.token<IApplicationPropertyColumnDao>('IApplicationPropertyColumnDao');
export const APPLICATION_PROPERTY_DAO = trafficPattern.token<IApplicationPropertyDao>('IApplicationPropertyDao');
export const APPLICATION_REFERENCE_DAO = trafficPattern.token<IApplicationReferenceDao>('IApplicationReferenceDao');
export const APPLICATION_RELATION_COLUMN_DAO = trafficPattern.token<IApplicationRelationColumnDao>('IApplicationRelationColumnDao');
export const APPLICATION_RELATION_DAO = trafficPattern.token<IApplicationRelationDao>('IApplicationRelationDao');
export const APPLICATION_VERSION_DAO = trafficPattern.token<IApplicationVersionDao>('IApplicationVersionDao');
export const APPLICATION_VERSION_DUO = trafficPattern.token<IApplicationVersionDuo>('IApplicationVersionDuo');
