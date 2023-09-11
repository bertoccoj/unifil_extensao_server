export { };

declare global {
    type Nullable<T> = T | null;
    type NullableString = Nullable<string>;
    type NullableNumber = Nullable<number>;

    type Constructor<Type = any> = { new(...args: any[]): Type; };
    type AbstractConstructor<T = any> = abstract new (...args: any[]) => T;

    interface Console {
        success(...args: Parameters<Console['log']>): ReturnType<Console['log']>,
        logMagenta(...args: Parameters<Console['log']>): ReturnType<Console['log']>,
    }
}