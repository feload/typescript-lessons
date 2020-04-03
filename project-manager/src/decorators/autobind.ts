export function autobind(target: any, methodName: string, descriptor: PropertyDescriptor) {
    const method = descriptor.value;
    const adjustment: PropertyDescriptor = {
        configurable: true,
        enumerable: false,
        get() {
            return method.bind(this);
        }
    };
    return adjustment;
}