import { Period, RelativeFromStartType } from "./model.js";
import { getPeriodDates } from "./service.js";

const periods: Period[] = [
    { from: { timeUnitCount: 1 } },
    { to: { timeUnitCount: 1 } },
    { from: { timeUnitCount: 7 } },
    { to: { timeUnitCount: 7 } },
    { from: { relativeStartType: RelativeFromStartType.TO }, to: { timeUnitCount: 1 } }
];

for (const period of periods) {
    console.log('Resolved period dates', getPeriodDates(period));
}
