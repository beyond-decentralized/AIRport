import { Operator } from './operator';
export function map(project) {
    if (typeof project !== 'function') {
        throw new TypeError('map operator accepts a projection Function');
    }
    return new MapOperator(project);
}
export class MapOperator extends Operator {
    constructor(project) {
        super();
        this.project = project;
    }
    exec(source) {
        return this.project(source.currentValue);
    }
}
//# sourceMappingURL=map.js.map