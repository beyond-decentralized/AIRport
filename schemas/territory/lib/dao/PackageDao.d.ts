import { BasePackageDao, IBasePackageDao } from '../generated/baseDaos';
export interface IPackageDao extends IBasePackageDao {
}
export declare class PackageDao extends BasePackageDao implements IPackageDao {
}
