function as(units) {
    if (!this.isValid()) {
        return NaN;
    }
    var days,
        months,
        milliseconds = this._milliseconds;

    units = normalizeUnits(units);

    if (units === 'month' || units === 'quarter' || units === 'year') {
        days = this._days + milliseconds / 864e5;
        months = this._months + daysToMonths(days);
        switch (units) {
            case 'month':
                return months;
            case 'quarter':
                return months / 3;
            case 'year':
                return months / 12;
        }
    } else {
        // handle milliseconds separately because of floating point math errors (issue #1867)
        days = this._days + Math.round(monthsToDays(this._months));
        switch (units) {
            case 'week':
                return days / 7 + milliseconds / 6048e5;
            case 'day':
                return days + milliseconds / 864e5;
            case 'hour':
                return days * 24 + milliseconds / 36e5;
            case 'minute':
                return days * 1440 + milliseconds / 6e4;
            case 'second':
                return days * 86400 + milliseconds / 1000;
            // Math.floor prevents floating point math errors here
            case 'millisecond':
                return Math.floor(days * 864e5) + milliseconds;
            default:
                throw new Error('Unknown unit ' + units);
        }
    }
}

// TODO: Use this.as('ms')?
function valueOf() {
    if (!this.isValid()) {
        return NaN;
    }
    return (
        this._milliseconds +
        this._days * 864e5 +
        (this._months % 12) * 2592e6 +
        toInt(this._months / 12) * 31536e6
    );
}

function makeAs(alias) {
    return function () {
        return this.as(alias);
    };
}
