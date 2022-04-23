import { lib } from '@airport/direction-indicator'
import { IApplicationBuilder } from './builder/IApplicationBuilder'
import { IApplicationChecker } from './checker/ApplicationChecker'
import { IApplicationLocator } from './locator/ApplicationLocator'
import { IApplicationComposer } from './recorder/ApplicationComposer'
import { IApplicationRecorder } from './recorder/ApplicationRecorder'

const landing = lib('landing')

export const APPLICATION_BUILDER = landing.token<IApplicationBuilder>('APPLICATION_BUILDER')
export const APPLICATION_CHECKER = landing.token<IApplicationChecker>('APPLICATION_CHECKER')
export const APPLICATION_COMPOSER = landing.token<IApplicationComposer>('APPLICATION_COMPOSER')
export const APPLICATION_LOCATOR = landing.token<IApplicationLocator>('APPLICATION_LOCATOR')
export const APPLICATION_RECORDER = landing.token<IApplicationRecorder>('APPLICATION_RECORDER')
