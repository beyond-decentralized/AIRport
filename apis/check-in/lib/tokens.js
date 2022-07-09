import { CONTAINER_ACCESSOR, lib } from '@airport/direction-indicator';
const checkIn = lib('check-in');
export const API_REGISTRY = checkIn.token({
    class: null,
    interface: 'IApiRegistry',
    token: 'API_REGISTRY'
});
export const API_VALIDATOR = checkIn.token({
    class: null,
    interface: 'IApiValidator',
    token: 'API_VALIDATOR'
});
API_REGISTRY.setDependencies({
    containerAccessor: CONTAINER_ACCESSOR
});
//# sourceMappingURL=tokens.js.map