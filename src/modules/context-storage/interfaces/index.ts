export const CONTEXT_STORAGE_SERVICE_KEY = Symbol();

export default interface IContextStorageService {
    setContextId(contextId: string): void;
    getContextId(): string;
    get<T>(key: string): T | undefined;
    set<T>(key: string, value: T): void;
}
