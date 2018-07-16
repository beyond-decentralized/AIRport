import { Token } from "typedi";
import { IApplicationDao } from "./dao/ApplicationDao";
import { IApplicationPackageDao } from "./dao/ApplicationPackageDao";
import { IDomainDao } from "./dao/DomainDao";
import { IPackageDao } from "./dao/PackageDao";
import { IPackagedUnitDao } from "./dao/PackagedUnitDao";
export declare const ApplicationDaoToken: Token<IApplicationDao>;
export declare const ApplicationPackageDaoToken: Token<IApplicationPackageDao>;
export declare const DomainDaoToken: Token<IDomainDao>;
export declare const PackageDaoToken: Token<IPackageDao>;
export declare const PackagedUnitDaoToken: Token<IPackagedUnitDao>;
