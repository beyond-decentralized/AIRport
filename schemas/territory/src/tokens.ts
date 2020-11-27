import {system}                from '@airport/di'
import {IApplicationDao}        from './dao/ApplicationDao'
import {IApplicationPackageDao} from './dao/ApplicationPackageDao'
import {IDomainDao}             from './dao/DomainDao'
import {IPackageDao}            from './dao/PackageDao'
import {IPackagedUnitDao}       from './dao/PackagedUnitDao'

const territory = system('airport').lib('territory')

export const APPLICATION_DAO         = territory.token<IApplicationDao>('IApplicationDao')
export const APPLICATION_PACKAGE_DAO = territory.token<IApplicationPackageDao>('IApplicationPackageDao')
export const DOMAIN_DAO              = territory.token<IDomainDao>('IDomainDao')
export const PACKAGE_DAO             = territory.token<IPackageDao>('IPackageDao')
export const PACKAGE_UNIT_DAO        = territory.token<IPackagedUnitDao>('IPackagedUnitDao')
