import { INTER_APP_API_CLIENT } from '@airport/direction-indicator';
import { UserAccountApi } from '../generated/api/api';
import { USER_ACCOUNT_API } from './common-tokens';
USER_ACCOUNT_API.setClass(UserAccountApi);
USER_ACCOUNT_API.setDependencies({
    interAppApiClient: INTER_APP_API_CLIENT
});
//# sourceMappingURL=api-tokens.js.map