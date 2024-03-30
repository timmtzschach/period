# @ttzschach/period

Date utility library to help define periods as a pair of two Date objects - from-/toDate.
Allows for both historic & futurisitic Date definitions, thus creating periods that range from the past into the future.

````js
import { getPeriodDates, Period, PeriodDates } from "@ttzschach/period";


const yesterdayToNow: Period = {
    from: {
        timeUnit: TimeUnit.DAY,
        timeUnitCount: 1,
        timeDirection: TimeDirection.PAST
    }
    // 'to' defaults to the current Date (now) in this example
};

const resolvedPeriodDates: PeriodDates | undefined = getPeriodDates(yesterdayToNow);
// ^
// interface PeriodDates {
//     from: Date;
//     to: Date;
// }

if (resolvedPeriodDates) {
    console.log(getPeriodDates(yesterdayToNow));
    // assuming getPeriodDates was executed roughly at 2024-03-30-12:00:00 it would output the following:
    // Object { from: 2024-03-29-12:00:00, to: 2024-03-30-12:00:00 }
}
````

As most properties are optional the defaults are defined to yesterday (fromDate) to now (toDate).
You may find the default values inside **src/model.ts const PeriodDefaults**.

## Installation (WIP)

To be released on npmjs.com

````bash
npm install @ttzschach/period
````

Alternatively :

````bash
mkdir repos && cd ./repos/ && git@github.com:timmtzschach/period.git && cd ./period/ && npm i && cd ../../ && npm i --save-dev ./period/
````

## Uninstallation

````bash
npm uninstall @ttzschach/period
````

## License

MIT
