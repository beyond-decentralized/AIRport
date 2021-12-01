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
export const SCHEMA_COLUMN_DAO = trafficPattern.token<IApplicationColumnDao>('IApplicationColumnDao');
export const SCHEMA_DAO = trafficPattern.token<IApplicationDao>('IApplicationDao');
export const SCHEMA_ENTITY_DAO = trafficPattern.token<IApplicationEntityDao>('IApplicationEntityDao');
export const SCHEMA_PROPERTY_COLUMN_DAO = trafficPattern.token<IApplicationPropertyColumnDao>('IApplicationPropertyColumnDao');
export const SCHEMA_PROPERTY_DAO = trafficPattern.token<IApplicationPropertyDao>('IApplicationPropertyDao');
export const SCHEMA_REFERENCE_DAO = trafficPattern.token<IApplicationReferenceDao>('IApplicationReferenceDao');
export const SCHEMA_RELATION_COLUMN_DAO = trafficPattern.token<IApplicationRelationColumnDao>('IApplicationRelationColumnDao');
export const SCHEMA_RELATION_DAO = trafficPattern.token<IApplicationRelationDao>('IApplicationRelationDao');
export const SCHEMA_VERSION_DAO = trafficPattern.token<IApplicationVersionDao>('IApplicationVersionDao');
export const SCHEMA_VERSION_DUO = trafficPattern.token<IApplicationVersionDuo>('IApplicationVersionDuo');
