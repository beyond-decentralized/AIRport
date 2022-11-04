import { TERMINAL_SESSION_MANAGER } from '@airport/terminal-map'
import { SessionStateApi } from '../api/api'
import {
    SESSION_STATE_API
} from './common-tokens'

SESSION_STATE_API.setClass(SessionStateApi)
SESSION_STATE_API.setDependencies({
    terminalSessionManager: TERMINAL_SESSION_MANAGER
})