import { IEntitySelectProperties, RawEntityQuery } from '@airport/air-control';
export declare class DaoQueryDecorators<EntitySelect extends IEntitySelectProperties> {
    Graph(callback: (...args: any[]) => RawEntityQuery<EntitySelect>): PropertyDecorator;
    Tree(callback: {
        (...args: any[]): RawEntityQuery<IEntitySelectProperties>;
    }): PropertyDecorator;
}
//# sourceMappingURL=DaoQueryDecorators.d.ts.map