import { Period, RelativeFromStartType } from "./model.js";
import { getPeriodDates } from "./service.js";

const periods: Period[] = [
    { from: { timeUnitCount: 1 } }, // yesterday to now
    { to: { timeUnitCount: 1 } }, // now to tomorrow
    { from: { timeUnitCount: 7 } }, // 1 week to now
    { to: { timeUnitCount: 7 } }, // now to next week
    { from: { relativeStartType: RelativeFromStartType.TO }, to: { timeUnitCount: 1 } } // now to tomorrow
];

for (const period of periods) {
    console.log('Resolved period dates', getPeriodDates(period));
}
