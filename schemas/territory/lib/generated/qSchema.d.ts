import { QSchema as AirportQSchema } from '@airport/air-control';
import { DbSchema } from '@airport/ground-control';
import { QApplication } from './qapplication';
import { QApplicationPackage } from './qapplicationpackage';
import { QDomain } from './qdomain';
import { QPackage } from './qpackage';
import { QPackagedUnit } from './qpackagedunit';
import { IBaseApplicationDuo, IBaseApplicationPackageDuo, IBaseDomainDuo, IBasePackageDuo, IBasePackagedUnitDuo } from './baseDuos';
import { IBaseApplicationDao, IBaseApplicationPackageDao, IBaseDomainDao, IBasePackageDao, IBasePackagedUnitDao } from './baseDaos';
export interface LocalQSchema extends AirportQSchema {
    db: DbSchema;
    duo: {
        Application: IBaseApplicationDuo;
        ApplicationPackage: IBaseApplicationPackageDuo;
        Domain: IBaseDomainDuo;
        Package: IBasePackageDuo;
        PackagedUnit: IBasePackagedUnitDuo;
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
