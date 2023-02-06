import { app } from '@airport/direction-indicator'
import { TERMINAL_SESSION_MANAGER } from '@airport/terminal-map'
import { SessionStateApi } from '../api/api'
import { application } from './app-declaration'

export const sessionState = app(application)

sessionState.register(SessionStateApi)

sessionState.setDependencies(SessionStateApi, {
    terminalSessionManager: TERMINAL_SESSION_MANAGER
})