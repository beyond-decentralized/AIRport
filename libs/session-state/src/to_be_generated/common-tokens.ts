import { lib } from '@airport/direction-indicator'

export const sessionState = lib('@airport/session-state')

export const SESSION_STATE_API = sessionState.token<any>({
    class: null,
    interface: 'SessionStateApi',
    token: 'SESSION_STATE_API'
})
