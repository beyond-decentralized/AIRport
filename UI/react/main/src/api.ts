import { IOC } from '@airport/direction-indicator'
import { IUserAccountInfo, TERMINAL_SESSION_MANAGER } from '@airport/terminal-map'
import { OverlayEventDetail } from '@ionic/react/dist/types/components/react-component-lib/interfaces';

export const terminalStateManager = IOC.getSync(TERMINAL_SESSION_MANAGER)

export function signUp(
    ev: CustomEvent<OverlayEventDetail>
): void {
    asyncSignUp(ev.detail.role, ev.detail.data).then()
}

async function asyncSignUp(
    action: string | undefined,
    userAccountInfo: IUserAccountInfo
) {
    if (!action) {
        return
    }
    try {
        switch (action) {
            case 'signUp':
                await terminalStateManager.signUp(userAccountInfo).then()
                break
            default:
                throw new Error(`Unsupported user action: ${action}`)
        }
    } catch (e) {
        let message = e
        if (e instanceof Error) {
            message = e.message
            console.error(e)
        }
        console.error(message)
        alert(message)
    }
}