import { SEQUENCE_DAO } from "@airport/airport-code";
import { SEQUENCE_GENERATOR } from "@airport/ground-control";
import { TERMINAL_STORE } from "@airport/terminal-map";
import { SequenceGenerator } from "./SequenceGenerator";
SEQUENCE_GENERATOR.setClass(SequenceGenerator);
SEQUENCE_GENERATOR.setDependencies({
    sequenceDao: SEQUENCE_DAO,
    terminalStore: TERMINAL_STORE
});
//# sourceMappingURL=tokens.js.map