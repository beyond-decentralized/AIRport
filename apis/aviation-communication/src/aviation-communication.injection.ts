import { AirEntityUtils } from "./AirEntityUtils"
import { AirMessageUtils } from "./AirMessageUtils"

// This library is used in UI/Client bundles which does not include @airport/direction-indicator
// dependency injection library
setTimeout(() => {
    if (globalThis.AIR_ENTITY_UTILS) {
        globalThis.AIR_ENTITY_UTILS.setClass(AirEntityUtils)
    }
    if (globalThis.AIR_MESSAGE_UTILS) {
        globalThis.AIR_MESSAGE_UTILS.setClass(AirMessageUtils)
    }
})
