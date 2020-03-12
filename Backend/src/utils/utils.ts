export const containAll = (body: any, fields: Array<string>): boolean => {
    return fields.every((field: string): boolean => {
        return body.hasOwnProperty(field);
    });
};

export const inRange = (x: number, lowerBound: number, upperBound: number): boolean => {
    return x >= lowerBound && x <= upperBound;
};
