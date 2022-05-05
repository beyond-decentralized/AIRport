import { lib } from '@airport/direction-indicator';
import { UserApi } from '../api/UserApi';
export const travelDocumentCheckpoint = lib('travel-document-checkpoint');
export const USER_API = travelDocumentCheckpoint.token({
    class: UserApi,
    interface: 'IUserApi',
    token: 'USER_API'
});
//# sourceMappingURL=common-tokens.js.map