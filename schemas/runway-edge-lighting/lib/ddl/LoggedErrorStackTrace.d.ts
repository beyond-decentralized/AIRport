export declare type LoggedErrorStackTraceId = number;
export declare type LoggedErrorStackTraceStack = string;
export declare type LoggedErrorStackTraceStackHash = string;
export declare class LoggedErrorStackTrace {
    id: LoggedErrorStackTraceId;
    stackHash: LoggedErrorStackTraceStackHash;
    stack: LoggedErrorStackTraceStack;
}
