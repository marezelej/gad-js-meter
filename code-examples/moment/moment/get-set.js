
function makeGetSet(unit, keepTime) {
    return function (value) {
        if (value != null) {
            set(this, unit, value);
            hooks.updateOffset(this, keepTime);
            return this;
        } else {
            return get(this, unit);
        }
    };
}

function get(mom, unit) {
    return mom.isValid()
        ? mom._d['get' + (mom._isUTC ? 'UTC' : '') + unit]()
        : NaN;
}

function set(mom, unit, value) {
    if (mom.isValid() && !isNaN(value)) {
        if (
            unit === 'FullYear' &&
            isLeapYear(mom.year()) &&
            mom.month() === 1 &&
            mom.date() === 29
        ) {
            value = toInt(value);
            mom._d['set' + (mom._isUTC ? 'UTC' : '') + unit](
                value,
                mom.month(),
                daysInMonth(value, mom.month())
            );
        } else {
            mom._d['set' + (mom._isUTC ? 'UTC' : '') + unit](value);
        }
    }
}

// MOMENTS

function stringGet(units) {
    units = normalizeUnits(units);
    if (isFunction(this[units])) {
        return this[units]();
    }
    return this;
}

function stringSet(units, value) {
    if (typeof units === 'object') {
        units = normalizeObjectUnits(units);
        var prioritized = getPrioritizedUnits(units),
            i,
            prioritizedLen = prioritized.length;
        for (i = 0; i < prioritizedLen; i++) {
            this[prioritized[i].unit](units[prioritized[i].unit]);
        }
    } else {
        units = normalizeUnits(units);
        if (isFunction(this[units])) {
            return this[units](value);
        }
    }
    return this;
}
