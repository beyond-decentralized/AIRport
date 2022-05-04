import { API_REGISTRY } from '@airport/check-in';
import { lib } from '@airport/direction-indicator';
import { ApplicationStore } from './state/ApplicationStore';
const checkIn = lib('apron');
export const APPLICATION_LOADER = checkIn.token({
    class: null,
    interface: 'IApplicationLoader',
    token: 'APPLICATION_LOADER'
});
export const APPLICATION_STORE = checkIn.token({
    class: ApplicationStore,
    interface: 'IApplicationStore',
    token: 'APPLICATION_STORE'
});
export const LOCAL_API_SERVER = checkIn.token({
    class: null,
    interface: 'ILocalAPIServer',
    token: 'LOCAL_API_SERVER'
});
LOCAL_API_SERVER.setDependencies({
    apiRegistry: API_REGISTRY
});
//# sourceMappingURL=tokens.js.map