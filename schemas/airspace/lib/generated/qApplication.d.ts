import { QApplication as AirportQApplication } from '@airport/air-control';
import { DbApplication, EntityId } from '@airport/ground-control';
import { QDomain } from './application/qdomain';
import { QApplication } from './application/qapplication';
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
export interface LocalQApplication extends AirportQApplication {
    db: DbApplication;
    Domain: QDomain;
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
}
export declare const Q_SCHEMA: LocalQApplication;
export declare const Q: LocalQApplication;
export declare function diSet(dbEntityId: EntityId): boolean;
export declare function duoDiSet(dbEntityId: EntityId): boolean;
//# sourceMappingURL=qApplication.d.ts.map