import { SEQUENCE_GENERATOR } from '@airport/check-in';
import { DI } from '@airport/di';
import { SequenceGenerator } from '@airport/sequence';
export class MySqlSequenceGenerator extends SequenceGenerator {
    nativeGenerate() {
        throw new Error('Method not implemented.');
    }
}
DI.set(SEQUENCE_GENERATOR, MySqlSequenceGenerator);
//# sourceMappingURL=MySqlSequenceGenerator.js.map