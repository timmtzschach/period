import { JSONPeriod, Period, PeriodDateKeyMap, PeriodDates } from "./model";

export function getDates(period: Period): PeriodDates {
    let from: Date = new Date();
    let to: Date = new Date();
    return { from, to };
}

/**
 * Retrieves a JSON conform object for a given @Period
 * Replaces Date objects inside a period (e.g. for Datepicker periods that consist of two Date objects)
 *
 * A possible use case might be storage related as class instances aren't supported.
 *
 * @param period - the period to make JSON safe
 * @returns the JSON conform Period @JSONPeriod
 */
export function getJSONPeriod(period: Period): JSONPeriod {
    return Object.entries(period).reduce<JSONPeriod>((jsonPeriod: JSONPeriod, [periodKey, periodValue]) => {
        jsonPeriod[periodKey] = PeriodDateKeyMap[periodKey] && periodValue instanceof Date ? periodValue.getTime() : periodValue;
        return jsonPeriod;
    }, {} as JSONPeriod)
}

export function getPeriodFromJSONPeriod(jsonPeriod: JSONPeriod) {
    return Object.entries(jsonPeriod).reduce<Period>((period: Period, [jsonPeriodKey, jsonPeriodValue]) => {
        period[jsonPeriodKey] = PeriodDateKeyMap[jsonPeriodKey] && typeof jsonPeriodValue === 'number' ? new Date(jsonPeriodValue) : jsonPeriodValue;
        return period;
    }, {} as Period)
}