# @ttzschach/period

Date utility library to help define periods as a pair of two Date objects consisting of a "from" & "to" date.\
Allows for historic, prospective and even mixed Period definitions, thus creating periods that range from the past into the future.

````js
import { getPeriodDates, Period, PeriodDates, TimeDirection, TimeUnit } from "@ttzschach/period";


const yesterdayToTomorrow: Period = {
    from: {
        timeUnit: TimeUnit.DAY,
        timeUnitCount: 1,
        timeDirection: TimeDirection.PAST
    }
    to {
        timeUnit: TimeUnit.DAY,
        timeUnitCount: 1
        timeDirection: TimeDirection.FUTURE
    }
};

const resolvedPeriodDates: PeriodDates | undefined = getPeriodDates(yesterdayToNow);
// ^
// interface PeriodDates {
//     from: Date;
//     to: Date;
// }

if (resolvedPeriodDates) {
    console.log(resolvedPeriodDates);
    // assuming getPeriodDates was executed roughly at 2024-03-30-12:00:00 it would output the following:
    // Object { from: 2024-03-29-12:00:00, to: 2024-03-31-12:00:00 }
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
