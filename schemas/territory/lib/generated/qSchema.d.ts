import { QSchema as AirportQSchema } from '@airport/air-control';
import { DbSchema } from '@airport/ground-control';
import { QApplication } from './qapplication';
import { QApplicationPackage } from './qapplicationpackage';
import { QDomain } from './qdomain';
import { QPackage } from './qpackage';
import { QPackagedUnit } from './qpackagedunit';
import { IBaseApplicationDmo, IBaseApplicationPackageDmo, IBaseDomainDmo, IBasePackageDmo, IBasePackagedUnitDmo } from './baseDmos';
import { IBaseApplicationDao, IBaseApplicationPackageDao, IBaseDomainDao, IBasePackageDao, IBasePackagedUnitDao } from './baseDaos';
export interface LocalQSchema extends AirportQSchema {
    db: DbSchema;
    dmo: {
        Application: IBaseApplicationDmo;
        ApplicationPackage: IBaseApplicationPackageDmo;
        Domain: IBaseDomainDmo;
        Package: IBasePackageDmo;
        PackagedUnit: IBasePackagedUnitDmo;
    };
    dao: {
        Application: IBaseApplicationDao;
        ApplicationPackage: IBaseApplicationPackageDao;
        Domain: IBaseDomainDao;
        Package: IBasePackageDao;
        PackagedUnit: IBasePackagedUnitDao;
    };
    Application: QApplication;
    ApplicationPackage: QApplicationPackage;
    Domain: QDomain;
    Package: QPackage;
    PackagedUnit: QPackagedUnit;
}
export declare const Q_SCHEMA: LocalQSchema;
export declare const Q: LocalQSchema;
