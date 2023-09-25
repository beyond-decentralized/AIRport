export * from './framework'
export * from '@airport/ground-control'

import { IUserAccountInfo as SourceIUserAccountInfo } from '@airport/terminal-map'
import { DbApplication as SourceApplication, IRepository as SourceRepository } from '@airport/ground-control';
import { AIRportApi } from './AIRportApi'

export type DbApplication = SourceApplication
export type IUserAccountInfo = SourceIUserAccountInfo
export type IRepository = SourceRepository
export const airportApi = new AIRportApi()
