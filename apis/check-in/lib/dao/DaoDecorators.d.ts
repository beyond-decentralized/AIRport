import { IDao, IEntityCascadeGraph } from '@airport/air-control';
export declare const Persist: <IEntityGraph extends IEntityCascadeGraph>(rules: IEntityGraph) => (target: IDao<any, any, any, any, any, any, IEntityGraph, any>, propertyKey: string) => void;
export declare const Delete: () => (target: IDao<any, any, any, any, any, any, any, any>, propertyKey: string) => void;
export declare const Query: () => (target: IDao<any, any, any, any, any, any, any, any>, propertyKey: string) => void;
//# sourceMappingURL=DaoDecorators.d.ts.map