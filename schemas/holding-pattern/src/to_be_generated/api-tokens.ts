import { INTER_APP_API_CLIENT } from '@airport/direction-indicator'

import { RepositoryApi } from '../generated/api/api'
import { holdingPattern, REPOSITORY_API } from "./common-tokens";

holdingPattern.autopilot = true
REPOSITORY_API.setClass(RepositoryApi)
REPOSITORY_API.setDependencies({
    interAppApiClient: INTER_APP_API_CLIENT
})
