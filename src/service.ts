import { Period, PeriodDates, PeriodDateType, StoreablePeriod, FromPeriod, ToPeriod, PeriodDateFnsMap, PeriodDefaults, RelativeToStartType, RelativeFromStartType } from "./model";

function resolvePeriod(date: Date, period: FromPeriod | ToPeriod, periodDateType: PeriodDateType): Date {
    // @TODO implement RelativeStartType
    const periodTypeDateFn = PeriodDateFnsMap[period.timeUnit!]?.[period.timeDirection ?? PeriodDefaults.timeDirection[periodDateType]];
    if (typeof periodTypeDateFn === 'function') {
        date = periodTypeDateFn(date, period.periodCount ?? 1);
    }
    // @TODO implement RelateEndType
    return date;
}

export function getPeriodDates(period: Period): PeriodDates | undefined {
    let from: undefined | Date | FromPeriod;
    let to: undefined | Date | ToPeriod;

    if (PeriodDateType.FROM in period) {
        from = period[PeriodDateType.FROM];
    }
    if (PeriodDateType.TO in period) {
        to = period[PeriodDateType.TO];
    }

    if (from instanceof Date) {
        if (to instanceof Date) {
            return { from, to };
        } else if (!to) {
            return { from, to: new Date() };
        }

        let resolvedTo: Date = to.relativeToStartType === RelativeToStartType.FROM ? new Date(from.getTime()) : new Date();
        resolvedTo = resolvePeriod(resolvedTo, to, PeriodDateType.TO);
        return { from, to: resolvedTo };
    } else if (to instanceof Date) {
        if (from instanceof Date) {
            return { from, to };
        } else if (!from) {
            return { from: new Date(), to };
        }

        let resolvedFrom: Date = from?.relativeFromStartType === RelativeFromStartType.TO ? new Date(to.getTime()) : new Date();
        resolvedFrom = resolvePeriod(resolvedFrom, from, PeriodDateType.TO);
        return { from: resolvedFrom, to };
    } else if (from) {
        if (!to) {
            let resolvedFrom: Date = new Date();
            resolvedFrom = resolvePeriod(resolvedFrom, from, PeriodDateType.FROM);
            return { from: resolvedFrom, to: new Date() };
        }
        // resolve both from & to
        if (from.relativeFromStartType === RelativeFromStartType.TO && to.relativeToStartType === RelativeToStartType.FROM) {
            return undefined;
        }
        if (from.relativeFromStartType === RelativeFromStartType.TO) {
            let resolvedTo: Date = new Date();
            resolvedTo = resolvePeriod(resolvedTo, to, PeriodDateType.TO);
            let resolvedFrom: Date = new Date(resolvedTo.getTime());
            resolvedFrom = resolvePeriod(resolvedFrom, from, PeriodDateType.FROM);
            return { from: resolvedFrom, to: resolvedTo };
        } else if (to.relativeToStartType === RelativeToStartType.FROM) {
            let resolvedFrom: Date = new Date();
            resolvedFrom = resolvePeriod(resolvedFrom, from, PeriodDateType.FROM);
            let resolvedTo: Date = new Date(resolvedFrom.getTime());
            resolvedTo = resolvePeriod(resolvedTo, to, PeriodDateType.TO);
            return { from: resolvedFrom, to: resolvedTo };
        }
        else {
            // no dependency between the two
            const resolvedFrom = resolvePeriod(new Date(), from, PeriodDateType.FROM);
            const resolvedTo = resolvePeriod(new Date(), to, PeriodDateType.TO);
            return { from: resolvedFrom, to: resolvedTo };
        }
    } else if (to) {
        let resolvedTo: Date = new Date();
        resolvedTo = resolvePeriod(new Date(), to, PeriodDateType.TO);
        return { from: new Date(), to: resolvedTo };
    }

    return undefined;
}

/**
 * Retrieves a JSON conform object for a given @Period
 * Replaces Date objects inside a period (e.g. for Datepicker periods that consist of two Date objects)
 *
 * A possible use case might be storage related as class instances aren't supported.
 *
 * @param period - the period to make JSON safe
 * @returns the JSON conform Period @StoreablePeriod
 */
export function getStoreablePeriod(period: Period): StoreablePeriod {
    return Object.entries(period).reduce<StoreablePeriod>((storeablePeriod: StoreablePeriod, [periodKey, periodValue]) => {
        storeablePeriod[periodKey] = periodValue instanceof Date ? periodValue.getTime() : periodValue;
        return storeablePeriod;
    }, {} as StoreablePeriod);
}

export function getPeriodFromStoreablePeriod(storeablePeriod: StoreablePeriod): Period {
    return Object.entries(storeablePeriod).reduce<Period>((period: Period, [periodKey, periodValue]) => {
        period[periodKey] = (periodKey in PeriodDateType && typeof periodValue === 'number'
            ? new Date(periodValue)
            : periodValue
        );

        return period;
    }, {} as Period)
}