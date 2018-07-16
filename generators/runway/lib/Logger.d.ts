/**
 * Created by Papa on 3/26/2016.
 */
export declare class Logger {
    error(message: string): void;
    log(severity: string, message: string): void;
    getNowStamp(): string;
    getTimeStamp(date: Date): string;
}
