import {Token}                  from "typedi";
import {IApplicationDao}        from "./dao/ApplicationDao";
import {IApplicationPackageDao} from "./dao/ApplicationPackageDao";
import {IDomainDao}             from "./dao/DomainDao";
import {IPackageDao}            from "./dao/PackageDao";
import {IPackagedUnitDao}       from "./dao/PackagedUnitDao";

export const ApplicationDaoToken = new Token<IApplicationDao>();
export const ApplicationPackageDaoToken = new Token<IApplicationPackageDao>();
export const DomainDaoToken = new Token<IDomainDao>();
export const PackageDaoToken = new Token<IPackageDao>();
export const PackagedUnitDaoToken = new Token<IPackagedUnitDao>();
