/**
 * Created by Papa on 6/28/2016.
 */
export interface IRecordStateData {
    accessed: {
        [fieldName: string]: boolean;
    };
    current: {
        [fieldName: string]: any;
    };
    initialized: {
        [fieldName: string]: boolean;
    };
    original: {
        [fieldName: string]: any;
    };
}
export declare class RecordStateData implements IRecordStateData {
    accessed: {
        [fieldName: string]: boolean;
    };
    current: {
        [fieldName: string]: any;
    };
    initialized: {
        [fieldName: string]: boolean;
    };
    original: {
        [fieldName: string]: any;
    };
}
export declare enum CurrentState {
    CREATED = "CREATED",
    DELETED = "DELETED",
    UPDATED = "UPDATED"
}
export interface IRecordState {
    data: IRecordStateData;
    initialized: boolean;
    isDirty: boolean;
    proxied: boolean;
    create(): void;
    delete(): void;
    update(): void;
    toJSON(): any;
}
export declare class RecordState implements IRecordState {
    currentState: CurrentState;
    data: RecordStateData;
    initialized: boolean;
    isDirty: boolean;
    proxied: boolean;
    create(): void;
    delete(): void;
    toJSON(): any;
    update(): void;
}
//# sourceMappingURL=RecordState.d.ts.map