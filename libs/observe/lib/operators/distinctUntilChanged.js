import { Operator } from './operator';
export function distinctUntilChanged() {
    return new DistinctUntilChangedOperator();
}
export class DistinctUntilChangedOperator extends Operator {
    exec(source) {
        if (!source.upstream || !source.upstream.length) {
            return source.currentValue;
        }
        let up$CurVal = source.upstream[0].currentValue;
        if (source.upstream.length > 1) {
            up$CurVal = source.upstream.map(up$source => up$source.currentValue);
        }
        try {
            if (!source.up$LastVal) {
                return up$CurVal;
            }
            if (source.upstream.every((up$source, index) => up$source.currentValue === up$CurVal[index])) {
                return source.currentValue;
            }
            return up$CurVal;
        }
        finally {
            source.up$LastVal = up$CurVal;
        }
    }
}
//# sourceMappingURL=distinctUntilChanged.js.map