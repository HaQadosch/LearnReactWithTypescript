function condenseString(arg) {
    return arg.split(' ').join('');
}
function condenseArray(args) {
    return args.map(condenseString);
}
function condense(arg) {
    return typeof arg === 'string' ? condenseString(arg) : condenseArray(arg);
}
const cond = condense('o e .'); //?
//# sourceMappingURL=overload.js.map