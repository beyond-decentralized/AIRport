export * from './OperationSerializer'
export * from './QueryResultsDeserializer'
export * from './SerializationStateManager'
export * from './injection'

export type DeepPartial<T> = {
    [P in keyof T]?: DeepPartial<T[P]>;
};
