import {
    subMilliseconds, subSeconds, subMinutes, subHours, subDays, subWeeks, subMonths, subQuarters, subYears,
    addMilliseconds, addSeconds, addMinutes, addHours, addDays, addWeeks, addMonths, addQuarters, addYears,
    endOfSecond, endOfMinute, endOfHour, endOfDay, endOfWeek, endOfMonth, endOfQuarter, endOfYear,
    startOfSecond, startOfMinute, startOfHour, startOfDay, startOfWeek, startOfMonth, startOfQuarter, startOfYear
} from "date-fns";

export interface PeriodDates {
    from: Date;
    to: Date;
}

export enum PeriodDateType {
    FROM = 'from',
    TO = 'to',
}

export enum TimeUnit {
    MILISECOND,
    SECOND,
    MINUTE,
    HOUR,
    DAY,
    WEEK,
    MONTH,
    QUARTER, // Calendar quarter
    YEAR,
}

export enum TimeDirection {
    PAST,
    FUTURE,
}

// Enum in order to be extensible in the future
export enum RelativeFromStartType {
    NOW,
    TO,
}

// Enum in order to be extensible in the future
export enum RelativeToStartType {
    NOW,
    FROM,
}

export enum RelativeEndType {
    START_OF_SECOND,
    START_OF_MINUTE,
    START_OF_HOUR,
    START_OF_DAY,
    START_OF_WEEK,
    START_OF_MONTH,
    START_OF_QUARTER,
    START_OF_YEAR,
    END_OF_SECOND,
    END_OF_MINUTE,
    END_OF_HOUR,
    END_OF_DAY,
    END_OF_WEEK,
    END_OF_MONTH,
    END_OF_QUARTER,
    END_OF_YEAR,
}

export interface BasePeriod {
    // periodDateType: PeriodDateType;
    timeUnit?: TimeUnit;
    timeUnitCount?: number; // DEFAULT based on timeDirection && timeUnit
    timeDirection?: TimeDirection;
    dateFnsStartEndWeekOptions?: Parameters<typeof endOfWeek | typeof startOfWeek>[1];
}

export interface FromPeriod extends BasePeriod {
    // periodDateType: PeriodDateType.FROM;
    relativeStartType?: RelativeFromStartType; // default: RelativeFromStartType.NOW
    relativeEndType?: RelativeEndType;
}

export interface ToPeriod extends BasePeriod {
    // periodDateType: PeriodDateType.TO;
    relativeStartType?: RelativeToStartType; // default: RelativeToStartType.NOW
    relativeEndType?: RelativeEndType;
}

export type Period = (
    | { [PeriodDateType.FROM]: FromPeriod | Date; }
    | { [PeriodDateType.TO]: ToPeriod | Date; }
    | {
        [PeriodDateType.FROM]: FromPeriod | Date;
        [PeriodDateType.TO]: ToPeriod | Date;
    }
);

type PeriodOmits = 'periodDateType' | 'relativeEndType' | 'dateFnsStartEndWeekOptions';
type ReqPeriod = Required<Omit<FromPeriod | ToPeriod, PeriodOmits>>;
type ReqFromPeriod = Required<Omit<FromPeriod, PeriodOmits>>;
type ReqToPeriod = Required<Omit<ToPeriod, PeriodOmits>>;
export const PeriodDefaults: {
    [Key in keyof ReqPeriod]: {
        [PeriodDateType.FROM]: ReqFromPeriod[Key];
        [PeriodDateType.TO]: ReqToPeriod[Key];
    };
} = {
    timeUnit: {
        [PeriodDateType.FROM]: TimeUnit.DAY,
        [PeriodDateType.TO]: TimeUnit.DAY,
    },
    relativeStartType: {
        [PeriodDateType.FROM]: RelativeFromStartType.NOW,
        [PeriodDateType.TO]: RelativeToStartType.NOW
    },
    timeUnitCount: {
        [PeriodDateType.FROM]: 1,
        [PeriodDateType.TO]: 0,
    },
    timeDirection: {
        [PeriodDateType.FROM]: TimeDirection.PAST,
        [PeriodDateType.TO]: TimeDirection.FUTURE,
    },
};

export const PeriodDateFnsMap: { [Type in TimeUnit]: { [Dir in TimeDirection]: (date: Date, amount: number) => Date; }; } = {
    [TimeUnit.MILISECOND]: {
        [TimeDirection.PAST]: subMilliseconds,
        [TimeDirection.FUTURE]: addMilliseconds,
    },
    [TimeUnit.SECOND]: {
        [TimeDirection.PAST]: subSeconds,
        [TimeDirection.FUTURE]: addSeconds,
    },
    [TimeUnit.MINUTE]: {
        [TimeDirection.PAST]: subMinutes,
        [TimeDirection.FUTURE]: addMinutes,
    },
    [TimeUnit.HOUR]: {
        [TimeDirection.PAST]: subHours,
        [TimeDirection.FUTURE]: addHours,
    },
    [TimeUnit.DAY]: {
        [TimeDirection.PAST]: subDays,
        [TimeDirection.FUTURE]: addDays,
    },
    [TimeUnit.WEEK]: {
        [TimeDirection.PAST]: subWeeks,
        [TimeDirection.FUTURE]: addWeeks,
    },
    [TimeUnit.MONTH]: {
        [TimeDirection.PAST]: subMonths,
        [TimeDirection.FUTURE]: addMonths,
    },
    [TimeUnit.QUARTER]: {
        [TimeDirection.PAST]: subQuarters,
        [TimeDirection.FUTURE]: addQuarters,
    },
    [TimeUnit.YEAR]: {
        [TimeDirection.PAST]: subYears,
        [TimeDirection.FUTURE]: addYears,
    },
};

export const RelativeEndTypeDateFnsMap: {
    [Type in RelativeEndType]: (date: Date, options?: Parameters<typeof endOfWeek | typeof startOfWeek>[1]) => Date;
} = {
    [RelativeEndType.END_OF_SECOND]: endOfSecond,
    [RelativeEndType.END_OF_MINUTE]: endOfMinute,
    [RelativeEndType.END_OF_HOUR]: endOfHour,
    [RelativeEndType.END_OF_DAY]: endOfDay,
    [RelativeEndType.END_OF_WEEK]: endOfWeek,
    [RelativeEndType.END_OF_MONTH]: endOfMonth,
    [RelativeEndType.END_OF_QUARTER]: endOfQuarter,
    [RelativeEndType.END_OF_YEAR]: endOfYear,
    [RelativeEndType.START_OF_SECOND]: startOfSecond,
    [RelativeEndType.START_OF_MINUTE]: startOfMinute,
    [RelativeEndType.START_OF_HOUR]: startOfHour,
    [RelativeEndType.START_OF_DAY]: startOfDay,
    [RelativeEndType.START_OF_WEEK]: startOfWeek,
    [RelativeEndType.START_OF_MONTH]: startOfMonth,
    [RelativeEndType.START_OF_QUARTER]: startOfQuarter,
    [RelativeEndType.START_OF_YEAR]: startOfYear,
};
