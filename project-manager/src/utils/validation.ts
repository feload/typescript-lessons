interface Validatable {
    value: string | number,
    required?: boolean,
    min?: number,
    max?: number
}

export function isValid(params: Validatable): boolean {
    let valid = false;

    const value = params.value,
        required = params.required,
        min = params.min,
        max = params.max,
        valueType = typeof value;

    if (required || value) {
        let valueSize: number = (valueType == 'string') ? value.toString().length : +value;

        if (min && max) {
            if (min <= valueSize && valueSize <= max) {
                valid = true;
            }
        } else if ((min && !max) && (min <= valueSize)) {
            valid = true;
        } else if ((max && !min) && (valueSize <= max)) {
            valid = true;
        }

    }

    return (required) ? valid : true;
}