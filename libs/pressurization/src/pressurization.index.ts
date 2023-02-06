export * from './OperationSerializer'
export * from './QueryResultsDeserializer'
export * from './SerializationStateManager'
export * from './pressurization.injection'

export type DeepPartial<T> = {
    [P in keyof T]?: DeepPartial<T[P]>;
};
