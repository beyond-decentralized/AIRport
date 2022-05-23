import { INTER_APP_API_CLIENT } from '@airport/direction-indicator';
import { UserApi } from '../generated/api/api';
import { USER_API } from './common-tokens';
USER_API.setClass(UserApi);
USER_API.setDependencies({
    interAppApiClient: INTER_APP_API_CLIENT
});
//# sourceMappingURL=api-tokens.js.map