export interface IAppError<TMeta extends Record<string, any> = Record<string, any>> {
    message: string;
    error?: Error;
    code: number;
    meta?: TMeta;
}
