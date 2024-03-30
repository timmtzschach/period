# @ttzschach/period

## Period/Date-pair utility library to help define periods which are defined as a pair of two date objects - a from- and toDate (start-/endDate)

## It allows for both historic and futurisitic Date definitions thus creating periods that range from the past into the future

````js
import { getPeriodDates, Period } from "@ttzschach/period";

const yesterdayToNow: Period = { from: { TimeUnit.DAY, timeUnitCount: 1, timeDirection: TimeDirection.PAST } }; // 'to' defaults to the current Date (now)
const resolvedPeriodDates: PeriodDates | undefined = getPeriodDates(yesterdayToNow);
// ^
// export interface PeriodDates {
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

````bash
npm install @ttzschach/period
````

Alternatively:

````bash
git@github.com:timmtzschach/period.git && cd ./period/ && npm i && cd ../ && npm i --save-dev ./period/
````

## Uninstallation

````bash
npm uninstall @ttzschach/period
````

## License

MIT
