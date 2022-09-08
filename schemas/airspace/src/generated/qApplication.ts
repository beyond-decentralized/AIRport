import {
    airApi,
    QApp
} from '@airport/aviation-communication'
import {
    DbApplication,
    ApplicationEntity_LocalId,
}                      from '@airport/ground-control';
import { QApplication } from './application/qApplication';
import { QApplicationColumn } from './application/qApplicationColumn';
import { QApplicationCurrentVersion } from './application/qApplicationCurrentVersion';
import { QApplicationEntity } from './application/qApplicationEntity';
import { QApplicationOperation } from './application/qApplicationOperation';
import { QApplicationProperty } from './application/qApplicationProperty';
import { QApplicationPropertyColumn } from './application/qApplicationPropertyColumn';
import { QApplicationReference } from './application/qApplicationReference';
import { QApplicationRelation } from './application/qApplicationRelation';
import { QApplicationRelationColumn } from './application/qApplicationRelationColumn';
import { QApplicationVersion } from './application/qApplicationVersion';
import { QDomain } from './application/qDomain';
import { QVersionedApplicationObject } from './application/qVersionedApplicationObject';
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
