import { IEntitySelectProperties, RawLimitedEntityQuery } from '@airport/air-control';
export declare class DaoQueryDecorators<EntitySelect extends IEntitySelectProperties> {
    Graph(callback: (...args: any[]) => RawLimitedEntityQuery<EntitySelect>): PropertyDecorator;
    Tree(callback: {
        (...args: any[]): RawLimitedEntityQuery<EntitySelect>;
    }): PropertyDecorator;
}
//# sourceMappingURL=DaoQueryDecorators.d.ts.map