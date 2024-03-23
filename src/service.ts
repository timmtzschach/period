import { Period, PeriodDates, PeriodDateType, StoreablePeriod, FromPeriod, ToPeriod, PeriodDateFnsMap, RelativeToStartType, RelativeFromStartType, PeriodDefaults, RelativeEndTypeDateFnsMap } from "./model";

export function resolvePeriod(period: FromPeriod | ToPeriod, date: Date): Date {
    if (period.periodCount != 0) {
        const periodTypeDateFn = PeriodDateFnsMap[period.timeUnit ?? (PeriodDefaults.timeUnit[period.periodDateType])][period.timeDirection ?? (PeriodDefaults.timeDirection[period.periodDateType])];
        date = periodTypeDateFn(date, period.periodCount ?? (PeriodDefaults.periodCount[period.periodDateType]));
    }

    if (period.relativeEndType) {
        const relativeEndTypeDateFn = RelativeEndTypeDateFnsMap[period.relativeEndType];
        date = relativeEndTypeDateFn(date, period.dateFnsStartEndWeekOptions);
    }

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

        let resolvedTo: Date = to.relativeStartType === RelativeToStartType.FROM ? new Date(from.getTime()) : new Date();
        resolvedTo = resolvePeriod(to, resolvedTo);
        return { from, to: resolvedTo };
    } else if (to instanceof Date) {
        if (from instanceof Date) {
            return { from, to };
        } else if (!from) {
            return { from: new Date(), to };
        }

        let resolvedFrom: Date = from?.relativeStartType === RelativeFromStartType.TO ? new Date(to.getTime()) : new Date();
        resolvedFrom = resolvePeriod(from, resolvedFrom);
        return { from: resolvedFrom, to };
    } else if (from) {
        if (!to) {
            let resolvedFrom: Date = new Date();
            resolvedFrom = resolvePeriod(from, resolvedFrom);
            return { from: resolvedFrom, to: new Date() };
        }
        // resolve both from & to
        if (from.relativeStartType === RelativeFromStartType.TO && to.relativeStartType === RelativeToStartType.FROM) {
            return undefined;
        }
        if (from.relativeStartType === RelativeFromStartType.TO) {
            let resolvedTo: Date = new Date();
            resolvedTo = resolvePeriod(to, resolvedTo);
            let resolvedFrom: Date = new Date(resolvedTo.getTime());
            resolvedFrom = resolvePeriod(from, resolvedFrom);
            return { from: resolvedFrom, to: resolvedTo };
        } else if (to.relativeStartType === RelativeToStartType.FROM) {
            let resolvedFrom: Date = new Date();
            resolvedFrom = resolvePeriod(from, resolvedFrom);
            let resolvedTo: Date = new Date(resolvedFrom.getTime());
            resolvedTo = resolvePeriod(to, resolvedTo);
            return { from: resolvedFrom, to: resolvedTo };
        }
        else {
            // no dependency between the two
            const resolvedFrom = resolvePeriod(from, new Date());
            const resolvedTo = resolvePeriod(to, new Date());
            return { from: resolvedFrom, to: resolvedTo };
        }
    } else if (to) {
        let resolvedTo: Date = new Date();
        resolvedTo = resolvePeriod(to, new Date());
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
// export function getStoreablePeriod(period: Period): StoreablePeriod {
//     return Object.entries(period).reduce<StoreablePeriod>((storeablePeriod: StoreablePeriod, [periodKey, periodValue]) => {
//         storeablePeriod[periodKey] = periodValue instanceof Date ? periodValue.getTime() : periodValue;
//         return storeablePeriod;
//     }, {} as StoreablePeriod);
// }

// export function getPeriodFromStoreablePeriod(storeablePeriod: StoreablePeriod): Period {
//     return Object.entries(storeablePeriod).reduce<Period>((period: Period, [periodKey, periodValue]) => {
//         period[periodKey] = (periodKey in PeriodDateType && typeof periodValue === 'number'
//             ? new Date(periodValue)
//             : periodValue
//         );

//         return period;
//     }, {} as Period)
// }