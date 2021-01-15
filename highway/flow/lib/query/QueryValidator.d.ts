import { IQueryRequest } from './Query';
export interface IQueryValidator {
    validate(request: IQueryRequest): void;
}
export declare class QueryValidator implements IQueryValidator {
    validate(request: IQueryRequest): any;
}
//# sourceMappingURL=QueryValidator.d.ts.map