# @ttzschach/period

Date utility library to help define periods as a pair of two Date objects consisting of a "from" & "to" date.\
Allows for historic, prospective and even mixed Period definitions, thus creating periods that range from the past into the future.

````js
import { getPeriodDates, Period, PeriodDates, TimeDirection, TimeUnit, RelativeToStartType } from "@ttzschach/period";


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
````

As most properties are optional the defaults are defined to resolve yesterday for the "from" date and today for the "to" date.\
You may find the defaults inside **./src/model.ts**.

## Installation

````bash
npm install @ttzschach/period
````

## Uninstallation

````bash
npm uninstall @ttzschach/period
````

## License

MIT
