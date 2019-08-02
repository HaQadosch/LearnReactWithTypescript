function first(arg) {
    return typeof arg === 'string' ? arg.substring(0, 1) : Array.isArray(arg) ? arg[0] : null;
}
first('The'); //?
first(['aauoe', 'b']); //?
function logName(arg) {
    if ('firstName' in arg) {
        return arg.firstName;
    }
    else if ('name' in arg) {
        return arg.name;
    }
    else {
        const nope = arg;
        return nope;
    }
}
function isPerson(arg) {
    return 'firstName' in arg;
}
//# sourceMappingURL=typeGuards.js.map