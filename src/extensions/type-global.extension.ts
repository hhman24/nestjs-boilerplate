export type Constructor<T = unknown, Arguments extends unknown[] = unknown[]> = new (...args: Arguments) => T;
