import { IDao, IEntityCascadeGraph } from '@airport/air-control';
export declare const Operation: <IEntityGraph extends IEntityCascadeGraph>(rules: IEntityGraph) => (target: IDao<any, any, any, any, any, any, IEntityGraph, any>, propertyKey: string) => void;
