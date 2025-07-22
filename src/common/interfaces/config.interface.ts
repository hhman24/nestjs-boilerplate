export interface IDatabaseConfig {
    host: string;
    port: number;
    uri: string;
}

export interface IAppConfig {
    nodeEnv: string;
    port: number;
    serviceName: string;
    apiPrefix: string;
    origins: string;
    logDir: string;
}
