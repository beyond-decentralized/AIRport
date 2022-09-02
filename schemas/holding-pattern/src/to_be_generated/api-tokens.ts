import { INTER_APP_API_CLIENT } from '@airport/direction-indicator'

import { RepositoryApi } from '../generated/api/api'
import { REPOSITORY_API } from "./common-tokens";

REPOSITORY_API.setClass(RepositoryApi)
REPOSITORY_API.setDependencies({
    interAppApiClient: INTER_APP_API_CLIENT
})
