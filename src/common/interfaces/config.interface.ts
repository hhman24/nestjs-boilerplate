export interface DatabaseConfig {
    host: string;
    port: number;
    uri: string;
}

export interface AppConfig {
    nodeEnv: string;
    port: number;
    serviceName: string;
    apiPrefix: string;
    origins: string;
}
