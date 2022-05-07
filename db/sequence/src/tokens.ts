import { SEQUENCE_DAO } from "@airport/airport-code"
import { SEQUENCE_GENERATOR } from "@airport/check-in"
import { SequenceGenerator } from "./SequenceGenerator"

SEQUENCE_GENERATOR.setClass(SequenceGenerator)
SEQUENCE_GENERATOR.setDependencies({
    sequenceDao: SEQUENCE_DAO
})