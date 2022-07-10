import { IEntitySelectProperties, RawLimitedEntityQuery } from "@airport/tarmaq-query";
export declare class DaoQueryDecorators<EntitySelect extends IEntitySelectProperties> {
    Graph(callback: (...args: any[]) => RawLimitedEntityQuery<EntitySelect>): PropertyDecorator;
    Tree(callback: {
        (...args: any[]): RawLimitedEntityQuery<EntitySelect>;
    }): PropertyDecorator;
}
//# sourceMappingURL=DaoQueryDecorators.d.ts.map