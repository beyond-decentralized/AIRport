import { AirEntityUtils } from "./AirEntityUtils"

// This library is used in UI/Client bundles and does does not include @airport/direction-indicator
// dependency injection library
globalThis.AIR_ENTITY_UTILS.setClass(AirEntityUtils)
