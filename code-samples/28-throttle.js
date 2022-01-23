function throttle(func, wait, options) {
    let leading = true
    let trailing = true

    if (typeof func !== 'function') {
        throw new TypeError('Expected a function')
    }
    if (isObject(options)) {
        leading = 'leading' in options ? !!options.leading : leading
        trailing = 'trailing' in options ? !!options.trailing : trailing
    }
    return debounce(func, wait, {
        leading,
        trailing,
        'maxWait': wait
    })
}

function throttle2(callback, wait, options) {
    if (typeof callback !== 'function') {
        throw new TypeError('Expected a function')
    } else {
        let leading = true
        let trailing = true
        if (isObject(options)) {
            leading = 'leading' in options ? !!options.leading : leading
            trailing = 'trailing' in options ? !!options.trailing : trailing
        }
        return debounce(
            callback,
            wait,
            {
                leading,
                trailing,
                'maxWait': wait
            }
        )
    }
}