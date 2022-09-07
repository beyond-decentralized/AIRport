import { APPLICATION_LOADER } from "@airport/apron"
import { API_REGISTRY } from "@airport/check-in"
import { APPLICATION_INITIALIZER, TERMINAL_STORE } from "@airport/terminal-map"
import { AbstractApplicationLoader } from "./AbstractApplicationLoader"

APPLICATION_LOADER.setClass(AbstractApplicationLoader)
APPLICATION_LOADER.setDependencies({
    applicationInitializer: APPLICATION_INITIALIZER,
    terminalStore: TERMINAL_STORE,
    apiRegistry: API_REGISTRY,
})
