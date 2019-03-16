import { Token } from './Token';
export interface IContainer {
    get(callback: (...objects: any[]) => void, ...tokens: Token[]): void;
    onInit(callback: () => void): void;
    set(token: Token, clazz: any): void;
}
export declare class Container {
    objects: any[];
    classes: any[];
    onInitCallback: () => void;
    numPendingInits: number;
    get(callback: (...objects: any[]) => void, ...tokens: Token[]): void;
    onInit(callback: () => void): void;
    set(token: Token, clazz: any): void;
}
export declare const DI: Container;
