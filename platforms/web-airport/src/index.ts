import { AIRportApi } from './AIRportApi'
import { Application, } from '@airport/airspace';
import { Repository } from '@airport/holding-pattern';
import { IUserAccountInfo } from '@airport/terminal-map'

export * from './framework'

export type Application = Application
export type IUserAccountInfo = IUserAccountInfo
export type Repository = Repository
export const airportApi = new AIRportApi()
