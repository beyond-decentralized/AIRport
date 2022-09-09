import {
    airApi,
    QApp
} from '@airport/aviation-communication'
import {
    DbApplication,
    ApplicationEntity_LocalId,
}                      from '@airport/ground-control';
import { QApplication } from './query/application/QApplication';
import { QApplicationColumn } from './query/application/QApplicationColumn';
import { QApplicationCurrentVersion } from './query/application/QApplicationCurrentVersion';
import { QApplicationEntity } from './query/application/QApplicationEntity';
import { QApplicationOperation } from './query/application/QApplicationOperation';
import { QApplicationProperty } from './query/application/QApplicationProperty';
import { QApplicationPropertyColumn } from './query/application/QApplicationPropertyColumn';
import { QApplicationReference } from './query/application/QApplicationReference';
import { QApplicationRelation } from './query/application/QApplicationRelation';
import { QApplicationRelationColumn } from './query/application/QApplicationRelationColumn';
import { QApplicationVersion } from './query/application/QApplicationVersion';
import { QDomain } from './query/application/QDomain';
import { QVersionedApplicationObject } from './query/application/QVersionedApplicationObject';
import {
  Application,
  ApplicationColumn,
  ApplicationCurrentVersion,
  ApplicationEntity,
  ApplicationOperation,
  ApplicationProperty,
  ApplicationPropertyColumn,
  ApplicationReference,
  ApplicationRelation,
  ApplicationRelationColumn,
  ApplicationVersion,
  Domain,
  VersionedApplicationObject
} from '../ddl/ddl';

export interface air____at_airport_slash_airspace_LocalQApp extends QApp {

    db: DbApplication;

  Application: QApplication;
	ApplicationColumn: QApplicationColumn;
	ApplicationCurrentVersion: QApplicationCurrentVersion;
	ApplicationEntity: QApplicationEntity;
	ApplicationOperation: QApplicationOperation;
	ApplicationProperty: QApplicationProperty;
	ApplicationPropertyColumn: QApplicationPropertyColumn;
	ApplicationReference: QApplicationReference;
	ApplicationRelation: QApplicationRelation;
	ApplicationRelationColumn: QApplicationRelationColumn;
	ApplicationVersion: QApplicationVersion;
	Domain: QDomain;

}

const __constructors__ = {
	Application: Application,
	ApplicationColumn: ApplicationColumn,
	ApplicationCurrentVersion: ApplicationCurrentVersion,
	ApplicationEntity: ApplicationEntity,
	ApplicationOperation: ApplicationOperation,
	ApplicationProperty: ApplicationProperty,
	ApplicationPropertyColumn: ApplicationPropertyColumn,
	ApplicationReference: ApplicationReference,
	ApplicationRelation: ApplicationRelation,
	ApplicationRelationColumn: ApplicationRelationColumn,
	ApplicationVersion: ApplicationVersion,
	Domain: Domain,
	VersionedApplicationObject: VersionedApplicationObject
};

export const Q_air____at_airport_slash_airspace: air____at_airport_slash_airspace_LocalQApp = <any>{
	__constructors__,
  domain: 'air',
  name: '@airport/airspace'
};
export default Q_air____at_airport_slash_airspace

export function air____at_airport_slash_airspace_diSet(
	dbEntityId: ApplicationEntity_LocalId
): boolean {
	return airApi.dS(Q_air____at_airport_slash_airspace.__dbApplication__, dbEntityId)
}

airApi.setQApp(Q_air____at_airport_slash_airspace)
