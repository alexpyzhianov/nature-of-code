type ComposedFns<Val> = (val: Val) => Val;

export function compose<Val>(...fns: ComposedFns<Val>[]) {
    return function (arg: Val) {
        return fns.reduceRight((result: Val, fn: ComposedFns<Val>) => {
            return fn(result);
        }, arg);
    };
}
