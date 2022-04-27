import { API_REGISTRY } from '@airport/check-in';
import { lib } from '@airport/direction-indicator';
const checkIn = lib('security-check');
export const APPLICATION_LOADER = checkIn.token({
    class: null,
    interface: 'IApplicationLoader',
    token: 'APPLICATION_LOADER'
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