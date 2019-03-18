import {diToken}                from '@airport/di'
import {IApplicationDao}        from './dao/ApplicationDao'
import {IApplicationPackageDao} from './dao/ApplicationPackageDao'
import {IDomainDao}             from './dao/DomainDao'
import {IPackageDao}            from './dao/PackageDao'
import {IPackagedUnitDao}       from './dao/PackagedUnitDao'

export const APPLICATION_DAO         = diToken<IApplicationDao>()
export const APPLICATION_PACKAGE_DAO = diToken<IApplicationPackageDao>()
export const DOMAIN_DAO              = diToken<IDomainDao>()
export const PACKAGE_DAO             = diToken<IPackageDao>()
export const PACKAGE_UNIT_DAO        = diToken<IPackagedUnitDao>()
