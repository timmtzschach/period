import { Period, PeriodDateType, FromPeriod, ToPeriod, PeriodDateFnsMap, RelativeToStartType, RelativeFromStartType, PeriodDefaults, RelativeEndTypeDateFnsMap, PeriodDates } from "./model.js";

function resolvePeriod(period: FromPeriod | ToPeriod, anchorDate: Date, periodDateType: PeriodDateType): Date {
    if (period.timeUnitCount != 0) {
        const periodTypeDateFn = PeriodDateFnsMap[period.timeUnit ?? (PeriodDefaults.timeUnit[periodDateType])][period.timeDirection ?? (PeriodDefaults.timeDirection[periodDateType])];
        anchorDate = periodTypeDateFn(anchorDate, period.timeUnitCount ?? (PeriodDefaults.timeUnitCount[periodDateType]));
    }

    if (period.relativeEndType) {
        const relativeEndTypeDateFn = RelativeEndTypeDateFnsMap[period.relativeEndType];
        anchorDate = relativeEndTypeDateFn(anchorDate, period.dateFnsStartEndWeekOptions);
    }

    return anchorDate;
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
        resolvedTo = resolvePeriod(to, resolvedTo, PeriodDateType.TO);
        return { from, to: resolvedTo };
    } else if (to instanceof Date) {
        if (from instanceof Date) {
            return { from, to };
        } else if (!from) {
            return { from: new Date(), to };
        }

        let resolvedFrom: Date = from?.relativeStartType === RelativeFromStartType.TO ? new Date(to.getTime()) : new Date();
        resolvedFrom = resolvePeriod(from, resolvedFrom, PeriodDateType.FROM);
        return { from: resolvedFrom, to };
    } else if (from) {
        if (!to) {
            let resolvedFrom: Date = new Date();
            to = new Date(resolvedFrom.getTime());
            resolvedFrom = resolvePeriod(from, resolvedFrom, PeriodDateType.FROM);
            return { from: resolvedFrom, to };
        }
        // resolve both from & to
        if (from.relativeStartType === RelativeFromStartType.TO && to.relativeStartType === RelativeToStartType.FROM) {
            return undefined;
        }
        if (from.relativeStartType === RelativeFromStartType.TO) {
            let resolvedTo: Date = new Date();
            resolvedTo = resolvePeriod(to, resolvedTo, PeriodDateType.TO);
            let resolvedFrom: Date = new Date(resolvedTo.getTime());
            resolvedFrom = resolvePeriod(from, resolvedFrom, PeriodDateType.FROM);
            return { from: resolvedFrom, to: resolvedTo };
        } else if (to.relativeStartType === RelativeToStartType.FROM) {
            let resolvedFrom: Date = new Date();
            resolvedFrom = resolvePeriod(from, resolvedFrom, PeriodDateType.FROM);
            let resolvedTo: Date = new Date(resolvedFrom.getTime());
            resolvedTo = resolvePeriod(to, resolvedTo, PeriodDateType.TO);
            return { from: resolvedFrom, to: resolvedTo };
        }
        else {
            // no dependency between the two
            const resolvedFrom = resolvePeriod(from, new Date(), PeriodDateType.FROM);
            const resolvedTo = resolvePeriod(to, new Date(), PeriodDateType.TO);
            return { from: resolvedFrom, to: resolvedTo };
        }
    } else if (to) {
        let resolvedTo: Date = new Date();
        resolvedTo = resolvePeriod(to, new Date(), PeriodDateType.TO);
        return { from: new Date(), to: resolvedTo };
    }

    return undefined;
}
