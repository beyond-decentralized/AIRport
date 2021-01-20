import { SequenceGenerator } from '@airport/sequence';
export class NoOpSequenceGenerator extends SequenceGenerator {
    nativeGenerate() {
        throw new Error('Method not implemented.');
    }
}
//# sourceMappingURL=NoOpSequenceGenerator.js.map