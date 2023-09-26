export abstract class DataClass<T> {

    constructor(data?: Partial<T>) {
        if (data) {
            Object.assign(this, this.copyWith(data));
        }
    }

    copyWith(other: Partial<T> = {}): T {
        const newObject = new (this.constructor as any)();
        const _this = Object.entries(this).reduce(
            (p, [key, value]) => {
                return {
                    ...p,
                    [key]: value?.copyWith ? value.copyWith() : value,
                }
            },
            {},
        );
        Object.assign(newObject, _this, other);

        return newObject;
    }

    get copy(): T {
        return this.copyWith();
    }

}
