import { SEQUENCE_DAO } from "@airport/airport-code";
import { SEQUENCE_GENERATOR } from "@airport/check-in";
import { DEPENDENCY_INJECTION } from "@airport/direction-indicator";
import { SequenceGenerator } from "./SequenceGenerator";
DEPENDENCY_INJECTION.set(SEQUENCE_GENERATOR, SequenceGenerator);
SEQUENCE_GENERATOR.setDependencies({
    sequenceDao: SEQUENCE_DAO
});
//# sourceMappingURL=tokens.js.map