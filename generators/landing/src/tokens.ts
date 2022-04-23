import { AIRPORT_DATABASE } from '@airport/air-control'
import { lib } from '@airport/direction-indicator'
import { ApplicationInitializer } from './ApplicationInitializer'
import { IApplicationBuilder } from './builder/IApplicationBuilder'
import { SqlApplicationBuilder } from './builder/SqlApplicationBuilder'
import { IApplicationChecker } from './checker/ApplicationChecker'
import { IApplicationLocator } from './locator/ApplicationLocator'
import { IApplicationComposer } from './recorder/ApplicationComposer'
import { IApplicationRecorder } from './recorder/ApplicationRecorder'

const landing = lib('landing')

export const APPLICATION_BUILDER = landing.token<IApplicationBuilder>('APPLICATION_BUILDER')
export const APPLICATION_CHECKER = landing.token<IApplicationChecker>('APPLICATION_CHECKER')
export const APPLICATION_COMPOSER = landing.token<IApplicationComposer>('APPLICATION_COMPOSER')
export const APPLICATION_INITIALIZER = landing.token<IApplicationComposer>({
    class: ApplicationInitializer,
    interface: 'IApplicationComposer',
    token: 'APPLICATION_COMPOSER'
})
export const APPLICATION_LOCATOR = landing.token<IApplicationLocator>('APPLICATION_LOCATOR')
export const APPLICATION_RECORDER = landing.token<IApplicationRecorder>('APPLICATION_RECORDER')

export const SQL_APPLICATION_BUILDER = landing.token<IApplicationBuilder>({
    class: SqlApplicationBuilder,
    interface: 'IApplicationBuilder',
    token: 'SQL_APPLICATION_BUILDER'
})

SQL_APPLICATION_BUILDER.setDependencies({
    airportDatabase: AIRPORT_DATABASE
})

APPLICATION_INITIALIZER.setDependencies({
    airportDatabase: AIRPORT_DATABASE
})
