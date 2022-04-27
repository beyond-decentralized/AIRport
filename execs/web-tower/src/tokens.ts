import { TRANSACTIONAL_CONNECTOR } from "@airport/ground-control";
import {
    APPLICATION_LOADER,
    LOCAL_API_SERVER
} from "@airport/security-check";

TRANSACTIONAL_CONNECTOR.setDependencies({
    applicationLoader: APPLICATION_LOADER,
    localApiServer: LOCAL_API_SERVER
})