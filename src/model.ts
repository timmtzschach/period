import {
    subMilliseconds, subSeconds, subMinutes, subHours, subDays, subWeeks, subMonths, subQuarters, subYears,
    addMilliseconds, addSeconds, addMinutes, addHours, addDays, addWeeks, addMonths, addQuarters, addYears
} from "date-fns";

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

export enum RelativeFromStartType {
    NOW,
    TO,
}

export enum RelativeToStartType {
    NOW,
    FROM,
}

export enum RelativeEndType {
    START_OF_SECOND = 1,
    START_OF_MINUTE,
    START_OF_HOUR,
    START_OF_DAY,
    START_OF_WEEK,
    START_OF_MONTH,
    START_OF_QUARTER,
    START_OF_YEAR,
    START_OF_DECADE,
    START_OF_CENTURY,
    END_OF_SECOND,
    END_OF_MINUTE,
    END_OF_HOUR,
    END_OF_DAY,
    END_OF_WEEK,
    END_OF_MONTH,
    END_OF_QUARTER,
    END_OF_YEAR,
    END_OF_DECADE,
    END_OF_CENTURY,
}

export interface BasePeriod {
    periodType?: PeriodDateType;
    periodCount?: number;
    timeDirection?: TimeDirection;
    timeUnit?: TimeUnit;
}

export interface FromPeriod extends BasePeriod {
    relativeFromStartType?: RelativeFromStartType;
    relativeEndType?: RelativeEndType;
}

export interface ToPeriod extends BasePeriod {
    relativeToStartType?: RelativeToStartType;
    relativeEndType?: RelativeEndType;
}

export type Period = (
    | { [PeriodDateType.FROM]: Date; }
    | { [PeriodDateType.TO]: Date; }
    | {
        [PeriodDateType.FROM]: Date;
        [PeriodDateType.TO]: Date;
    }
);

export type StoreablePeriod = (
    | { [PeriodDateType.FROM]: number | FromPeriod; }
    | { [PeriodDateType.TO]: number | ToPeriod; }
    | {
        [PeriodDateType.FROM]: number | FromPeriod;
        [PeriodDateType.TO]: number | ToPeriod;
    }
);
export type JSONPeriod = StoreablePeriod;

export interface PeriodDates {
    from: Date;
    to: Date;
}

export const PeriodDefaults: { [Key in keyof BasePeriod]: { [Type in PeriodDateType]: BasePeriod[Key]; }; } = {
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
