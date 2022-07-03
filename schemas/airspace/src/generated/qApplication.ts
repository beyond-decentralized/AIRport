import {
    airApi,
    QApplication
} from '@airport/aviation-communication'
import {
    DbApplication,
    ApplicationEntity_LocalId,
}                      from '@airport/ground-control';
import { QApplication as QSchemaApplication } from './application/qapplication';
import { QApplicationColumn } from './application/qapplicationcolumn';
import { QApplicationCurrentVersion } from './application/qapplicationcurrentversion';
import { QApplicationEntity } from './application/qapplicationentity';
import { QApplicationOperation } from './application/qapplicationoperation';
import { QApplicationProperty } from './application/qapplicationproperty';
import { QApplicationPropertyColumn } from './application/qapplicationpropertycolumn';
import { QApplicationReference } from './application/qapplicationreference';
import { QApplicationRelation } from './application/qapplicationrelation';
import { QApplicationRelationColumn } from './application/qapplicationrelationcolumn';
import { QApplicationVersion } from './application/qapplicationversion';
import { QDomain } from './application/qdomain';
import { QVersionedApplicationObject } from './application/qversionedapplicationobject';
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

export interface LocalQApplication extends QApplication {

    db: DbApplication;

  Application: QSchemaApplication;
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

export const Q_APPLICATION: LocalQApplication = <any>{
	__constructors__,
  domain: 'air',
  name: '@airport/airspace'
};
export const Q: LocalQApplication = Q_APPLICATION

export function diSet(
	dbEntityId: ApplicationEntity_LocalId
): boolean {
	return airApi.dS(Q.__dbApplication__, dbEntityId)
}

export function duoDiSet(
	dbEntityId: ApplicationEntity_LocalId
): boolean {
	return airApi.ddS(Q.__dbApplication__, dbEntityId)
}

airApi.setQApplication(Q_APPLICATION)
