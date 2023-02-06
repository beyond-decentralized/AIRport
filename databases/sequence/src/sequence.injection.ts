import { AIRPORT_DATABASE } from "@airport/air-traffic-control"
import { SequenceDao } from "@airport/airport-code"
import { DatastructureUtils, SEQUENCE_GENERATOR } from "@airport/ground-control"
import { TerminalStore } from "@airport/terminal-map"
import { SequenceGenerator } from "./SequenceGenerator"

SEQUENCE_GENERATOR.setClass(SequenceGenerator)
SEQUENCE_GENERATOR.setDependencies({
    airportDatabase: AIRPORT_DATABASE,
    datastructureUtils: DatastructureUtils,
    sequenceDao: SequenceDao,
    terminalStore: TerminalStore
})