import { INTER_APP_API_CLIENT } from '@airport/ground-control';
import { UserApi } from './api-wrappers/UserApi';
import { USER_API } from './common-tokens';
USER_API.setClass(UserApi);
USER_API.setDependencies({
    interAppApiClient: INTER_APP_API_CLIENT
});
//# sourceMappingURL=api-tokens.js.map