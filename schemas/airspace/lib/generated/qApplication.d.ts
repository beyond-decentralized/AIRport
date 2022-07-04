import { QApplication } from '@airport/aviation-communication';
import { DbApplication, ApplicationEntity_LocalId } from '@airport/ground-control';
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
export interface LocalQApplication extends QApplication {
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
export declare const Q_APPLICATION: LocalQApplication;
export declare const Q: LocalQApplication;
export declare function diSet(dbEntityId: ApplicationEntity_LocalId): boolean;
export declare function duoDiSet(dbEntityId: ApplicationEntity_LocalId): boolean;
//# sourceMappingURL=qApplication.d.ts.map