import { Period, PeriodDates, RelativeToStartType, TimeDirection, TimeUnit } from "./model.js";
import { getPeriodDates } from "./service.js";

const fromYesterdayToTomorrow: Period = {
    from: {
        timeUnit: TimeUnit.DAY,
        timeUnitCount: 1,
        timeDirection: TimeDirection.PAST,
    },
    to: {
        timeUnit: TimeUnit.DAY,
        timeUnitCount: 1,
        timeDirection: TimeDirection.FUTURE,
    }
};

const from1WeekBackToAdd3Days: Period = {
    from: {
        timeUnit: TimeUnit.WEEK,
        timeUnitCount: 1,
        timeDirection: TimeDirection.PAST,
    },
    to: {
        timeUnit: TimeUnit.DAY,
        timeUnitCount: 3,
        timeDirection: TimeDirection.FUTURE,
        relativeStartType: RelativeToStartType.FROM, // Means that "to" will be resolved by "from"!
    }
}

const resolvedFromYesterdayToTomorrow: PeriodDates | undefined = getPeriodDates(fromYesterdayToTomorrow);
const resolvedFrom1WeekBackToAdd3Days: PeriodDates | undefined = getPeriodDates(from1WeekBackToAdd3Days);

// assuming the calls to getPeriodDates were roughly executed at ~2024-03-30-12:00:00 the output would be:
if (resolvedFromYesterdayToTomorrow) {
    console.log(resolvedFromYesterdayToTomorrow);
    // Object { from: 2024-03-29-12:00:00, to: 2024-03-31-12:00:00 }
}

if (resolvedFrom1WeekBackToAdd3Days) {
    console.log(resolvedFrom1WeekBackToAdd3Days);
    // Object { from: 2024-03-23-12:00:00, to: 2024-03-26-12:00:00 }
}