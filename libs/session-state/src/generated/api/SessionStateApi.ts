import {
	SESSION_STATE_API,
} from '../../to_be_generated/common-tokens';
import {
	DEPENDENCY_INJECTION,
	Inject,
	Injected,
} from '@airport/direction-indicator';
import {
	Api,
} from '@airport/check-in';
import {
	ITerminalSessionManager,
} from '@airport/terminal-map';
import {
	UserAccount,
} from '@airport/travel-document-checkpoint';



// An API stub for other Applications and UIs to use
@Injected()
export class SessionStateApi {
        
    @Inject()
    sessionStateApi: SessionStateApi

    constructor() {
        DEPENDENCY_INJECTION.db().manualInject(this, 'sessionStateApi', SESSION_STATE_API)
    }
            
    async  getLoggedInUser(): Promise<UserAccount> {
        return await this.sessionStateApi.getLoggedInUser()
    }

}
