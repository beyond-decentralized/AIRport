import { SequenceDao } from "@airport/airport-code"
import { SEQUENCE_GENERATOR } from "@airport/ground-control"
import { TerminalStore } from "@airport/terminal-map"
import { SequenceGenerator } from "./SequenceGenerator"

SEQUENCE_GENERATOR.setClass(SequenceGenerator)
SEQUENCE_GENERATOR.setDependencies({
    sequenceDao: SequenceDao,
    terminalStore: TerminalStore
})