export * from './framework'

import { IUserAccountInfo as SourceIUserAccountInfo } from '@airport/terminal-map'
import { Application as SourceApplication } from '@airport/airspace/dist/app/bundle';
import { Repository as SourceRepository } from '@airport/holding-pattern/dist/app/bundle';
import { RepositoryNesting as SourceRepositoryNesting } from '@airport/holding-pattern/dist/app/bundle';
import { AIRportApi } from './AIRportApi'

export type Application = SourceApplication
export type IUserAccountInfo = SourceIUserAccountInfo
export type Repository = SourceRepository
export type RepositoryNesting = SourceRepositoryNesting
export const airportApi = new AIRportApi()
