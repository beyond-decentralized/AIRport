/// <reference types="node" />
export interface IRecentWindowShiftServer {
    startShiftingRecentWindows(setInterval: (callback: (...args: any[]) => void, ms: number) => NodeJS.Timer, intervalFrequencyMillis: number, windowSizeInMillis: number): void;
}
