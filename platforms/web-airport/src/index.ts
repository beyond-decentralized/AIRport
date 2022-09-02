export * from './framework'

import { IUserAccountInfo as SourceIUserAccountInfo } from '@airport/terminal-map'
import { Application, } from '@airport/airspace';
import { Repository as SourceRepository } from '@airport/holding-pattern';
import { AIRportApi } from './AIRportApi'


export type Application = Application
export type IUserAccountInfo = SourceIUserAccountInfo
export type Repository = SourceRepository
export const airportApi = new AIRportApi()
